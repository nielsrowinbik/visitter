import * as dotenv from "dotenv";

import { chromium } from "@playwright/test";
import { encode } from "next-auth/jwt";
import path from "path";

dotenv.config();

export default async function globalSetup() {
  const storageState = path.resolve(__dirname, "storageState.json");
  const baseURL =
    process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000";
  const domain = new URL(baseURL).hostname;

  const secure = domain !== "localhost";
  const sessionToken = await encode({
    // @ts-ignore
    token: {
      email: "e2e@nielsbik.nl",
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.context().addCookies([
    {
      name: `${secure ? "__Secure-" : ""}next-auth.session-token`,
      value: sessionToken,
      domain,
      path: "/",
      secure,
      httpOnly: true,
    },
  ]);

  await page.context().storageState({
    // @ts-ignore
    path: storageState,
  });

  await browser.close();
}
