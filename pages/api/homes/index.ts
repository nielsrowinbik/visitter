import { NextApiRequest, NextApiResponse } from "next";
import {
  createHome,
  findHomesByUserId,
  findHomesCountByUserId,
} from "@/lib/homes";

import { authentication } from "@/lib/api-middlewares/authentication";
import { findSubscriptionByUserId } from "@/lib/subscription";
import { getCurrentUser } from "@/lib/session";
import { homeCreateSchema } from "@/lib/validations/home";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.get(async (req, res) => {
  const user = await getCurrentUser(req, res);

  const homes = await findHomesByUserId(user!.id);

  return res.json(homes);
});

handler.post(async (req, res) => {
  const user = await getCurrentUser(req, res);
  const { isPremium } = await findSubscriptionByUserId(user!.id);

  if (!isPremium) {
    // User has no subscription. Check if user has already created a home.
    // Deny the request if he has.
    const count = await findHomesCountByUserId(user!.id);

    if (count >= 1) {
      return res.status(402).end();
    }
  }

  const body = homeCreateSchema.parse(req.body);

  const home = createHome(user!.id, body);

  return res.status(201).json(home);
});

export default handler;
