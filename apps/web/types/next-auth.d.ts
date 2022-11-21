import type { User as NextAuthUser } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  export interface JWT extends NextAuthJWT {
    id: string;
    phone?: string;
    hasSubscription: boolean;
  }
}

declare module "next-auth" {
  export interface User extends NextAuthUser {
    id: string;
    phone?: string;
    hasSubscription: boolean;
  }

  export interface Session {
    user: User;
  }
}
