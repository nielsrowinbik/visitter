import type {
  LoaderArgs,
  V2_MetaArgs,
  V2_MetaDescriptor,
} from "@remix-run/node";
import {
  findBookingsByHomeId,
  flattenBookings,
} from "~/services/bookings.server";
import { json, useLoaderData } from "~/utils/superjson";

import { AvailabilityCalendar } from "~/components/AvailabilityCalendar";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import type { Home } from "@prisma/client";
import type { Interval } from "date-fns";
import { Link } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import { deserialize } from "superjson";
import { findHomeById } from "~/services/homes.server";
import { findKeyById } from "~/services/keys.server";
import { notFound } from "remix-utils";

export function meta({ data }: V2_MetaArgs): V2_MetaDescriptor[] {
  const { home } = deserialize<LoaderData>(data);
  return [{ title: `Availability for ${home.name}` }];
}

export default function AvailabilityPage() {
  const { home, isUserHome, unavailability } = useLoaderData<LoaderData>();

  return (
    <div className="grid gap-8">
      {isUserHome && (
        <Card variant="info">
          <Card.Content>
            <h2>Availability sharing is turned on</h2>
            <p>
              You have turned on availability sharing for your vacation home and
              have opened the unique link that was generated as a result. Anyone
              you share this link with will be able to see everything on this
              page, with the exception of this banner.
            </p>
            <p>
              If you no longer wish to share your vacation home' availability,
              simply turn off availability sharing from the home's overview.
            </p>
          </Card.Content>
          <Card.Action>
            <Link to={`/${home.id}`}>
              <Button>Change settings</Button>
            </Link>
          </Card.Action>
        </Card>
      )}
      <div className="prose prose-zinc dark:prose-invert">
        <h1>{home.name}</h1>
        <p>
          If you would like to rent {home.name}, find a suitable period below
          and contact the person who sent you this link.
        </p>
      </div>
      <AvailabilityCalendar bookings={unavailability} />
    </div>
  );
}

type LoaderData = {
  home: Home;
  isUserHome: boolean;
  unavailability: Interval[];
};

export async function loader({ request, params: { keyId } }: LoaderArgs) {
  const sessionUser = await auth.isAuthenticated(request);
  const shareKey = await findKeyById(keyId!);

  if (!shareKey) throw notFound({});

  const home = await findHomeById(shareKey.homeId);

  if (!home) throw notFound({});

  const bookings = await findBookingsByHomeId(home.id);
  const flattened = flattenBookings(bookings);

  return json<LoaderData>({
    home,
    isUserHome: sessionUser?.id === home.ownerId,
    unavailability: flattened,
  });
}
