import { AlgorithmVisualization, SortingStep } from "../../types";
import { createVisualization } from "../utils";

export function selectionSort(array: number[]): AlgorithmVisualization {
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

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find the minimum element in the unsorted part of the array
    for (let j = i + 1; j < n; j++) {
      // Add step showing comparison
      steps.push({
        array: [...arr],
        comparing: [minIndex, j],
        swapped: false,
        completed: [...completed],
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      // Add step before swapping
      steps.push({
        array: [...arr],
        comparing: [i, minIndex],
        swapped: false,
        completed: [...completed],
      });

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      // Add step showing the swap
      steps.push({
        array: [...arr],
        comparing: [i, minIndex],
        swapped: true,
        completed: [...completed],
      });
    }

    // Mark the current position as completed
    completed.push(i);

    // Add step showing the completed element
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: [...completed],
    });
  }

  // Mark the last element as completed
  completed.push(n - 1);
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: [...completed],
  });

  return createVisualization("selectionSort", steps, {
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    reference: "https://en.wikipedia.org/wiki/Selection_sort",
    pseudoCode: [
      "procedure selectionSort(A: list of sortable items)",
      "  n := length(A)",
      "  for i := 0 to n-2 do",
      "    minIndex := i",
      "    for j := i+1 to n-1 do",
      "      if A[j] < A[minIndex] then",
      "        minIndex := j",
      "      end if",
      "    end for",
      "    if minIndex ≠ i then",
      "      swap(A[i], A[minIndex])",
      "    end if",
      "  end for",
      "end procedure",
    ],
  });
}
