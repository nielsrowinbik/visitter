import { BillingForm } from "@/components/BillingForm";
import { DashboardShell } from "@/components/DashboardShell";
import { UserDeleteForm } from "@/components/UserDeleteForm";
import { UserSetttingsForm } from "@/components/UserSettingsForm";
import { findSubscriptionByUserId } from "@/lib/subscription";
import { getCurrentUser } from "@/lib/session";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const subscriptionPlan = await findSubscriptionByUserId(user.id);

  return (
    <DashboardShell>
      <BillingForm subscriptionPlan={subscriptionPlan} />
      <UserSetttingsForm user={user} />
      <hr />
      <UserDeleteForm user={user} />
    </DashboardShell>
  );
}
