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
  return {} as Booking;
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  return;
};

export const deleteBookingsForHomeId = async (
  homeId: string
): Promise<void> => {
  return;
};

export const findAllBookingsByHomeId = async (
  homeId: string
): Promise<Booking[]> => {
  return [] as Booking[];
};

export const findCurrentAndFutureBookingsByHomeId = async (
  homeId: string
): Promise<Booking[]> => {
  return [] as Booking[];
};

export const findPastBookingsByHomeId = async (
  homeId: string
): Promise<Booking[]> => {
  return [] as Booking[];
};

export const findBookingById = async (
  bookingId: string
): Promise<Booking | undefined> => {
  return {} as Booking;
};
