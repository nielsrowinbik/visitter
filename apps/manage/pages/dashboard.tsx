import { Button, Space, Title } from "@mantine/core";

import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import type { GetServerSideProps } from "next/types";
import type { Home } from "@prisma/client";
import { HomesList } from "@components/HomesList";
import { LogoutIcon } from "@heroicons/react/outline";
import { SWRConfig } from "swr";
import { getSession } from "@lib/auth/session";
import prisma from "@db";
import { signOut } from "next-auth/react";

type PageProps = {
  fallback: Record<string, Home[]>;
};

const Page = ({ fallback }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <Button
      compact
      onClick={() => signOut({ callbackUrl: "/" })}
      rightIcon={<LogoutIcon height={12} width={12} />}
      variant="subtle"
    >
      Sign out
    </Button>
    <Space h="md" />
    <Title order={2}>Your vacation homes</Title>
    <Space h="sm" />
    <HomesList />
  </SWRConfig>
);

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/login" } };
  }

  const homes = await prisma.home.findMany({
    where: {
      ownerId: { equals: session.user?.id },
    },
  });

  return {
    props: {
      fallback: {
        "/api/homes": JSON.parse(JSON.stringify(homes)),
      },
    },
  };
};

export default Page;