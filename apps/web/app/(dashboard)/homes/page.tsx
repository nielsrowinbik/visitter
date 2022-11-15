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
          <div className="divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20 ">
            {homes.map((home) => (
              <HomeItem key={home.id} home={home} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>No homes created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any homes yet.
            </EmptyPlaceholder.Description>
            <HomeCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}