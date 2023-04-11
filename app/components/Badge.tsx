import type { BaseHTMLAttributes } from "react";
import { Icon } from "~/components/Icon";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~/utils";
import { cva } from "class-variance-authority";

const badge = cva(
  cn(
    "inline-flex items-center space-x-2 rounded-full border px-3 h-7 align-middle text-xs font-medium leading-none"
  ),
  {
    variants: {
      variant: {
        default: "",
        success:
          "border-green-200 bg-green-50 text-green-600 dark:border-green-700 dark:bg-green-900/40 dark:text-green-500",
        busy: "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-700 dark:bg-purple-900/40 dark:text-purple-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends BaseHTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ children, className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badge({ className, variant }))} {...props}>
      {variant === "busy" && (
        <Icon.Spinner className="mr-1 h-4 w-4 animate-spin" />
      )}
      {variant === "success" && (
        <Icon.CheckmarkCircle className="mr-1 h-4 w-4" />
      )}
      {children}
    </span>
  );
}
