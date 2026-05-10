import type { MetadataRoute } from "next";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { APP_URL } from "@/constants/URL";
import { glossaryTerms } from "@/lib/glossary/glossary";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

interface StaticEntry {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}

const STATIC_ENTRIES: StaticEntry[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/difficulty", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sorting", changeFrequency: "weekly", priority: 0.9 },
  { path: "/searching", changeFrequency: "weekly", priority: 0.9 },
  { path: "/graph", changeFrequency: "weekly", priority: 0.9 },
  { path: "/datastructure", changeFrequency: "weekly", priority: 0.9 },
  { path: "/dp", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pathfinding", changeFrequency: "weekly", priority: 0.9 },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.8 },
  { path: "/difficulty/easy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/difficulty/medium", changeFrequency: "monthly", priority: 0.8 },
  { path: "/difficulty/hard", changeFrequency: "monthly", priority: 0.8 },
];

function buildStaticPages(baseUrl: string): MetadataRoute.Sitemap {
  return STATIC_ENTRIES.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || APP_URL;

  const algorithmPages: MetadataRoute.Sitemap = Object.entries(
    availableAlgorithms
  ).map((algorithm) => ({
    url: `${baseUrl}/${algorithm[1].category}/${algorithm[1].key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...buildStaticPages(baseUrl), ...algorithmPages, ...glossaryPages];
}
