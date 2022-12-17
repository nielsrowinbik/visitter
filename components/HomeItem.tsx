import type { Home } from "@prisma/client";
import Link from "next/link";
import { Skeleton } from "@/components/Skeleton";
import { formatDate } from "@/lib/utils";

interface HomeItemProps {
  home: Pick<Home, "id" | "name" | "createdAt">;
}

export function HomeItem({ home }: HomeItemProps) {
  return (
    <li className="flex items-center justify-between rounded-md shadow-md ring-1 ring-zinc-400/20 transition-all hover:shadow-lg">
      <Link className="flex-auto p-4" href={`/home/${home.id}`}>
        <div className="grid gap-1">
          <h2 className="font-semibold">{home.name}</h2>
          <div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Created on {formatDate(home.createdAt?.toDateString())}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

HomeItem.Skeleton = function HomeItemSkeleton() {
  return (
    <div className="rounded-md p-4 ring-1 ring-zinc-400/20">
      <div className="space-y-3">
        <Skeleton className="h-5 w-3/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
};
