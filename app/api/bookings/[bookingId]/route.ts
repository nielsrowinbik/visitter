import { NextRequest, NextResponse } from "next/server";
import { deleteBooking, findBookingById, updateBooking } from "@/lib/bookings";

import { bookingCreateSchema } from "@/lib/validations/booking";
import { stringify } from "superjson";

type RouteParams = {
  params: {
    bookingId: string;
  };
};

export const revalidate = 0;

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { bookingId } = params;

  await deleteBooking(bookingId);

  return new NextResponse(undefined, { status: 204 });
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { bookingId } = params;

  const booking = await findBookingById(bookingId);

  return new NextResponse(stringify(booking));
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { bookingId } = params;

  const body = bookingCreateSchema.parse(await req.json());

  await updateBooking(bookingId, body);

  return new NextResponse(undefined, { status: 204 });
}
