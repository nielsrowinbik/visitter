import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import type { ExtendedAppProps } from "@lib/types";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import WithAuth from "@lib/auth/WithAuth";

export const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <QueryClientProvider client={queryClient}>
        {Component.auth ? (
          <WithAuth options={Component.auth}>
            {getLayout(<Component {...pageProps} />)}
          </WithAuth>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
        <Toaster position="bottom-center" />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
