import { Button } from "@/components/Button";
import Link from "next/link";
import { UserAuthForm } from "@/components/UserAuthForm";

export default async function RegisterPage() {
  return (
    <div className="grid h-screen w-screen grid-cols-2 flex-col items-center justify-center">
      <Link className="absolute top-8 right-8" href="/login">
        <Button variant="subtle">Login</Button>
      </Link>
      <div className="h-full bg-zinc-100" />
      <div className="p-8">
        <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className=" text-zinc-500">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-slate-500">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="hover:text-brand underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:text-brand underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
