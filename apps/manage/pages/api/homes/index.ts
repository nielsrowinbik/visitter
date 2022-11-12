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
    const homes = await prisma.home.findMany({
      where: {
        ownerId: { equals: session.user?.id },
      },
    });

    return res.status(200).json(homes);
  } catch (error) {
    console.error("[api] homes", error);
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
    const homeCount = await prisma.home.count({
      where: {
        ownerId: { equals: session.user?.id },
      },
    });

    // If the user already has one or more homes, don't create a new one:
    // TODO: Remove this limit for paying customers
    // TODO: Provide proper error message that is shown in client
    if (homeCount >= 1) {
      return res.status(422).end();
    }

    const home = await prisma.home.create({
      data: {
        name: req.body.name,
        owner: {
          connect: {
            id: session.user?.id,
          },
        },
      },
    });

    // Generate the home's detail page:
    res.revalidate(`/${home.id}`);

    return res.status(200).json(home);
  } catch (error) {
    console.error("[api] home", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
});

export default handler;
