import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomeItem } from "@/components/HomeItem";
import type { User } from "database";
import { db } from "database";
import { getCurrentUser } from "@/lib/session";
import { headers } from "next/headers";

async function getHomesForUser(userId: User["id"]) {
  return await db.home.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const homes = await getHomesForUser(user.id);

  return (
    <DashboardShell>
      <DashboardHeader title="Homes">
        <HomeCreateButton />
      </DashboardHeader>
      <div>
        {homes?.length ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {homes.map((home) => (
              <HomeItem key={home.id} home={home} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>No vacation homes</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Once you&apos;ve created a vacation home, you can begin managing
              its (un)availability.
            </EmptyPlaceholder.Description>
            <EmptyPlaceholder.Actions>
              <HomeCreateButton variant="outline" />
            </EmptyPlaceholder.Actions>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
