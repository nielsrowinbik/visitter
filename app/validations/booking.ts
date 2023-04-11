import { isBefore } from "date-fns";
import { z } from "zod";

export const bookingPostSchema = z
  .object({
    name: z.string(),
    startDate: z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg;
    }, z.date({ required_error: "Please enter a start date for this booking" })),
    endDate: z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg;
    }, z.date({ required_error: "Please enter an end date for this booking" })),
  })
  .refine(({ startDate, endDate }) => !isBefore(endDate, startDate), {
    message: "End date cannot be before start date",
    path: ["endDate"],
  });

export const bookingPutSchema = bookingPostSchema;
