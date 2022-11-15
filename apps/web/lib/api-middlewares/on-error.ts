import type { NextApiRequest, NextApiResponse } from "next";

import { ZodError } from "zod";

export function onError(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(error);

  if (error instanceof ZodError) {
    return res.status(422).json(error.issues);
  }

  return res.status(500).end();
}
