import { useEffect, useState } from "react";
import { Button } from "ui";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  delay?: number;
  errorMessage?: string;
  successMessage?: string;
  text: string;
};

export const CopyToClipboardButton = ({
  children,
  delay = 3000,
  errorMessage = "Failed to copy!",
  successMessage = "Copied!",
  text,
}: Props) => {
  const [copyState, setCopyState] = useState<boolean | null>(null);

  const onClick = () => {
    try {
      navigator.clipboard.writeText(text);
      setCopyState(true);
    } catch (e) {
      setCopyState(false);
    }
  };

  useEffect(() => {
    if (copyState !== null) {
      setTimeout(() => {
        setCopyState(null);
      }, delay);
    }
  }, [copyState, delay]);

  return (
    <Button onClick={onClick}>
      {copyState === true
        ? successMessage
        : copyState === false
        ? errorMessage
        : children}
    </Button>
  );
};
