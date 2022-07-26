import { NextApiRequest, NextApiResponse } from "next";
import { createBooking, findBookingsByHomeId } from "@/lib/bookings";

import { ZodError } from "zod";
import { authentication } from "@/lib/api-middlewares/authentication";
import { bookingCreateSchema } from "@/lib/validations/booking";
import nc from "next-connect";
import { onError } from "@/lib/api-middlewares/on-error";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.use(authentication());

handler.get(async (req, res) => {
  const homeId = req.query.homeId as string;

  const bookings = await findBookingsByHomeId(homeId);

  return res.json(bookings);
});

handler.post(async (req, res) => {
  const homeId = req.query.homeId as string;

  const body = bookingCreateSchema.parse(req.body);

  // FIXME: Manual validation to make sure the startDate is before the endDate (should be handled by Zod)
  if (body.startDate > body.endDate) {
    throw new ZodError([
      {
        code: "invalid_date",
        message: "Start date should be before or on end date.",
        path: ["startDate"],
      },
    ]);
  }

  const booking = await createBooking(body, homeId);

  return res.status(201).json(booking);
});

export default handler;
