import { Icon } from "@/components/Icon";
import Link from "next/link";
import type { ReactNode } from "react";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function SharingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Icon.Logo className="box-content h-6 w-6 p-1" />
          <span className="font-bold">Visitter</span>
        </Link>
        <nav className="flex items-center space-x-4"></nav>
      </header>
      {children}
    </div>
  );
}
