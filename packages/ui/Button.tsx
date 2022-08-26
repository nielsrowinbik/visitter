import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Spinner } from "./Spinner";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  compact?: boolean;
  leftIcon?: ReactNode;
  loading?: boolean | string;
  loaderPosition?: "left" | "right";
  rightIcon?: ReactNode;
}

export const Button = ({
  children,
  compact = false,
  leftIcon,
  loading = false,
  loaderPosition = "left",
  rightIcon,
  ...props
}: Props) => {
  return (
    <button
      className={classNames(
        "focus-ring relative box-border inline-flex shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded border border-transparent bg-gray-800 text-center text-sm font-semibold leading-none text-gray-50 no-underline transition hover:bg-gray-900 hover:text-white dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-white dark:hover:text-gray-900",
        compact ? "h-6 py-1.5 px-2 text-xs" : "h-8 py-3 px-4 text-sm"
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
