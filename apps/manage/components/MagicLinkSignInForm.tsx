import {
  ArrowLeftIcon,
  HomeIcon,
  MailIcon,
  MailOpenIcon,
} from "@heroicons/react/outline";

import { Button } from "ui";
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
      <div className="text-center space-y-8">
        <MailOpenIcon className="w-16 h-16 inline text-teal-500" />
        <h1 className="font-bold text-4xl">Check your email</h1>
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
        <HomeIcon className="w-16 h-16 inline text-teal-500" />{" "}
        <h1 className="font-bold text-4xl">Login to Visitter</h1>
        <div>
          <label
            htmlFor="email"
            className="mb-3 block  font-medium text-gray-700 text-left"
          >
            Email address
          </label>
          <input
            {...register("email", { required: true })}
            autoComplete="email"
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-teal-500 focus:ring-2"
            id="email"
            placeholder="hi@example.com"
            type="email"
          />
        </div>
        <div>
          <Button disabled={isSubmitting} leftIcon={<MailIcon />} type="submit">
            Continue with Email
          </Button>
        </div>
      </form>
    </>
  );
};
