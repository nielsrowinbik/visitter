import { expect, test } from "@playwright/test";

// Unauthed:
test.describe("The get started page", () => {
  // @ts-ignore
  test.use({ storageState: {} });

  test("should allow for navigation to the login page", async ({ page }) => {
    await page.goto("/get-started");
    await page.click("text=Sign in");

    await expect(page).toHaveURL("/login");
    await expect(page.locator("h2")).toContainText("Sign in to your account");
  });
});

// Authed:
test.describe("The get started page", () => {
  test("should redirect to the dashboard when the user is signed in", async ({
    page,
  }) => {
    await page.goto("/get-started");

    await expect(page).toHaveURL("/homes");
  });
});
