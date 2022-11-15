import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { db } from "database";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.delete(async (req, res) => {
  await db.booking.delete({
    where: {
      id: req.query.bookingId as string,
    },
  });

  return res.status(204).end();
});

export default handler;
