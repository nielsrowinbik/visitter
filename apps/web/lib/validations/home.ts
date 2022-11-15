import * as z from "zod";

export const homeCreateSchema = z.object({
  name: z.string({ required_error: "Please give your vacation home a name" }),
});

export const homePatchSchema = z.object({
  name: z.string().optional(),
});
