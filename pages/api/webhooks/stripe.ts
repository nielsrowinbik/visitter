import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { db } from "@/lib/db";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import rawBody from "raw-body";
import { stripe } from "@/lib/stripe";

export const config = {
  api: {
    // Turn off the body parser so we can access raw body for verification
    bodyParser: false,
  },
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.post(async (req, res) => {
  const body = await rawBody(req);
  const signature = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    body,
    signature!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  // Subscription is created through a checkout session:
  // TODO: Rewrite this to listen to `customer.subscription.created` and
  //  make sure to add the userId as metadeta to the subscription
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await db.user.update({
      where: {
        id: session!.metadata?.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  // Subscription renewal is succesful:
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    );

    // Update the price id and set the new period end.
    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  // Subscription is deleted:
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;

    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripeSubscriptionId: null,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: null,
        stripeCurrentPeriodEnd: null,
      },
    });
  }

  return res.status(204).end();
});

export default handler;
