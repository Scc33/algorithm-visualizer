import Link from "next/link";
import type { AlgorithmInfo } from "@/lib/types";

interface AlgorithmCardProps {
  algorithm: AlgorithmInfo;
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { name, key, category, description, difficulty } = algorithm;

  return (
    <div className="card transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="heading-md">{name}</h3>
          <Link
            className={`badge badge-${difficulty} capitalize`}
            href={`/difficulty/${difficulty}`}
          >
            {difficulty}
          </Link>
        </div>

        <p className="mt-2 line-clamp-2 text-gray-600">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <Link className="badge badge-info capitalize" href={`/${category}`}>
            {category}
          </Link>

          <Link
            href={`/${category}/${key}`}
            className="btn btn-primary flex items-center text-sm"
          >
            <span>Visualize</span>
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
