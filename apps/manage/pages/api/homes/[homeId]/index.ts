import type { NextApiHandler } from "next/types";
import { getErrorMessage } from "@lib/errors";
import { getSession } from "@lib/auth/session";
import nc from "next-connect";
import prisma from "@db";

const deleteHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const homeId = req.query.homeId as string;

    // Delete the home:
    await prisma.home.delete({
      where: {
        id: homeId,
      },
    });

    // Invalidate the cache on the home's detail page:
    res.revalidate(`/${homeId}`);

    return res.status(204).end();
  } catch (error) {
    console.error("[api] home", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const home = await prisma.home.findFirst({
      where: {
        id: { equals: req.query.homeId as string },
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

export default nc().delete(deleteHandler).get(getHandler);
