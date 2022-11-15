"use client";

import type { Home, ShareKey } from "database";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CopyButton } from "@/components/CopyButton";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
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
  // const url = `${window.location.origin}/availability/${key}`;
  const url = `/availability/${key}`;

  async function onChange(newValue: boolean) {
    try {
      setIsSaving(true);

      if (newValue === true) {
        await superagent.post(`/api/homes/${homeId}/keys`);
      } else {
        await superagent.delete(`/api/keys/${key}`);
      }

      router.refresh();
    } catch (error) {
      toast({
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
                    <Button
                      className="rounded-l-none border-transparent ring-0 focus:z-10 dark:border-transparent"
                      onClick={copy}
                      variant="outline"
                    >
                      {copied ? (
                        <Icon.Checkmark className="h-5 w-5" />
                      ) : (
                        <Icon.Copy className="h-5 w-5" />
                      )}
                    </Button>
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
