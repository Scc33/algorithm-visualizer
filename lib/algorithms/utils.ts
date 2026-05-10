import type {
  AlgorithmVisualization,
  PrimitiveKind,
  StepsForPrimitive,
} from "../types";
import { availableAlgorithms } from "./metadata";

/**
 * Helper function to create an AlgorithmVisualization object from steps and algorithm-specific details.
 * The `primitive` argument selects the rendering primitive and (via StepsForPrimitive) constrains the
 * accepted shape of `steps`.
 */
export function createVisualization<P extends PrimitiveKind>(
  key: keyof typeof availableAlgorithms,
  primitive: P,
  steps: StepsForPrimitive<P>,
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
    primitive,
    steps,
    name: metadata.name,
    key: metadata.key,
    category: metadata.category,
    difficulty: metadata.difficulty,
    description: metadata.description,
    ...details,
  } as AlgorithmVisualization;
}
