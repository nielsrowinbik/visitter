import type { Booking } from "@prisma/client";
import { BookingDeleteButton } from "@/components/BookingDeleteButton";
import { Skeleton } from "@/components/Skeleton";
import { formatNullableInterval } from "@/lib/utils";

interface BookingItemProps {
  booking: Pick<Booking, "id" | "name" | "startDate" | "endDate">;
}

export function BookingItem({ booking }: BookingItemProps) {
  return (
    <li className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <p className="font-semibold">{booking.name}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {formatNullableInterval({
            start: booking.startDate,
            end: booking.endDate,
          })}
        </p>
      </div>
      <BookingDeleteButton bookingId={booking.id} />
    </li>
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
