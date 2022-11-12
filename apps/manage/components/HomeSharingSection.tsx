import { Button, Input, Toggle } from "ui";
import { CheckIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import { Home, ShareKey } from "@prisma/client";
import { useCallback, useState } from "react";
import useSWR, { mutate } from "swr";

import { CopyButton } from "./CopyButton";
import Link from "next/link";
import { fetcher } from "@lib/fetch";
import { get } from "lodash";
import { getErrorMessage } from "@lib/errors";
import superagent from "superagent";
import toast from "react-hot-toast";

const VERCEL_URL = process.env.VERCEL_URL;

type Props = {
  id: string;
};

export const HomeSharingSection = ({ id }: Props) => {
  const [isBusy, setBusy] = useState(false);
  const { data: home } = useSWR<Home>(`/api/homes/${id}`, fetcher);
  const { data: keys } = useSWR<ShareKey[]>(`/api/homes/${id}/keys`, fetcher);

  const isShared = keys?.length !== 0;
  const key = get(keys, "[0].id");

  const toggleSharing = useCallback(async () => {
    setBusy(true);

    try {
      if (!isShared) {
        await superagent.post(`/api/homes/${id}/keys`).send();
      } else {
        await superagent.delete(`/api/keys/${key}`).send();
      }

      mutate(`/api/homes/${id}/keys`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }, [id, isShared, key]);

  const link = `${VERCEL_URL || "http://localhost:3000"}/share/${key}`;

  return (
    <section>
      <Toggle
        checked={isShared}
        description="Expose the availability of your vacation home at its own unique link."
        disabled={isBusy}
        id="shared"
        label="Sharing"
        onChange={toggleSharing}
      />
      {!!key && (
        <div className="prose max-w-none rounded-md border border-blue-500/50 bg-blue-50/50 px-6 py-4">
          <h4>Your home&apos;s unique link</h4>
          <p>
            Use this link to share when {home?.name} is available with whomever
            you want.
          </p>
          <Input
            readOnly
            rightSection={
              <CopyButton timeout={3000} value={link}>
                {({ copy, copied }) => (
                  <button
                    className="border border-transparent border-l-zinc-200 bg-zinc-100 px-2 text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-2"
                    onClick={copy}
                  >
                    {copied ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <ClipboardCopyIcon className="h-5 w-5" />
                    )}
                  </button>
                )}
              </CopyButton>
            }
            type="text"
            value={link}
          />
        </div>
      )}
    </section>
  );
};
