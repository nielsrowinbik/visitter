import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
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
  return session?.user;
}
