import React from "react";
import Link from "next/link";
import { AlgorithmInfo } from "@/lib/types";

interface AlgorithmCardProps {
  algorithm: AlgorithmInfo;
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { name, key, category, description, difficulty } = algorithm;

  // Determine badge color based on difficulty
  const badgeClass = {
    Easy: "badge-easy",
    Medium: "badge-medium",
    Hard: "badge-hard",
  }[difficulty];

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="heading-md">{name}</h3>
          <div className={`badge ${badgeClass}`}>{difficulty}</div>
        </div>

        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 capitalize">{category}</span>

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
