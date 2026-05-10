import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function DpAlgorithms() {
  const dpAlgorithms = Object.entries(availableAlgorithms).filter(
    ([, algo]) => algo.category === "dp"
  );

  return (
    <PageLayout
      title="Dynamic Programming"
      subtitle="Watch DP tables fill cell-by-cell — see how each subproblem builds on its dependencies and how the final answer is reconstructed via traceback."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dpAlgorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm[0]} algorithm={algorithm[1]} />
        ))}
      </div>
    </PageLayout>
  );
}
