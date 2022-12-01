import { User } from "@prisma/client";

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId?: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPremium: boolean;
    isCanceled: boolean;
  };
