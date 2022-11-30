import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { db } from "database";
import { getSession } from "@/lib/session";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { stripe } from "@/lib/stripe";
import { userPatchSchema } from "@/lib/validations/user";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.delete(async (req, res) => {
  const session = await getSession(req, res);

  // Deny the request if this is not the current user changes his own information:
  if (session.user.id !== req.query.userId) {
    return res.status(403).end();
  }

  await db.user.delete({
    where: { id: req.query.userId as string },
  });

  res.status(204).end();
});

handler.patch(async (req, res) => {
  const session = await getSession(req, res);

  // Deny the request if this is not the current user changes his own information:
  if (session.user.id !== req.query.userId) {
    return res.status(403).end();
  }

  const body = userPatchSchema.parse(req.body);

  // Update the local user:
  const user = await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: body.name || session.user.name,
      phone: body.phone || session.user.phone,
    },
  });

  // Also update the Stripe customer:
  await stripe.customers.update(user.stripeCustomerId, {
    name: body.name || session.user.name,
  });

  return res.status(204).end();
});

export default handler;
