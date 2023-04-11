import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { commitSession, getSession } from "~/services/session.server";
import { json, useLoaderData } from "~/utils/superjson";

import { Button } from "~/components/Button";
import { FormField } from "~/components/FormField";
import { Icon } from "~/components/Icon";
import { auth } from "~/services/auth.server";

export default function Login() {
  const { state } = useNavigation();
  const { email, emailSent } = useLoaderData<LoaderData>();

  const isAuthing = state !== "idle";

  return (
    <div className="grid gap-8">
      <div className="flex flex-col">
        <Link className="flex items-center space-x-2" to="/">
          <Icon.Logo className="mr-2 h-6 w-6" />
          <span className="font-bold">Visitter</span>
        </Link>
        <div className="section-text">
          <h2>You&apos;re almost there</h2>
        </div>
      </div>
      <Form className="space-y-6" method="POST">
        <FormField
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          defaultValue={email}
          disabled={isAuthing || emailSent}
          htmlFor="email"
          label="Email address"
          placeholder="name@example.com"
          required
          type="email"
        />
        <Button disabled={emailSent} loading={isAuthing} type="submit">
          Sign In with Email
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionArgs) {
  await auth.authenticate("OTP", request, {
    successRedirect: "/otp",
    failureRedirect: "/login",
  });
}

type LoaderData = {
  email: string;
  emailSent: boolean;
  error: unknown; // FIXME: unknown
};

export async function loader({ request }: LoaderArgs) {
  await auth.isAuthenticated(request, { successRedirect: "/homes" });

  const session = await getSession(request.headers.get("Cookie"));
  const emailSent = session.has("auth:otp");
  const email = session.get("auth:email");
  const error = session.get(auth.sessionErrorKey);

  return json<LoaderData>(
    {
      email,
      emailSent,
      error,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}
