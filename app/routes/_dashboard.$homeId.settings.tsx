import type {
  ActionArgs,
  LoaderArgs,
  V2_MetaArgs,
  V2_MetaDescriptor,
} from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { badRequest, notFound } from "remix-utils";
import { confirmSubmit, toObject } from "~/utils";
import { deleteHome, findHomeById, updateHome } from "~/services/homes.server";
import { json, useActionData, useLoaderData } from "~/utils/superjson";

import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Dashboard } from "~/components/Dashboard";
import { FormField } from "~/components/FormField";
import type { Home } from "@prisma/client";
import { deserialize } from "superjson";
import { homePatchSchema } from "~/validations/home";
import { redirect } from "@remix-run/node";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type { z } from "zod";

export function meta({ data }: V2_MetaArgs): V2_MetaDescriptor[] {
  const { home } = deserialize<LoaderData>(data);
  return [{ title: `Settings for ${home.name}` }];
}

export default function HomeSettings() {
  const { formMethod, state } = useNavigation();
  const { home } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();

  const isSaving = state !== "idle" && formMethod === "PATCH";
  const isDeleting = state !== "idle" && formMethod === "DELETE";
  const isBusy = isSaving || isDeleting;

  useEffect(() => {
    if (actionData?.submitError) {
      toast.error(actionData?.submitError);
    }
  }, [actionData?.submitError]);

  return (
    <Dashboard>
      <Dashboard.Header title={`Settings for ${home.name}`} />
      <div className="space-y-10">
        <Form className="max-w-md space-y-6" method="PATCH">
          <FormField
            defaultValue={home.name}
            description="Enter a name for your vacation home."
            disabled={isBusy}
            error={actionData?.formErrors?.name}
            htmlFor="name"
            label="Name"
            required
            type="text"
          />
          <Button disabled={isBusy} loading={isSaving} type="submit">
            Save home settings
          </Button>
        </Form>
        <hr />
        <Form
          method="DELETE"
          onSubmit={confirmSubmit("Are you absolutely sure?")}
        >
          <Card variant="danger">
            <Card.Content>
              <h3>Delete vacation home</h3>
              <p className="mb-0">
                This will delete <strong>{home.name}</strong> and all of its
                bookings. Any shared links will stop working.
              </p>
            </Card.Content>
            <Card.Action>
              <Button
                disabled={isBusy}
                loading={isDeleting}
                type="submit"
                variant="danger"
              >
                Delete home
              </Button>
            </Card.Action>
          </Card>
        </Form>
      </div>
    </Dashboard>
  );
}

type ActionData = {
  formErrors?: z.ZodFormattedError<z.infer<typeof homePatchSchema>>;
  submitError?: string;
};

export async function action({ request, params }: ActionArgs) {
  const { method } = request;
  const { homeId } = params;

  switch (method) {
    case "DELETE":
      try {
        await deleteHome(homeId!);
        return redirect("/homes");
      } catch (error) {
        return json<ActionData>({
          submitError: "Something went wrong deleting your vacation home",
        });
      }

    case "PATCH":
      const parsed = homePatchSchema.safeParse(
        toObject(await request.formData())
      );

      if (!parsed.success) {
        return json<ActionData>({ formErrors: parsed.error.format() });
      }

      try {
        await updateHome(homeId!, parsed.data);
        return {};
      } catch (error) {
        return json<ActionData>({
          submitError:
            "Something went wrong updating your vacation home's settings",
        });
      }

    default:
      throw badRequest("Unsupported Method");
  }
}

type LoaderData = {
  home: Home;
};

export async function loader({ params: { homeId } }: LoaderArgs) {
  const home = await findHomeById(homeId!);

  if (!home) throw notFound({});

  return json<LoaderData>({
    home,
  });
}
