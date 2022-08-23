import type { AppProps } from "next/app";
import type { ReactNode } from "react";

export type AuthenticatedPage = {
  role?: string;
  redirectTo?: string;
};

export type ExtendedPageProps = {
  requiresAuth?: boolean;
  auth?: AuthenticatedPage;
  getLayout?: (page: ReactNode) => ReactNode;
};

export type ExtendedAppProps = AppProps & {
  Component: ExtendedPageProps;
};
