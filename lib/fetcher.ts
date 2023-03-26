import { parse } from "superjson";

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  const text = await res.text();
  return parse(text);
}
