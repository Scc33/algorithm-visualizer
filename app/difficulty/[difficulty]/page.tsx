import { notFound } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

type DifficultyParams = {
  params: Promise<{
    difficulty: string;
  }>;
};

export default async function DifficultyPage(props: DifficultyParams) {
  const params = await props.params;
  const { difficulty } = params;

  // Validate that difficulty is one of the valid types
  const validDifficulties = ["easy", "medium", "hard"];
  if (!validDifficulties.includes(difficulty)) {
    notFound(); // Return 404 page for invalid difficulty
  }

  // Filter algorithms by the current difficulty
  const filteredAlgorithms = Object.entries(availableAlgorithms).filter(
    ([, algo]) => algo.difficulty === difficulty
  );

  // Capitalize the first letter for display
  const capitalizedDifficulty =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <PageLayout
      title={`${capitalizedDifficulty} Algorithms`}
      subtitle={`Explore algorithms with ${difficulty} difficulty level.`}
    >
      {filteredAlgorithms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm[0]} algorithm={algorithm[1]} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="heading-md text-gray-600">
            No algorithms found with {difficulty} difficulty.
          </h2>
          <p className="mt-4 text-gray-500">
            We&apos;re working on adding more algorithms soon!
          </p>
        </div>
      )}
    </PageLayout>
  );
}
