import * as dotenv from "dotenv";

import { chromium } from "@playwright/test";
import { createCookieSessionStorage } from "@remix-run/node";
import { db } from "~/utils/prisma.server";
import path from "path";

dotenv.config();

// FIXME: Code duplication, but needed because of reading ENV.
// This should be the same as in `/app/services/session.server.ts`.
const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.JWT_SECRET as string],
    secure: process.env.NODE_ENV === "production",
  },
});

export default async function globalSetup() {
  // Make sure our `e2e` user exists:
  await db.user.upsert({
    create: { email: "e2e@nielsbik.nl", id: "e2e", name: "e2e" },
    update: { email: "e2e@nielsbik.nl", id: "e2e", name: "e2e" },
    where: { email: "e2e@nielsbik.nl" },
  });

  // Set up the headless browser:
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Get the session and update it, inserting our `e2e` user into it:
  const session = await getSession();
  session.set("user", { id: "e2e" });

  // Get the cookie string and turn it into an object because that's what
  // Playwright needs:
  const cookie = await commitSession(session);
  const sessionToken: string = toObject(cookie)["_session"];

  // Compute the domain to use:
  const baseURL =
    process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000";
  const domain = new URL(baseURL).hostname;

  // Add the cookie:
  await page.context().addCookies([
    {
      name: "_session",
      value: sessionToken,
      domain,
      path: "/",
      sameSite: "Lax",
      secure: domain !== "localhost",
      httpOnly: true,
    },
  ]);

  // Make sure the cookie is stored and re-used for every test:
  await page.context().storageState({
    path: path.resolve(__dirname, "storageState.json"),
  });

  await browser.close();
}

function toObject(cookie: string) {
  return Object.fromEntries(
    cookie.split("; ").map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
  );
}
