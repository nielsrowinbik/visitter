import type {
  ActionArgs,
  LoaderArgs,
  V2_MetaDescriptor,
} from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { confirmSubmit, toObject } from "~/utils";
import { deleteUser, findUserById, updateUser } from "~/services/users.server";
import { json, useActionData, useLoaderData } from "~/utils/superjson";

import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Dashboard } from "~/components/Dashboard";
import { FormField } from "~/components/FormField";
import type { User } from "@prisma/client";
import { auth } from "~/services/auth.server";
import { badRequest } from "remix-utils";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { userPatchSchema } from "~/validations/user";
import type { z } from "zod";

export function meta(): V2_MetaDescriptor[] {
  return [{ title: "Account settings" }];
}

export default function AccountPage() {
  const { formMethod, state } = useNavigation();
  const { user } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const { formErrors, submitError } = actionData!;

  const isSaving = state !== "idle" && formMethod === "PATCH";
  const isDeleting = state !== "idle" && formMethod === "DELETE";
  const isBusy = isSaving || isDeleting;

  useEffect(() => {
    if (submitError) {
      toast.error(submitError);
    }
  }, [submitError]);

  return (
    <Dashboard>
      <Dashboard.Header title="Account settings" />
      <div className="space-y-10">
        <Form className="max-w-md space-y-6" method="PATCH">
          <FormField
            autoComplete="name"
            defaultValue={user.name || ""}
            description="Enter your full name or a display name you are comfortable with."
            disabled={isBusy}
            error={formErrors?.name}
            htmlFor="name"
            label="Name"
            required
            type="text"
          />
          <FormField
            autoComplete="email"
            defaultValue={user.email}
            description="Support for changing your e-mail address is coming soon. For now, this field is read-only."
            disabled={isBusy}
            // error={formErrors?.email}
            htmlFor="email"
            label="Email address"
            required
            readOnly
            type="email"
          />
          <FormField
            autoComplete="tel"
            defaultValue={user.phone || ""}
            description="Enter your phone number including country code. We will never share your phone number without your permission."
            disabled={isBusy}
            error={formErrors?.phone}
            htmlFor="phone"
            label="Phone number"
            type="tel"
          />
          <Button disabled={isBusy} loading={isSaving} type="submit">
            Save account settings
          </Button>
        </Form>
        <hr />
        <Form
          method="DELETE"
          onSubmit={confirmSubmit("Are you absolutely sure?")}
        >
          <Card variant="danger">
            <Card.Content>
              <h3>Delete account</h3>
              <p className="mb-0">
                This will delete your account and all of your vacation homes,
                including all of their bookings. Any shared links pointing to
                one of your vacation homes will stop working.
              </p>
            </Card.Content>
            <Card.Action>
              <Button
                disabled={isBusy}
                loading={isDeleting}
                type="submit"
                variant="danger"
              >
                Delete account
              </Button>
            </Card.Action>
          </Card>
        </Form>
      </div>
    </Dashboard>
  );
}

type ActionData = {
  formErrors?: z.ZodFormattedError<z.infer<typeof userPatchSchema>>;
  submitError?: string;
};

export async function action({ request }: ActionArgs) {
  const { method } = request;
  const user = await auth.isAuthenticated(request);

  switch (method) {
    case "DELETE":
      try {
        await deleteUser(user!.id);
        await auth.logout(request, { redirectTo: "/" });
      } catch (error) {
        return json<ActionData>({
          submitError: "Something went wrong deleting your account",
        });
      }

    case "PATCH":
      const parsed = userPatchSchema.safeParse(
        toObject(await request.formData())
      );

      if (!parsed.success) {
        return json<ActionData>({ formErrors: parsed.error.format() });
      }

      try {
        await updateUser(user!.id, parsed.data);
        return {};
      } catch (error) {
        return json<ActionData>({
          submitError: "Something went wrong updating your account settings",
        });
      }

    default:
      throw badRequest("Unsupported Method");
  }
}

type LoaderData = {
  user: User;
};

export async function loader({ request }: LoaderArgs) {
  const sessionUser = await auth.isAuthenticated(request);
  const user = (await findUserById(sessionUser!.id)) as User;

  return json<LoaderData>({ user });
}
