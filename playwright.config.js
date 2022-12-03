/** @type {import('@playwright/test').PlaywrightTestConfig} */

module.exports = {
  // webServer: {
  //   command: "npm run start",
  //   port: 3000,
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
  },
};
