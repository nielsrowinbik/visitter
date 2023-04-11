import type { ActionArgs, V2_MetaDescriptor } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { json, useActionData } from "~/utils/superjson";

import { Button } from "~/components/Button";
import { Dashboard } from "~/components/Dashboard";
import { FormField } from "~/components/FormField";
import { auth } from "~/services/auth.server";
import { badRequest } from "remix-utils";
import { createHome } from "~/services/homes.server";
import { homeCreateSchema } from "~/validations/home";
import { redirect } from "@remix-run/node";
import { toObject } from "~/utils";
import { useNavigate } from "@remix-run/react";
import type { z } from "zod";

export function meta(): V2_MetaDescriptor[] {
  return [{ title: "New home" }];
}

export default function NewHomePage() {
  const navigate = useNavigate();
  const { formMethod, state } = useNavigation();
  const errors = useActionData<ActionData>();

  const isSaving = state !== "idle" && formMethod === "POST";

  return (
    <Dashboard>
      <Dashboard.Header title="New home" />
      <Form className="space-y-6 max-w-md" method="POST">
        <FormField
          disabled={isSaving}
          error={errors?.name}
          htmlFor="name"
          label="Name"
          placeholder="Fanta Sea"
          required
          type="text"
        />
        <div className="flex space-x-3">
          <Button loading={isSaving} type="submit">
            Create vacation home
          </Button>
          <Button onClick={() => navigate(-1)} type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </Form>
    </Dashboard>
  );
}

type ActionData = z.ZodFormattedError<z.infer<typeof homeCreateSchema>>;

export async function action({ request }: ActionArgs) {
  const sessionUser = await auth.isAuthenticated(request);
  const { method } = request;

  switch (method) {
    case "POST":
      const parsed = homeCreateSchema.safeParse(
        toObject(await request.formData())
      );

      if (!parsed.success) {
        return json<ActionData>(parsed.error.format());
      }

      const home = await createHome(sessionUser!.id, parsed.data);
      return redirect(`/${home.id}`);

    default:
      throw badRequest("Unsupported Method");
  }
}
