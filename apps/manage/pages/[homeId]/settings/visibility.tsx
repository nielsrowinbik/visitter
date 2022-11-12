import type { GetStaticPaths, GetStaticProps } from "next/types";
import type { Home, ShareKey } from "@prisma/client";

import { HomeSharingSection } from "@components/HomeSharingSection";
import { SWRConfig } from "swr";
import { SettingsLayout } from "@components/Layouts/SettingsLayout";
import prisma from "@db";

type PageProps = {
  fallback: {
    "/api/homes/[homeId]": Home;
    "/api/homes/[homeId]/keys": ShareKey[];
  };
  homeId: string;
};

const Page = ({ fallback, homeId }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <header>
      <h1>Visibility</h1>
    </header>
    <HomeSharingSection id={homeId} />
  </SWRConfig>
);

Page.getLayout = (page: any, { homeId }: PageProps) => (
  <SettingsLayout homeId={homeId}>{page}</SettingsLayout>
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

  const keys = await prisma.shareKey.findMany({ where: { homeId } });

  return {
    props: {
      fallback: {
        [`/api/homes/${homeId}`]: JSON.parse(JSON.stringify(home)),
        [`/api/homes/${homeId}/keys`]: JSON.parse(JSON.stringify(keys)),
      },
      homeId,
    },
    revalidate: false, // This page's cache is invalidated upon certain API calls
  };
};

export default Page;
