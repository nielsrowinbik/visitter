import type { HTMLAttributes } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "busy" | "success";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[26px] items-center space-x-2 rounded-full border px-3 align-middle text-xs font-medium leading-none",
        {
          "border-green-200 bg-green-50 text-green-600 dark:border-green-700 dark:bg-green-900/40 dark:text-green-500":
            variant === "success",
        },
        className
      )}
    >
      {variant === "busy" && <Icon.Spinner className="mr-1 h-4 w-4" />}
      {variant === "success" && (
        <Icon.CheckmarkCircle className="mr-1 h-4 w-4" />
      )}
      {children}
    </span>
  );
}
