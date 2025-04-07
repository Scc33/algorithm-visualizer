import { AlgorithmVisualization } from "@/lib/types";

interface AlgorithmInfoProps {
  algorithm: AlgorithmVisualization;
}

export default function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
  return (
    <div className="card p-6">
      <h2 className="heading-lg">{algorithm.name}</h2>
      <p className="mt-2 text-gray-600">{algorithm.description}</p>

      <div className="mt-6 flex flex-wrap gap-8">
        <div className="flex-1 min-w-[140px]">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Time Complexity
          </h3>
          <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-100">
            <p className="font-mono font-medium text-gray-800">
              {algorithm.timeComplexity}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[140px]">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Space Complexity
          </h3>
          <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-100">
            <p className="font-mono font-medium text-gray-800">
              {algorithm.spaceComplexity}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[140px]">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Category</h3>
          <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-100">
            <p className="font-medium capitalize text-gray-800">
              {algorithm.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
