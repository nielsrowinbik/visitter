import * as dotenv from "dotenv";

import type { FullConfig } from "@playwright/test";
import { chromium } from "@playwright/test";

dotenv.config();

export default async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.context().addCookies([
    {
      name: "next-auth.session-token",
      value: process.env.E2E_TOKEN,
      domain: new URL(baseURL).hostname,
      path: "/",
    },
  ]);

  await page.context().storageState({
    // @ts-ignore
    path: storageState,
  });

  await browser.close();
}
