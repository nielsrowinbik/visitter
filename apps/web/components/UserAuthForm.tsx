"use client";

import * as z from "zod";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { toast } from "@/components/Toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { userAuthSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserAuthFormProps extends HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: `${window.location.origin}/homes`,
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast.error(
        "Something went wrong.",
        "Your post was not saved. Please try again."
      );
    }

    return toast.success(
      "Check your email",
      "We sent you a login link. Be sure to check your spam too."
    );
  }

  return (
    <form className="grid gap-8" {...props} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="name@example.com"
        errorText={errors.email?.message}
        type="email"
        label="Email address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        disabled={isLoading}
        {...register("email")}
      />
      <Button disabled={isLoading} type="submit">
        {isLoading && <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign In with Email
      </Button>
    </form>
  );
}
