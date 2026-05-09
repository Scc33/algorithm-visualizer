import type { AlgorithmVisualization } from "../types";
import { bubbleSort } from "./sorting/bubbleSort";
import { selectionSort } from "./sorting/selectionSort";
import { insertionSort } from "./sorting/insertionSort";
import { mergeSort } from "./sorting/mergeSort";
import { quickSort } from "./sorting/quickSort";
import { heapSort } from "./sorting/heapSort";
import { linearSearch } from "./searching/linearSearch";
import { binarySearch } from "./searching/binarySearch";
import { dfs } from "./graph/dfs";
import { bfs } from "./graph/bfs";
import { dijkstra } from "./graph/dijkstra";
import { topologicalSort } from "./graph/topologicalSort";

export type AlgorithmFn = (
  array: number[],
  targetOrStart?: number
) => AlgorithmVisualization;

const algorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  linearSearch,
  binarySearch,
  dfs,
  bfs,
  dijkstra,
  topologicalSort,
} as const satisfies Record<string, AlgorithmFn>;

export type AlgorithmName = keyof typeof algorithms;

export function isAlgorithmName(name: string): name is AlgorithmName {
  return name in algorithms;
}

export function getAlgorithmByName(name: string): AlgorithmFn | null {
  return isAlgorithmName(name) ? algorithms[name] : null;
}

export {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  linearSearch,
  binarySearch,
  dfs,
  bfs,
  dijkstra,
  topologicalSort,
};
