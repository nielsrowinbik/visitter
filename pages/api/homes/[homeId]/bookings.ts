import { NextApiRequest, NextApiResponse } from "next";
import { createBooking, findBookingsByHomeId } from "@/lib/bookings";

import { authentication } from "@/lib/api-middlewares/authentication";
import { bookingCreateSchema } from "@/lib/validations/booking";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { stringify } from "superjson";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.get(async (req, res) => {
  const homeId = req.query.homeId as string;

  const bookings = await findBookingsByHomeId(homeId);

  return res.send(stringify(bookings));
});

handler.post(async (req, res) => {
  const homeId = req.query.homeId as string;

  const body = bookingCreateSchema.parse(req.body);

  const booking = await createBooking(body, homeId);

  return res.status(201).send(stringify(booking));
});

export default handler;
