import { expect, test } from "@playwright/test";

import { db } from "~/utils/prisma.server";

const HOME_ADD_NAME = "E2E Home Add";
const HOME_DELETE_NAME = "E2E Home Delete";

// Before these run, insert a home into the DB that we can delete later
test.beforeAll(async () => {
  await db.home.create({
    data: {
      name: HOME_DELETE_NAME,
      owner: { connect: { id: "e2e" } },
    },
  });
});

test.afterAll(async () => {
  await db.home.deleteMany({ where: { name: { startsWith: "E2E Home" } } });
});

test("Users can create a new vacation home", async ({ page }) => {
  await page.goto("/homes");

  await page.getByRole("button", { name: "New vacation home" }).first().click();

  await page.waitForURL("/new");

  await page.getByLabel("name").fill(HOME_ADD_NAME);
  await page.getByRole("button", { name: "Create vacation home" }).click();

  await page.waitForLoadState();

  await expect(page.getByText(HOME_ADD_NAME, { exact: true })).toBeVisible();
});

test("Users can delete a vacation home", async ({ page }) => {
  // Make sure to accept any confirm dialogs:
  page.on("dialog", (dialog) => dialog.accept());

  await page.goto("/homes");

  const home = page.getByRole("listitem").filter({ hasText: HOME_DELETE_NAME });
  await home.click();

  await page.getByRole("button").filter({ hasText: "Settings" }).click();

  await page.getByRole("button").filter({ hasText: "Delete home" }).click();

  await page.waitForURL("/homes");
  await expect(home).not.toBeVisible();
});
