import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  render() {
    return (
      <Html className="js-focus-visible h-full scroll-smooth bg-white text-zinc-800 antialiased [font-feature-settings:'ss01'] dark:bg-zinc-900 dark:text-white">
        <Head />
        <body className="flex h-full flex-col">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
