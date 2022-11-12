import { Button } from "ui";
import type { Home } from "@prisma/client";
import Link from "next/link";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

export const HomesGrid = () => {
  const { data: homes } = useSWR<Home[]>("/api/homes", fetcher);

  if (homes?.length === 0)
    return (
      <div className="space-y-3">
        <p>
          You don&apos;t currently have any vacation homes. Why not add one?
        </p>
        <Link href="/homes/new" passHref>
          <Button as="a" variant="outline">
            Add a vacation home
          </Button>
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {homes?.map((home) => (
        <Link href={`/${home.id}`} key={home.id} passHref>
          <a className="text-primary flex flex-col justify-between rounded-lg pt-3 shadow-md ring-1 ring-gray-400/20 transition duration-150 hover:shadow-lg">
            <div className="space-y-3 p-3">
              <div className="flex justify-between space-x-2">
                <h2 className="pt-px text-lg font-semibold">{home.name}</h2>
                <div className="flex space-x-1"></div>
              </div>
              <div className="space-y-2">{/* Space for extra info */}</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
