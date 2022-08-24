import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Spinner } from "./Spinner";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  leftIcon?: ReactNode;
  loading?: boolean | string;
  loaderPosition?: "left" | "right";
  rightIcon?: ReactNode;
  variant?: "filled" | "uppercase";
}

export const Button = ({
  children,
  leftIcon,
  loading = false,
  loaderPosition = "left",
  rightIcon,
  variant = "filled",
  ...props
}: Props) => {
  return (
    <button
      // TODO: Make sure button can't be clicked when in loading state
      className={classNames(
        "group rounded-md py-3 px-4 font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 w-full disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed",
        variant === "filled" &&
          "bg-teal-600 text-white hover:enabled:text-slate-100 hover:enabled:bg-teal-500 active:enabled:bg-teal-800 active:enabled:text-teal-100 focus-visible:outline-teal-600",
        props.className
      )}
      {...props}
    >
      <div className="flex items-center justify-center">
        {(leftIcon || (loading && loaderPosition === "left")) && (
          <span className="w-5 h-5 -ml-1 mr-3">
            {loading && loaderPosition === "left" ? <Spinner /> : leftIcon}
          </span>
        )}

        <span className={classNames(variant === "uppercase" && "uppercase")}>
          {children}
        </span>

        {(rightIcon || (loading && loaderPosition === "right")) && (
          <span className="w-5 h-5 -mr-1 ml-3">
            {loading && loaderPosition === "right" ? <Spinner /> : rightIcon}
          </span>
        )}
      </div>
    </button>
  );
};
