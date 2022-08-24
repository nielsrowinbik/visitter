import type { FC } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const DashboardLayout: FC = ({ children }) => {
  const session = useSession();

  return (
    <>
      <header className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link href="/#" passHref shallow>
                <a aria-label="Home">
                  <span>Visitter</span>
                </a>
              </Link>
              <div className="hidden md:flex md:gap-x-6">
                <Link href="/dashboard" passHref shallow>
                  <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                    Dashboard
                  </a>
                </Link>
                <Link href="/dashboard/bookings" passHref shallow>
                  <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                    Bookings
                  </a>
                </Link>
                <Link href="/dashboard/schedule" passHref shallow>
                  <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                    Schedule
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              {/* TODO: Turn this into a proper avatar with fallback to initials */}
              {/* TODO: Turn this into a menu which includes a sign-out option to log out */}
              <img
                className="w-10 h-10 rounded-full"
                src="https://via.placeholder.com/150x150"
              />
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};
