import { deleteBookingsForHomeId } from "./bookings";

export type Home = {
  created: number;
  id: string;
  name: string;
  shared: boolean;
};

export const createHome = async (
  name: string,
  ownerId: string
): Promise<Home> => {
  return {} as Home;
};

export const deleteHome = async (homeId: string): Promise<void> => {
  await deleteBookingsForHomeId(homeId);
  return;
};

export const findHomeById = async (
  homeId: string
): Promise<Home | undefined> => {
  return {} as Home;
};

export const findHomeByShareKey = async (
  shareKey: string
): Promise<Home | undefined> => {
  return {} as Home;
};

export const findHomesByUserId = async (userId: string): Promise<Home[]> => {
  return [] as Home[];
};

export const updateHome = async (
  homeId: string,
  homeData: Partial<Home>
): Promise<Home> => {
  return {} as Home;
};
