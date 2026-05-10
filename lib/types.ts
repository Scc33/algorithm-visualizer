export interface SortingStep {
  array: number[];
  comparing: number[];
  swapped: boolean;
  completed: number[];
  lineNumber?: number;
}

export interface SearchStep {
  array: number[];
  current: number; // Current index being examined
  target: number; // Value being searched for
  found: boolean; // Whether the target has been found
  visited: number[]; // Indices already visited
  lineNumber?: number;
}

export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface Graph {
  numVertices: number;
  edges: Edge[];
  adjacency: Edge[][];
  directed: boolean;
}

export interface GraphStep {
  graph: Graph;
  current: number;
  visited: number[];
  stack: number[];
  path: number[];
  treeEdges?: Edge[];
  lineNumber?: number;
}

export type PrimitiveKind = "array-bars" | "array-cells" | "graph-2d";

export type StepsForPrimitive<P extends PrimitiveKind> = P extends "array-bars"
  ? SortingStep[]
  : P extends "array-cells"
    ? SearchStep[]
    : P extends "graph-2d"
      ? GraphStep[]
      : never;

type PrimitiveBinding =
  | { primitive: "array-bars"; steps: SortingStep[] }
  | { primitive: "array-cells"; steps: SearchStep[] }
  | { primitive: "graph-2d"; steps: GraphStep[] };

export type AlgorithmVisualization = PrimitiveBinding & {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  reference: string;
  pseudoCode: string[];
  category: string;
  difficulty: string;
  key: string;
};

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
