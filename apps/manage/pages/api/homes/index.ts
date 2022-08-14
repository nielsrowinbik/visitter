import type { NextApiHandler } from "next";
import { verifyIdToken } from "next-firebase-auth";

import { initAuth } from "../../../lib/auth";
import { createHome, findHomesByUserId } from "../../../lib/homes";

initAuth();

const handler: NextApiHandler = async (req, res) => {
  /// TODO: Move the block starting from here until the next comment into some kind of middleware
  // Check token presence:
  const token = req.headers?.authorization;
  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Validate token
  const user = await verifyIdToken(token);

  // If user id is null, the token was invalid:
  if (user.id === null) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  // TODO: Move the code above from here until the previous comment into some kind of middleware

  if (req.method === "GET") {
    const data = await findHomesByUserId(user.id);
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { name } = JSON.parse(req.body); // TODO: Can we use bodyparser or something so we don't have to do this manually?
    // TODO: Validate the home (omit unwanted fields, etc)
    // TODO: Store the home, but only if there is no other home in the user's collection (multiple homes will be a paid feature)
    const newHome = await createHome(name, user.id);

    return res.status(201).json(newHome);
  }

  // TODO: Which status code should we use to indicate that the method isn't supported?
  return res.status(400).end();
};

export default handler;
