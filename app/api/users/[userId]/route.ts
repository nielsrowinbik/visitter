import { NextRequest, NextResponse } from "next/server";
import { deleteUser, findUserById, updateUser } from "@/lib/users";

import { getCurrentUser } from "@/lib/session";
import { stringify } from "superjson";
import { stripe } from "@/lib/stripe";
import { userPatchSchema } from "@/lib/validations/user";

type RouteParams = {
  params: {
    userId: string;
  };
};

export const revalidate = 0;

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { userId } = params;
  const user = await getCurrentUser();

  // Deny the request if this is not the current user changes his own information:
  if (user!.id !== userId) {
    return new NextResponse(undefined, { status: 403 });
  }

  await deleteUser(userId);

  return new NextResponse(undefined, { status: 204 });
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { userId } = params;

  const user = await findUserById(userId);

  return new NextResponse(stringify(user));
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { userId } = params;
  const user = await getCurrentUser();

  // Deny the request if this is not the current user changes his own information:
  if (user?.id !== userId) {
    return new NextResponse(undefined, { status: 403 });
  }

  const body = userPatchSchema.parse(await req.json());

  // Update the local user:
  const dbUser = await updateUser(userId, body);

  // Also update the Stripe customer:
  if (dbUser.stripeCustomerId && dbUser.name) {
    await stripe.customers.update(dbUser.stripeCustomerId, {
      name: dbUser.name,
    });
  }

  return new NextResponse(undefined, { status: 204 });
}
