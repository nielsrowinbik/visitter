import type { Booking } from "@prisma/client";
import { BookingDeleteButton } from "@/components/BookingDeleteButton";
import { BookingEditButton } from "./BookingEditButton";
import { Skeleton } from "@/components/Skeleton";
import { formatNullableInterval } from "@/lib/utils";

interface BookingItemProps {
  booking: Booking;
}

export function BookingItem({ booking }: BookingItemProps) {
  console.log("BookingItem", typeof booking.startDate);

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
      <div className="flex space-x-2">
        <BookingEditButton booking={booking} data-superjson />
        <BookingDeleteButton bookingId={booking.id} />
      </div>
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
