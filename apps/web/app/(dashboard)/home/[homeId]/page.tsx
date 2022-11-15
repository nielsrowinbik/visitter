import { BookingCreateButton } from "@/components/BookingCreateButton";
import { BookingItem } from "@/components/BookingItem";
import { Button } from "@/components/Button";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import type { Home } from "@prisma/client";
import Link from "next/link";
import { db } from "database";
import { formatDate } from "@/lib/utils";
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

export default async function HomeDetailPage({ params }: PageProps) {
  const home = await getHome(params.homeId);
  const bookings = await getBookingsForHome(params.homeId);

  return (
    <DashboardShell>
      <DashboardHeader title={home.name}>
        <Link href={`/home/${home.id}/settings`}>
          <Button variant="outline">Settings</Button>
        </Link>
        <BookingCreateButton homeId={home.id} />
      </DashboardHeader>
      <div>
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
              You haven&apos;t added any bookings to your home yet.
            </EmptyPlaceholder.Description>
            <BookingCreateButton homeId={home.id} variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
