import { BookingItem } from "@/components/BookingItem";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader />
      <div>
        <div className="divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20 ">
          <BookingItem.Skeleton />
          <BookingItem.Skeleton />
          <BookingItem.Skeleton />
          <BookingItem.Skeleton />
        </div>
      </div>
    </DashboardShell>
  );
}
