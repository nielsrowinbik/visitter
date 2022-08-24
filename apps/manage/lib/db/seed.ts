import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const encryptedPassword = await hash("visittertest", 12);

  const niels = await prisma.user.upsert({
    where: { email: "hey@nielsbik.nl" },
    update: {},
    create: {
      email: "hey@nielsbik.nl",
      name: "Niels",
      password: encryptedPassword,
    },
  });

  await prisma.home.create({
    data: {
      name: "Fanta Sea",
      owner: {
        connect: {
          id: niels.id,
        },
      },
    },
  });

  await prisma.home.create({
    data: {
      name: "Deja Blue",
      owner: {
        connect: {
          id: niels.id,
        },
      },
    },
  });

  await prisma.home.create({
    data: {
      name: "Slow M'Ocean",
      owner: {
        connect: {
          id: niels.id,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
