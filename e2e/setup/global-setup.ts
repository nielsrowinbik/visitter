import * as dotenv from "dotenv";

import type { FullConfig } from "@playwright/test";
import { addMonths } from "date-fns";
import { chromium } from "@playwright/test";

dotenv.config();

export default async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const sessionToken = process.env.E2E_TOKEN as string;

  const expires = addMonths(new Date(), 1);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.context().addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: new URL(baseURL!).hostname,
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      expires: expires.getTime() / 1000,
    },
  ]);

  await page.context().storageState({
    // @ts-ignore
    path: storageState,
  });

  await browser.close();
}
