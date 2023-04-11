import type { LoaderArgs } from "@remix-run/node";
import { auth } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  await auth.authenticate("email-link", request, {
    successRedirect: "/homes",
    failureRedirect: "/login",
  });
};
