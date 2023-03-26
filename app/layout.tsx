import "@/styles/globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "@/components/Toast";

export const metadata: Metadata = {
  title: {
    default: "Visitter",
    template: "%s | Visitter",
  },
  description: "The easiest way to run your vacation home",
  alternates: {
    canonical: "https://visitter.app",
  },
  openGraph: {
    title: "Visitter",
    description: "The easiest way to run your vacation home",
    url: "https://visitter.app",
    siteName: "Visitter",
    images: [
      {
        url: "https://visitter.app/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Visitter",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="bg-white text-zinc-900 antialiased dark:bg-zinc-900 dark:text-white"
    >
      <body className="min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
