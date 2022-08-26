import type { NextApiHandler } from "next/types";
import { getSession } from "@lib/auth/session";
import nc from "next-connect";

// This is a temporary file to showcase how to do protected API routes.
// TODO: Remove this page once all existing API routes have been moved to this pattern.

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};

export default nc().get(handler);
