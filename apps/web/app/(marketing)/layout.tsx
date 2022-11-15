import { Icon } from "@/components/Icon";
import Link from "next/link";
import type { ReactNode } from "react";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Icon.Logo className="h-6 w-6" />
          <span className="font-bold">Visitter</span>
        </Link>
        <nav className="flex items-center space-x-4">
          {/* <Link href="/blog" className="hover:underline">
            Blog
          </Link> */}
        </nav>
      </header>
      {children}
    </div>
  );
}
