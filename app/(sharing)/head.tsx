export default function Head() {
  return (
    <>
      <title>Visitter</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta
        name="description"
        content="The easiest way to run your vacation home."
      />
      <meta name="robots" content="noindex" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://visitter.app" />
      {/* TODO: Generate OG image */}
      <meta property="og:image" content="https://visitter.app/og.jpg" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://visitter.app" />
      {/* TODO: Generate OG image */}
      <meta property="twitter:image" content="https://visitter.app/og.jpg" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
