import { NextRequest, NextResponse } from "next/server";

import { absoluteUrl } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { premiumPlan } from "@/config/subscriptions";
import stripe from "stripe";

const billingUrl = absoluteUrl("/account");

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  // const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  if (user!.stripeSubscriptionId) {
    // The user is on the Premium plan, create a portal session to manage the subscription:
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user!.stripeCustomerId!,
      return_url: billingUrl,
    });

    return NextResponse.json({ redirectUrl: stripeSession.url });
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
    customer_email: user!.email!,
    metadata: {
      userId: user!.id,
    },
  });

  return NextResponse.json({ redirectUrl: stripeSession.url });
}
