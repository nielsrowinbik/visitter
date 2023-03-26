import { BillingForm } from "@/components/BillingForm";
import { DashboardShell } from "@/components/DashboardShell";
import type { Metadata } from "next";
import { UserDeleteForm } from "@/components/UserDeleteForm";
import { UserSetttingsForm } from "@/components/UserSettingsForm";
import { findSubscriptionByUserId } from "@/lib/subscription";
import { getCurrentUser } from "@/lib/session";

// TODO: Refactor to be fully static with fallback data and SWR to keep stuff up to date
// TODO: When user changes the settings: update the UI optimistically

export const metadata: Metadata = {
  title: "Account Settings",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const subscriptionPlan = await findSubscriptionByUserId(user!.id);

  return (
    <DashboardShell>
      <BillingForm subscriptionPlan={subscriptionPlan} />
      <UserSetttingsForm user={user!} />
      <hr />
      <UserDeleteForm user={user!} />
    </DashboardShell>
  );
}
