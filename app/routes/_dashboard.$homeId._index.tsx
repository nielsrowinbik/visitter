import * as Tabs from "@radix-ui/react-tabs";

import type { ActionArgs, LoaderArgs, V2_MetaArgs } from "@remix-run/node";
import type { Booking, Home, ShareKey } from "@prisma/client";
import { createKey, deleteKey, findKeyByHomeId } from "~/services/keys.server";
import { json, parse, useLoaderData } from "~/utils/superjson";

import { BookingRequestsList } from "~/components/BookingRequestsList";
import { BookingsCalendar } from "~/components/BookingsCalendar";
import { BookingsList } from "~/components/BookingsList";
import { Button } from "~/components/Button";
import { Dashboard } from "~/components/Dashboard";
import { Link } from "@remix-run/react";
import { ShareToggle } from "~/components/ShareToggle";
import { findBookingsByHomeId } from "~/services/bookings.server";
import { findHomeById } from "~/services/homes.server";
import { notFound } from "remix-utils";

export function meta({ data }: V2_MetaArgs) {
  const { home } = parse<LoaderData>(data);

  return [{ title: home.name }];
}

export default function HomeDetailPage() {
  const { home, bookings, shareKey, baseUrl } = useLoaderData<LoaderData>();
  const requests: unknown[] = []; // stub

  return (
    <Dashboard>
      <Dashboard.Header title={home.name}>
        <Link to="settings">
          <Button variant="outline">Settings</Button>
        </Link>
        <Link to="bookings/new">
          <Button>New booking</Button>
        </Link>
      </Dashboard.Header>
      <section className="space-y-6 lg:flex lg:space-y-0">
        <div className="flex-1 lg:mr-10">
          <div className="section-text">
            <h3>Booking requests</h3>
            <BookingRequestsList requests={requests} />
          </div>
        </div>
        <div className="lg:max-w-[32%]">
          <ShareToggle baseUrl={baseUrl} shareKey={shareKey} />
        </div>
      </section>
      <section>
        <Tabs.Root className="space-y-3" defaultValue="lst">
          <Tabs.List className="flex items-center space-x-2">
            <div className="section-text max-w-none flex-1">
              <h3>
                Upcoming bookings
                <div className="float-right ml-2 inline-flex rounded-md border border-zinc-400/20 align-middle font-normal shadow-sm">
                  <Tabs.Trigger
                    className="border-l border-zinc-400/20 px-2 py-1.5 text-xs first:rounded-l-md first:border-none last:rounded-r-md radix-state-active:bg-zinc-100 dark:radix-state-active:bg-zinc-800"
                    value="lst"
                  >
                    List
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="border-l border-zinc-400/20 px-2 py-1.5 text-xs first:rounded-l-md first:border-none last:rounded-r-md radix-state-active:bg-zinc-100 dark:radix-state-active:bg-zinc-800"
                    value="cal"
                  >
                    Calendar
                  </Tabs.Trigger>
                </div>
              </h3>
            </div>
          </Tabs.List>
          <Tabs.Content value="lst">
            <BookingsList bookings={bookings} />
          </Tabs.Content>
          <Tabs.Content value="cal">
            <BookingsCalendar bookings={bookings} />
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </Dashboard>
  );
}

export async function action({ params }: ActionArgs) {
  const { homeId } = params;

  const shareKey = await findKeyByHomeId(homeId!);

  if (shareKey) {
    // If the home is shared, unshare it by deleting its key:
    await deleteKey(shareKey.id);
  } else {
    // If the home is not shared, share it by creating a key:
    await createKey(homeId!);
  }

  return null;
}

type LoaderData = {
  home: Home;
  bookings: Booking[];
  shareKey: ShareKey | null;
  baseUrl: string;
};

export async function loader({ request, params: { homeId } }: LoaderArgs) {
  const home = await findHomeById(homeId!);

  if (!home) throw notFound({});

  const shareKey = await findKeyByHomeId(home.id);
  const bookings = await findBookingsByHomeId(home.id);

  return json<LoaderData>({
    home,
    bookings,
    shareKey,
    baseUrl: process.env.PUBLIC_URL as string,
  });
}
