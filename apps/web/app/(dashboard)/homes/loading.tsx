import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { HomeCreateButton } from "@/components/HomeCreateButton";
import { HomeItem } from "@/components/HomeItem";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader title="Homes">
        <HomeCreateButton />
      </DashboardHeader>
      <div>
        <div className="divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20 ">
          <HomeItem.Skeleton />
          <HomeItem.Skeleton />
          <HomeItem.Skeleton />
          <HomeItem.Skeleton />
        </div>
      </div>
    </DashboardShell>
  );
}
