import type { Booking, Home, ShareKey } from "database";
import { isAfter, isBefore, isSameDay } from "date-fns";

import { db } from "database";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    key: ShareKey["id"];
  };
}

async function findHomeByShareKey(key: ShareKey["id"]) {
  const shareKey = await db.shareKey.findUnique({ where: { id: key } });

  if (!shareKey) return notFound();

  const home = await db.home.findUnique({
    where: {
      id: shareKey.homeId,
    },
  });

  return home;
}

async function findBookingsByHomeId(homeId: Home["id"]) {
  const bookings = await db.booking.findMany({
    where: {
      homeId,
    },
  });

  return bookings;
}

interface Period {
  startDate: Date;
  endDate: Date;
}

async function findUnavailabilityByHomeId(homeId: Home["id"]) {
  const bookings = await db.booking.findMany({
    where: { homeId },
    orderBy: { startDate: "asc" },
  });

  return bookings.reduce<[Period[], Date]>(
    ([res, endDate], booking) => {
      if (isAfter(booking.startDate, endDate)) {
        // Booking starts after the last endDate
        return [
          [
            // Keep all previous periods:
            ...res,
            // Insert a new period, equalling the current booking:
            {
              startDate: booking.startDate,
              endDate: booking.endDate,
            },
          ],
          // Update the "global" endDate to equal the current booking's:
          booking.endDate,
        ];
      }

      if (
        isBefore(booking.startDate, endDate) ||
        isSameDay(booking.startDate, endDate)
      ) {
        // Booking starts during our current period or exactly at the end

        if (isAfter(booking.endDate, endDate)) {
          // Booking lasts longer than our current endDate
          return [
            [
              // Keep all previous periods but the last one:
              ...res.slice(0, -1),
              // Update the last one's endDate to equal the current booking's:
              {
                startDate: res[res.length - 1].startDate,
                endDate: booking.endDate,
              },
            ],
            // Update the "global" endDate to equal the current booking's:
            booking.endDate,
          ];
        }
      }
    },
    [[], new Date("1970-01-01")]
  )[0];
}

export default async function HomeAvailabilityPage({
  params: { key },
}: PageProps) {
  const home = await findHomeByShareKey(key);

  if (!home) return notFound();

  const unavailability = await findUnavailabilityByHomeId(home.id);

  return (
    <div className="prose prose-zinc dark:prose-invert">
      <h1>{home.name}</h1>
      <p>{home.name} is unavailable during these periods:</p>
      <ul>
        {unavailability.map((period) => (
          <li key={period.startDate.toDateString()}>
            {formatDate(period.startDate.toDateString())} -{" "}
            {formatDate(period.endDate.toDateString())}
          </li>
        ))}
      </ul>
    </div>
  );
}
