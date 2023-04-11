import { Link, Outlet } from "@remix-run/react";

import { Footer } from "~/components/Footer";
import { Icon } from "~/components/Icon";

export default function MarketingLayout() {
  return (
    <div className="relative mx-auto max-w-lg px-6 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
      <header className="mx-auto flex w-full items-center justify-between py-4">
        <Link
          className="rounded-full px-5 py-2 text-sm font-semibold transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          to="/about"
        >
          About
        </Link>
        <Link to="/" className="flex items-center space-x-1">
          <Icon.Logo className="box-content h-6 w-6 p-1" />
          <span className="font-bold">Visitter</span>
        </Link>
        <Link
          className="rounded-full bg-zinc-100 px-5 py-2 text-sm font-semibold transition-colors dark:bg-zinc-800"
          to="/login"
        >
          Login
        </Link>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
