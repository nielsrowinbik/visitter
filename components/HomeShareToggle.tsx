"use client";

import type { Home, ShareKey } from "@prisma/client";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
import { mutate } from "swr";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useState } from "react";

interface HomeShareToggleProps extends HTMLAttributes<HTMLButtonElement> {
  homeId: Home["id"];
  shareKey?: ShareKey["id"];
}

export function HomeShareToggle({
  homeId,
  shareKey: key,
}: HomeShareToggleProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const isShared = !!key;

  async function onChange() {
    try {
      setIsSaving(true);

      if (isShared === true) {
        await superagent.delete(`/api/keys/${key}`);
      } else {
        await superagent.post(`/api/homes/${homeId}/keys`);
      }

      await mutate(`/api/homes/${homeId}/keys`);
    } catch (error) {
      toast.error(
        "Something went wrong.",
        "Your vacation home was not created. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Button
      compact
      loading={isSaving}
      onClick={onChange}
      variant={isShared ? "danger" : "outline"}
    >
      {isShared ? "Disable sharing" : "Enable sharing"}
    </Button>
  );
}
