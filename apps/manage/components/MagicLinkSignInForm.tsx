import { Button, Input } from "ui";

import { Logo } from "./Logo";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  email: string;
};

export const MagicLinkSignInForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async ({ email }: FormValues) => {
    setSubmitting(true);
    try {
      await toast.promise(
        signIn("email", { email, redirect: false, callbackUrl: "/dashboard" }),
        {
          loading: "Signing you in...",
          success: "Success! Please check your e-mail.",
          error: "Something went wrong. Please try again.",
        },
        { duration: Infinity }
      );
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <h1 className="text-2xl font-bold">Login</h1>
        <Input
          {...register("email", { required: true })}
          autoComplete="email"
          disabled={isSubmitting || isSuccess}
          id="email"
          label="Email"
          placeholder="hi@example.com"
          type="email"
        />
        <div>
          <Button
            className="w-full"
            disabled={isSubmitting || isSuccess}
            type="submit"
          >
            Continue with Email
          </Button>
        </div>
      </form>
    </>
  );
};
