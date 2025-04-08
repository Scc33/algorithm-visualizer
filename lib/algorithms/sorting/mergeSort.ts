import { AlgorithmVisualization, SortingStep } from "../../types";
import { createVisualization } from "../utils";

export function mergeSort(array: number[]): AlgorithmVisualization {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const completed: number[] = [];

  // Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: [],
  });

  // Auxiliary array for merging
  const aux = new Array(n);

  // Call the recursive merge sort function
  mergeSortHelper(arr, 0, n - 1, aux, steps, completed);

  // Mark all elements as completed in the final step
  const finalCompleted = Array.from({ length: n }, (_, i) => i);
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: finalCompleted,
  });

  return createVisualization("mergeSort", steps, {
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    reference: "https://en.wikipedia.org/wiki/Merge_sort",
    pseudoCode: [
      "procedure mergeSort(A: list of sortable items, lo: int, hi: int)",
      "  if lo < hi then",
      "    mid := floor((lo + hi) / 2)",
      "    mergeSort(A, lo, mid)",
      "    mergeSort(A, mid + 1, hi)",
      "    merge(A, lo, mid, hi)",
      "  end if",
      "end procedure",
      "",
      "procedure merge(A: list of sortable items, lo: int, mid: int, hi: int)",
      "  i := lo; j := mid + 1; k := lo",
      "  Let aux be a new array of same size as A",
      "  while i <= mid and j <= hi do",
      "    if A[i] <= A[j] then",
      "      aux[k] := A[i]",
      "      i := i + 1",
      "    else",
      "      aux[k] := A[j]",
      "      j := j + 1",
      "    end if",
      "    k := k + 1",
      "  end while",
      "  while i <= mid do",
      "    aux[k] := A[i]",
      "    i := i + 1; k := k + 1",
      "  end while",
      "  while j <= hi do",
      "    aux[k] := A[j]",
      "    j := j + 1; k := k + 1",
      "  end while",
      "  for k := lo to hi do",
      "    A[k] := aux[k]",
      "  end for",
      "end procedure",
    ],
  });
}

function mergeSortHelper(
  arr: number[],
  lo: number,
  hi: number,
  aux: number[],
  steps: SortingStep[],
  completed: number[]
): void {
  if (lo >= hi) return;

  const mid = Math.floor((lo + hi) / 2);

  // Show the current subarray being divided
  const comparing = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  steps.push({
    array: [...arr],
    comparing: comparing,
    swapped: false,
    completed: [...completed],
  });

  // Recursively sort the left and right subarrays
  mergeSortHelper(arr, lo, mid, aux, steps, completed);
  mergeSortHelper(arr, mid + 1, hi, aux, steps, completed);

  // Merge the two sorted subarrays
  merge(arr, lo, mid, hi, aux, steps, completed);
}

function merge(
  arr: number[],
  lo: number,
  mid: number,
  hi: number,
  aux: number[],
  steps: SortingStep[],
  completed: number[]
): void {
  // Copy elements to auxiliary array
  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k];
  }

  let i = lo; // Pointer for the left subarray
  let j = mid + 1; // Pointer for the right subarray

  // Merge process
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      // Left subarray exhausted
      arr[k] = aux[j++];
      steps.push({
        array: [...arr],
        comparing: [j - 1],
        swapped: true,
        completed: [...completed],
      });
    } else if (j > hi) {
      // Right subarray exhausted
      arr[k] = aux[i++];
      steps.push({
        array: [...arr],
        comparing: [i - 1],
        swapped: true,
        completed: [...completed],
      });
    } else if (aux[i] <= aux[j]) {
      // Elements compared, left element is smaller
      steps.push({
        array: [...arr],
        comparing: [i, j],
        swapped: false,
        completed: [...completed],
      });
      arr[k] = aux[i++];
      steps.push({
        array: [...arr],
        comparing: [k],
        swapped: true,
        completed: [...completed],
      });
    } else {
      // Elements compared, right element is smaller
      steps.push({
        array: [...arr],
        comparing: [i, j],
        swapped: false,
        completed: [...completed],
      });
      arr[k] = aux[j++];
      steps.push({
        array: [...arr],
        comparing: [k],
        swapped: true,
        completed: [...completed],
      });
    }
  }

  // Mark elements in this range as completed if it's the final merge for this segment
  if (lo === 0 && hi === arr.length - 1) {
    for (let k = lo; k <= hi; k++) {
      completed.push(k);
    }
  } else if (hi - lo + 1 >= 3) {
    // Mark the middle element as completed for intermediate merges
    const midElement = Math.floor((lo + hi) / 2);
    if (!completed.includes(midElement)) {
      completed.push(midElement);
    }
  }

  // Show the merged subarray
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: [...completed],
  });
}
