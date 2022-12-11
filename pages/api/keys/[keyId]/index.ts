import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { deleteKey } from "@/lib/keys";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.delete(async (req, res) => {
  const keyId = req.query.keyId as string;

  await deleteKey(keyId);

  return res.status(204).end();
});

export default handler;
