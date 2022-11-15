import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  compact?: boolean;
  square?: boolean;
  variant?: "default" | "danger" | "outline" | "subtle";
}

export function Button({
  className,
  compact = false,
  square = false,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
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
          "hover:bg-zinc-50 dark:hover:bg-zinc-800": variant === "subtle",
        },
        className
      )}
    />
  );
}
