import type { Home, ShareKey } from "@prisma/client";

import Calendar from "@/components/Calendar";
import type { Interval } from "date-fns";
import { db } from "@/lib/db";
import { isAfter } from "date-fns";
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

async function findBookingsAsIsoStringsByHomeId(homeId: Home["id"]) {
  const bookings = await db.booking.findMany({ where: { homeId } });

  return bookings.map((booking) => ({
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
  }));
}

export default async function HomeAvailabilityPage({
  params: { key },
}: PageProps) {
  const home = await findHomeByShareKey(key);

  if (!home) return notFound();

  // const unavailability = await findUnavailabilityByHomeId(home.id);
  const bookings = await findBookingsAsIsoStringsByHomeId(home.id);

  return (
    <>
      <div className="prose prose-zinc dark:prose-invert">
        <h1>{home.name}</h1>
        <p>
          If you would like to rent {home.name}, find a suitable period below
          and contact the person who sent you this link.
        </p>
      </div>
      <Calendar monthsToShow={2} bookings={bookings} />
    </>
  );
}
