import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "packages/database/dist";
import { unstable_getServerSession } from "next-auth";

export async function getSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session | null> {
  return await unstable_getServerSession(...args, authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  const user = await db.user.findUnique({
    where: { id: session.user?.id },
  });

  return user;
}
