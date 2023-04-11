import { useCallback, useState } from "react";

import type { ReactNode } from "react";

type CopyButtonProps = {
  children(payload: { copied: boolean; copy(): void }): ReactNode;
  timeout?: number;
  value: string;
};

export const CopyButton = ({
  children,
  timeout = 2000,
  value,
  ...props
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);

      setTimeout(() => setCopied(false), timeout);
    } catch (e) {}
  }, [timeout, value]);

  return <>{children({ copy, copied, ...props })}</>;
};
