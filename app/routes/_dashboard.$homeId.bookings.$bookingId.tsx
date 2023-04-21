import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useNavigate, useNavigation } from "@remix-run/react";
import { badRequest, notFound } from "remix-utils";
import { confirmSubmit, toObject } from "~/utils";
import {
  deleteBooking,
  findBookingById,
  updateBooking,
} from "~/services/bookings.server";
import { json, useActionData, useLoaderData } from "~/utils/superjson";
import { useEffect, useState } from "react";

import type { Booking } from "@prisma/client";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Dashboard } from "~/components/Dashboard";
import { FormField } from "~/components/FormField";
import { bookingPutSchema } from "~/validations/booking";
import { redirect } from "@remix-run/node";
import toast from "react-hot-toast";
import type { z } from "zod";

export default function BookingEditPage() {
  const navigate = useNavigate();
  const { formMethod, state } = useNavigation();
  const { booking } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const { formErrors, submitError } = actionData!;

  const isDeleting = state !== "idle" && formMethod === "DELETE";
  const isSaving = state !== "idle" && formMethod === "PUT";
  const isBusy = isDeleting || isSaving;

  const [startDate, setStartDate] = useState(
    booking.startDate.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    booking.startDate.toISOString().split("T")[0]
  );

  useEffect(() => {
    if (submitError) {
      toast.error(submitError);
    }
  }, [submitError]);

  return (
    <Dashboard>
      <Dashboard.Header title="Edit booking" />
      <div className="space-y-10">
        <Form className="max-w-md space-y-6" method="PUT">
          <FormField
            defaultValue={booking.name}
            description="You can use the booking's name to indicate who or what the booking is for."
            disabled={isSaving}
            error={formErrors?.name}
            htmlFor="name"
            label="Name"
            required
            type="text"
          />
          <FormField
            disabled={isSaving}
            error={formErrors?.startDate}
            htmlFor="startDate"
            label="Start date"
            onChange={(e) => setStartDate(e.target.value)}
            required
            type="date"
            value={startDate}
          />
          <FormField
            disabled={isSaving}
            error={formErrors?.endDate}
            htmlFor="endDate"
            label="End date"
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            type="date"
            value={endDate}
          />
          <div className="flex space-x-3">
            <Button disabled={isBusy} loading={isSaving} type="submit">
              Save booking
            </Button>
            <Button
              disabled={isBusy}
              onClick={() => navigate(-1)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </Form>
        <hr />
        <Form
          method="DELETE"
          onSubmit={confirmSubmit("Are you absolutely sure?")}
        >
          <Card variant="danger">
            <Card.Content>
              <h3>Delete booking</h3>
              <p className="mb-0">
                This will irreversibly delete this booking.
              </p>
            </Card.Content>
            <Card.Action>
              <Button
                disabled={isBusy}
                loading={isDeleting}
                type="submit"
                variant="danger"
              >
                Delete booking
              </Button>
            </Card.Action>
          </Card>
        </Form>
      </div>
    </Dashboard>
  );
}

type ActionData = {
  formErrors?: z.ZodFormattedError<z.infer<typeof bookingPutSchema>>;
  submitError?: string;
};

export async function action({ request, params }: ActionArgs) {
  const { method } = request;
  const { homeId, bookingId } = params;

  switch (method) {
    case "DELETE":
      try {
        await deleteBooking(bookingId!);
        return redirect(`/${homeId}`);
      } catch (error) {
        return json<ActionData>({
          submitError: "Something went wrong deleting this booking",
        });
      }

    case "PUT":
      const parsed = bookingPutSchema.safeParse(
        toObject(await request.formData())
      );

      if (!parsed.success) {
        // FIXME: type error below
        // @ts-expect-error
        return json<ActionData>({ formErrors: parsed.error.format() });
      }

      try {
        await updateBooking(bookingId!, parsed.data);
        return redirect(`/${homeId}`);
      } catch (error) {
        return json<ActionData>({
          submitError: "Something went wrong updating this booking",
        });
      }

    default:
      throw badRequest("Unsupported Method");
  }
}

type LoaderData = {
  booking: Booking;
};

export async function loader({ params: { bookingId } }: LoaderArgs) {
  const booking = await findBookingById(bookingId!);

  if (!booking) throw notFound({});

  return json<LoaderData>({ booking });
}
