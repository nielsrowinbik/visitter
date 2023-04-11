import type { User } from "@prisma/client";
import { db } from "~/utils/prisma.server";
import type { userPatchSchema } from "~/validations/user";
import type { z } from "zod";

export async function deleteUser(id: User["id"]) {
  return await db.user.delete({ where: { id } });
}

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function findUserById(id: User["id"]) {
  return await db.user.findUnique({ where: { id } });
}

export async function updateUser(
  id: User["id"],
  data: z.infer<typeof userPatchSchema>
) {
  return await db.user.update({ where: { id }, data });
}
