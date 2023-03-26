import type { Booking, Home } from "@prisma/client";

import { bookingCreateSchema } from "@/lib/validations/booking";
import { db } from "@/lib/db";
import { z } from "zod";

export async function createBooking(
  booking: z.infer<typeof bookingCreateSchema>,
  homeId: Home["id"]
) {
  return await db.booking.create({
    data: { ...booking, home: { connect: { id: homeId } } },
  });
}

export async function deleteBooking(id: Booking["id"]) {
  return await db.booking.delete({ where: { id } });
}

export async function findBookingById(id: Booking["id"]) {
  return await db.booking.findUnique({ where: { id } });
}

export async function findBookingsByHomeId(homeId: Home["id"], from?: Date) {
  return await db.booking.findMany({
    where: { homeId, endDate: { gte: from } },
  });
}

export async function updateBooking(
  id: Booking["id"],
  data: z.infer<typeof bookingCreateSchema>
) {
  return await db.booking.update({ where: { id }, data });
}
