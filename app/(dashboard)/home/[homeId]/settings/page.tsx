import { HomeDeleteForm } from "@/components/HomeDeleteForm";
import { HomeSettingsForm } from "@/components/HomeSettingsForm";
import type { Metadata } from "next";
import { findHomeById } from "@/lib/homes";
import { notFound } from "next/navigation";

// TODO: Refactor to be fully static with fallback data and SWR to keep stuff up to date
// TODO: When user changes the settings: update the UI optimistically

interface PageProps {
  params: {
    homeId: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const home = await findHomeById(params.homeId);

  if (!home) {
    return;
  }

  return {
    title: `Settings for ${home.name}`,
    alternates: {
      canonical: `https://nielsbik.nl/home/${home.id}`,
    },
  };
}

export default async function HomeSettingsPage({
  params: { homeId },
}: PageProps) {
  const home = await findHomeById(homeId);

  if (!home) return notFound();

  return (
    <div className="space-y-8">
      <HomeSettingsForm home={home} />
      <hr />
      <HomeDeleteForm home={home} />
    </div>
  );
}
