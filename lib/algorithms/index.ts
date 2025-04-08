import { AlgorithmVisualization, AlgorithmInfo } from "../types";
import { bubbleSort } from "./sorting/bubbleSort";
import { selectionSort } from "./sorting/selectionSort";
import { insertionSort } from "./sorting/insertionSort";
import { mergeSort } from "./sorting/mergeSort";
import { quickSort } from "./sorting/quickSort";
import { heapSort } from "./sorting/heapSort";
import { linearSearch } from "./searching/linearSearch";
import { binarySearch } from "./searching/binarySearch";

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
    subtitle: "Simple but inefficient comparison sort",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. With a time complexity of O(n²), it's inefficient for large datasets but is easy to implement and understand. The algorithm gets its name because smaller elements 'bubble' to the top of the list with each iteration.",
    difficulty: "easy",
  },
  {
    name: "Selection Sort",
    key: "selectionSort",
    category: "sorting",
    subtitle: "In-place comparison sort with O(n²) complexity",
    description:
      "The selection sort algorithm sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning. Unlike bubble sort, it makes only O(n) swaps, making it useful when write/swap operations are expensive. However, its O(n²) time complexity makes it inefficient for large datasets. Selection sort is not stable, meaning equal elements might not maintain their relative positions.",
    difficulty: "easy",
  },
  {
    name: "Insertion Sort",
    key: "insertionSort",
    category: "sorting",
    subtitle: "Efficient for small data sets and nearly sorted arrays",
    description:
      "Insertion sort iterates through an array and at each iteration it removes one element, finds the location where it belongs and inserts it there. While it has an average time complexity of O(n²), it performs exceptionally well on small or nearly-sorted arrays with best-case O(n) performance. Insertion sort is an adaptive, stable, in-place algorithm that works similarly to how people sort playing cards in their hands.",
    difficulty: "easy",
  },
  {
    name: "Merge Sort",
    key: "mergeSort",
    category: "sorting",
    subtitle: "Stable, divide-and-conquer algorithm with O(n log n) complexity",
    description:
      "Merge sort is a divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. With a consistent O(n log n) time complexity regardless of input data, it outperforms simpler algorithms on large datasets. While requiring O(n) auxiliary space for the merging process, it guarantees stability and is particularly efficient for linked lists. Merge sort is often used in external sorting when data doesn't fit in memory.",
    difficulty: "medium",
  },
  {
    name: "Quick Sort",
    key: "quickSort",
    category: "sorting",
    subtitle: "Fast, in-place sorting with average O(n log n) performance",
    description:
      "Quick sort is a divide and conquer algorithm that picks an element as a pivot and partitions the array around the pivot. With an average time complexity of O(n log n) and minimal space requirements, it's typically faster in practice than other O(n log n) algorithms like merge sort. However, it has a worst-case time complexity of O(n²) with poor pivot selection and is not stable. Quick sort is widely used and serves as the foundation for many programming language sorting implementations.",
    difficulty: "medium",
  },
  {
    name: "Heap Sort",
    key: "heapSort",
    category: "sorting",
    subtitle: "Comparison-based sort using binary heap structure",
    description:
      "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and then repeatedly extracts the maximum element. With a guaranteed O(n log n) time complexity regardless of input data and O(1) auxiliary space, it combines many advantages of insertion sort and merge sort. While not stable and slightly slower than quick sort in practice, heap sort provides reliable performance without the risk of worst-case scenarios, making it valuable for systems requiring consistent performance.",
    difficulty: "hard",
  },
  {
    name: "Linear Search",
    key: "linearSearch",
    category: "searching",
    subtitle: "Simple O(n) search through unsorted collections",
    description:
      "Linear search sequentially checks each element of the list until it finds an element that matches the target value. With a time complexity of O(n), it's the simplest searching algorithm but becomes inefficient for large datasets. One advantage is that it works on unsorted arrays and doesn't require any preprocessing. Linear search is practical for small arrays or when the target is likely to be found early in the sequence. It's also useful when searching rarely happens or when elements are frequently added and removed.",
    difficulty: "easy",
  },
  {
    name: "Binary Search",
    key: "binarySearch",
    category: "searching",
    subtitle: "Efficient O(log n) search for sorted collections",
    description:
      "Binary search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half. With a logarithmic time complexity of O(log n), it's dramatically more efficient than linear search for large datasets. Binary search requires the array to be sorted beforehand, making it ideal for situations where searching occurs frequently on relatively static data. This algorithm is the foundation for many efficient data structures like binary search trees and is widely used in database systems, dictionaries, and numerous programming applications.",
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
