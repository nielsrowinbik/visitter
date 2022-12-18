import * as z from "zod";

import type { Home, ShareKey } from "@prisma/client";
import { homeCreateSchema, homePatchSchema } from "@/lib/validations/home";

import type { User } from "next-auth";
import { db } from "@/lib/db";

export async function createHome(
  userId: User["id"],
  home: z.infer<typeof homeCreateSchema>
) {
  return await db.home.create({
    data: { ...home, owner: { connect: { id: userId } } },
  });
}

export async function deleteHome(id: Home["id"]) {
  return await db.home.delete({ where: { id } });
}

export async function findHomesByUserId(userId: User["id"]) {
  return await db.home.findMany({ where: { ownerId: userId } });
}

export async function findHomesCountByUserId(userId: User["id"]) {
  return await db.home.count({ where: { ownerId: userId } });
}

export async function findHomeById(id: Home["id"]) {
  return await db.home.findUnique({ where: { id } });
}

export async function findHomeByShareKey(key: ShareKey["id"]) {
  const shareKey = await db.shareKey.findUnique({
    where: { id: key },
  });

  if (!shareKey) return null;

  return await findHomeById(shareKey.homeId);
}

export async function updateHome(
  id: Home["id"],
  data: z.infer<typeof homePatchSchema>
) {
  return await db.home.update({ where: { id }, data });
}
