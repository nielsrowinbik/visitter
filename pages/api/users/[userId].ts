import { NextApiRequest, NextApiResponse } from "next";
import { deleteUser, findUserById, updateUser } from "@/lib/users";

import { authentication } from "@/lib/api-middlewares/authentication";
import { getCurrentUser } from "@/lib/session";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { stripe } from "@/lib/stripe";
import { userPatchSchema } from "@/lib/validations/user";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.delete(async (req, res) => {
  const userId = req.query.userId as string;
  const user = await getCurrentUser(req, res);

  // Deny the request if this is not the current user changes his own information:
  if (user!.id !== userId) {
    return res.status(403).end();
  }

  await deleteUser(userId);

  res.status(204).end();
});

handler.get(async (req, res) => {
  const userId = req.query.userId as string;

  const user = await findUserById(userId);

  return res.json(user);
});

handler.patch(async (req, res) => {
  const userId = req.query.userId as string;
  const user = await getCurrentUser(req, res);

  // Deny the request if this is not the current user changes his own information:
  if (user?.id !== userId) {
    return res.status(403).end();
  }

  const body = userPatchSchema.parse(req.body);

  // Update the local user:
  const dbUser = await updateUser(userId, body);

  // Also update the Stripe customer:
  if (dbUser.stripeCustomerId && dbUser.name) {
    await stripe.customers.update(dbUser.stripeCustomerId, {
      name: dbUser.name,
    });
  }

  return res.status(204).end();
});

export default handler;
