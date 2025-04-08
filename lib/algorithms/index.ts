import { AlgorithmVisualization, AlgorithmInfo } from "../types";
import { bubbleSort } from "./bubbleSort";
import { selectionSort } from "./selectionSort";
import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { heapSort } from "./heapSort";
import { linearSearch } from "./linearSearch";
import { binarySearch } from "./binarySearch";

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
};

// Get algorithm function by name
export function getAlgorithmByName(
  name: string
): ((array: number[], target?: number) => AlgorithmVisualization) | null {
  return algorithms[name] || null;
}

// List available algorithms with metadata
export const availableAlgorithms: AlgorithmInfo[] = [
  {
    name: "Bubble Sort",
    key: "bubbleSort",
    category: "sorting",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    difficulty: "easy",
  },
  {
    name: "Selection Sort",
    key: "selectionSort",
    category: "sorting",
    description:
      "The selection sort algorithm sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
    difficulty: "easy",
  },
  {
    name: "Insertion Sort",
    key: "insertionSort",
    category: "sorting",
    description:
      "Insertion sort iterates through an array and at each iteration it removes one element, finds the location where it belongs and inserts it there.",
    difficulty: "easy",
  },
  {
    name: "Merge Sort",
    key: "mergeSort",
    category: "sorting",
    description:
      "Merge sort is a divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
    difficulty: "medium",
  },
  {
    name: "Quick Sort",
    key: "quickSort",
    category: "sorting",
    description:
      "Quick sort is a divide and conquer algorithm that picks an element as a pivot and partitions the array around the pivot.",
    difficulty: "medium",
  },
  {
    name: "Heap Sort",
    key: "heapSort",
    category: "sorting",
    description:
      "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and then extract elements in order.",
    difficulty: "hard",
  },
  {
    name: "Linear Search",
    key: "linearSearch",
    category: "searching",
    description:
      "Linear search sequentially checks each element of the list until it finds an element that matches the target value.",
    difficulty: "easy",
  },
  {
    name: "Binary Search",
    key: "binarySearch",
    category: "searching",
    description:
      "Binary search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    difficulty: "medium",
  },
];

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
};
