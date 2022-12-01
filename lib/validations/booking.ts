import * as z from "zod";

export const bookingCreateSchema = z.object({
  name: z.string(),
  startDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: "Please enter a start date for this booking" })),
  endDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: "Please enter an end date for this booking" })),
});
