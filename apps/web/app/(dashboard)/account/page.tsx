import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardShell } from "@/components/DashboardShell";
import { Icon } from "@/components/Icon";
import Link from "next/link";
import { UserDeleteForm } from "@/components/UserDeleteForm";
import { UserSetttingsForm } from "@/components/UserSettingsForm";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages.signIn);
  }

  return (
    <DashboardShell>
      <DashboardHeader
        title="Account settings"
        subtitle={
          <Link
            className="flex items-center text-sm text-zinc-500 hover:underline"
            href="/homes"
          >
            <Icon.ChevronLeft className="mr-1 h-3 w-3" />
            Back to overview
          </Link>
        }
      ></DashboardHeader>
      <UserSetttingsForm user={user} />
      <hr />
      <UserDeleteForm user={user} />
    </DashboardShell>
  );
}
