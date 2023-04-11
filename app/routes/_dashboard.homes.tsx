import type { LoaderArgs, V2_MetaDescriptor } from "@remix-run/node";
import { json, useLoaderData } from "~/utils/superjson";

import { Button } from "~/components/Button";
import { Dashboard } from "~/components/Dashboard";
import type { Home } from "@prisma/client";
import { HomesList } from "~/components/HomesList";
import { Link } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import { findHomesByUserId } from "~/services/homes.server";

export function meta(): V2_MetaDescriptor[] {
  return [{ title: "Homes" }];
}

export default function Homes() {
  const { homes } = useLoaderData<LoaderData>();

  return (
    <Dashboard>
      <Dashboard.Header title="Homes">
        <Link to="/new">
          <Button>New vacation home</Button>
        </Link>
      </Dashboard.Header>
      <div>
        <HomesList homes={homes} />
      </div>
    </Dashboard>
  );
}

type LoaderData = {
  homes: Home[];
};

export async function loader({ request }: LoaderArgs) {
  const sessionUser = await auth.isAuthenticated(request);

  const homes = await findHomesByUserId(sessionUser!.id);

  return json<LoaderData>({ homes });
}
