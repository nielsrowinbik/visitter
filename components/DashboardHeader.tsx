import type { ReactNode } from "react";

interface DashboardHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export function DashboardHeader({
  children,
  subtitle,
  title,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-row justify-between">
      <div>
        {typeof title === "string" ? (
          <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
        ) : (
          title
        )}
        {typeof subtitle === "string" ? (
          <p className="text-sm text-neutral-500">{subtitle}</p>
        ) : (
          subtitle
        )}
      </div>
      <div className="flex items-center space-x-4">{children}</div>
    </div>
  );
}
