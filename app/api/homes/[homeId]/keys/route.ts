import { NextRequest, NextResponse } from "next/server";
import { createKey, findKeysByHomeId } from "@/lib/keys";

import type { Home } from "@prisma/client";
import { stringify } from "superjson";

type RouteParams = {
  params: {
    homeId: Home["id"];
  };
};

export const revalidate = 0;

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { homeId } = params;

  const keys = await findKeysByHomeId(homeId);

  return new NextResponse(stringify(keys));
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { homeId } = params;

  const key = await createKey(homeId);

  return new NextResponse(stringify(key), { status: 201 });
}
