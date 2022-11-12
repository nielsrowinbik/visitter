import type { NextApiRequest, NextApiResponse } from "next/types";

import { getErrorMessage } from "@lib/errors";
import { getSession } from "@lib/auth/session";
import nc from "next-connect";
import prisma from "@db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        startDate: "asc",
      },
      where: {
        homeId: { equals: req.query.homeId as string },
      },
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("[api] bookings", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
});

handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    // TODO: Validate request body
    const homeId = req.query.homeId as string;

    // Create the booking:
    const booking = await prisma.booking.create({
      data: {
        endDate: new Date(req.body.endDate),
        home: { connect: { id: homeId } },
        startDate: new Date(req.body.startDate),
      },
    });

    // Fetch the share keys belonging to the home:
    const keys = await prisma.shareKey.findMany({ where: { homeId } });

    // Invalidate the cache on the home's details and availability page:
    keys.forEach(({ id }) => {
      res.revalidate(`/share/${id}`);
    });
    res.revalidate(`/${homeId}`);

    return res.status(201).json(booking);
  } catch (error) {
    console.error("[api] home", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
});

export default handler;
