import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "~/utils";
import { Icon } from "~/components/Icon";

const button = cva(
  cn(
    "relative box-border inline-flex shrink-0 select-none items-center justify-center space-x-3 overflow-hidden whitespace-nowrap rounded-md border border-transparent text-center leading-none no-underline outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 disabled:cursor-not-allowed font-medium"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-zinc-800 text-zinc-50 hover:bg-zinc-900 hover:text-white dark:bg-zinc-50 dark:text-zinc-800 dark:hover:bg-white dark:hover:text-zinc-900",
        outline:
          "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-400/20 dark:bg-zinc-900 dark:hover:bg-zinc-800",
        danger:
          "border-zinc-200 bg-white text-red-500 hover:border-red-500 dark:border-zinc-400/20 dark:bg-zinc-900 dark:text-red-700",
        subtle: "hover:bg-zinc-50 dark:hover:bg-zinc-800",
      },
      size: {
        default: "py-2 px-4",
        compact: "py-1.5 px-2 text-xs",
        square: "h-9 w-9",
        "compact-square": "h-6 w-6 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  loading?: boolean;
}

export function Button({
  children,
  className,
  disabled,
  loading = false,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(button({ className, size, variant }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
