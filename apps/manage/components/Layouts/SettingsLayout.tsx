import type { Home } from "@prisma/client";
import Link from "next/link";
import { Logo } from "@components/Logo";
import type { ReactNode } from "react";
import { UserMenu } from "@components/UserMenu";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

type Props = {
  children?: ReactNode;
  homeId: string;
};

export const SettingsLayout = ({ children, homeId }: Props) => {
  const { data: home } = useSWR<Home>(`/api/homes/${homeId}`, fetcher);

  return (
    <>
      {/* TODO: This header should be a resuable component */}
      <header className="relative z-20 py-8">
        <div className="container">
          <nav className="relative flex items-center justify-between sm:h-10">
            <div>
              <Link href="/homes" passHref>
                <a className="inline-block">
                  <Logo />
                </a>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/docs">Docs</Link>
              <UserMenu />
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container">
          <Link href={`/${homeId}`}>Back to home</Link>
          <h1>Settings for {home?.name}</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:flex lg:w-56 lg:flex-col">
              <Link href={`/${homeId}/settings`}>General</Link>
              {/* <Link href={`/${homeId}/settings/people`}>People</Link> */}
              <Link href={`/${homeId}/settings/visibility`}>Visibility</Link>
              <Link href={`/${homeId}/settings/danger-zone`}>Danger zone</Link>
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
      {/* TODO: This footer should be a reusable component */}
      <footer></footer>
    </>
  );
};
