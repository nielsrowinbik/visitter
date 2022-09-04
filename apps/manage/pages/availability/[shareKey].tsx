import type { Booking, Home } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next";

import { HomeAvailability } from "@components/HomeAvailability";
import { HomeTitle } from "@components/HomeTitle";
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
    <HomeTitle homeId={homeId} />
    <HomeAvailability homeId={homeId} />
  </SWRConfig>
);

export const getStaticPaths: GetStaticPaths = () => {
  return { fallback: "blocking", paths: [] };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const shareKey = context.params?.shareKey as string;
  const key = await prisma.shareKey.findUnique({ where: { id: shareKey } });

  if (!key) {
    return { notFound: true };
  }

  const { homeId } = key;
  const home = await prisma.home.findUnique({ where: { id: homeId } });
  const bookings = await prisma.booking.findMany({ where: { homeId } });

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
