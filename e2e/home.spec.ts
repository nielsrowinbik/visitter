import { expect, test } from "@playwright/test";

test("should navigate to the register page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'Get started for free' and click on it
  await page.click("text=Get started for free");
  // The new URL should be "/get-started" (baseURL is used there)
  await expect(page).toHaveURL("/get-started");
  // The new page should contain an h2 with "Get started for free"
  await expect(page.locator("h2")).toContainText("Get started for free");
});
