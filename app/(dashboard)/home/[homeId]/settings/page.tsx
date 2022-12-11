import { HomeDeleteForm } from "@/components/HomeDeleteForm";
import { HomeSettingsForm } from "@/components/HomeSettingsForm";
import { findHomeById } from "@/lib/homes";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    homeId: string;
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
