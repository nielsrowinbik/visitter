import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { Icon } from "@/components/Icon";
import Link from "next/link";
import type { ReactNode } from "react";
import { findHomeById } from "@/lib/homes";
import { notFound } from "next/navigation";

interface PageProps {
  children: ReactNode;
  params: {
    homeId: string;
  };
}

export default async function HomeSettingsLayout({
  children,
  params,
}: PageProps) {
  const home = await findHomeById(params.homeId);

  if (!home) return notFound();

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
