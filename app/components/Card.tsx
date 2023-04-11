import type { BaseHTMLAttributes, HTMLAttributes } from "react";

import type { VariantProps } from "class-variance-authority";
import { cn } from "~/utils";
import { cva } from "class-variance-authority";

const card = cva(
  cn(
    "flex flex-col justify-between space-y-4 rounded-md px-6 py-4 ring-1 md:flex-row md:items-center md:space-x-24"
  ),
  {
    variants: {
      variant: {
        default: "ring-zinc-400/20",
        danger:
          "bg-red-50 ring-red-500 prose-headings:text-red-600 dark:bg-red-900/20 dark:prose-p:text-white",
        info: "bg-blue-50 ring-blue-500 dark:bg-blue-900/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CardProps
  extends BaseHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

export function Card({ children, className, variant }: CardProps) {
  return <div className={cn(card({ className, variant }))}>{children}</div>;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

Card.Content = function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("section-text", className)} {...props} />;
};

interface CardActionProps extends HTMLAttributes<HTMLDivElement> {}

Card.Action = function CardAction({ className, ...props }: CardActionProps) {
  return <div className={cn("w-auto", className)} {...props} />;
};
