import {
  GetSessionParams,
  getSession as getNextSession,
} from "next-auth/react";

import { DefaultSession } from "next-auth";

type DefaultSessionUser = NonNullable<DefaultSession["user"]>;

type SessionUser = DefaultSessionUser & {
  id: string;
  role: string;
};

export type Session = DefaultSession & {
  user?: SessionUser;
};

export async function getSession(
  options: GetSessionParams
): Promise<Session | null> {
  const session = await getNextSession(options);

  // that these are equal are ensured in `[...nextauth]`'s callback
  return session as Session | null;
}
