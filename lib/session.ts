import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { unstable_getServerSession } from "next-auth";

type GetSessionArgs =
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse]
  | [];

export async function getSession(
  ...args: GetSessionArgs
): Promise<Session | null> {
  return await unstable_getServerSession(...args, authOptions);
}

export async function getCurrentUser(...args: GetSessionArgs) {
  const session = await getSession(...args);

  return session.user;
}
