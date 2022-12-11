import { NextApiRequest, NextApiResponse } from "next";
import { deleteBooking, findBookingById } from "@/lib/bookings";

import { authentication } from "@/lib/api-middlewares/authentication";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.delete(async (req, res) => {
  const bookingId = req.query.bookingId as string;

  await deleteBooking(bookingId);

  return res.status(204).end();
});

handler.get(async (req, res) => {
  const bookingId = req.query.bookingId as string;

  const booking = await findBookingById(bookingId);

  return res.json(booking);
});

export default handler;
