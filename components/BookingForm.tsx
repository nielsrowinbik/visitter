"use client";

import { Booking, Home } from "@prisma/client";

import type { DateChangeCallBack } from "@/components/DateRangeInput";
import { DateRangeInput } from "@/components/DateRangeInput";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { SubmitHandler } from "react-hook-form";
import { bookingCreateSchema } from "@/lib/validations/booking";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof bookingCreateSchema>;

type BookingFormProps = {
  defaultValues?: Partial<Booking>;
  homeId: Home["id"];
  onSubmit: SubmitHandler<FormData>;
};

export function BookingForm({
  defaultValues,
  homeId,
  ...props
}: BookingFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(bookingCreateSchema),
  });

  const handleStartDateChange: DateChangeCallBack = (newStartDate) => {
    // @ts-ignore
    setValue("startDate", newStartDate);
  };

  const handleEndDateChange: DateChangeCallBack = (newEndDate) => {
    // @ts-ignore
    setValue("endDate", newEndDate);
  };

  async function onSubmit(data: FormData) {
    await props.onSubmit(data);
    reset();
  }

  return (
    <form
      className="space-y-6"
      id="booking-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        description="You can use the booking's name to indicate who or what the booking is for."
        errorText={errors.name?.message}
        required
        label="Name"
        {...register("name")}
      />
      <DateRangeInput
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        value={{
          start: defaultValues?.startDate || null,
          end: defaultValues?.endDate || null,
        }}
      >
        {({ startDateProps, endDateProps }) => (
          <div className="flex items-end space-x-3">
            <Input {...startDateProps} />
            <Icon.ArrowRight className="mb-4 h-4 w-4 flex-shrink-0" />
            <Input {...endDateProps} />
          </div>
        )}
      </DateRangeInput>
    </form>
  );
}
