import type { Booking, Home } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next/types";

import { Button } from "ui";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import { HomeBookingsSection } from "@components/HomeBookingsSection";
import { HomeSelector } from "@components/HomeSelector";
import Link from "next/link";
import { SWRConfig } from "swr";
import { id } from "date-fns/locale";
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
    <section className="sticky top-0">
      <div className="flex justify-between">
        <HomeSelector />
        <Link href={`/${homeId}/bookings/new`} passHref>
          <Button as="a">New booking</Button>
        </Link>
      </div>
    </section>
    <HomeBookingsSection homeId={homeId} />
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
