import type { AlgorithmVisualization } from "@/lib/types";
import Link from "next/link";

interface AlgorithmInfoProps {
  algorithm: AlgorithmVisualization;
}

export default function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
  return (
    <div className="card p-6">
      <h2 className="heading-lg">{algorithm.name}</h2>
      <p className="mt-2 text-gray-600">{algorithm.description}</p>

      <div className="mt-6 flex flex-wrap gap-8">
        <div className="min-w-[140px] flex-1">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">
            Time Complexity
          </h3>
          <div className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
            <p className="font-mono font-medium text-gray-800">
              {algorithm.timeComplexity}
            </p>
          </div>
        </div>

        <div className="min-w-[140px] flex-1">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">
            Space Complexity
          </h3>
          <div className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
            <p className="font-mono font-medium text-gray-800">
              {algorithm.spaceComplexity}
            </p>
          </div>
        </div>

        <div className="min-w-[140px] flex-1">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">Category</h3>
          <div className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
            <Link
              className="badge badge-info font-medium capitalize"
              href={`/${algorithm.category}`}
            >
              {algorithm.category}
            </Link>
          </div>
        </div>

        <div className="min-w-[140px] flex-1">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">
            Difficulty
          </h3>
          <div className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
            <Link
              className={`badge font-medium capitalize badge-${algorithm.difficulty}`}
              href={`/difficulty/${algorithm.difficulty}`}
            >
              {algorithm.difficulty}
            </Link>
          </div>
        </div>

        <div className="min-w-[140px] flex-1">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">
            Reference
          </h3>
          <div className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
            <a
              className="badge badge-info font-medium capitalize"
              href={algorithm.reference}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
