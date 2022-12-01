import type {
  User as NextAuthUser,
  Session as NextAuthSession,
} from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  export interface JWT extends NextAuthJWT {
    id: string;
    phone?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: Date;
  }
}

declare module "next-auth" {
  export interface User extends NextAuthUser {
    id: string;
    phone?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: Date;
  }

  export interface Session extends NextAuthSession {
    user: User;
  }
}
