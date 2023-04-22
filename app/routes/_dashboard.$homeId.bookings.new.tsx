import { Form, useNavigation } from "@remix-run/react";
import { json, useActionData } from "~/utils/superjson";
import { useEffect, useState } from "react";

import type { ActionArgs } from "@remix-run/node";
import { Button } from "~/components/Button";
import { Dashboard } from "~/components/Dashboard";
import { FormField } from "~/components/FormField";
import { badRequest } from "remix-utils";
import { bookingPostSchema } from "~/validations/booking";
import { createBooking } from "~/services/bookings.server";
import { redirect } from "@remix-run/node";
import { toObject } from "~/utils";
import toast from "react-hot-toast";
import { useNavigate } from "@remix-run/react";
import type { z } from "zod";

export default function NewBookingPage() {
  const navigate = useNavigate();
  const { formMethod, state } = useNavigation();
  const actionData = useActionData<ActionData>();

  const isSaving = state !== "idle" && formMethod === "POST";

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  useEffect(() => {
    if (actionData?.submitError) {
      toast.error(actionData?.submitError);
    }
  }, [actionData?.submitError]);

  return (
    <Dashboard>
      <Dashboard.Header title="New booking" />
      <Form className="space-y-6" method="POST">
        <FormField
          description="You can use the booking's name to indicate who or what the booking is for."
          disabled={isSaving}
          error={actionData?.formErrors?.name}
          htmlFor="name"
          label="Name"
          required
          type="text"
        />
        <FormField
          disabled={isSaving}
          error={actionData?.formErrors?.startDate}
          htmlFor="startDate"
          label="Start date"
          onChange={(e) => setStartDate(e.target.value)}
          required
          type="date"
          value={startDate}
        />
        <FormField
          disabled={isSaving}
          error={actionData?.formErrors?.endDate}
          htmlFor="endDate"
          label="End date"
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          type="date"
          value={endDate}
        />
        <div className="flex space-x-3">
          <Button loading={isSaving} type="submit">
            Create booking
          </Button>
          <Button
            disabled={isSaving}
            onClick={() => navigate(-1)}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Dashboard>
  );
}

type ActionData = {
  formErrors?: z.ZodFormattedError<z.infer<typeof bookingPostSchema>>;
  submitError?: string;
};

export async function action({ request, params }: ActionArgs) {
  const { method } = request;
  const { homeId } = params;

  switch (method) {
    case "POST":
      const parsed = bookingPostSchema.safeParse(
        toObject(await request.formData())
      );

      if (!parsed.success) {
        // FIXME: type error below
        // @ts-expect-error
        return json<ActionData>({ formErrors: parsed.error.format() });
      }

      try {
        await createBooking(parsed.data, homeId!);
        return redirect(`/${homeId}`);
      } catch (error) {
        return json<ActionData>({
          submitError: "Something went wrong creating this booking",
        });
      }

    default:
      throw badRequest("Unsupported Method");
  }
}
