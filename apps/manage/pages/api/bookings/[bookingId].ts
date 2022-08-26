import type { NextApiRequest, NextApiResponse } from "next/types";

import { getErrorMessage } from "@lib/errors";
import nc from "next-connect";
import prisma from "@db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.delete(async (req, res) => {
  try {
    await prisma.booking.delete({
      where: {
        id: req.query.bookingId as string,
      },
    });

    return res.status(204).end();
  } catch (error) {
    console.error("[api] bookings", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
});

export default handler;
