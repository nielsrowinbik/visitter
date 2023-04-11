import type { LoaderArgs } from "@remix-run/node";
import { auth } from "~/services/auth.server";

export default function LogoutPage() {
  return null;
}

export async function loader({ request }: LoaderArgs) {
  await auth.logout(request, { redirectTo: "/" });
  return null;
}
