import db, { Timestamp } from "./db";

import { deleteBookingsForHomeId } from "./bookings";
import uuid from "uuid4";

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
  // TODO: Check if owner already has one vacation home. If yes, don't save a new one.

  const id = uuid();
  const homeRef = db.collection("homes").doc(id);
  await homeRef.set({
    created: Timestamp.now(),
    name,
    owner: ownerId,
    shared: false,
  });
  const home = await homeRef.get();

  return {
    ...home.data(),
    id: home.id,
  } as Home;
};

export const deleteHome = async (homeId: string): Promise<void> => {
  await db.collection("homes").doc(homeId).delete();
  await deleteBookingsForHomeId(homeId);
  return;
};

export const findHomeById = async (
  homeId: string
): Promise<Home | undefined> => {
  const home = await db.collection("homes").doc(homeId).get();
  const data = home.data();

  if (!data) return undefined;

  return {
    ...data,
    created: data.created.toMillis(),
    id: home.id,
  } as Home;
};

export const findHomeByShareKey = async (
  shareKey: string
): Promise<Home | undefined> => {
  const { docs } = await db
    .collection("homes")
    .where("shareKey", "==", shareKey)
    .get();

  // This should only be 1 or 0 homes, so we can
  // safely discard any other results:
  const homes = docs.slice(0, 1).map((doc) => {
    const data = doc.data();

    return {
      ...data,
      created: data.created.toMillis(),
      id: doc.id,
    };
  });

  // Because the array only contains 1 or 0 homes,
  // we can safely return the first item (undefined if
  // it doesn't exist):
  return homes[0] as Home;
};

export const findHomesByUserId = async (userId: string): Promise<Home[]> => {
  const { docs } = await db
    .collection("homes")
    .where("owner", "==", userId)
    .get();

  const homes = docs.map((doc) => {
    const data = doc.data();

    return {
      ...data,
      created: data.created.toMillis(),
      id: doc.id,
    };
  });

  return homes as Home[];
};

export const updateHome = async (
  homeId: string,
  homeData: Partial<Home>
): Promise<Home> => {
  const homeRef = db.collection("homes").doc(homeId);
  await homeRef.update(homeData);
  const home = await homeRef.get();

  return {
    ...home.data(),
    id: home.id,
  } as Home;
};
