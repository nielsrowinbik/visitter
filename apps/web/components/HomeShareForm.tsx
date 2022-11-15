"use client";

import type { Home, ShareKey } from "database";

import { Card } from "./Card";
import { CopyButton } from "./CopyButton";
import type { HTMLAttributes } from "react";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Toggle } from "@/components/Toggle";
import { get } from "lodash";
import superagent from "superagent";
import toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HomeShareFormProps extends HTMLAttributes<HTMLDivElement> {
  homeId: Home["id"];
  keys: Pick<ShareKey, "id">[];
}

export function HomeShareForm({ homeId, keys }: HomeShareFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const isShared = keys.length !== 0;
  const key = get(keys, "[0].id");
  const url = `${window.location.origin}/availability/${key}`;

  async function onChange(newValue: boolean) {
    setIsSaving(true);

    try {
      if (newValue === true) {
        await superagent.post(`/api/homes/${homeId}/keys`);
      } else {
        await superagent.delete(`/api/keys/${key}`);
      }

      router.refresh();
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        message: "Your vacation home was not created. Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <Toggle
        checked={isShared}
        description="Expose the availability of your vacation home at its own unique link."
        isSaving={isSaving}
        label="Sharing"
        onChange={onChange}
      />
      {isShared && (
        <Card variant="info">
          <Card.Content>
            <h4>Your home&apos;s unique link</h4>
            <p>
              Use this link to share when your vacation home is available with
              whomever you want. Copy it below or{" "}
              <a href={url} rel="noreferrer" target="_blank">
                open it in a new tab
              </a>
              .
            </p>
            <Input
              id="unique-link"
              readOnly
              rightSection={
                <CopyButton timeout={3000} value={url}>
                  {({ copy, copied }) => (
                    <button
                      className="border border-transparent border-l-zinc-400/20 bg-white px-2 text-zinc-600 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-2"
                      onClick={copy}
                    >
                      {copied ? (
                        <Icon.Checkmark className="h-5 w-5" />
                      ) : (
                        <Icon.Copy className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </CopyButton>
              }
              type="text"
              value={url}
            />
          </Card.Content>
        </Card>
      )}
    </>
  );
}
