import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import Link from "next/link";
import { UserAuthForm } from "@/components/UserAuthForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link className="absolute top-8 left-8" href="/">
        <Button variant="subtle">
          <Icon.ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="p-8">
        <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <Icon.Logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-slate-500">
              Enter your email to sign in to your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-slate-500">
            <Link href="/get-started" className="hover:text-brand underline">
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
