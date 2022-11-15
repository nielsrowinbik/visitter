import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "@/lib/session";

export function authentication() {
  return async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    next: any
  ) {
    const session = await getSession(req, res);

    if (!session) {
      return res.status(403).end();
    }

    await next();
  };
}
