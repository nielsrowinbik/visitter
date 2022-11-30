import { NextApiRequest, NextApiResponse } from "next";

import { authentication } from "@/lib/api-middlewares/authentication";
import { getSession } from "@/lib/session";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { stripe } from "@/lib/stripe";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.post(async (req, res) => {
  const session = await getSession(req, res);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: session.user.stripeCustomerId,
    line_items: [
      // TODO: This is for montly, but we also want to support yearly. So we should get whichever to use from a parameter
      {
        price: "price_1M6F8SBC5Gy63Ccrffa1JwdB",
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/payment/cancelled",
    subscription_data: {
      metadata: {
        payingUserId: session.user.id,
      },
    },
  });

  if (!checkoutSession.url) {
    return res.status(500).end();
  }

  return res.status(200).json({ redirectUrl: checkoutSession.url });
});

export default handler;
