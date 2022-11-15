import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { db } from "database";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.post(async (req, res) => {
  const key = await db.shareKey.create({
    data: {
      home: {
        connect: {
          id: req.query.homeId as string,
        },
      },
    },
  });

  return res.status(201).json(key);
});

export default handler;
