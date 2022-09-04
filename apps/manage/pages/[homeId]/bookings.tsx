import type { Booking, Home } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next/types";

import { BookingAddButton } from "@components/BookingAddButton";
import { HomeBookingsSection } from "@components/HomeBookingsSection";
import { HomeLayout } from "@components/Layouts/HomeLayout";
import { SWRConfig } from "swr";
import prisma from "@db";

type PageProps = {
  fallback: {
    "/api/homes/[homeId]": Home;
    "/api/homes/[homeId]/bookings": Booking[];
  };
  homeId: string;
};

const Page = ({ fallback, homeId }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <header className="flex flex-row justify-between">
      <div>
        <h1>Bookings</h1>
        <p>All upcoming and past bookings for your vacation home</p>
      </div>
      <div>
        <BookingAddButton homeId={homeId} />
      </div>
    </header>
    <HomeBookingsSection homeId={homeId} />
  </SWRConfig>
);

Page.getLayout = (page: any, { homeId }: PageProps) => (
  <HomeLayout id={homeId}>{page}</HomeLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: "blocking", paths: [] };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const homeId = context.params?.homeId as string;
  const home = await prisma.home.findUnique({
    where: { id: homeId },
  });

  if (!home) {
    return { notFound: true };
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { startDate: "asc" },
    where: { homeId },
  });

  return {
    props: {
      fallback: {
        [`/api/homes/${homeId}`]: JSON.parse(JSON.stringify(home)),
        [`/api/homes/${homeId}/bookings`]: JSON.parse(JSON.stringify(bookings)),
      },
      homeId,
    },
    revalidate: false, // This page's cache is invalidated upon certain API calls
  };
};

export default Page;
