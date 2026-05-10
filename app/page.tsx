import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import type { AlgorithmCategory, AlgorithmInfo } from "@/lib/types";

const CATEGORY_LABELS: Record<AlgorithmCategory, string> = {
  sorting: "Sorting Algorithms",
  searching: "Searching Algorithms",
  graph: "Graph Algorithms",
  datastructure: "Data Structures",
  dp: "Dynamic Programming",
};

const CATEGORY_ORDER: AlgorithmCategory[] = [
  "sorting",
  "searching",
  "graph",
  "datastructure",
  "dp",
];

export default function Home() {
  const grouped = Object.values(availableAlgorithms).reduce(
    (acc, algorithm) => {
      const list = acc[algorithm.category] ?? [];
      list.push(algorithm);
      acc[algorithm.category] = list;
      return acc;
    },
    {} as Partial<Record<AlgorithmCategory, AlgorithmInfo[]>>
  );

  const sections = CATEGORY_ORDER.filter(
    (category) => (grouped[category]?.length ?? 0) > 0
  );

  return (
    <PageLayout
      title="Algorithm Visualizer"
      subtitle="Interactive visualizations to help you understand how algorithms work step-by-step."
    >
      {sections.map((category) => (
        <section key={category} className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="heading-lg text-white">
              {CATEGORY_LABELS[category]}
            </h2>
            <Link href={`/${category}`} className="btn btn-primary text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(grouped[category] ?? []).slice(0, 3).map((algorithm) => (
              <AlgorithmCard key={algorithm.key} algorithm={algorithm} />
            ))}
          </div>
        </section>
      ))}
    </PageLayout>
  );
}
