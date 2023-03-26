import { NextApiRequest, NextApiResponse } from "next";
import { deleteBooking, findBookingById, updateBooking } from "@/lib/bookings";

import { authentication } from "@/lib/api-middlewares/authentication";
import { bookingCreateSchema } from "@/lib/validations/booking";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";
import { stringify } from "superjson";

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

  return res.send(stringify(booking));
});

handler.patch(async (req, res) => {
  const bookingId = req.query.bookingId as string;

  const body = bookingCreateSchema.parse(req.body);

  await updateBooking(bookingId, body);

  return res.status(204).end();
});

export default handler;
