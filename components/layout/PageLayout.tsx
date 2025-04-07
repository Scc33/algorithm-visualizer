import React from "react";
import Navbar from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {(title || subtitle) && (
          <div className="bg-gray-100 border-b">
            <div className="container-content py-8">
              {title && <h1 className="heading-xl">{title}</h1>}
              {subtitle && (
                <p className="mt-2 text-gray-600 max-w-3xl">{subtitle}</p>
              )}
            </div>
          </div>
        )}

        <div className="container-content py-8">{children}</div>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="container-content">
          <div className="flex flex-col items-center justify-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Algorithm Visualizer</p>
            <p className="mt-1">
              Made with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
