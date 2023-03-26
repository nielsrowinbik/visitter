"use client";

import type { Booking, Home } from "@prisma/client";

import { BookingCreateButton } from "@/components/BookingCreateButton";
import { BookingItem } from "@/components/BookingItem";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

type BookingsListProps = {
  fallbackData: Booking[];
  homeId: Home["id"];
};

export function BookingsList({ fallbackData, homeId }: BookingsListProps) {
  const { data: bookings } = useSWR<Booking[]>(
    `/api/homes/${homeId}/bookings`,
    fetcher,
    { fallbackData }
  );

  return bookings?.length ? (
    <ul className="divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20 ">
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </ul>
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
