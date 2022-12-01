import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import type { HTMLAttributes } from "react";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomeItem } from "@/components/HomeItem";
import type { User } from "@prisma/client";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";

async function findHomesByUserId(ownerId: User["id"]) {
  const homes = db.home.findMany({ where: { ownerId } });
  return homes;
}

export async function HomesList() {
  const user = await getCurrentUser();
  const subscriptionPlan = await getUserSubscriptionPlan(user.id);
  const homes = await findHomesByUserId(user.id);

  return homes?.length ? (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {homes.map((home) => (
        <HomeItem key={home.id} home={home} />
      ))}
    </div>
  ) : (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No vacation homes</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Once you&apos;ve created a vacation home, you can begin managing its
        (un)availability.
      </EmptyPlaceholder.Description>
      <EmptyPlaceholder.Actions>
        <HomeCreateButton
          homeCount={homes?.length}
          isPaying={subscriptionPlan.isPremium}
          variant="outline"
        />
      </EmptyPlaceholder.Actions>
    </EmptyPlaceholder>
  );
}

HomesList.Skeleton = function HomesListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      <HomeItem.Skeleton />
      <HomeItem.Skeleton />
      <HomeItem.Skeleton />
      <HomeItem.Skeleton />
      <HomeItem.Skeleton />
    </div>
  );
};
