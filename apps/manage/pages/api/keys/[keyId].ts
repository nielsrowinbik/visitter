import type { NextApiRequest, NextApiResponse } from "next/types";

import { getErrorMessage } from "@lib/errors";
import nc from "next-connect";
import prisma from "@db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.delete(async (req, res) => {
  try {
    const keyId = req.query.keyId as string;

    // Fetch the key to find out which home it belongs to:
    const key = await prisma.shareKey.findUnique({
      where: { id: keyId },
    });
    const homeId = key?.homeId;

    // Delete the key:
    await prisma.shareKey.delete({ where: { id: keyId } });

    // Invalidate the cache on the home's settings page:
    res.revalidate(`/${homeId}/settings/visibility`);

    return res.status(204).end();
  } catch (error) {
    console.error("[api] keys", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
});

export default handler;
