"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import JsonLd from "../seo/JsonLd";
import { AlgorithmVisualization } from "@/lib/types";
import { APP_URL } from "@/constants/URL";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  algorithmData?: AlgorithmVisualization;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  algorithmData,
}: PageLayoutProps) {
  const pathname = usePathname();

  // Determine the type of the page based on path
  let jsonLdType: "Algorithm" | "WebPage" | "WebApplication" = "WebPage";

  if (
    pathname.includes("/sorting/") ||
    pathname.includes("/searching/") ||
    pathname.includes("/graph/")
  ) {
    jsonLdType = "Algorithm";
  } else if (pathname === "/") {
    jsonLdType = "WebApplication";
  }

  // Base URL for the site
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || APP_URL;
  const fullUrl = `${baseUrl}${pathname}`;

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        type={jsonLdType}
        url={fullUrl}
        name={title}
        description={subtitle}
        algorithmData={algorithmData}
      />

      <Navbar />

      <main className="flex-grow">
        {(title || subtitle) && (
          <div className="bg-gray-50 border-b">
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

      <Footer />
    </div>
  );
}
