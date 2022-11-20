import { BookingCreateButton } from "@/components/BookingCreateButton";
import { BookingsList } from "@/components/BookingsList";
import { Button } from "@/components/Button";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import type { Home } from "database";
import { HomeShareWidget } from "@/components/HomeShareWidget";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "database";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    homeId: string;
  };
}

async function findHomeByHomeId(homeId: Home["id"]) {
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

export default async function HomeDetailPage({ params }: PageProps) {
  const home = await findHomeByHomeId(params.homeId);

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
          <Suspense fallback={<BookingsList.Skeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <BookingsList home={home} />
          </Suspense>
        </div>
        <div className="lg:max-w-[35%]">
          <Suspense fallback={<HomeShareWidget.Skeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <HomeShareWidget home={home} />
          </Suspense>
        </div>
      </div>
    </DashboardShell>
  );
}
