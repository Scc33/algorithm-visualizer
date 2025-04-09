import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function GraphAlgorithms() {
  const graphAlgorithms = Object.entries(availableAlgorithms).filter(
    ([, algo]) => algo.category === "graph"
  );

  return (
    <PageLayout
      title="Graph Algorithms"
      subtitle="Graph algorithms are procedures to search, detect cyles, or understand network cycles in node and vertex graphs."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {graphAlgorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm[0]} algorithm={algorithm[1]} />
        ))}
      </div>
    </PageLayout>
  );
}
