import type { AppProps } from "next/app";
import type { ReactNode } from "react";

export type ExtendedPageProps = {
  getLayout?: (page: ReactNode, pageProps: ExtendedPageProps) => ReactNode;
};

export type ExtendedAppProps = AppProps & {
  Component: ExtendedPageProps;
};
