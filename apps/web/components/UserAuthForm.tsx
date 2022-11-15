"use client";

import * as z from "zod";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import toast from "@/components/Toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { userAuthSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

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
      return toast({
        title: "Something went wrong.",
        message: "Your post was not saved. Please try again.",
        type: "error",
      });
    }

    return toast({
      title: "Check your email",
      message: "We sent you a login link. Be sure to check your spam too.",
      type: "success",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              name="email"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">Or continue with</span>
        </div>
      </div>
      <Button
        disabled={isLoading}
        type="button"
        onClick={() =>
          toast({
            title: "Not yet supported",
            message: "We're still working on supporting this method, sorry!",
            type: "error",
          })
        }
        variant="outline"
      >
        <Icon.Apple className="mr-2 h-5 w-5" />
        Apple
      </Button>
      <Button
        disabled={isLoading}
        type="button"
        onClick={() =>
          toast({
            title: "Not yet supported",
            message: "We're still working on supporting this method, sorry!",
            type: "error",
          })
        }
        variant="outline"
      >
        <Icon.Facebook className="mr-2 h-5 w-5" />
        Facebook
      </Button>
      <Button
        disabled={isLoading}
        type="button"
        onClick={() =>
          toast({
            title: "Not yet supported",
            message: "We're still working on supporting this method, sorry!",
            type: "error",
          })
        }
        variant="outline"
      >
        <Icon.Google className="mr-2 h-5 w-5" />
        Google
      </Button>
    </div>
  );
}
