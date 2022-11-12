import Link from "next/link";
import { Logo } from "@components/Logo";
import type { ReactNode } from "react";
import { UserMenu } from "@components/UserMenu";

type Props = {
  children?: ReactNode;
};

export const DashboardLayout = ({ children }: Props) => (
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
      <div className="container space-y-8">{children}</div>
    </main>
    {/* TODO: This footer should be a reusable component */}
    <footer></footer>
  </>
);
