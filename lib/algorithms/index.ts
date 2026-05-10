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
import { bstInsert } from "./datastructure/bst";
import { minHeapInsert } from "./datastructure/heap";
import { editDistance } from "./dp/editDistance";
import { lcs } from "./dp/lcs";
import { aStar } from "./pathfinding/aStar";
import { dijkstraGrid } from "./pathfinding/dijkstraGrid";
import { mazeRecursiveBacktracker } from "./pathfinding/mazeRecursiveBacktracker";
import type { PathfindingInput } from "./pathfinding/grid";

export type SortingFn = (array: number[]) => AlgorithmVisualization;
export type SearchFn = (
  array: number[],
  target: number
) => AlgorithmVisualization;
export type GraphFn = (
  graph: Graph,
  startVertex?: number
) => AlgorithmVisualization;
export type DataStructureFn = (values: number[]) => AlgorithmVisualization;
export type DpFn = (a: string, b: string) => AlgorithmVisualization;
export type PathfindingFn = (input: PathfindingInput) => AlgorithmVisualization;

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

const dataStructureAlgorithms = {
  bstInsert,
  minHeapInsert,
} as const satisfies Record<string, DataStructureFn>;

const dpAlgorithms = {
  editDistance,
  lcs,
} as const satisfies Record<string, DpFn>;

const pathfindingAlgorithms = {
  aStar,
  dijkstraGrid,
  mazeRecursiveBacktracker,
} as const satisfies Record<string, PathfindingFn>;

export type SortingAlgorithmName = keyof typeof sortingAlgorithms;
export type SearchAlgorithmName = keyof typeof searchAlgorithms;
export type GraphAlgorithmName = keyof typeof graphAlgorithms;
export type DataStructureAlgorithmName = keyof typeof dataStructureAlgorithms;
export type DpAlgorithmName = keyof typeof dpAlgorithms;
export type PathfindingAlgorithmName = keyof typeof pathfindingAlgorithms;
export type AlgorithmName =
  | SortingAlgorithmName
  | SearchAlgorithmName
  | GraphAlgorithmName
  | DataStructureAlgorithmName
  | DpAlgorithmName
  | PathfindingAlgorithmName;

export function isSortingAlgorithm(name: string): name is SortingAlgorithmName {
  return name in sortingAlgorithms;
}

export function isSearchAlgorithm(name: string): name is SearchAlgorithmName {
  return name in searchAlgorithms;
}

export function isGraphAlgorithm(name: string): name is GraphAlgorithmName {
  return name in graphAlgorithms;
}

export function isDataStructureAlgorithm(
  name: string
): name is DataStructureAlgorithmName {
  return name in dataStructureAlgorithms;
}

export function isDpAlgorithm(name: string): name is DpAlgorithmName {
  return name in dpAlgorithms;
}

export function isPathfindingAlgorithm(
  name: string
): name is PathfindingAlgorithmName {
  return name in pathfindingAlgorithms;
}

export function isAlgorithmName(name: string): name is AlgorithmName {
  return (
    isSortingAlgorithm(name) ||
    isSearchAlgorithm(name) ||
    isGraphAlgorithm(name) ||
    isDataStructureAlgorithm(name) ||
    isDpAlgorithm(name) ||
    isPathfindingAlgorithm(name)
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

export function getDataStructureAlgorithm(
  name: string
): DataStructureFn | null {
  return isDataStructureAlgorithm(name) ? dataStructureAlgorithms[name] : null;
}

export function getDpAlgorithm(name: string): DpFn | null {
  return isDpAlgorithm(name) ? dpAlgorithms[name] : null;
}

export function getPathfindingAlgorithm(name: string): PathfindingFn | null {
  return isPathfindingAlgorithm(name) ? pathfindingAlgorithms[name] : null;
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
  bstInsert,
  minHeapInsert,
  editDistance,
  lcs,
  aStar,
  dijkstraGrid,
  mazeRecursiveBacktracker,
};
