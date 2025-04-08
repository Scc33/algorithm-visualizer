import React from "react";
import { AlgorithmProvider } from "@/context/AlgorithmContext";
import { Metadata } from "next";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { constructMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ algorithm: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { algorithm } = params;

  const algorithmInfo = availableAlgorithms[algorithm];

  if (!algorithmInfo) {
    return constructMetadata({
      title: "Algorithm Not Found",
      description: "The requested algorithm could not be found.",
      path: `/sorting/${algorithm}`,
    });
  }

  const { name, description, difficulty, category } = algorithmInfo;

  return constructMetadata({
    title: name,
    description,
    path: `/sorting/${algorithm}`,
    keywords: [
      algorithm,
      name.toLowerCase(),
      `${name.toLowerCase()} visualization`,
      `${name.toLowerCase()} explanation`,
      `${name.toLowerCase()} algorithm`,
      `${difficulty} algorithm`,
      `${category} algorithm`,
    ],
  });
}

export default function VisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
