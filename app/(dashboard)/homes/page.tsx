import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomesList } from "@/components/HomesList";
import { Suspense } from "react";
import { findHomesCountByUserId } from "@/lib/home";
import { findSubscriptionByUserId } from "@/lib/subscription";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const subscriptionPlan = await findSubscriptionByUserId(user.id);
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
          <HomesList />
        </Suspense>
      </div>
    </DashboardShell>
  );
}
