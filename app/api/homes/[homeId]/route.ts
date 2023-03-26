import { NextRequest, NextResponse } from "next/server";
import { deleteHome, updateHome } from "@/lib/homes";

import type { Home } from "@prisma/client";
import { homePatchSchema } from "@/lib/validations/home";

type RouteParams = {
  params: {
    homeId: Home["id"];
  };
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { homeId } = params;

  await deleteHome(homeId);

  return new NextResponse(undefined, { status: 204 });
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const homeId = params.homeId;

  const body = homePatchSchema.parse(await req.json());

  const home = await updateHome(homeId, body);

  if (!home) {
    // Home didn't exist
    return new NextResponse(undefined, { status: 404 });
  }

  return new NextResponse(undefined, { status: 204 });
}
