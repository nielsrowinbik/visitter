import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomesList } from "@/components/HomesList";
import { Metadata } from "next";
import { Suspense } from "react";
import { findHomesCountByUserId } from "@/lib/homes";
import { findSubscriptionByUserId } from "@/lib/subscription";
import { getCurrentUser } from "@/lib/session";

// TODO: Refactor to remain SSR, but to use a (static?) "loading.tsx" file for the loading state

export const metadata: Metadata = {
  title: "Homes",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const subscriptionPlan = await findSubscriptionByUserId(user!.id);
  const homeCount = await findHomesCountByUserId(user!.id);

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
