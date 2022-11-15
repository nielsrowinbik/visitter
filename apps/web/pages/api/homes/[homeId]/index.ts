import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { db } from "database";
import { homePatchSchema } from "@/lib/validations/home";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.delete(async (req, res) => {
  await db.home.delete({
    where: {
      id: req.query.homeId as string,
    },
  });

  return res.status(204).end();
});

handler.patch(async (req, res) => {
  const homeId = req.query.homeId as string;
  const home = await db.home.findUnique({
    where: {
      id: homeId,
    },
  });

  const body = homePatchSchema.parse(req.body);

  await db.home.update({
    where: {
      id: homeId,
    },
    data: {
      name: body.name || home.name,
    },
  });

  return res.status(204).end();
});

export default handler;
