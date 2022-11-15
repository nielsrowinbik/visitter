// src/client.ts
import { PrismaClient } from "@prisma/client";
var prisma = global.prisma || new PrismaClient();
var db = prisma;
if (process.env.NODE_ENV !== "production")
  global.prisma = prisma;
export {
  db,
  prisma
};
//# sourceMappingURL=index.mjs.map