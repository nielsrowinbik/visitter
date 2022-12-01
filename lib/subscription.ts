import { freePlan, premiumPlan } from "@/config/subscriptions";

import { UserSubscriptionPlan } from "types";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function findSubscriptionByUserId(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  const isPremium =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  const plan = isPremium ? premiumPlan : freePlan;

  const isCanceled = isPremium
    ? (await stripe.subscriptions.retrieve(user.stripeSubscriptionId))
        .cancel_at_period_end
    : false;

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPremium,
    isCanceled,
  };
}
