"use client";

import type { Home, ShareKey } from "@prisma/client";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HomeShareToggleProps extends HTMLAttributes<HTMLButtonElement> {
  home: Pick<Home, "id">;
  key?: ShareKey["id"];
}

export function HomeShareToggle({ home, key: key }: HomeShareToggleProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const isShared = !!key;

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
