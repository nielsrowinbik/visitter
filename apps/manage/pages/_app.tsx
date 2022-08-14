import { AppShell, Container, Header, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { initAuth } from "../lib/auth";

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
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            {/* Header content */}
          </Header>
        }
      >
        <Container>
          <Component {...pageProps} />
        </Container>
      </AppShell>
    </MantineProvider>
  </>
);

export default App;
