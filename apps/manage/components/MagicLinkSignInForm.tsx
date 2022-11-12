import { Button, Input } from "ui";

import { Logo } from "./Logo";
import Router from "next/router";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  email: string;
};

export const MagicLinkSignInForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async ({ email }: FormValues) => {
    setSubmitting(true);
    try {
      await toast.promise(
        signIn("email", { email, redirect: false, callbackUrl: "/homes" }, {}),
        {
          loading: "Signing you in...",
          success: "Success! Please check your e-mail.",
          error: "Something went wrong. Please try again.",
        },
        { duration: Infinity, position: "top-center" }
      );
      Router.push(`/login/success?email=${email}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center space-y-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>
          Welcome back.
          <br />
          Let&apos;s sign in.
        </h2>
        <Input
          {...register("email", { required: true })}
          autoComplete="email"
          className="text-center"
          disabled={isSubmitting}
          id="email"
          label="Enter your email address"
          placeholder="hi@example.com"
          type="email"
        />
        <div>
          <button
            className="inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0"
            disabled={isSubmitting}
            type="submit"
          >
            Continue with email
          </button>
        </div>
      </form>
    </>
  );
};
