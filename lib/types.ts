export interface SortingStep {
  array: number[];
  comparing: number[];
  swapped: boolean;
  completed: number[];
}

export interface AlgorithmVisualization {
  steps: SortingStep[];
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  pseudoCode: string[];
  category: string;
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
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export type VisualizationState = {
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  algorithm: string;
  data: number[];
  visualizationData: AlgorithmVisualization | null;
};

export type VisualizationAction =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SET_IS_PLAYING"; payload: boolean }
  | { type: "SET_SPEED"; payload: number }
  | { type: "SET_ALGORITHM"; payload: string }
  | { type: "SET_DATA"; payload: number[] }
  | {
      type: "GENERATE_RANDOM_DATA";
      payload: { min: number; max: number; length: number };
    }
  | { type: "GENERATE_VISUALIZATION"; payload: AlgorithmVisualization }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" };
