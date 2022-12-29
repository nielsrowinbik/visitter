import { endOfWeek, format, startOfWeek } from "date-fns";
import { expect, test } from "@playwright/test";

const HOME_NAME = "Fanta Sea";
const BOOKING_NAME = "End to end test";

test.describe("The dashboard", () => {
  // @ts-expect-error
  test.use({ storageState: {} });

  test("should redirect to the login page when unauthed", async ({ page }) => {
    await page.goto("/homes");

    await expect(page).toHaveURL("/login");
  });
});

test.describe("The dashboard", () => {
  test("should allow the user to create a new vacation home", async ({
    page,
  }) => {
    await page.goto("/homes");

    await page
      .getByRole("button")
      .filter({ hasText: "New vacation home" })
      .first()
      .click();

    await page.getByLabel("name").fill(HOME_NAME);
    await page
      .getByRole("button")
      .filter({ hasText: "Create vacation home" })
      .click();

    await page.waitForURL("/home/**");

    await expect(page.getByText(HOME_NAME, { exact: true })).toBeVisible();
  });

  test("should allow the user to add a booking to a home", async ({ page }) => {
    await page.goto("/homes");

    await page.getByRole("listitem").filter({ hasText: HOME_NAME }).click();

    const booking = page
      .getByRole("listitem")
      .filter({ hasText: BOOKING_NAME });

    await expect(booking).not.toBeVisible();

    await page
      .getByRole("button")
      .filter({ hasText: "New booking" })
      .first()
      .click();

    await page.getByLabel("name").fill(BOOKING_NAME);
    await page.getByLabel("Start date").click();
    await page.getByText("13").click();
    await page.getByText("15").click();
    await page.getByRole("button").filter({ hasText: "Done" }).click();
    await page
      .getByRole("button")
      .filter({ hasText: "Create booking" })
      .click();

    await expect(booking).toBeVisible();
  });

  test("should allow the user to delete a booking", async ({ page }) => {
    await page.goto("/homes");

    await page
      .getByRole("listitem")
      .filter({ hasText: HOME_NAME })
      .first()
      .click();

    await page
      .getByRole("listitem")
      .filter({ hasText: BOOKING_NAME })
      .first()
      .getByRole("button") // TODO: We should probably be a bit more specific here. Button probably isn't accessible enough.
      .click();

    await page
      .getByRole("dialog", { name: "Are you sure?" })
      .getByRole("button")
      .filter({ hasText: "Delete booking" })
      .click();

    await expect(
      page.getByRole("listitem").filter({ hasText: BOOKING_NAME })
    ).not.toBeVisible();
  });

  test("should allow the user to delete a vacation home", async ({ page }) => {
    await page.goto("/homes");

    const home = page.getByRole("listitem").filter({ hasText: HOME_NAME });

    await home.click();

    await page.getByRole("button").filter({ hasText: "Settings" }).click();

    await page.getByRole("button").filter({ hasText: "Delete home" }).click();

    await page
      .getByRole("dialog", { name: "Are you sure?" })
      .getByRole("button")
      .filter({ hasText: "Delete home" })
      .click();

    await expect(page).toHaveURL("/homes");
    await expect(home).not.toBeVisible();
  });
});
