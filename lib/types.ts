export interface SortingStep {
  array: number[];
  comparing: number[];
  swapped: boolean;
  completed: number[];
}

export interface SearchStep {
  array: number[];
  current: number; // Current index being examined
  target: number; // Value being searched for
  found: boolean; // Whether the target has been found
  visited: number[]; // Indices already visited
}

export interface GraphStep {
  adjacencyList: number[][]; // Adjacency list representation
  current: number; // Current vertex index
  visited: number[]; // Visited vertices
  stack: number[]; // Stack for DFS traversal
  path: number[]; // Path taken so far
}

export interface AlgorithmVisualization {
  steps: SortingStep[] | SearchStep[] | GraphStep[];
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  reference: string;
  pseudoCode: string[];
  category: string;
  difficulty: string;
  key: string;
}

export type AlgorithmCategory =
  | "sorting"
  | "searching"
  | "graph"
  | "datastructure";

export interface AlgorithmInfo {
  name: string;
  key: string;
  category: AlgorithmCategory;
  subtitle: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
}

export type VisualizationState = {
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  algorithm: string;
  data: number[];
  target?: number; // Added for search algorithms
  visualizationData: AlgorithmVisualization | null;
};

export type VisualizationAction =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SET_IS_PLAYING"; payload: boolean }
  | { type: "SET_SPEED"; payload: number }
  | { type: "SET_ALGORITHM"; payload: string }
  | { type: "SET_DATA"; payload: number[] }
  | { type: "SET_TARGET"; payload: number } // Added for search algorithms
  | {
      type: "GENERATE_RANDOM_DATA";
      payload: { min: number; max: number; length: number };
    }
  | { type: "GENERATE_VISUALIZATION"; payload: AlgorithmVisualization }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" };
