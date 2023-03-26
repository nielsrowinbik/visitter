import { BookingCreateButton } from "@/components/BookingCreateButton";
import { BookingsList } from "@/components/BookingsList";
import { Button } from "@/components/Button";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeShareWidget } from "@/components/HomeShareWidget";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { findBookingsByHomeId } from "@/lib/bookings";
import { findHomeById } from "@/lib/homes";
import { findKeysByHomeId } from "@/lib/keys";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    homeId: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const home = await findHomeById(params.homeId);

  if (!home) {
    return;
  }

  return {
    title: home.name,
    alternates: {
      canonical: `https://nielsbik.nl/home/${home.id}`,
    },
  };
}

export const dynamic = "force-static";
export const revalidate = 60;

export default async function HomeDetailPage({ params }: PageProps) {
  const home = await findHomeById(params.homeId);

  if (!home) return notFound();

  const bookings = await findBookingsByHomeId(home.id);
  const keys = await findKeysByHomeId(home.id);

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
          <BookingsList
            fallbackData={bookings}
            homeId={home.id}
            data-superjson
          />
        </div>
        <div className="lg:max-w-[35%]">
          <HomeShareWidget fallbackData={keys} homeId={home.id} />
        </div>
      </div>
    </DashboardShell>
  );
}
