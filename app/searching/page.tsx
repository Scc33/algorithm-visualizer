import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function SearchingAlgorithms() {
  // Filter algorithms to only show searching ones
  const searchingAlgorithms = Object.entries(availableAlgorithms).filter(
    ([, algo]) => algo.category === "searching"
  );

  return (
    <PageLayout
      title="Searching Algorithms"
      subtitle="Searching algorithms are methods used to find specific items within a data structure. They are fundamental to many computational tasks and help find elements efficiently."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchingAlgorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm[0]} algorithm={algorithm[1]} />
        ))}
      </div>
    </PageLayout>
  );
}
