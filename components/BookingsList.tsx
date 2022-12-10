import { BookingCreateButton } from "@/components/BookingCreateButton";
import { BookingItem } from "@/components/BookingItem";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import type { HTMLAttributes } from "react";
import type { Home } from "@prisma/client";
import { findBookingsByHomeId } from "@/lib/booking";
import { suspend } from "suspend-react";

interface BookingsListProps extends HTMLAttributes<HTMLDivElement> {
  homeId: Home["id"];
}

export function BookingsList({ homeId }: BookingsListProps) {
  const bookings = suspend(async () => {
    return await findBookingsByHomeId(homeId);
  }, ["bookings", homeId]);

  return bookings?.length ? (
    <div className="divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20 ">
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  ) : (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No bookings yet</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Periods of unavailability, regardless of the reason, are logged as
        bookings.
      </EmptyPlaceholder.Description>
      <EmptyPlaceholder.Actions>
        <BookingCreateButton homeId={homeId} variant="outline" />
      </EmptyPlaceholder.Actions>
    </EmptyPlaceholder>
  );
}

BookingsList.Skeleton = function BookingsListSkeleton() {
  return (
    <div className="divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20 ">
      <BookingItem.Skeleton />
      <BookingItem.Skeleton />
      <BookingItem.Skeleton />
      <BookingItem.Skeleton />
    </div>
  );
};
