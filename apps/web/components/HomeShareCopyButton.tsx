"use client";

import { Button } from "@/components/Button";
import type { ButtonProps } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";
import type { HTMLAttributes } from "react";

interface HomeShareCopyButtonProps extends HTMLAttributes<ButtonProps> {
  url: string;
}

export function HomeShareCopyButton({ url }: HomeShareCopyButtonProps) {
  return (
    <CopyButton value={url}>
      {({ copy, copied }) => (
        <Button compact onClick={copy} variant="outline">
          {copied ? "Link copied!" : "Copy unique link"}
        </Button>
      )}
    </CopyButton>
  );
}
