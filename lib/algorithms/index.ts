import { AlgorithmVisualization } from "../types";
import { bubbleSort } from "./sorting/bubbleSort";
import { selectionSort } from "./sorting/selectionSort";
import { insertionSort } from "./sorting/insertionSort";
import { mergeSort } from "./sorting/mergeSort";
import { quickSort } from "./sorting/quickSort";
import { heapSort } from "./sorting/heapSort";
import { linearSearch } from "./searching/linearSearch";
import { binarySearch } from "./searching/binarySearch";
import { dfs } from "./graph/dfs";

// Map algorithm names to their implementation functions
const algorithms: Record<
  string,
  (array: number[], target?: number) => AlgorithmVisualization
> = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  linearSearch,
  binarySearch,
  dfs,
};

// Get algorithm function by name
export function getAlgorithmByName(
  name: string
): ((array: number[], target?: number) => AlgorithmVisualization) | null {
  return algorithms[name] || null;
}

// Export all algorithms
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
};
