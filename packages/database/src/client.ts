import { PrismaClient } from "@prisma/client";

export type {
  Account,
  Booking,
  Home,
  Session,
  ShareKey,
  User,
  VerificationToken,
} from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();
export const db = prisma;

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
