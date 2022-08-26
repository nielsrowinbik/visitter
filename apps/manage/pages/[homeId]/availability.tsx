import type { GetStaticPaths, GetStaticProps } from "next/types";

import type { Booking } from "@lib/bookings";
import type { Home } from "@lib/homes";
import { Title } from "@mantine/core";
import { findCurrentAndFutureBookingsByHomeId } from "@lib/bookings";
import { findHomeById } from "@lib/homes";
import { rangeToDates } from "@lib/helpers";

type PageProps = {
  home: Home;
  unavailability: Date[];
};

const Page = ({ home, unavailability }: PageProps) => {
  return (
    <main>
      <Title>{home.name}</Title>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const homeId = ctx.params?.homeId as string;

  // // Attempt to fetch the home from the database:
  // const home = await findHomeById(homeId);

  // // If the requested home does not exist OR if the home is set
  // // not to be shared, return a 404:
  // if (!home || home.shared === false)
  //   return {
  //     notFound: true,
  //   };

  // // Fetch all bookings for the home:
  // // const bookings = await findCurrentAndFutureBookingsByHomeId(homeId);
  // // const unavailability = bookings.reduce((res: Date[], booking: Booking) => {
  // //   return [...res, ...rangeToDates(booking.startDate, booking.endDate)];
  // // }, []);

  return {
    props: {
      // home,
      // unavailability,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: "blocking",
  paths: [],
});

export default Page;
