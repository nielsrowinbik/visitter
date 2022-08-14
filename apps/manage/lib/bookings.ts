import { randomUUID } from "crypto";

import db, { Timestamp } from "./db";

export type Booking = {
  created: number;
  endDate: number;
  id: string;
  startDate: number;
};

export const createBooking = async (
  homeId: string,
  startDate: number,
  endDate: number
): Promise<Booking> => {
  const id = randomUUID();
  const bookingRef = db.collection("bookings").doc(id);
  await bookingRef.set({
    created: Timestamp.now(),
    endDate: Timestamp.fromMillis(endDate),
    home: homeId,
    startDate: Timestamp.fromMillis(startDate),
  });
  const booking = await bookingRef.get();
  const data = booking.data();

  return {
    ...data,
    created: data?.created.toMillis(),
    endDate: data?.endDate.toMillis(),
    id: booking.id,
    startDate: data?.startDate.toMillis(),
  } as Booking;
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  await db.collection("bookings").doc(bookingId).delete();
  return;
};

export const deleteBookingsForHomeId = async (
  homeId: string
): Promise<void> => {
  const bookings = await db
    .collection("bookings")
    .where("home", "==", homeId)
    .get();

  bookings.forEach((doc) => doc.ref.delete());

  return;
};

export const findAllBookingsByHomeId = async (
  homeId: string
): Promise<Booking[]> => {
  const { docs } = await db
    .collection("bookings")
    .where("home", "==", homeId)
    .get();

  const bookings = docs.map((doc) => {
    const data = doc.data();

    return {
      ...data,
      created: data?.created.toMillis(),
      endDate: data.endDate.toMillis(),
      id: doc.id,
      startDate: data.startDate.toMillis(),
    };
  });

  return bookings as Booking[];
};

export const findCurrentAndFutureBookingsByHomeId = async (
  homeId: string
): Promise<Booking[]> => {
  const { docs } = await db
    .collection("bookings")
    .where("home", "==", homeId)
    .where("endDate", ">=", Timestamp.now())
    .get();

  const bookings = docs.map((doc) => {
    const data = doc.data();

    return {
      ...data,
      created: data?.created.toMillis(),
      endDate: data.endDate.toMillis(),
      id: doc.id,
      startDate: data.startDate.toMillis(),
    };
  });

  return bookings as Booking[];
};

export const findPastBookingsByHomeId = async (
  homeId: string
): Promise<Booking[]> => {
  const { docs } = await db
    .collection("bookings")
    .where("home", "==", homeId)
    .where("endDate", "<", Timestamp.now())
    .get();

  const bookings = docs.map((doc) => {
    const data = doc.data();

    return {
      ...data,
      created: data?.created.toMillis(),
      endDate: data.endDate.toMillis(),
      id: doc.id,
      startDate: data.startDate.toMillis(),
    };
  });

  return bookings as Booking[];
};

export const findBookingById = async (
  bookingId: string
): Promise<Booking | undefined> => {
  const booking = await db.collection("bookings").doc(bookingId).get();
  const data = booking.data();

  if (!data) return undefined;

  return {
    ...data,
    created: data.created.toMillis(),
    endDate: data.endDate.toMillis(),
    id: data.id,
    startDate: data.startDate.toMillis(),
  } as Booking;
};
