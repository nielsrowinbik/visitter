import { Button, Space, Title } from "@mantine/core";

import { ArrowLeftIcon } from "@heroicons/react/outline";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import type { GetServerSideProps } from "next/types";
import type { Home } from "@prisma/client";
import { HomeDeleteButton } from "@components/HomeDeleteButton";
import { HomeTitle } from "@components/HomeTitle";
import Link from "next/link";
import { SWRConfig } from "swr";
import { getSession } from "@lib/auth/session";
import prisma from "@db";

type PageProps = {
  fallback: Record<string, Home>;
  homeId: string;
};

const Page = ({ fallback, homeId }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <main>
      <Link href="/dashboard" passHref>
        <Button
          compact
          component="a"
          variant="subtle"
          leftIcon={<ArrowLeftIcon height={12} width={12} />}
        >
          Back to overview
        </Button>
      </Link>
      <HomeTitle homeId={homeId} />
      <Space h="md" />
      <Title order={2}>Bookings</Title>
      <Space h="sm" />
      <Space h="md" />
      <Title order={3}>Danger zone</Title>
      <Space h="sm" />
      <HomeDeleteButton homeId={homeId} />
    </main>
  </SWRConfig>
);

Page.getLayout = (children: any) => (
  <DashboardLayout>{children}</DashboardLayout>
);

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

  return {
    props: {
      homeId,
      fallback: {
        [`/api/homes/${homeId}`]: JSON.parse(JSON.stringify(home)),
      },
    },
  };
};

export default Page;
