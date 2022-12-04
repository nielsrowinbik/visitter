/** @type {import('@playwright/test').PlaywrightTestConfig} */

module.exports = {
  globalSetup: "./e2e/setup/global-setup.ts",
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    storageState: "storageState.json",
  },
};
