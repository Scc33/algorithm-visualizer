import React from "react";
import { AlgorithmVisualization } from "@/lib/types";

type JsonLdProps = {
  algorithmData?: AlgorithmVisualization;
  url: string;
  type?: "Algorithm" | "WebPage" | "WebApplication";
  name?: string;
  description?: string;
};

export default function JsonLd({
  algorithmData,
  url,
  type = "WebPage",
  name,
  description,
}: JsonLdProps) {
  // Base WebPage or WebApplication JSON-LD
  let jsonLd: any = {
    "@context": "https://schema.org",
    "@type": type,
    name: name || "Algorithm Visualizer",
    description:
      description ||
      "Interactive visualizations to help you understand how algorithms work step-by-step.",
    url,
    author: {
      "@type": "Person",
      name: "Sean Coughlin",
      url: "https://seancoughlin.me",
    },
    publisher: {
      "@type": "Person",
      name: "Sean Coughlin",
      url: "https://seancoughlin.me",
    },
    datePublished: "2023-01-01", // Update with the actual date
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en-US",
  };

  // Add Algorithm-specific data if available
  if (algorithmData && type === "Algorithm") {
    jsonLd = {
      ...jsonLd,
      name: algorithmData.name,
      description: algorithmData.description,
      programmingLanguage: "JavaScript/TypeScript",
      codeSampleType: algorithmData.category,
      runtimePlatform: "Web Browser",
      algorithmCategory: algorithmData.category,
      timeComplexity: algorithmData.timeComplexity,
      spaceComplexity: algorithmData.spaceComplexity,
      educationalUse: "Teaching/Learning",
      citation: algorithmData.reference,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
