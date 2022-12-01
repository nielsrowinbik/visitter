import { NextApiRequest, NextApiResponse } from "next";

import { absoluteUrl } from "@/lib/utils";
import { authentication } from "@/lib/api-middlewares/authentication";
import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { premiumPlan } from "@/config/subscriptions";
import { stripe } from "@/lib/stripe";

const billingUrl = absoluteUrl("/account");

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.get(async (req, res) => {
  const user = await getCurrentUser(req, res);
  // const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  if (!!user.stripeSubscriptionId) {
    // The user is on the Premium plan, create a portal session to manage the subscription:
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: billingUrl,
    });

    return res.status(200).json({ redirectUrl: stripeSession.url });
  }

  // The user is on the free plan, create a checkout session to upgrade:
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: premiumPlan.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    customer_email: user.email,
    metadata: {
      userId: user.id,
    },
  });

  return res.status(200).json({ redirectUrl: stripeSession.url });
});

export default handler;
