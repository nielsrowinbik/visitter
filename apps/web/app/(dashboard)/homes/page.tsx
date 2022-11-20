import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomesList } from "@/components/HomesList";
import { Suspense } from "react";
import type { User } from "database";
import { db } from "database";
import { getCurrentUser } from "@/lib/session";

async function findHomesCountByUserId(userId: User["id"]) {
  const count = await db.home.count({
    where: { ownerId: userId },
  });
  return count;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const homeCount = await findHomesCountByUserId(user.id);

  return (
    <DashboardShell>
      <DashboardHeader title="Homes">
        <HomeCreateButton
          homeCount={homeCount}
          isPaying={user.isPayingCustomer}
        />
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
