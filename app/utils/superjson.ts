import { deserialize, serialize } from "superjson";
import {
  useActionData as useRemixActionData,
  useLoaderData as useRemixLoaderData,
} from "@remix-run/react";

import type { HtmlMetaDescriptor } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import type { SuperJSONResult } from "superjson/dist/types";
import { json as remixJson } from "@remix-run/node";

type JsonResponse = ReturnType<typeof remixJson>;
type MetaArgs = Parameters<MetaFunction>[0];
type MetaArgsSansData = Omit<MetaArgs, "data">;

type SuperJSONMetaFunction<Data> = {
  (args: MetaArgsSansData & { data: Data }): HtmlMetaDescriptor;
};

export const json = <Data>(
  obj: Data,
  init?: number | ResponseInit
): JsonResponse => {
  const superJsonResult = serialize(obj);
  return remixJson(superJsonResult, init);
};

export const parse = <Data>(superJsonResult: SuperJSONResult) =>
  deserialize(superJsonResult) as Data;

export const withSuperJSON =
  <Data>(metaFn: MetaFunction): SuperJSONMetaFunction<Data> =>
  ({ data, ...rest }: MetaArgs): HtmlMetaDescriptor =>
    metaFn({ ...rest, data: parse<Data>(data) });

export const useLoaderData = <Data>() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loaderData = useRemixLoaderData<any>();
  return parse<Data>(loaderData);
};

export const useActionData = <Data>() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actionData = useRemixActionData<any>();
  return actionData ? parse<Data>(actionData) : undefined;
};
