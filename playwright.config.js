/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  globalSetup: "./e2e/setup/global-setup.ts",
  timeout: 10 * 1000,
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    storageState: "./e2e/setup/storageState.json",
  },
};
