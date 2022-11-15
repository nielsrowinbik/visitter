import type { Home } from "database";
import Link from "next/link";
import { Skeleton } from "@/components/Skeleton";
import { formatDate } from "@/lib/utils";

interface HomeItemProps {
  home: Pick<Home, "id" | "name" | "createdAt">;
}

export function HomeItem({ home }: HomeItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/home/${home.id}`}
          className="font-semibold hover:underline"
        >
          {home.name}
        </Link>
        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Created on {formatDate(home.createdAt?.toDateString())}
          </p>
        </div>
      </div>
    </div>
  );
}

HomeItem.Skeleton = function HomeItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/6" />
        <Skeleton className="h-4 w-3/6" />
      </div>
    </div>
  );
};
