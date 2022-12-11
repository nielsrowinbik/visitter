import * as z from "zod";

import { isNull } from "lodash";
import { isValidPhoneNumber } from "libphonenumber-js";

export const userPatchSchema = z.object({
  name: z
    .string({
      invalid_type_error: "This is not a valid name",
    })
    .min(2, "Your name should consist of at least two characters")
    .max(32, "Your name cannot consist of more than 32 characters")
    .optional(),
  phone: z
    .string()
    .refine(
      (val) => {
        if (isNull(val)) return true;
        return isValidPhoneNumber(val);
      },
      {
        message: "Please enter a valid phone number (including country code)",
      }
    )
    .optional(),
});
