import { isAfter, isBefore, parseISO } from "date-fns";

import { Booking } from "@prisma/client";
import { BookingDeleteButton } from "./BookingDeleteButton";
import { Button } from "ui";
import { FormattedDate } from "./FormattedDate";
import Link from "next/link";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

type Props = {
  homeId: string;
};

export const HomeBookingsSection = ({ homeId }: Props) => {
  const { data: bookings } = useSWR<Booking[]>(
    () => `/api/homes/${homeId}/bookings`,
    fetcher
  );

  // TODO: Add empty state

  if (bookings?.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold">Bookings</h2>
        <p>No bookings yet.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              {/* <th scope="col">Status</th> */}
              <th scope="col">Created</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map(({ createdAt, endDate, id, startDate }) => (
              <tr key={id}>
                <td>
                  <FormattedDate format="MMM d, yyyy">
                    {startDate}
                  </FormattedDate>
                </td>
                <td>
                  <FormattedDate format="MMM d, yyyy">{endDate}</FormattedDate>
                </td>
                {/* TODO: Compute whether booking is upcoming, ended, or ongoing */}
                {/* <td>Upcoming/Ended/Ongoing</td> */}
                <td>
                  <FormattedDate format="MMM d, yyyy">
                    {createdAt}
                  </FormattedDate>
                  {/* TODO: Store which user created the booking and display here */}
                  <div>by User</div>
                </td>
                <td>
                  <BookingDeleteButton bookingId={id} homeId={homeId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
