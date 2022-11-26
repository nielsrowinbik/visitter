import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

export default async function SubscriptionOverviewPage() {
  const user = await getCurrentUser();

  if (!user.hasSubscription)
    return (
      <Card variant="info">
        <Card.Content>
          <h3>You are currently on the free plan</h3>
          <p className="mb-0">
            Upgrading to Premium will allow you to manage an unlimited amount of
            vacation homes.
          </p>
        </Card.Content>
        <Card.Action>
          <Link href="/account/subscription/upgrade">
            <Button>Upgrade</Button>
          </Link>
        </Card.Action>
      </Card>
    );

  return (
    <Card variant="info">
      <Card.Content>
        <h3>You&apos;re on the Premium plan</h3>
      </Card.Content>
    </Card>
  );
}
