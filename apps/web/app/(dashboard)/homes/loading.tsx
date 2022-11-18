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
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <HomeItem.Skeleton />
          <HomeItem.Skeleton />
          <HomeItem.Skeleton />
        </div>
      </div>
    </DashboardShell>
  );
}
