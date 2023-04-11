import { Link, Outlet } from "@remix-run/react";
import { json, useLoaderData } from "~/utils/superjson";

import { Icon } from "~/components/Icon";
import type { LoaderArgs } from "@remix-run/node";
import type { User } from "@prisma/client";
import { UserMenu } from "~/components/UserMenu";
import { auth } from "~/services/auth.server";
import { findUserById } from "~/services/users.server";

export default function DashboardLayout() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div className="relative mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <Link to="/homes" className="flex items-center space-x-2">
          <Icon.Logo className="box-content h-6 w-6 p-1" />
          <span className="font-bold">Visitter</span>
        </Link>
        <UserMenu user={user} />
      </header>
      <main className="flex w-full flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}

type LoaderData = {
  user: User;
};

export async function loader({ request }: LoaderArgs) {
  const sessionUser = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const user = (await findUserById(sessionUser.id)) as User;

  return json<LoaderData>({ user });
}
