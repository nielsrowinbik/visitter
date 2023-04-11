import { Button } from "~/components/Button";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import type { Home } from "@prisma/client";
import { Link } from "@remix-run/react";
import { formatDate } from "~/utils";

type HomesListProps = {
  homes: Home[];
};

export function HomesList({ homes }: HomesListProps) {
  return homes?.length ? (
    <ul className="not-prose grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {homes.map((home) => (
        <li
          className="flex items-center justify-between rounded-md shadow-md ring-1 ring-zinc-400/20 transition-all hover:shadow-lg"
          key={home.id}
        >
          <Link className="flex-auto p-4" to={`/${home.id}`}>
            <div className="grid gap-1">
              <h2 className="font-semibold">{home.name}</h2>
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Created on {formatDate(home.createdAt)}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No vacation homes</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Once you&apos;ve created a vacation home, you can begin managing its
        (un)availability.
      </EmptyPlaceholder.Description>
      <EmptyPlaceholder.Actions>
        <Link to="/new">
          <Button variant="outline">Create new home</Button>
        </Link>
      </EmptyPlaceholder.Actions>
    </EmptyPlaceholder>
  );
}
