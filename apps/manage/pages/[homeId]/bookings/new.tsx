import type { GetStaticPaths, GetStaticProps } from "next/types";

import { BookingAddForm } from "@components/BookingAddForm";
import { FormPageLayout } from "@components/Layouts/FormPageLayout";
import prisma from "@db";

type PageProps = {
  homeId: string;
};

const Page = ({ homeId }: PageProps) => <BookingAddForm homeId={homeId} />;

Page.getLayout = (page: any, pageProps: PageProps) => (
  <FormPageLayout>{page}</FormPageLayout>
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
      homeId,
    },
    revalidate: false, // This page's cache is invalidated upon certain API calls
  };
};

export default Page;
