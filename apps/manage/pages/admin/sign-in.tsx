import React, { useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";

import { Button } from "@mantine/core";
import type { GetServerSideProps } from "next/types";
import Head from "next/head";
import { getSession } from "@lib/auth/session";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

type PageProps = {
  csrfToken: string;
};

const Page = ({ csrfToken }: PageProps) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    try {
      const signInResponse = await signIn("admin", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        console.error(signInResponse.error);
        // setError(error);
      }

      if (signInResponse?.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
      //   setError(error)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Admin Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center ">
          <p>Admin Sign In</p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 mx-2 rounded-sm sm:px-10">
            <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("csrfToken")}
                type="hidden"
                defaultValue={csrfToken}
                hidden
              />
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-400"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register("email")}
                    className="appearance-none w-full font-medium py-3 border-b border-t-0 border-l-0 border-r-0 border-dashed outline-none text-xl text-center leading-6 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div>
                <div className="mt-8">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-400"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={12}
                    required
                    {...register("password")}
                    className="appearance-none w-full font-medium py-3 border-b border-t-0 border-l-0 border-r-0 border-dashed outline-none text-xl text-center leading-6 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div className="mt-16 space-y-2 flex justify-center">
                <Button type="submit" disabled={isSubmitting} variant="light">
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: "/admin" } };
  }

  return {
    props: { csrfToken: await getCsrfToken({ req: context.req }) },
  };
};

export default Page;
