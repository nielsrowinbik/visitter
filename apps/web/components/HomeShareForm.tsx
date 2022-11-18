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
  const origin =
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || "http://localhost:3000";
  const url = `${origin}/availability/${key}`;

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
        description="Turning this setting will create a unique link that you can share with others to let them see when your vacation home is (un)available."
        isSaving={isSaving}
        label="Availability sharing"
        onChange={onChange}
      />
    </>
  );
}
