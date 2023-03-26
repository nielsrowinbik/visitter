import type { Booking, ShareKey } from "@prisma/client";

import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import type { Metadata } from "next";
import { UserHomeBanner } from "@/components/UserHomeBanner";
import { findBookingsByHomeId } from "@/lib/bookings";
import { findHomeByShareKey } from "@/lib/homes";
import { flattenIntervals } from "@/lib/utils";
import { notFound } from "next/navigation";

// TODO: Refactor to be fully static with fallback data and SWR to keep stuff up to date
// TODO: The banner about the user being signed in and stuff should be done on the client side

type PageProps = {
  params: {
    key: ShareKey["id"];
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const home = await findHomeByShareKey(params.key);

  if (!home) {
    return;
  }

  return {
    title: home.name,
    alternates: {
      canonical: `https://nielsbik.nl/availability/${params.key}`,
    },
  };
}

export const revalidate = 60;

export default async function HomeAvailabilityPage({
  params: { key },
}: PageProps) {
  const home = await findHomeByShareKey(key);

  if (!home) return notFound();

  const bookings = await findBookingsByHomeId(home.id);
  const intervals = bookings.map(toInterval);
  const flattened = flattenIntervals(intervals);

  return (
    <div className="grid gap-8">
      <UserHomeBanner home={home} />
      <div className="space-y-6">
        <div className="prose prose-zinc dark:prose-invert">
          <h1>{home.name}</h1>
          <p>
            If you would like to rent {home.name}, find a suitable period below
            and contact the person who sent you this link.
          </p>
        </div>
        <AvailabilityCalendar bookings={flattened} data-superjson />
      </div>
    </div>
  );
}

function toInterval(booking: Booking): Interval {
  return {
    start: booking.startDate,
    end: booking.endDate,
  };
}
