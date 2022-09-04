import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import type { ExtendedAppProps } from "@lib/types";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) => {
  const getLayout = Component.getLayout || ((page, pageProps) => page);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />, pageProps)}
        <Toaster position="bottom-left" />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
