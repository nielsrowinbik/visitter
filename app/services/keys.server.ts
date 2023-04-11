import type { Home, ShareKey } from "@prisma/client";

import { db } from "~/utils/prisma.server";

export async function createKey(homeId: Home["id"]) {
  return await db.shareKey.create({
    data: { home: { connect: { id: homeId } } },
  });
}

export async function deleteKey(id: ShareKey["id"]) {
  return await db.shareKey.delete({ where: { id } });
}

export async function findKeyById(id: ShareKey["id"]) {
  return await db.shareKey.findUnique({ where: { id } });
}

export async function findKeyByHomeId(homeId: Home["id"]) {
  return await db.shareKey.findFirst({ where: { homeId } });
}
