import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { createKey } from "@/lib/keys";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { stringify } from "superjson";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.post(async (req, res) => {
  const homeId = req.query.homeId as string;

  const key = await createKey(homeId);

  return res.status(201).send(stringify(key));
});

export default handler;
