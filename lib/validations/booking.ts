import { isBefore, parseISO } from "date-fns";

import { z } from "zod";

export const bookingCreateSchema = z
  .object({
    name: z.string(),
    startDate: z.preprocess((arg) => {
      if (typeof arg === "string") return parseISO(arg);
      return arg;
    }, z.date({ required_error: "Please enter a start date for this booking" })),
    endDate: z.preprocess((arg) => {
      if (typeof arg == "string") return parseISO(arg);
      return arg;
    }, z.date({ required_error: "Please enter an end date for this booking" })),
  })
  .refine(
    ({ startDate, endDate }) =>
      !isBefore(new Date(endDate), new Date(startDate)),
    { message: "End date cannot be before start date", path: ["endDate"] }
  );
