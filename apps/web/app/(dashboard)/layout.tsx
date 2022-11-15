import { Icon } from "@/components/Icon";
import Link from "next/link";
import type { ReactNode } from "react";
import { UserAccountNav } from "@/components/UserAccountNav";
import { getCurrentUser } from "@/lib/session";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="relative mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <Link href="/homes" className="flex items-center space-x-2">
          <Icon.Logo className="h-6 w-6" />
          <span className="text-lg font-bold">Visitter</span>
        </Link>
        <UserAccountNav
          user={{
            name: user.name,
            image: user.image,
            email: user.email,
          }}
        />
      </header>
      <main className="flex w-full flex-1 flex-col">{children}</main>
    </div>
  );
}
