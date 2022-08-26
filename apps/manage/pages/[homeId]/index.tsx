import type { Booking, Home } from "@prisma/client";

import { BookingsList } from "@components/BookingsList";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import type { GetServerSideProps } from "next/types";
import { HomeDeleteButton } from "@components/HomeDeleteButton";
import { HomeTitle } from "@components/HomeTitle";
import { SWRConfig } from "swr";
import { getSession } from "@lib/auth/session";
import prisma from "@db";

type PageProps = {
  fallback: {
    ["/api/homes/homeId"]: Home;
    ["/api/homes/homeId/bookings"]: Booking[];
  };
  homeId: string;
};

const Page = ({ fallback, homeId }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <main>
      <HomeTitle homeId={homeId} />
      <BookingsList homeId={homeId} />
      <h2 className="text-2xl font-bold">Danger zone</h2>
      <HomeDeleteButton homeId={homeId} />
    </main>
  </SWRConfig>
);

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/login" } };
  }

  const homeId = context.params?.homeId as string;
  const home = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
  });

  if (home === null) {
    return { notFound: true };
  }

  const bookings = await prisma.booking.findMany({
    where: {
      homeId,
    },
  });

  return {
    props: {
      homeId,
      fallback: {
        [`/api/homes/${homeId}`]: JSON.parse(JSON.stringify(home)),
        [`/api/homes/${homeId}/bookings`]: JSON.parse(JSON.stringify(bookings)),
      },
    },
  };
};

export default Page;
