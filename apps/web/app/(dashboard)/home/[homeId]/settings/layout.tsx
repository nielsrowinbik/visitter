import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import type { Home } from "database";
import { Icon } from "@/components/Icon";
import Link from "next/link";
import type { ReactNode } from "react";
import { db } from "database";
import { notFound } from "next/navigation";

interface PageProps {
  children: ReactNode;
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
export default async function HomeSettingsLayout({ children, params }) {
  const home = await getHome(params.homeId);

  return (
    <DashboardShell>
      <DashboardHeader
        title={`Settings for ${home.name}`}
        subtitle={
          <Link
            className="flex items-center text-sm text-zinc-500 hover:underline"
            href={`/home/${home.id}`}
          >
            <Icon.ChevronLeft className="mr-1 h-3 w-3" />
            Back to overview
          </Link>
        }
      ></DashboardHeader>
      {children}
    </DashboardShell>
  );
}
