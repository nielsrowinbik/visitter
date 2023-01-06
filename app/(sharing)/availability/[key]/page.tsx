import type { Booking, ShareKey } from "@prisma/client";

import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Link from "next/link";
import { findBookingsByHomeId } from "@/lib/bookings";
import { findHomeByShareKey } from "@/lib/homes";
import { flattenIntervals } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    key: ShareKey["id"];
  };
}

export default async function HomeAvailabilityPage({
  params: { key },
}: PageProps) {
  const user = await getCurrentUser();
  const home = await findHomeByShareKey(key);

  if (!home) return notFound();

  const bookings = await findBookingsByHomeId(home.id);
  const intervals = bookings.map(toInterval);
  const flattened = flattenIntervals(intervals);

  const isUsersHome = !!user && home.ownerId === user.id;

  return (
    <div className="grid gap-8">
      {isUsersHome && (
        <Card variant="info">
          <Card.Content>
            <h3>Availability sharing is turned on</h3>
            <p>
              You have turned on availability sharing for your vacation home and
              have opened the unique link that was generated as a result. Anyone
              you share this link with will be able to see everything on this
              page, with the exception of this banner.
            </p>
            <p className="mb-0">
              If you no longer wish to share your vacation home&apos;
              availability, simply turn off availability sharing from the
              home&apos;s overview.
            </p>
          </Card.Content>
          <Card.Action>
            <Link href={`/home/${home.id}`}>
              <Button>Change settings</Button>
            </Link>
          </Card.Action>
        </Card>
      )}
      <div>
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
