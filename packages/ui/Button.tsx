import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Spinner } from "./Spinner";
import classNames from "classnames";

type Props = {
  children?: ReactNode;
  compact?: boolean;
  leftIcon?: ReactNode;
  loading?: boolean | string;
  loaderPosition?: "left" | "right";
  rightIcon?: ReactNode;
  variant?: "default" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  compact = false,
  leftIcon,
  loading = false,
  loaderPosition = "left",
  rightIcon,
  variant = "default",
  ...props
}: Props) => {
  return (
    <button
      className={classNames(
        "relative box-border inline-flex shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-md border border-transparent text-center text-sm font-semibold leading-none no-underline outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-0 ",
        compact ? "h-6 py-1.5 px-2 text-xs" : "h-8 py-3 px-4 text-sm",
        variant === "default" &&
          "bg-zinc-800 text-zinc-50 hover:bg-zinc-900 hover:text-white dark:bg-zinc-50 dark:text-zinc-800 dark:hover:bg-white dark:hover:text-zinc-900",
        variant === "outline" && "border-zinc-400/20 bg-white"
      )}
      {...props}
    >
      <div className="flex items-center justify-center">
        {(leftIcon || (loading && loaderPosition === "left")) && (
          <span className="-ml-1 mr-3 h-4 w-4">
            {loading && loaderPosition === "left" ? <Spinner /> : leftIcon}
          </span>
        )}

        <span>{children}</span>

        {(rightIcon || (loading && loaderPosition === "right")) && (
          <span className="-mr-1 ml-3 h-4 w-4">
            {loading && loaderPosition === "right" ? <Spinner /> : rightIcon}
          </span>
        )}
      </div>
    </button>
  );
};
