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

  // Find the algorithm in our available list
  const algorithmInfo = availableAlgorithms[algorithm];

  if (!algorithmInfo) {
    return constructMetadata({
      title: "Algorithm Not Found",
      description: "The requested algorithm could not be found.",
      path: `/graph/${algorithm}`,
    });
  }

  const { name, description, difficulty, category } = algorithmInfo;

  return constructMetadata({
    title: name,
    description,
    path: `/graph/${algorithm}`,
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

export default function GraphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
