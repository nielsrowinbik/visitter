import { Icon } from "@/components/Icon";
import Link from "next/link";
import { UserAuthForm } from "@/components/UserAuthForm";

export default async function RegisterPage() {
  return (
    <div className="grid gap-8">
      <Link className="flex items-center space-x-2" href="/">
        <Icon.Logo className="mr-2 h-6 w-6" />
        <span className="font-bold">Visitter</span>
      </Link>
      <div className="section-text">
        <h2>Get started for free</h2>
        <p>
          Already registered?{" "}
          <Link className="font-medium hover:underline" href="/login">
            Sign in
          </Link>{" "}
          to your account account.
        </p>
      </div>
      <UserAuthForm />
      <div className="section-text">
        <p>
          By signing up you agree to our{" "}
          <Link
            className="text-inherit underline hover:underline"
            href="/terms"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            className="text-inherit underline hover:underline"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
