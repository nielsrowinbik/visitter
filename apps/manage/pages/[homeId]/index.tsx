import type { Booking, Home, ShareKey } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next/types";

import { BookingsList } from "@components/BookingsList";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import { HomeDeleteButton } from "@components/HomeDeleteButton";
import { HomeTitle } from "@components/HomeTitle";
import { SWRConfig } from "swr";
import { ShareKeyList } from "@components/ShareKeyList";
import prisma from "@db";

type PageProps = {
  fallback: {
    "/api/homes/[homeId]": Home;
    "/api/homes/[homeId]/bookings": Booking[];
    "/api/homes/[homeId]/keys": ShareKey[];
  };
  homeId: string;
};

const Page = ({ fallback, homeId }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <HomeTitle homeId={homeId} />
    <BookingsList homeId={homeId} />
    <ShareKeyList homeId={homeId} />
    <hr />
    <HomeDeleteButton id={homeId} />
  </SWRConfig>
);

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

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

  const bookings = await prisma.booking.findMany({ where: { homeId } });
  const keys = await prisma.shareKey.findMany({ where: { homeId } });

  return {
    props: {
      fallback: {
        [`/api/homes/${homeId}`]: JSON.parse(JSON.stringify(home)),
        [`/api/homes/${homeId}/bookings`]: JSON.parse(JSON.stringify(bookings)),
        [`/api/homes/${homeId}/keys`]: JSON.parse(JSON.stringify(keys)),
      },
      homeId,
    },
    revalidate: false, // This page's cache is invalidated upon certain API calls
  };
};

export default Page;
