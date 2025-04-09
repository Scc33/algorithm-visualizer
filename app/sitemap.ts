import { MetadataRoute } from "next";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { APP_URL } from "@/constants/URL";
import { glossaryTerms } from "@/lib/glossary/glossary";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || APP_URL;

  // Base/static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/difficulty`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sorting`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/searching`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/graph`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/difficulty/easy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/difficulty/medium`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/difficulty/hard`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const algorithmPages: MetadataRoute.Sitemap = Object.entries(
    availableAlgorithms
  ).map((algorithm) => {
    return {
      url: `${baseUrl}/${algorithm[1].category}/${algorithm[1].key}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  // Generate glossary term pages
  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((term) => {
    return {
      url: `${baseUrl}/glossary/${term.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticPages, ...algorithmPages, ...glossaryPages];
}
