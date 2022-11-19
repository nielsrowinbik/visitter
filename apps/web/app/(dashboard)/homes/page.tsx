import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomesList } from "@/components/HomesList";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <DashboardShell>
      <DashboardHeader title="Homes">
        <HomeCreateButton />
      </DashboardHeader>
      <div>
        <Suspense fallback={<HomesList.Skeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <HomesList user={user} />
        </Suspense>
      </div>
    </DashboardShell>
  );
}
