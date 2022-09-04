import { Booking } from "@prisma/client";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

type Props = {
  homeId: string;
};

export const HomeAvailability = ({ homeId }: Props) => {
  const { data: bookings } = useSWR<Booking[]>(
    () => `/api/homes/${homeId}/bookings`,
    fetcher
  );
  // TODO: Convert bookings to periods of unavailability
  // TODO: Show in nice calendar view

  return <pre>{JSON.stringify(bookings, undefined, 2)}</pre>;
};
