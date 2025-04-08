import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmCard from "@/components/AlgorithmCard";
import { availableAlgorithms } from "@/lib/algorithms";

export default function SearchingAlgorithms() {
  // Filter algorithms to only show searching ones
  const searchingAlgorithms = availableAlgorithms.filter(
    (algo) => algo.category === "searching"
  );

  return (
    <PageLayout
      title="Searching Algorithms"
      subtitle="Searching algorithms are methods used to find specific items within a data structure. They are fundamental to many computational tasks and help find elements efficiently."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchingAlgorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm.key} algorithm={algorithm} />
        ))}
      </div>

      {searchingAlgorithms.length === 0 && (
        <div className="text-center py-12">
          <h2 className="heading-md text-gray-600">
            No searching algorithms found.
          </h2>
          <p className="mt-4 text-gray-500">
            We&apos;re working on adding more algorithms soon!
          </p>
        </div>
      )}
    </PageLayout>
  );
}
