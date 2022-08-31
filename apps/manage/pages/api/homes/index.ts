import type { NextApiHandler } from "next/types";
import { getErrorMessage } from "@lib/errors";
import { getSession } from "@lib/auth/session";
import nc from "next-connect";
import prisma from "@db";

const getHandler: NextApiHandler = async (req, res) => {
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
};

const postHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    // TODO: Validate request body

    const homeCount = await prisma.home.count({
      where: {
        ownerId: { equals: session.user?.id },
      },
    });

    // If the user already has one or more homes, don't create a new one:
    // TODO: Remove this limit for paying customers
    if (homeCount >= 1) {
      return res
        .status(422)
        .send({ message: "Free limit of one vacation home met" });
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

    if (home) return res.status(200).json(home);
    return res.status(404).json({ message: "Not Found" });
  } catch (error) {
    console.error("[api] home", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default nc().get(getHandler).post(postHandler);
