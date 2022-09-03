import useSWR, { mutate } from "swr";

import { Button } from "ui";
import type { Home } from "@prisma/client";
import Router from "next/router";
import { fetcher } from "@lib/fetch";
import superagent from "superagent";
import { useState } from "react";

type Props = {
  id: string;
};

export const HomeDeleteButton = ({ id }: Props) => {
  const [isBusy, setBusy] = useState(false);
  const { data: home } = useSWR<Home>(`/api/homes/${id}`, fetcher);

  const onClickDelete = async () => {
    if (confirm("Are you sure?")) {
      setBusy(true);
      await superagent.delete(`/api/homes/${id}`).send();
      await mutate(`/api/homes`);
      Router.replace("/dashboard");
    }
  };

  return (
    <div className="rounded-md border border-red-500">
      <div className="flex flex-col justify-between space-y-4 rounded-md bg-red-50 px-6 py-4 md:flex-row md:items-center md:space-x-24">
        <div>
          <h2 className="font-semibold text-red-700">Delete home</h2>
          <p>
            Delete <strong>{home?.name}</strong> and all of its bookings. Any
            links shared for this home will stop working.
          </p>
        </div>
        <div>
          <Button
            disabled={!id || isBusy}
            onClick={onClickDelete}
            variant="danger"
          >
            Delete home
          </Button>
        </div>
      </div>
    </div>
  );
};
