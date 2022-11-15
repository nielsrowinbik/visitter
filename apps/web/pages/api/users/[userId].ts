import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { db } from "database";
import { getSession } from "@/lib/session";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { userPatchSchema } from "@/lib/validations/user";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.patch(async (req, res) => {
  const session = await getSession(req, res);

  const body = userPatchSchema.parse(JSON.parse(req.body));

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: body.name || session.user.name,
    },
  });

  return res.status(204).end();
});

export default handler;
