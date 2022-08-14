import { Title } from "@mantine/core";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";

import {
  type Booking,
  findCurrentAndFutureBookingsByHomeId,
} from "../../lib/bookings";
import { rangeToDates } from "../../lib/helpers";
import { findHomeById } from "../../lib/homes";

const PublicAvailabilityPage = ({
  home,
  unavailability,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <Title>{home.name}</Title>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const homeId = ctx.params?.homeId as string;

  // Attempt to fetch the home from the database:
  const home = await findHomeById(homeId);

  // If the requested home does not exist OR if the home is set
  // not to be shared, return a 404:
  if (!home || home.shared === false)
    return {
      notFound: true,
    };

  // Fetch all bookings for the home:
  // const bookings = await findCurrentAndFutureBookingsByHomeId(homeId);
  // const unavailability = bookings.reduce((res: Date[], booking: Booking) => {
  //   return [...res, ...rangeToDates(booking.startDate, booking.endDate)];
  // }, []);

  return {
    props: {
      home,
      // unavailability,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: "blocking",
  paths: [],
});

export default PublicAvailabilityPage;
