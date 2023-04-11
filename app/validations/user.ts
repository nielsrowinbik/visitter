import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const email = z.string().email();
const name = z
  .string()
  .min(2, "Your name should consist of at least two characters");
const phone = z
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
  .transform((e) => (e === "" ? null : e));

export const userCreateSchema = z.object({
  email,
  name,
});

export const userPatchSchema = z.object({
  name,
  phone,
});
