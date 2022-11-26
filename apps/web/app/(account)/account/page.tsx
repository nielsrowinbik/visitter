import { User, db } from "database";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { Icon } from "@/components/Icon";
import Link from "next/link";
import { UserDeleteForm } from "@/components/UserDeleteForm";
import { UserSetttingsForm } from "@/components/UserSettingsForm";
import { getCurrentUser } from "@/lib/session";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <DashboardShell>
      {/* <DashboardHeader title="Account settings"></DashboardHeader> */}
      {!user.hasSubscription ? (
        <Card variant="info">
          <Card.Content>
            <h3>You are currently on the free plan</h3>
            <p className="mb-0">
              Upgrading to Premium will allow you to manage an unlimited amount
              of vacation homes.
            </p>
          </Card.Content>
          <Card.Action>
            <Link href="/account/billing/upgrade">
              <Button>Upgrade</Button>
            </Link>
          </Card.Action>
        </Card>
      ) : null}
      <UserSetttingsForm user={user} />
      <hr />
      <UserDeleteForm user={user} />
    </DashboardShell>
  );
}
