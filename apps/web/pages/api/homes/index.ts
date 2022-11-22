import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { db } from "database";
import { getSession } from "@/lib/session";
import { homeCreateSchema } from "@/lib/validations/home";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.get(async (req, res) => {
  const session = await getSession(req, res);

  const homes = await db.home.findMany({
    where: {
      ownerId: { equals: session.user.id },
    },
  });

  return res.json(homes);
});

handler.post(async (req, res) => {
  const session = await getSession(req, res);

  const { hasSubscription } = session.user;

  if (!hasSubscription) {
    // User has no subscription. Check if user has already created a home.
    // Deny the request if he has.

    const homeCount = await db.home.count({
      where: { ownerId: session.user.id },
    });

    if (homeCount >= 1) {
      return res.status(402).end();
    }
  }

  const body = homeCreateSchema.parse(req.body);

  const home = await db.home.create({
    data: {
      name: body.name,
      owner: {
        connect: {
          id: session.user.id,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return res.status(201).json(home);
});

export default handler;
