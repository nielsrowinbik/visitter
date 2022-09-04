import type { Booking, Home, ShareKey } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next/types";

import { BookingAddButton } from "@components/BookingAddButton";
import { Button } from "ui";
import { HomeLayout } from "@components/Layouts/HomeLayout";
import { HomeTitle } from "@components/HomeTitle";
import { SWRConfig } from "swr";
import prisma from "@db";

type PageProps = {
  fallback: {
    "/api/homes/[homeId]": Home;
  };
  homeId: string;
};

const Page = ({ fallback, homeId }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <div className="flex flex-row justify-between">
      <div>
        <HomeTitle homeId={homeId} />
      </div>
      <div>
        <BookingAddButton homeId={homeId} />
      </div>
    </div>
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

  return {
    props: {
      fallback: {
        [`/api/homes/${homeId}`]: JSON.parse(JSON.stringify(home)),
      },
      homeId,
    },
    revalidate: false, // This page's cache is invalidated upon certain API calls
  };
};

export default Page;
