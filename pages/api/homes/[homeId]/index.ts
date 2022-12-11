import { NextApiRequest, NextApiResponse } from "next";
import { deleteHome, updateHome } from "@/lib/homes";

import { authentication } from "@/lib/api-middlewares/authentication";
import { homePatchSchema } from "@/lib/validations/home";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.delete(async (req, res) => {
  const homeId = req.query.homeId as string;

  await deleteHome(homeId);

  return res.status(204).end();
});

handler.patch(async (req, res) => {
  const homeId = req.query.homeId as string;

  const body = homePatchSchema.parse(req.body);

  const home = await updateHome(homeId, body);

  if (!home) {
    // Home didn't exist
    return res.status(404).end();
  }

  return res.status(204).end();
});

export default handler;
