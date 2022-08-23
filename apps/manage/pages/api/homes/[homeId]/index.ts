import { deleteHome, findHomeById, updateHome } from "@lib/homes";

import type { NextApiHandler } from "next/types";

const handler: NextApiHandler = async (req, res) => {
  // // TODO: Move the block starting from here until the next comment into some kind of middleware
  // // Check token presence:
  // const token = req.headers?.authorization;
  // if (!token) {
  //   return res.status(403).json({ error: "Unauthorized" });
  // }
  // // Validate token
  // const user = await verifyIdToken(token);
  // // If user id is null, the token was invalid:
  // if (user.id === null) {
  //   return res.status(403).json({ error: "Unauthorized" });
  // }
  // // TODO: Move the code above from here until the previous comment into some kind of middleware
  // const homeId = req.query.homeId as string;
  // if (req.method === "GET") {
  //   const data = await findHomeById(homeId);
  //   return res.status(200).json(data);
  // }
  // if (req.method === "PATCH") {
  //   const homeData = JSON.parse(req.body);
  //   // TODO: Validate the home
  //   const home = await updateHome(homeId, homeData);
  //   return res.status(200).json(home);
  // }
  // if (req.method === "DELETE") {
  //   await deleteHome(homeId);
  //   return res.status(204).end();
  // }
  // // TODO: Which status code should we use to indicate that the method isn't supported?
  // return res.status(400).end();
};

export default handler;
