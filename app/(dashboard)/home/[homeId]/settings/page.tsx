import type { Home } from "@prisma/client";
import { HomeDeleteForm } from "@/components/HomeDeleteForm";
import { HomeSettingsForm } from "@/components/HomeSettingsForm";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    homeId: string;
  };
}

async function getHome(homeId: Home["id"]) {
  const home = await db.home.findUnique({
    where: { id: homeId },
    select: {
      id: true,
      name: true,
    },
  });

  if (!home) return notFound();

  return home;
}

export default async function HomeSettingsPage({
  params: { homeId },
}: PageProps) {
  const home = await getHome(homeId);

  return (
    <div className="space-y-8">
      <HomeSettingsForm home={home} />
      <hr />
      <HomeDeleteForm home={home} />
    </div>
  );
}
