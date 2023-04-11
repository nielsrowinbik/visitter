import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import { Toaster } from "react-hot-toast";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "/css" },
    { rel: "manifest", href: "/site.webmanifest" },
  ];
};

export default function App() {
  return (
    <html
      className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
      lang="en"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
