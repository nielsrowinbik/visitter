import { Booking } from "@prisma/client";
import { BookingDeleteButton } from "./BookingDeleteButton";
import { Button } from "@mantine/core";
import { FormattedDate } from "./FormattedDate";
import Link from "next/link";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

type Props = {
  homeId: string;
};

export const BookingsList = ({ homeId }: Props) => {
  const { data: bookings } = useSWR<Booking[]>(
    () => `/api/homes/${homeId}/bookings`,
    fetcher
  );

  // TODO: Add empty state

  if (bookings?.length === 0) {
    return (
      <>
        <h2 className="text-2xl font-bold">Bookings</h2>
        <p>No bookings yet.</p>
        <Link href={`/${homeId}/booking/new`} passHref>
          <Button component="a" variant="light">
            Add a booking
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Bookings</h2>
      <ul className="space-y-3">
        {bookings?.map(({ endDate, id, startDate }) => (
          <li className="block space-x-3 rounded-lg bg-gray-50 p-4" key={id}>
            <strong>
              <FormattedDate format="MMM d, yyyy">{startDate}</FormattedDate>
            </strong>
            <FormattedDate format="MMM d, yyyy">{endDate}</FormattedDate>
            <BookingDeleteButton bookingId={id} homeId={homeId} />
          </li>
        ))}
      </ul>
      <Link href={`/${homeId}/booking/new`} passHref>
        <Button component="a" variant="light">
          Add a booking
        </Button>
      </Link>
    </>
  );
};
