import { NextRequest, NextResponse } from "next/server";
import { createBooking, findBookingsByHomeId } from "@/lib/bookings";

import type { Home } from "@prisma/client";
import { bookingCreateSchema } from "@/lib/validations/booking";
import { stringify } from "superjson";

type RouteParams = {
  params: {
    homeId: Home["id"];
  };
};

export const revalidate = 0;

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { homeId } = params;

  const bookings = await findBookingsByHomeId(homeId);

  return new NextResponse(stringify(bookings));
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { homeId } = params;

  const body = bookingCreateSchema.parse(await req.json());

  const booking = await createBooking(body, homeId);

  return new NextResponse(stringify(booking), { status: 201 });
}
