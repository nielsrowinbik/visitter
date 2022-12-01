import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomesList } from "@/components/HomesList";
import { Suspense } from "react";
import type { User } from "@prisma/client";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";

async function findHomesCountByUserId(userId: User["id"]) {
  const count = await db.home.count({
    where: { ownerId: userId },
  });
  return count;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const subscriptionPlan = await getUserSubscriptionPlan(user.id);
  const homeCount = await findHomesCountByUserId(user.id);

  return (
    <DashboardShell>
      <DashboardHeader title="Homes">
        <HomeCreateButton
          homeCount={homeCount}
          isPaying={subscriptionPlan.isPremium}
        />
      </DashboardHeader>
      <div>
        <Suspense fallback={<HomesList.Skeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <HomesList />
        </Suspense>
      </div>
    </DashboardShell>
  );
}
