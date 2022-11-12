import type { NextApiRequest, NextApiResponse } from "next/types";

import { getErrorMessage } from "@lib/errors";
import nc from "next-connect";
import prisma from "@db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.delete(async (req, res) => {
  try {
    const bookingId = req.query.bookingId as string;

    // Delete the booking:
    await prisma.booking.delete({ where: { id: bookingId } });

    // Fetch the booking to find out which home it belongs to:
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    const homeId = booking?.homeId;

    // Fetch the share keys belonging to the home:
    const keys = await prisma.shareKey.findMany({ where: { homeId } });

    // Invalidate the cache on the home's detail and availability page:
    keys.forEach(({ id }) => {
      res.revalidate(`/share/${id}`);
    });
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
