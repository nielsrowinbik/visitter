import { expect, test } from "@playwright/test";

test.describe("The dashboard", () => {
  test("should render a list of vacation homes", async ({ page }) => {
    await page.goto("/homes");
  });
});
