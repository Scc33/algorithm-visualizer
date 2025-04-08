import Link from "next/link";
import { AlgorithmInfo } from "@/lib/types";

interface AlgorithmCardProps {
  algorithm: AlgorithmInfo;
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { name, key, category, description, difficulty } = algorithm;

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="heading-md">{name}</h3>
          <Link
            className={`badge badge-${difficulty} capitalize`}
            href={`/difficulty/${difficulty}`}
          >
            {difficulty}
          </Link>
        </div>

        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-4 flex justify-between items-center">
          <Link className="badge badge-info capitalize" href={`/${category}`}>
            {category}
          </Link>

          <Link
            href={`/${category}/${key}`}
            className="btn btn-primary flex items-center text-sm"
          >
            <span>Visualize</span>
            <svg
              className="ml-1 w-4 h-4"
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
