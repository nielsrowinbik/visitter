import { endOfWeek, format, startOfToday, startOfWeek } from "date-fns";
import { expect, test } from "@playwright/test";

import { db } from "~/utils/prisma.server";

const BOOKING_ADD_NAME = "E2E Booking Add";
const BOOKING_DELETE_NAME = "E2E Booking Delete";

// Before these run, insert a home into the DB that we can add our bookings to
test.beforeAll(async () => {
  const today = startOfToday();

  await db.home.create({
    data: {
      id: "e2e_bookings",
      name: "E2E Bookings",
      owner: { connect: { id: "e2e" } },
      bookings: {
        create: [
          {
            name: BOOKING_DELETE_NAME,
            startDate: startOfWeek(today),
            endDate: endOfWeek(today),
          },
        ],
      },
    },
  });
});

// After these have run, delete the inserted home
test.afterAll(async () => {
  await db.home.delete({ where: { id: "e2e_bookings" } });
});

test("Users can add a booking to a vacation home", async ({ page }) => {
  await page.goto("/e2e_bookings");

  await page.getByRole("button", { name: "New booking" }).first().click();

  await page.waitForURL("/e2e_bookings/bookings/new");

  const today = startOfToday();
  const start = startOfWeek(today);
  const end = endOfWeek(today);

  await page.getByLabel("Name").fill(BOOKING_ADD_NAME);
  await page.getByLabel("Start date").fill(format(start, "yyyy-MM-dd"));
  await page.getByLabel("End date").fill(format(end, "yyyy-MM-dd"));
  await page.getByRole("button", { name: "Create booking" }).click();

  await page.waitForURL("/e2e_bookings");

  const booking = page
    .getByRole("listitem")
    .filter({ hasText: BOOKING_ADD_NAME });

  await expect(booking).toBeVisible();
});

test("Users can delete a booking from a vacation home", async ({ page }) => {
  // Make sure to accept any confirm dialogs:
  page.on("dialog", (dialog) => dialog.accept());

  await page.goto("/e2e_bookings");

  const booking = page
    .getByRole("listitem")
    .filter({ hasText: BOOKING_DELETE_NAME });

  // TODO: Improve
  await booking.locator("form").getByRole("button").click();

  await expect(booking).not.toBeVisible();
});
