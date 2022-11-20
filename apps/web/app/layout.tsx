import "@/styles/globals.css";

import { Analytics } from "@/components/Analytics";
import type { ReactNode } from "react";
import { Toaster } from "@/components/Toast";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className="bg-white text-zinc-900 antialiased dark:bg-zinc-900 dark:text-white"
    >
      <body className="min-h-screen">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
