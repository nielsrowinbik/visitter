import { Controller, useForm } from "react-hook-form";

import { Button } from "ui";
import { DateRangePicker } from "@mantine/dates";
import Router from "next/router";
import { mutate } from "swr";
import superagent from "superagent";
import { useState } from "react";

type Props = {
  homeId: string;
};

type FormValues = {
  range: [Date, Date];
};

export const BookingAddForm = ({ homeId }: Props) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<FormValues>();

  // TODO: Error handling
  const onSubmit = handleSubmit(async ({ range }) => {
    await superagent.post(`/api/homes/${homeId}/bookings`).send({
      endDate: range[1],
      startDate: range[0],
    });
    await mutate(`/api/homes/${homeId}/bookings`);
    await Router.push(`/${homeId}`);
  });

  return (
    <form
      className="mx-auto flex max-w-md flex-1 flex-col space-y-8"
      onSubmit={onSubmit}
    >
      <h2>Booking details</h2>
      {/* TODO: Replace with custom implementation (no Mantine) */}
      <Controller
        control={control}
        name="range"
        render={({ field }) => (
          <DateRangePicker
            description="Period during which your vacation home is unavailable."
            label="Period"
            required
            {...field}
          />
        )}
        rules={{ required: true }}
      />

      <Button disabled={isSubmitting} type="submit">
        Add booking
      </Button>
    </form>
  );
};
