import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const now = new Date();

async function main() {
  const encryptedPassword = await hash("visittertest", 12);

  // Add a user called `Niels`:
  const niels = await prisma.user.upsert({
    where: { email: "hey@nielsbik.nl" },
    update: {},
    create: {
      email: "hey@nielsbik.nl",
      name: "Niels",
      password: encryptedPassword,
    },
  });

  // Add a home called `Fanta Sea`:
  const fantaSea = await prisma.home.create({
    data: {
      name: "Fanta Sea",
      owner: {
        connect: {
          id: niels.id,
        },
      },
    },
  });

  // Add a booking for `Fanta Sea` for the entire current month:
  await prisma.booking.create({
    data: {
      endDate: startOfMonth(now),
      home: { connect: { id: fantaSea.id } },
      startDate: endOfMonth(now),
    },
  });

  // Add a booking for `Fanta Sea` for the entire current week:
  await prisma.booking.create({
    data: {
      endDate: startOfWeek(now),
      home: { connect: { id: fantaSea.id } },
      startDate: endOfWeek(now),
    },
  });

  // Add a home called `Deja Blue` without any bookings:
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

  // Add a home called `Slow M'Ocean` without any bookings:
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
