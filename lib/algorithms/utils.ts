import {
  AlgorithmVisualization,
  GraphStep,
  SearchStep,
  SortingStep,
} from "../types";
import { availableAlgorithms } from "./metadata";

/**
 * Helper function to create an AlgorithmVisualization object from steps and algorithm-specific details
 * This eliminates duplication between the metadata and the algorithm implementation
 */
export function createVisualization(
  key: keyof typeof availableAlgorithms,
  steps: SortingStep[] | SearchStep[] | GraphStep[],
  details: {
    timeComplexity: string;
    spaceComplexity: string;
    reference: string;
    pseudoCode: string[];
  }
): AlgorithmVisualization {
  const metadata = availableAlgorithms[key];

  if (!metadata) {
    throw new Error(`Metadata for algorithm "${String(key)}" not found`);
  }

  return {
    steps,
    name: metadata.name,
    key: metadata.key,
    category: metadata.category,
    difficulty: metadata.difficulty,
    description: metadata.description,
    ...details,
  };
}
