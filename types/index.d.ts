import { User } from "@prisma/client";

type Nullable<T> = { [P in keyof T]: T[P] | null };

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
