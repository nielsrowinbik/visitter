import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/lib/auth";
import { unstable_getServerSession } from "next-auth/next";

export function withAuthentication(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    }

    return handler(req, res);
  };
}
