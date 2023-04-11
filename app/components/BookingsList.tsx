import { Form, Link } from "@remix-run/react";
import { confirmSubmit, formatDateInterval } from "~/utils";

import type { Booking } from "@prisma/client";
import { Button } from "~/components/Button";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { Icon } from "./Icon";

type BookingsListProps = {
  bookings: Booking[];
};

export function BookingsList({ bookings }: BookingsListProps) {
  return bookings?.length ? (
    <ul className="not-prose divide-y divide-zinc-400/20 rounded-md ring-1 ring-zinc-400/20">
      {bookings.map((booking) => (
        <li className="flex items-center justify-between p-4" key={booking.id}>
          <div className="grid gap-1">
            <p className="font-semibold">{booking.name}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {formatDateInterval(booking.startDate, booking.endDate)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link to={`bookings/${booking.id}`}>
              <Button size="compact-square" variant="outline">
                <Icon.Pencil className="h-3 w-3" />
              </Button>
            </Link>
            <Form
              action={`bookings/${booking.id}`}
              onSubmit={confirmSubmit("Are you sure?")}
              method="DELETE"
            >
              <Button size="compact-square" type="submit" variant="danger">
                <Icon.Trash className="h-3 w-3" />
              </Button>
            </Form>
          </div>
        </li>
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
        <Link to="bookings/new">
          <Button variant="outline">Add a booking</Button>
        </Link>
      </EmptyPlaceholder.Actions>
    </EmptyPlaceholder>
  );
}
