import type { Home } from "@prisma/client";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

type Props = {
  homeId: string;
};

export const HomeTitle = ({ homeId }: Props) => {
  const { data: home } = useSWR<Home>(`/api/homes/${homeId}`, fetcher);

  return <h1 className="text-3xl font-bold">{home?.name}</h1>;
};
