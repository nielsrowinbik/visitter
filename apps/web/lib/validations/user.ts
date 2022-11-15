import * as z from "zod";

export const userPatchSchema = z.object({
  name: z
    .string({
      invalid_type_error: "This is not a valid name",
    })
    .min(2, "Your name should consist of at least two characters")
    .max(32, "Your name cannot consist of more than 32 characters")
    .nullable(),
});
