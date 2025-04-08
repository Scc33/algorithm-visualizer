import { AlgorithmVisualization, SortingStep } from "../../types";
import { createVisualization } from "../utils";

export function quickSort(array: number[]): AlgorithmVisualization {
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

  // Call the recursive quick sort function
  quickSortHelper(arr, 0, n - 1, steps, completed);

  // Mark all elements as completed in the final step
  const finalCompleted = Array.from({ length: n }, (_, i) => i);
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: finalCompleted,
  });

  return createVisualization("quickSort", steps, {
    timeComplexity: "O(n log n) - average, O(n²) - worst case",
    spaceComplexity: "O(log n)",
    reference: "https://en.wikipedia.org/wiki/Quicksort",
    pseudoCode: [
      "procedure quickSort(A: list of sortable items, lo: int, hi: int)",
      "  if lo < hi then",
      "    p := partition(A, lo, hi)",
      "    quickSort(A, lo, p - 1)",
      "    quickSort(A, p + 1, hi)",
      "  end if",
      "end procedure",
      "",
      "procedure partition(A: list of sortable items, lo: int, hi: int)",
      "  pivot := A[hi]",
      "  i := lo - 1",
      "  for j := lo to hi - 1 do",
      "    if A[j] <= pivot then",
      "      i := i + 1",
      "      swap A[i] with A[j]",
      "    end if",
      "  end for",
      "  swap A[i + 1] with A[hi]",
      "  return i + 1",
      "end procedure",
    ],
  });
}

function quickSortHelper(
  arr: number[],
  lo: number,
  hi: number,
  steps: SortingStep[],
  completed: number[]
): void {
  if (lo >= hi) {
    // Single element is already sorted
    if (lo >= 0 && lo < arr.length && !completed.includes(lo)) {
      completed.push(lo);
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: false,
        completed: [...completed],
      });
    }
    return;
  }

  // Show current subarray
  const subarrayIndices = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  steps.push({
    array: [...arr],
    comparing: subarrayIndices,
    swapped: false,
    completed: [...completed],
  });

  // Partition the array and get the pivot index
  const pivotIndex = partition(arr, lo, hi, steps, completed);

  // Mark the pivot as completed since it's now in its final position
  if (!completed.includes(pivotIndex)) {
    completed.push(pivotIndex);
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: [...completed],
    });
  }

  // Recursively sort the subarrays
  quickSortHelper(arr, lo, pivotIndex - 1, steps, completed);
  quickSortHelper(arr, pivotIndex + 1, hi, steps, completed);
}

function partition(
  arr: number[],
  lo: number,
  hi: number,
  steps: SortingStep[],
  completed: number[]
): number {
  // Choose the rightmost element as the pivot
  const pivot = arr[hi];

  // Show pivot selection
  steps.push({
    array: [...arr],
    comparing: [hi],
    swapped: false,
    completed: [...completed],
  });

  // Index of smaller element
  let i = lo - 1;

  for (let j = lo; j < hi; j++) {
    // Compare current element with pivot
    steps.push({
      array: [...arr],
      comparing: [j, hi],
      swapped: false,
      completed: [...completed],
    });

    // If current element is smaller than or equal to the pivot
    if (arr[j] <= pivot) {
      i++;

      // Swap arr[i] and arr[j]
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [i, j],
          swapped: true,
          completed: [...completed],
        });
      }
    }
  }

  // Swap arr[i+1] and arr[hi] (put the pivot in its correct position)
  const pivotPos = i + 1;
  if (pivotPos !== hi) {
    [arr[pivotPos], arr[hi]] = [arr[hi], arr[pivotPos]];
    steps.push({
      array: [...arr],
      comparing: [pivotPos, hi],
      swapped: true,
      completed: [...completed],
    });
  }

  return pivotPos;
}
