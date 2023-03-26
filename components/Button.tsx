import type { ButtonHTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  compact?: boolean;
  loading?: boolean;
  square?: boolean;
  variant?: "default" | "danger" | "outline" | "subtle";
}

export const Button = forwardRef(function renderButton(
  {
    children,
    className,
    disabled,
    compact = false,
    loading = false,
    square = false,
    variant = "default",
    ...props
  }: ButtonProps,
  ref: any
) {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        "relative box-border inline-flex shrink-0 select-none items-center justify-center space-x-3 overflow-hidden whitespace-nowrap rounded-md border border-transparent text-center font-semibold leading-none no-underline outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 disabled:cursor-not-allowed",
        { "py-2 px-4": compact === false && square === false },
        { "h-9 w-9": compact === false && square === true },
        { "py-1.5 px-2 text-xs": compact === true && square === false },
        { "h-6 w-6": compact === true && square === true },
        {
          "bg-zinc-800 text-zinc-50 hover:bg-zinc-900 hover:text-white dark:bg-zinc-50 dark:text-zinc-800 dark:hover:bg-white dark:hover:text-zinc-900":
            variant === "default",
        },
        {
          "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-400/20 dark:bg-zinc-900 dark:hover:bg-zinc-800":
            variant === "outline",
        },
        {
          "border-zinc-200 bg-white text-red-500 hover:border-red-500 dark:border-zinc-400/20 dark:bg-zinc-900 dark:text-red-700":
            variant === "danger",
        },
        {
          "enabled:hover:bg-zinc-50 disabled:text-zinc-300 enabled:dark:hover:bg-zinc-800 dark:disabled:text-zinc-600":
            variant === "subtle",
        },
        className
      )}
      disabled={loading || disabled}
    >
      {loading ? <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
});
