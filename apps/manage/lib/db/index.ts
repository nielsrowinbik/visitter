import { PrismaClient } from "@prisma/client";
export type { Prisma } from "@prisma/client";

const PRISMA_PROPERTY_NAME = `__prevent-name-collision__prisma`;

type GlobalThisWithPrismaClient = typeof globalThis & {
  [PRISMA_PROPERTY_NAME]: PrismaClient;
};

const getPrismaClient = () => {
  if (process.env.NODE_ENV === `production`) {
    return new PrismaClient();
  } else {
    const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
    if (!newGlobalThis[PRISMA_PROPERTY_NAME]) {
      newGlobalThis[PRISMA_PROPERTY_NAME] = new PrismaClient();
    }
    return newGlobalThis[PRISMA_PROPERTY_NAME];
  }
};

const prisma = getPrismaClient();

export default prisma;
