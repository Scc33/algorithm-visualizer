import type { AlgorithmVisualization, Graph } from "../types";
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
import { bellmanFord } from "./graph/bellmanFord";
import { prim } from "./graph/prim";
import { kruskal } from "./graph/kruskal";

export type SortingFn = (array: number[]) => AlgorithmVisualization;
export type SearchFn = (
  array: number[],
  target: number
) => AlgorithmVisualization;
export type GraphFn = (
  graph: Graph,
  startVertex?: number
) => AlgorithmVisualization;

const sortingAlgorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} as const satisfies Record<string, SortingFn>;

const searchAlgorithms = {
  linearSearch,
  binarySearch,
} as const satisfies Record<string, SearchFn>;

const graphAlgorithms = {
  dfs,
  bfs,
  dijkstra,
  topologicalSort,
  bellmanFord,
  prim,
  kruskal,
} as const satisfies Record<string, GraphFn>;

export type SortingAlgorithmName = keyof typeof sortingAlgorithms;
export type SearchAlgorithmName = keyof typeof searchAlgorithms;
export type GraphAlgorithmName = keyof typeof graphAlgorithms;
export type AlgorithmName =
  | SortingAlgorithmName
  | SearchAlgorithmName
  | GraphAlgorithmName;

export function isSortingAlgorithm(name: string): name is SortingAlgorithmName {
  return name in sortingAlgorithms;
}

export function isSearchAlgorithm(name: string): name is SearchAlgorithmName {
  return name in searchAlgorithms;
}

export function isGraphAlgorithm(name: string): name is GraphAlgorithmName {
  return name in graphAlgorithms;
}

export function isAlgorithmName(name: string): name is AlgorithmName {
  return (
    isSortingAlgorithm(name) ||
    isSearchAlgorithm(name) ||
    isGraphAlgorithm(name)
  );
}

export function getSortingAlgorithm(name: string): SortingFn | null {
  return isSortingAlgorithm(name) ? sortingAlgorithms[name] : null;
}

export function getSearchAlgorithm(name: string): SearchFn | null {
  return isSearchAlgorithm(name) ? searchAlgorithms[name] : null;
}

export function getGraphAlgorithm(name: string): GraphFn | null {
  return isGraphAlgorithm(name) ? graphAlgorithms[name] : null;
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
  bellmanFord,
  prim,
  kruskal,
};
