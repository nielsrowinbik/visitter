import {
  ArrowLeftIcon,
  HomeIcon,
  MailIcon,
  MailOpenIcon,
} from "@heroicons/react/outline";
import { Button, Input } from "ui";

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

  const { register, handleSubmit, getValues } = useForm<FormValues>();

  const onSubmit = async ({ email }: FormValues) => {
    setSubmitting(true);
    try {
      await toast.promise(signIn("email", { email, redirect: false }), {
        loading: "Signing you in...",
        success: "Success! Please check your e-mail.",
        error: "Something went wrong. Please try again.",
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-8 text-center">
        <MailOpenIcon className="inline h-16 w-16 text-teal-500" />
        <h1 className="text-4xl font-bold">Check your email</h1>
        <div className="space-y-2">
          <p>
            We emailed a magic link to{" "}
            <strong className="block">{getValues("email")}</strong>
          </p>
          <p>Click the link to log in or sign up.</p>
        </div>
        <div>
          <Button
            leftIcon={<ArrowLeftIcon />}
            onClick={() => setSuccess(false)}
            type="button"
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <form className="space-y-8 text-center" onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: Replace icon below with logo */}
        <HomeIcon className="inline h-16 w-16 text-teal-500" />{" "}
        <h1 className="text-4xl font-bold">Login to Visitter</h1>
        <Input
          {...register("email", { required: true })}
          autoComplete="email"
          id="email"
          label="Email"
          placeholder="hi@example.com"
          type="email"
        />
        <div>
          <Button disabled={isSubmitting} leftIcon={<MailIcon />} type="submit">
            Continue with Email
          </Button>
        </div>
      </form>
    </>
  );
};
