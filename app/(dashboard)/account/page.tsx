import { BillingForm } from "@/components/BillingForm";
import { DashboardShell } from "@/components/DashboardShell";
import { UserDeleteForm } from "@/components/UserDeleteForm";
import { UserSetttingsForm } from "@/components/UserSettingsForm";
import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <DashboardShell>
      <BillingForm subscriptionPlan={subscriptionPlan} />
      <UserSetttingsForm user={user} />
      <hr />
      <UserDeleteForm user={user} />
    </DashboardShell>
  );
}
