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
    const homeId = req.query.homeId as string;

    const keys = await prisma.shareKey.findMany({
      where: {
        homeId: { equals: homeId },
      },
    });

    return res.status(200).json(keys);
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
    const homeId = req.query.homeId as string;

    const keyCount = await prisma.shareKey.count({
      where: {
        homeId: { equals: homeId },
      },
    });

    // If the home already has one key, don't create a new one:
    // TODO: Remove this limit
    if (keyCount > 0) {
      return res
        .status(422)
        .send({ message: "Sharing key already present for home" });
    }

    // Create the key:
    const key = await prisma.shareKey.create({
      data: {
        home: { connect: { id: homeId } },
      },
    });

    // Invalidate the cache on the home's settings and availability page:
    res.revalidate(`/share/${key.id}`);
    res.revalidate(`/${homeId}/settings/visibility`);

    return res.status(201).json(key);
  } catch (error) {
    console.error("[api] home", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
});

export default handler;
