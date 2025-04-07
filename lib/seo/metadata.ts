import { Metadata } from "next";

export type MetadataProps = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  imageUrl?: string;
};

const APP_NAME = "Algorithm Visualizer";
const APP_DEFAULT_TITLE = "Algorithm Visualizer: Interactive Learning Platform";
const APP_DESCRIPTION =
  "Interactive visualizations to help you understand how algorithms work step-by-step. Learn sorting, searching, and graph algorithms visually.";
const APP_URL = "https://algorithm-visualizer.seancoughlin.me";

export function constructMetadata({
  title,
  description,
  path = "",
  keywords = [],
  imageUrl = "/opengraph-image.png", // Default OG image
}: MetadataProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${APP_NAME}` : APP_DEFAULT_TITLE;
  const metaDescription = description || APP_DESCRIPTION;
  const url = `${APP_URL}${path}`;

  return {
    title: metaTitle,
    description: metaDescription,
    applicationName: APP_NAME,
    metadataBase: new URL(APP_URL),
    keywords: [
      "algorithm visualizer",
      "sorting algorithms",
      "searching algorithms",
      "algorithm animation",
      "computer science",
      "programming learning",
      "algorithm tutorial",
      "data structures",
      "coding education",
      "visual learning",
      ...keywords,
    ],
    authors: [{ name: "Sean Coughlin" }],
    creator: "Sean Coughlin",
    publisher: "Sean Coughlin",
    category: "Education",
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: APP_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
      creator: "@seancoughlin", // Update with your Twitter handle
    },
    alternates: {
      canonical: url,
    },
  };
}
