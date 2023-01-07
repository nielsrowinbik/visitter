import * as z from "zod";

import { isValidPhoneNumber } from "libphonenumber-js";

export const userPatchSchema = z.object({
  name: z
    .union([
      z.string().min(2, "Your name should consist of at least two characters"),
      z.string().length(0),
    ])
    .nullable()
    .transform((e) => (e === "" ? null : e)),
  phone: z
    .union([
      z
        .string()
        .refine(
          isValidPhoneNumber,
          "Please enter a valid phone number including country code"
        ),
      z.string().length(0),
    ])
    .nullable()
    .transform((e) => (e === "" ? null : e)),
});
