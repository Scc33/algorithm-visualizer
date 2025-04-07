import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Algorithm Visualizer",
  description: "An interactive platform to learn algorithms with visual steps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased bg-gray-50 text-gray-900 min-h-screen"}>
        {children}
      </body>
    </html>
  );
}
