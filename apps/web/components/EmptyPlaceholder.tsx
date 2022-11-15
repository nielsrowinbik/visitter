import type { HTMLAttributes, SVGProps } from "react";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

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
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

interface EmptyPlaceholderIconProps extends Partial<SVGProps<SVGSVGElement>> {
  name: keyof typeof Icon;
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  name,
  className,
  ...props
}: EmptyPlaceholderIconProps) {
  const IconComponent = Icon[name];

  if (!Icon) {
    return null;
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
      <IconComponent className={cn("h-10 w-10", className)} {...props} />
    </div>
  );
};

interface EmptyPlacholderTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlacholderTitleProps) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  );
};

interface EmptyPlacholderDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlacholderDescriptionProps) {
  return (
    <p
      className={cn(
        "mt-3 mb-8 text-center font-normal leading-6 text-neutral-500",
        className
      )}
      {...props}
    />
  );
};
