"use client";

import type { Home, ShareKey } from "@prisma/client";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HomeShareToggleProps extends HTMLAttributes<HTMLButtonElement> {
  homeId: Home["id"];
  shareKey?: ShareKey["id"];
}

export function HomeShareToggle({
  homeId,
  shareKey: key,
}: HomeShareToggleProps) {
  const router = useRouter();
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

      router.refresh();
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
      disabled={isSaving}
      onClick={onChange}
      variant={isShared ? "danger" : "outline"}
    >
      {isSaving ? <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isShared ? "Disable sharing" : "Enable sharing"}
    </Button>
  );
}
