import type { HTMLAttributes } from "react";
import { cn } from "~/utils";

interface DashboardProps extends HTMLAttributes<HTMLDivElement> {}

export function Dashboard({ children, className, ...props }: DashboardProps) {
  return (
    <div className={cn("grid items-start gap-12", className)} {...props}>
      {children}
    </div>
  );
}

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

Dashboard.Header = function DashboardHeader({
  children,
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
        <p className="text-sm text-neutral-500">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-4">{children}</div>
    </div>
  );
};
