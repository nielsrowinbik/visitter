import type { Booking } from "database";
import { BookingDeleteButton } from "@/components/BookingDeleteButton";
import { Skeleton } from "@/components/Skeleton";
import { formatDate } from "@/lib/utils";

interface BookingItemProps {
  booking: Pick<Booking, "id" | "createdAt" | "startDate" | "endDate">;
}

export function BookingItem({ booking }: BookingItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <p className="font-semibold">
          <time>{formatDate(booking.startDate.toDateString())}</time> -{" "}
          <time>{formatDate(booking.endDate.toDateString())}</time>
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Booking created{" "}
          <time>{formatDate(booking.createdAt.toDateString())}</time>
        </p>
      </div>
      <BookingDeleteButton bookingId={booking.id} />
    </div>
  );
}

BookingItem.Skeleton = function HomeItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/6" />
        <Skeleton className="h-4 w-3/6" />
      </div>
    </div>
  );
};
