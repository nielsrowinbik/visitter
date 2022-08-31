import { Booking, ShareKey } from "@prisma/client";
import useSWR, { mutate } from "swr";

import { Switch } from "@headlessui/react";
import { fetcher } from "@lib/fetch";
import { get } from "lodash";
import { getErrorMessage } from "@lib/errors";
import superagent from "superagent";
import toast from "react-hot-toast";
import { useCallback } from "react";

type Props = {
  homeId: string;
};

export const ShareKeyList = ({ homeId }: Props) => {
  const { data: keys } = useSWR<ShareKey[]>(
    () => `/api/homes/${homeId}/keys`,
    fetcher
  );

  const isShared = keys?.length !== 0;
  const key = get(keys, "[0].id");

  const toggleSharing = useCallback(async () => {
    try {
      if (!isShared) {
        await superagent.post(`/api/homes/${homeId}/keys`).send();
      } else {
        await superagent.delete(`/api/keys/${key}`).send();
      }

      mutate(`/api/homes/${homeId}/keys`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [homeId, isShared, key]);

  return (
    <>
      <h2 className="text-2xl font-bold">Sharing</h2>
      {/* TODO: Change styling of switch */}
      <Switch
        checked={isShared}
        className={`${isShared ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        onChange={toggleSharing}
      >
        <span
          aria-hidden="true"
          className={`${isShared ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      {/* TODO: Turn this into a copyable thingy */}
      <pre>{key}</pre>
    </>
  );
};
