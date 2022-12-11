import type { Home, ShareKey } from "@prisma/client";

import { Button } from "@/components/Button";
import Calendar from "@/components/Calendar";
import { Card } from "@/components/Card";
import Link from "next/link";
import { db } from "@/lib/db";
import { findHomeByShareKey } from "@/lib/homes";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    key: ShareKey["id"];
  };
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
  const user = await getCurrentUser();
  const home = await findHomeByShareKey(key);

  if (!home) return notFound();

  // const unavailability = await findUnavailabilityByHomeId(home.id);
  const bookings = await findBookingsAsIsoStringsByHomeId(home.id);

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
        <Calendar monthsToShow={2} bookings={bookings} />
      </div>
    </div>
  );
}
