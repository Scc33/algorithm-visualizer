import { AlgorithmVisualization, SortingStep } from "../../types";
import { createVisualization } from "../utils";

export function bubbleSort(array: number[]): AlgorithmVisualization {
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

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Add step showing comparison
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: false,
        completed: [...completed],
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // Add step showing swap
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: true,
          completed: [...completed],
        });
      }
    }

    // Mark the last element in this pass as completed
    completed.push(n - i - 1);

    // Add step showing the completed element
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: [...completed],
    });

    // If no swapping occurred in this pass, the array is already sorted
    if (!swapped) break;
  }

  return createVisualization("bubbleSort", steps, {
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    reference: "https://en.wikipedia.org/wiki/Bubble_sort",
    pseudoCode: [
      "procedure bubbleSort(A: list of sortable items)",
      "  n := length(A)",
      "  repeat",
      "    swapped := false",
      "    for i := 1 to n-1 inclusive do",
      "        if A[i-1] > A[i] then",
      "          swap(A[i-1], A[i])",
      "          swapped := true",
      "        end if",
      "     end for",
      "     n := n - 1",
      "  until not swapped",
      "end procedure",
    ],
  });
}
