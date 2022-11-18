"use client";

import type { Home, ShareKey } from "database";

import { Badge } from "@/components/Badge";
import { Button } from "./Button";
import { CopyButton } from "./CopyButton";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { get } from "lodash";
import superagent from "superagent";
import toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HomeShareWidgetProps extends HTMLAttributes<HTMLDivElement> {
  home: Pick<Home, "id" | "name">;
  keys: Pick<ShareKey, "id">[];
}

export function HomeShareWidget({ home, keys }: HomeShareWidgetProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const isShared = keys.length !== 0;
  const key = get(keys, "[0].id");

  async function onChange() {
    try {
      setIsSaving(true);

      if (isShared === true) {
        await superagent.delete(`/api/keys/${key}`);
      } else {
        await superagent.post(`/api/homes/${home.id}/keys`);
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
    <div className="section-text">
      <h3>
        Availability sharing{" "}
        <Badge className="ml-2" variant={isShared ? "success" : "default"}>
          {isShared ? "Enabled" : "Disabled"}
        </Badge>
      </h3>
      <p>
        Let others see when {home.name} is (un)available by sending them the
        unique link that is created when turning this setting on. You can always
        turn this setting back off after which a previously generated link stops
        working.
      </p>
      <div className="not-prose flex space-x-3">
        {isShared ? (
          <CopyButton value={`${process.env.NEXTAUTH_URL}/availability/${key}`}>
            {({ copy, copied }) => (
              <Button compact onClick={copy} variant="outline">
                {copied ? "Link copied!" : "Copy unique link"}
              </Button>
            )}
          </CopyButton>
        ) : null}
        <Button
          compact
          disabled={isSaving}
          onClick={onChange}
          variant={isShared ? "danger" : "outline"}
        >
          {isSaving ? (
            <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {isShared ? "Disable sharing" : "Enable sharing"}
        </Button>
      </div>
    </div>
  );
}
