import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { AlgorithmInfo } from "@/lib/types";

export default function Home() {
  // Group algorithms by category
  const algorithmsByCategory = Object.entries(
    Object.entries(availableAlgorithms).reduce((acc, [, algorithm]) => {
      const { category } = algorithm;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(algorithm);
      return acc;
    }, {} as Record<string, AlgorithmInfo[]>)
  );

  return (
    <PageLayout
      title="Algorithm Visualizer"
      subtitle="Interactive visualizations to help you understand how algorithms work step-by-step."
    >
      {algorithmsByCategory.map((category) => (
        <section key={category[0]} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-lg capitalize text-white">
              {category[0]} Algorithms
            </h2>
            <Link href={`/${category[0]}`} className="btn btn-primary text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category[1].slice(0, 3).map((algorithm) => (
              <AlgorithmCard key={algorithm.key} algorithm={algorithm} />
            ))}
          </div>
        </section>
      ))}
    </PageLayout>
  );
}
