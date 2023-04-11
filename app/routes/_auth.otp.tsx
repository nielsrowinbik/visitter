import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { commitSession, getSession } from "~/services/session.server";
import { json, useLoaderData } from "~/utils/superjson";

import AuthCode from "react-auth-code-input";
import { Button } from "~/components/Button";
import { FormField } from "~/components/FormField";
import { Icon } from "~/components/Icon";
import { auth } from "~/services/auth.server";
import { findUserByEmail } from "~/services/users.server";
import { useState } from "react";

export default function OTPPage() {
  const { state } = useNavigation();
  const { email, isSignUp } = useLoaderData<LoaderData>();

  const [otp, setOTP] = useState("");
  function onChange(res: string) {
    setOTP(res);
  }

  const isAuthing = state !== "idle";

  return (
    <div className="grid gap-8">
      <div className="flex flex-col">
        <Link className="flex items-center space-x-2" to="/">
          <Icon.Logo className="mr-2 h-6 w-6" />
          <span className="font-bold">Visitter</span>
        </Link>
        <div className="section-text">
          <h2>Enter your one time code</h2>
          <p>
            Enter the code for <strong>{email}</strong> found in the email that
            we&apos;ve just sent you.
          </p>
        </div>
        <Form className="space-y-6" method="POST">
          {isSignUp && (
            <FormField
              autoComplete="name"
              autoFocus
              description="Enter your full name or a display name you are comfortable with."
              htmlFor="name"
              label="Name"
              required
              type="text"
            />
          )}
          <AuthCode
            autoFocus={false}
            containerClassName="grid auto-cols-auto grid-flow-col gap-6"
            inputClassName="border border-zinc-200 rounded-md text-2xl font-mono text-center py-3"
            onChange={onChange}
          />
          <Button loading={isAuthing} type="submit">
            Confirm code
          </Button>
          <input
            className="hidden"
            name="code"
            readOnly
            type="text"
            value={otp}
          />
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: ActionArgs) {
  await auth.authenticate("OTP", request, {
    successRedirect: "/homes",
    failureRedirect: "/otp",
  });
}

type LoaderData = {
  email: string;
  emailSent: boolean;
  error: unknown; // FIXME: unknown
  isSignUp: boolean;
};

export async function loader({ request }: LoaderArgs) {
  await auth.isAuthenticated(request, { successRedirect: "/homes" });

  const session = await getSession(request.headers.get("Cookie"));
  const emailSent = session.has("auth:otp");
  const email = session.get("auth:email");
  const error = session.get(auth.sessionErrorKey);

  let isSignUp = false;
  if (email) {
    const dbUser = await findUserByEmail(email);
    if (!dbUser?.emailVerified) isSignUp = true;
  }

  return json<LoaderData>(
    {
      email,
      emailSent,
      error,
      isSignUp,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}
