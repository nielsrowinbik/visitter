import { NextRequest, NextResponse } from "next/server";
import {
  createHome,
  findHomesByUserId,
  findHomesCountByUserId,
} from "@/lib/homes";

import { findSubscriptionByUserId } from "@/lib/subscription";
import { getCurrentUser } from "@/lib/session";
import { homeCreateSchema } from "@/lib/validations/home";
import { stringify } from "superjson";

export const revalidate = 0;

export async function GET() {
  const user = await getCurrentUser();

  const homes = await findHomesByUserId(user!.id);

  return new NextResponse(stringify(homes));
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const { isPremium } = await findSubscriptionByUserId(user!.id);

  if (!isPremium) {
    // User has no subscription. Check if user has already created a home.
    // Deny the request if he has.
    const count = await findHomesCountByUserId(user!.id);

    if (count >= 1) {
      return new NextResponse(undefined, { status: 402 });
    }
  }

  const body = homeCreateSchema.parse(req.body);

  const home = await createHome(user!.id, body);

  return new NextResponse(stringify(home), { status: 201 });
}
