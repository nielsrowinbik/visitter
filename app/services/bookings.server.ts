import type { Booking, Home } from "@prisma/client";
import type {
  bookingPostSchema,
  bookingPutSchema,
} from "~/validations/booking";
import { isAfter, isBefore, isSameDay } from "date-fns";

import type { Interval } from "date-fns";
import { db } from "~/utils/prisma.server";
import type { z } from "zod";

export async function createBooking(
  booking: z.infer<typeof bookingPostSchema>,
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

export async function findBookingsByHomeId(homeId: Home["id"]) {
  return await db.booking.findMany({
    where: { endDate: { gte: new Date() }, homeId },
  });
}

export async function updateBooking(
  id: Booking["id"],
  data: z.infer<typeof bookingPutSchema>
) {
  return await db.booking.update({ where: { id }, data });
}

// FIXME: This function needs A LOT of type fixing, but it does work
export function flattenBookings(bookings: Booking[]): Interval[] {
  // @ts-ignore
  return bookings.reduce(
    // @ts-ignore
    ([res, end], booking, i) => {
      // @ts-ignore
      if (isAfter(booking.startDate, end)) {
        // Booking starts after the last endDate
        return [
          // @ts-ignore
          [...res, { start: booking.startDate, end: booking.endDate }],
          booking.endDate,
        ];
      }

      if (
        // @ts-ignore
        isBefore(booking.startDate, end) ||
        // @ts-ignore
        isSameDay(booking.startDate, end)
      ) {
        // Booking starts during our current period or exactly at the end

        // @ts-ignore
        if (isAfter(booking.endDate, end)) {
          // Booking lasts longer than our current endDate
          return [
            [
              // @ts-ignore
              ...res.slice(0, -1),
              {
                // @ts-ignore
                start: res.slice(-1)[0].start,
                end: booking.endDate,
              },
            ],
            booking.endDate,
          ];
        }
      }

      return [res, end];
    },
    [[], new Date("1970-01-01")]
  )[0];
}
