import type { Home, ShareKey } from "@prisma/client";

import type { User } from "next-auth";
import { db } from "@/lib/db";

export async function findHomesByUserId(userId: User["id"]) {
  return await db.home.findMany({ where: { ownerId: userId } });
}

export async function findHomesCountByUserId(userId: User["id"]) {
  return await db.home.count({ where: { ownerId: userId } });
}

export async function findHomeById(homeId: Home["id"]) {
  return await db.home.findUnique({ where: { id: homeId } });
}

export async function findHomeByShareKey(key: ShareKey["id"]) {
  const shareKey = await db.shareKey.findUnique({ where: { id: key } });

  return await db.home.findUnique({ where: { id: shareKey.homeId } });
}
