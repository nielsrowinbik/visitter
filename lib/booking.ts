import type { Home } from "@prisma/client";
import { db } from "@/lib/db";

export async function findBookingsByHomeId(homeId: Home["id"]) {
  return await db.booking.findMany({ where: { homeId } });
}
