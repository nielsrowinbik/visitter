import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomesList } from "@/components/HomesList";
import { Metadata } from "next";
import { findHomesByUserId } from "@/lib/homes";
import { findSubscriptionByUserId } from "@/lib/subscription";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Homes",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const subscriptionPlan = await findSubscriptionByUserId(user!.id);
  const homes = await findHomesByUserId(user!.id);

  return (
    <DashboardShell>
      <DashboardHeader title="Homes">
        <HomeCreateButton
          homeCount={homes.length}
          isPaying={subscriptionPlan.isPremium}
        />
      </DashboardHeader>
      <div>
        <HomesList fallbackData={[homes, subscriptionPlan]} data-superjson />
      </div>
    </DashboardShell>
  );
}
