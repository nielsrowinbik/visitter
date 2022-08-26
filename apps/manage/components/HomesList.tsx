import { Button } from "@mantine/core";
import type { Home } from "@prisma/client";
import Link from "next/link";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

export const HomesList = () => {
  const { data: homes } = useSWR<Home[]>("/api/homes", fetcher);

  // if (!homes) return <div>Loading...</div>;

  if (homes?.length === 0)
    return (
      <div className="space-y-3">
        <p>
          You don&apos;t currently have any vacation homes. Why not add one?
        </p>
        <Link href="/new" passHref>
          <Button component="a" variant="light">
            Add a vacation home
          </Button>
        </Link>
      </div>
    );

  return (
    <div className="space-y-3">
      {homes?.map((home) => (
        <Link href={`/${home.id}`} key={home.id} passHref>
          <a className="bg-gray-100 block p-4 rounded-lg">
            <h3 className="font-bold">{home.name}</h3>
          </a>
        </Link>
      ))}
      <Link href="/new" passHref>
        <Button component="a" variant="light">
          Add a vacation home
        </Button>
      </Link>
    </div>
  );
};
