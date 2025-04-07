import React from "react";
import { AlgorithmVisualization } from "@/lib/types";

interface AlgorithmInfoProps {
  algorithm: AlgorithmVisualization;
}

export default function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
  return (
    <div className="card p-6">
      <h2 className="heading-lg">{algorithm.name}</h2>
      <p className="mt-2 text-gray-600">{algorithm.description}</p>

      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[140px]">
          <h3 className="text-sm font-medium text-gray-500">Time Complexity</h3>
          <p className="mt-1 font-semibold text-code">
            {algorithm.timeComplexity}
          </p>
        </div>

        <div className="flex-1 min-w-[140px]">
          <h3 className="text-sm font-medium text-gray-500">
            Space Complexity
          </h3>
          <p className="mt-1 font-semibold text-code">
            {algorithm.spaceComplexity}
          </p>
        </div>

        <div className="flex-1 min-w-[140px]">
          <h3 className="text-sm font-medium text-gray-500">Category</h3>
          <p className="mt-1 font-semibold capitalize">{algorithm.category}</p>
        </div>
      </div>
    </div>
  );
}
