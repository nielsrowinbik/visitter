import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";

import { Button } from "ui";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import { Fragment } from "react";
import type { GetServerSideProps } from "next/types";
import type { Home } from "@prisma/client";
import { HomesList } from "@components/HomesList";
import { SWRConfig } from "swr";
import { getSession } from "@lib/auth/session";
import prisma from "@db";

type PageProps = {
  fallback: Record<string, Home[]>;
};

const Page = ({ fallback }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <div className="flex flex-col-reverse justify-end gap-y-3 space-x-6 md:flex-row md:items-end">
      {/* TODO: Extract below to separate component */}
      {/* TODO: Below should only enforce this limit once we've actually implemented the ability to upgrade */}
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              as={Button}
              rightIcon={
                open ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )
              }
            >
              New vaction home
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel className="absolute right-0 z-40 mt-2 w-full origin-top-right space-y-4 rounded-md bg-white p-4 text-sm shadow-lg ring-1 ring-gray-400/20 dark:bg-zinc-900 dark:shadow-black md:w-[390px]">
                <p className="font-semibold">
                  You are already using your one free vacation home
                </p>
                <p>
                  Signing up for a paid plan will unlock the ability to create
                  unlimited vacation homes.
                </p>
                <Button compact>Upgrade now</Button>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
    <HomesList />
  </SWRConfig>
);

Page.getLayout = (page: any) => (
  <DashboardLayout title="Overview">{page}</DashboardLayout>
);

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
