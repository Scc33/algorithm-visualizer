import { AlgorithmProvider } from "@/context/AlgorithmContext";
import { Metadata } from "next";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { constructMetadata } from "@/lib/seo/metadata";
import { getAlgorithmLabel } from "@/lib/utils";

type Props = {
  params: { algorithm: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { algorithm } = params;

  // Find the algorithm in our available list
  const algorithmInfo = availableAlgorithms[algorithm];

  if (!algorithmInfo) {
    return constructMetadata({
      title: "Algorithm Not Found",
      description: "The requested algorithm could not be found.",
      path: `/searching/${algorithm}`,
    });
  }

  const title = getAlgorithmLabel(algorithm);
  const { description, difficulty, category } = algorithmInfo;

  return constructMetadata({
    title,
    description,
    path: `/searching/${algorithm}`,
    keywords: [
      algorithm,
      title.toLowerCase(),
      `${title.toLowerCase()} visualization`,
      `${title.toLowerCase()} explanation`,
      `${title.toLowerCase()} algorithm`,
      `${difficulty} algorithm`,
      `${category} algorithm`,
    ],
  });
}

export default function SearchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
