import type { Home, ShareKey } from "@prisma/client";

import { db } from "@/lib/db";

export async function createKey(homeId: Home["id"]) {
  return await db.shareKey.create({
    data: { home: { connect: { id: homeId } } },
  });
}

export async function deleteKey(id: ShareKey["id"]) {
  return await db.shareKey.delete({ where: { id } });
}

export async function findKeysByHomeId(homeId: Home["id"]) {
  return await db.shareKey.findMany({ where: { homeId } });
}
