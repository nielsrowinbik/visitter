import type { Home } from "database";
import { HomeDeleteForm } from "@/components/HomeDeleteForm";
import { HomeShareForm } from "@/components/HomeShareForm";
import { db } from "database";
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

async function getKeys(homeId: Home["id"]) {
  return await db.shareKey.findMany({
    where: {
      homeId,
    },
  });
}

export default async function HomeSettingsPage({
  params: { homeId },
}: PageProps) {
  const home = await getHome(homeId);
  const keys = await getKeys(homeId);

  return (
    <div className="space-y-8">
      <HomeShareForm homeId={homeId} keys={keys} />
      <hr />
      <HomeDeleteForm home={home} />
    </div>
  );
}
