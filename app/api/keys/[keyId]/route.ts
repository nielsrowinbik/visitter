import { NextRequest, NextResponse } from "next/server";

import { deleteKey } from "@/lib/keys";

type RouteParams = {
  params: {
    keyId: string;
  };
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { keyId } = params;

  await deleteKey(keyId);

  return new NextResponse(undefined, { status: 204 });
}
