import type {
  User as NextAuthUser,
  Session as NextAuthSession,
} from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  export interface JWT extends NextAuthJWT {
    id: string;
    name: string | null;
    phone: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: Date | null;
  }
}

declare module "next-auth" {
  export interface User extends NextAuthUser {
    id: string;
    name: string | null;
    phone: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: Date | null;
  }

  export interface Session extends NextAuthSession {
    user: User;
  }
}
