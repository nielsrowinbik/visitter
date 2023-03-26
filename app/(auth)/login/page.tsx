import { Icon } from "@/components/Icon";
import Link from "next/link";
import type { Metadata } from "next";
import { UserAuthForm } from "@/components/UserAuthForm";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <div className="grid gap-8">
      <div className="flex flex-col">
        <Link className="flex items-center space-x-2" href="/">
          <Icon.Logo className="mr-2 h-6 w-6" />
          <span className="font-bold">Visitter</span>
        </Link>
        <div className="section-text">
          <h2>Sign in to your account</h2>
          <p>
            Don&apos;t have an account?{" "}
            <Link className="font-medium hover:underline" href="/get-started">
              Get started
            </Link>{" "}
            for free.
          </p>
        </div>
      </div>
      <UserAuthForm />
    </div>
  );
}
