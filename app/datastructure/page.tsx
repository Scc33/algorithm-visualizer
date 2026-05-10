import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function DataStructureAlgorithms() {
  const dsAlgorithms = Object.entries(availableAlgorithms).filter(
    ([, algo]) => algo.category === "datastructure"
  );

  return (
    <PageLayout
      title="Data Structures"
      subtitle="Visualize how core data structures are built — see the comparisons, links, and rebalancing decisions one step at a time."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dsAlgorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm[0]} algorithm={algorithm[1]} />
        ))}
      </div>
    </PageLayout>
  );
}
