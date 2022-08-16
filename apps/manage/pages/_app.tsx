import type { AppProps as NextAppProps } from "next/app";
import type { NextComponentType } from "next";
import Head from "next/head";
import type { ReactNode } from "react";
import { initAuth } from "../lib/auth";

import "../styles/globals.css";

initAuth();

type GetLayoutFunction = (page: ReactNode) => ReactNode;

type AppProps = NextAppProps & {
  Component: NextComponentType & {
    getLayout: GetLayoutFunction;
  };
};

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Visitter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default App;
