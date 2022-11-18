import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "danger" | "info";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex max-w-none flex-col overflow-hidden rounded-md ring-1",
        { "ring-zinc-400/20 ": variant === "default" },
        {
          "bg-red-50 ring-red-500 prose-headings:text-red-600 dark:bg-zinc-800":
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

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

Card.Header = function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("grid gap-1 p-6", className)} {...props} />;
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

Card.Content = function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cn(
        "prose prose-zinc px-6 pb-4 first:pt-4 dark:prose-invert",
        className
      )}
      {...props}
    />
  );
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

Card.Footer = function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={cn("border-t px-6 py-4", className)} {...props} />;
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

Card.Title = function CardTitle({ className, ...props }: CardTitleProps) {
  return <h4 className={cn("", className)} {...props} />;
};

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

Card.Description = function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return <p className={cn("", className)} {...props} />;
};

interface CardActionProps extends HTMLAttributes<HTMLDivElement> {}

Card.Action = function CardDescription({
  className,
  ...props
}: CardActionProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-row-reverse items-end py-4 pr-6",
        className
      )}
      {...props}
    />
  );
};
