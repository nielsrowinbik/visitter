import type { NextApiRequest, NextApiResponse } from "next/types";

import { getErrorMessage } from "@lib/errors";
import nc from "next-connect";
import prisma from "@db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.delete(async (req, res) => {
  try {
    const bookingId = req.query.bookingId as string;

    // Fetch the booking to find out which home it belongs to:
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    const homeId = booking?.homeId;

    // Delete the booking:
    await prisma.booking.delete({ where: { id: bookingId } });

    // Invalidate the cache on the home's detail page:
    res.revalidate(`/${homeId}`);

    return res.status(204).end();
  } catch (error) {
    console.error("[api] bookings", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
});

export default handler;
