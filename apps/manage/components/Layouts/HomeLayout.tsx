import type { Home } from "@prisma/client";
import Link from "next/link";
import { Logo } from "@components/Logo";
import type { ReactNode } from "react";
import { TabbedNavigation } from "@components/TabbedNavigation";
import { UserMenu } from "@components/UserMenu";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

type Props = {
  children?: ReactNode;
  id: string;
  title?: ReactNode;
};

export const HomeLayout = ({ children, id, title }: Props) => {
  const { data: home } = useSWR<Home>(`/api/homes/${id}`, fetcher);

  return (
    <div className="flex h-screen flex-col">
      <div className="relative z-40 border-b border-zinc-50 px-6 dark:border-zinc-700 sm:px-12 lg:px-16">
        <header className="relative mx-auto max-w-7xl">
          <div className="flex items-center pt-6 pb-4 md:pt-8 md:pb-6">
            <div className="mr-2 flex shrink-0 items-center">
              <Link href="/dashboard" passHref>
                <a className="rounded" aria-label="Go to dashboard">
                  <Logo />
                </a>
              </Link>
            </div>
            <div className="flex flex-grow items-center rounded p-2 text-lg font-medium leading-3 transition sm:flex">
              {home?.name}
            </div>
            <UserMenu />
          </div>
          <TabbedNavigation
            items={[
              {
                exact: true,
                href: `/${id}`,
                label: "Overview",
              },
              {
                href: `/${id}/bookings`,
                label: "Bookings",
              },
              {
                href: `/${id}/settings`,
                label: "Settings",
              },
            ]}
          />
        </header>
      </div>
      <main className="mx-auto w-full flex-1 px-6 py-8 sm:py-12 sm:px-12 lg:px-16">
        <div className="mx-auto h-full max-w-7xl space-y-8">{children}</div>
      </main>
    </div>
  );
};
