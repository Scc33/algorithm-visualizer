import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function SortingAlgorithms() {
  // Filter algorithms to only show sorting ones
  const sortingAlgorithms = Object.entries(availableAlgorithms).filter(
    ([, algo]) => algo.category === "sorting"
  );

  return (
    <PageLayout
      title="Sorting Algorithms"
      subtitle="Sorting algorithms are methods for reorganizing a sequence of items into a specific order, typically in ascending or descending order."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortingAlgorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm[0]} algorithm={algorithm[1]} />
        ))}
      </div>
    </PageLayout>
  );
}
