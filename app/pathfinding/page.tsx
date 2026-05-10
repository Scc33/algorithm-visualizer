import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function PathfindingAlgorithms() {
  const pathfindingAlgorithms = Object.entries(availableAlgorithms).filter(
    ([, algo]) => algo.category === "pathfinding"
  );

  return (
    <PageLayout
      title="Pathfinding & Spatial"
      subtitle="Watch shortest-path search expand cell-by-cell, and see how a heuristic narrows exploration. Edit walls to see the algorithms react."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pathfindingAlgorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm[0]} algorithm={algorithm[1]} />
        ))}
      </div>
    </PageLayout>
  );
}
