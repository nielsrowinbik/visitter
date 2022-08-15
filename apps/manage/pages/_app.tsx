import type { AppProps } from "next/app";
import Head from "next/head";
import { initAuth } from "../lib/auth";

import "../styles/globals.css";

initAuth();

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Visitter</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
