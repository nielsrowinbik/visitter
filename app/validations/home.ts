import { z } from "zod";

export const homeCreateSchema = z.object({
  name: z
    .string({ required_error: "Please give your vacation home a name" })
    .min(3, "Please give your vacation home a name"),
});

export const homePatchSchema = homeCreateSchema.partial();
