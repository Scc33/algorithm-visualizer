import type { Metadata } from "next";
import "./globals.css";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased bg-slate-50 text-gray-900 min-h-screen"}>
        {children}
      </body>
    </html>
  );
}
