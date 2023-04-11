import type { LoaderFunction } from "@remix-run/node";
import path from "path";
import { serveTailwindCss } from "remix-tailwind";

export const loader: LoaderFunction = () =>
  serveTailwindCss(path.resolve(__dirname, "../app/styles/global.css"));
