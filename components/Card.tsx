import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "danger" | "info";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between space-y-4 rounded-md px-6 py-4 ring-1 md:flex-row md:items-center md:space-x-24",
        { "ring-zinc-400/20 ": variant === "default" },
        {
          "bg-red-50 ring-red-500 prose-headings:text-red-600 dark:bg-red-900/20 dark:prose-p:text-white":
            variant === "danger",
        },
        {
          "bg-blue-50 ring-blue-500 dark:bg-blue-900/50": variant === "info",
        },
        className
      )}
      {...props}
    />
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

Card.Content = function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("section-text", className)} {...props} />;
};

interface CardActionProps extends HTMLAttributes<HTMLDivElement> {}

Card.Action = function CardAction({ className, ...props }: CardActionProps) {
  return <div className={cn("w-auto", className)} {...props} />;
};
