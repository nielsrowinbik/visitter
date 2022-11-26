import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { buffer } from "micro";
import { db } from "database";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

// TODO: Figure out what this should be in a production setting
const WEBHOOK_SIGNING_SECRET =
  "whsec_a7118feb1334999de57041d860c58b21ef46c6dfaac434df29fdfc2eacf54b1c";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.post(async (req, res) => {
  const requestBuffer = await buffer(req);
  const stripeSignature = req.headers["stripe-signature"] as string;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

  const event = stripe.webhooks.constructEvent(
    requestBuffer.toString(),
    stripeSignature,
    WEBHOOK_SIGNING_SECRET
  );

  if (event.type === "customer.subscription.created") {
    const subscription = event.data.object as Stripe.Subscription;

    await db.user.update({
      where: { stripeCustomerId: subscription.customer as string },
      data: {
        hasSubscription: true,
      },
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;

    await db.user.update({
      where: { stripeCustomerId: subscription.customer as string },
      data: {
        hasSubscription: false,
      },
    });
  }

  // TODO: Handle situation where the customer couldn't be charged or whatever and we also need to pause his subscription

  return res.status(200).json({ received: true });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
