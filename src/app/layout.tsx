import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Shadcn Landing",
  description: "A landing page built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
