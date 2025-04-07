import React from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms";

export default function Home() {
  // Group algorithms by category
  const algorithmsByCategory = availableAlgorithms.reduce((acc, algorithm) => {
    const { category } = algorithm;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(algorithm);
    return acc;
  }, {} as Record<string, typeof availableAlgorithms>);

  // Get unique categories
  const categories = Object.keys(algorithmsByCategory);

  return (
    <PageLayout
      title="Algorithm Visualizer"
      subtitle="Interactive visualizations to help you understand how algorithms work step-by-step."
    >
      <section className="mb-12">
        <h2 className="heading-lg mb-6">Featured Algorithms</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableAlgorithms
            .filter(
              (algo) =>
                algo.key === "bubbleSort" ||
                algo.key === "selectionSort" ||
                algo.key === "insertionSort"
            )
            .map((algorithm) => (
              <AlgorithmCard key={algorithm.key} algorithm={algorithm} />
            ))}
        </div>
      </section>

      {categories.map((category) => (
        <section key={category} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-lg capitalize">{category} Algorithms</h2>
            <Link href={`/${category}`} className="btn btn-primary text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithmsByCategory[category].slice(0, 3).map((algorithm) => (
              <AlgorithmCard key={algorithm.key} algorithm={algorithm} />
            ))}
          </div>
        </section>
      ))}
    </PageLayout>
  );
}
