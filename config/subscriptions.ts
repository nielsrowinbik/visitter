import { SubscriptionPlan } from "types";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to one vacation home. Upgrade to Premium to manage unlimited vacation homes.",
  stripePriceId: null,
};

export const premiumPlan: SubscriptionPlan = {
  name: "Premium",
  description:
    "The Premium plan allows you to manage an unlimited amount of vacation homes.",
  stripePriceId: process.env.STRIPE_PREMIUM_MONTHLY_PLAN_ID,
};
