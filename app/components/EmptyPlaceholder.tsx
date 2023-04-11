import type { HTMLAttributes } from "react";
import { cn } from "~/utils";

interface EmptyPlaceholderProps extends HTMLAttributes<HTMLDivElement> {}

export function EmptyPlaceholder({
  className,
  children,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-md p-8 text-center ring-1 ring-zinc-400/20",
        className
      )}
      {...props}
    >
      <div className="section-text mx-auto flex max-w-md flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

interface EmptyPlacholderTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlacholderTitleProps) {
  return <h3 className={cn("", className)} {...props} />;
};

interface EmptyPlacholderDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlacholderDescriptionProps) {
  return <p className={cn("", className)} {...props} />;
};

interface EmptyPlaceholderActionsProps extends HTMLAttributes<HTMLDivElement> {}

EmptyPlaceholder.Actions = function EmptyPlaceholderActions({
  className,
  ...props
}: EmptyPlaceholderActionsProps) {
  return <div className={cn("not-prose", className)} {...props} />;
};
