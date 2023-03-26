import { NextRequest, NextResponse } from "next/server";

import { findSubscriptionByUserId } from "@/lib/subscription";
import { stringify } from "superjson";

type RouteParams = {
  params: {
    userId: string;
  };
};

export const revalidate = 0;

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { userId } = params;

  const subscription = await findSubscriptionByUserId(userId);

  return new NextResponse(stringify(subscription));
}
