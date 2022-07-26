import EmailProvider from "next-auth/providers/email";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    EmailProvider({
      id: "email",
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    // @ts-expect-error FIXME: I don't know why my types are wrong here
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        // @ts-expect-error FIXME: I don't know why my types are wrong here
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image, // We use the `picture` field because it's there by default in the JWT object
        phone: dbUser.phone,
        stripeCustomerId: dbUser.stripeCustomerId,
        stripeSubscriptionId: dbUser.stripeSubscriptionId,
        stripePriceId: dbUser.stripePriceId,
        stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture; // In the User object, we prefer the `image` field
        session.user.phone = token.phone;
        session.user.stripeCustomerId = token.stripeCustomerId;
        session.user.stripeSubscriptionId = token.stripeSubscriptionId;
        session.user.stripePriceId = token.stripePriceId;
        session.user.stripeCurrentPeriodEnd = token.stripeCurrentPeriodEnd;
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const customer = await stripe.customers.create({
        email: user.email!,
      });

      await db.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    },
  },
};
