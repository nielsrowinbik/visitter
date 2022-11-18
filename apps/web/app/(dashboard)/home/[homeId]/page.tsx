import { Badge } from "@/components/Badge";
import { BookingCreateButton } from "@/components/BookingCreateButton";
import { BookingItem } from "@/components/BookingItem";
import { Button } from "@/components/Button";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import type { Home } from "database";
import { HomeShareWidget } from "@/components/HomeShareWidget";
import Link from "next/link";
import { db } from "database";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    homeId: string;
  };
}

async function getHome(homeId: Home["id"]) {
  const home = await db.home.findUnique({
    where: { id: homeId },
    select: {
      createdAt: true,
      id: true,
      name: true,
    },
  });

  if (!home) return notFound();

  return home;
}

async function getBookingsForHome(homeId: Home["id"]) {
  const bookings = await db.booking.findMany({
    where: { homeId },
    orderBy: { startDate: "asc" },
  });

  return bookings;
}

async function findKeysByHomeId(homeId: Home["id"]) {
  const keys = await db.shareKey.findMany({
    where: { homeId },
  });

  return keys;
}

export default async function HomeDetailPage({ params }: PageProps) {
  const home = await getHome(params.homeId);
  const bookings = await getBookingsForHome(params.homeId);
  const keys = await findKeysByHomeId(params.homeId);

  return (
    <DashboardShell>
      <DashboardHeader title={home.name}>
        <Link href={`/home/${home.id}/settings`}>
          <Button variant="outline">Settings</Button>
        </Link>
        <BookingCreateButton homeId={home.id} />
      </DashboardHeader>
      <div className="mb-10 space-y-6 lg:flex lg:space-y-0">
        <div className="flex-1 lg:mr-10">
          {bookings?.length ? (
            <div className="divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20 ">
              {bookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Title>No bookings yet</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Periods of unavailability, regardless of the reason, are logged
                as bookings.
              </EmptyPlaceholder.Description>
              <BookingCreateButton homeId={home.id} variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
        <div className="max-w-[35%]">
          <HomeShareWidget home={home} keys={keys} />
        </div>
      </div>
    </DashboardShell>
  );
}
