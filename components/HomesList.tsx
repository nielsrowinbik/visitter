"use client";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import type { Home } from "@prisma/client";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomeItem } from "@/components/HomeItem";
import type { UserSubscriptionPlan } from "types";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

type HomesListProps = {
  fallbackData: [Home[], UserSubscriptionPlan];
};

export function HomesList({ fallbackData }: HomesListProps) {
  const { data: homes, isLoading } = useSWR<Home[]>("/api/homes", fetcher, {
    fallbackData: fallbackData[0],
  });

  return homes?.length ? (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {homes.map((home) => (
        <HomeItem key={home.id} home={home} />
      ))}
    </ul>
  ) : (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No vacation homes</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Once you&apos;ve created a vacation home, you can begin managing its
        (un)availability.
      </EmptyPlaceholder.Description>
      <EmptyPlaceholder.Actions>
        <HomeCreateButton
          homeCount={homes!.length}
          isPaying={fallbackData[1].isPremium}
          variant="outline"
        />
      </EmptyPlaceholder.Actions>
    </EmptyPlaceholder>
  );
}
