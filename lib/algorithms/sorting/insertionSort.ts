import { AlgorithmVisualization, SortingStep } from "../../types";
import { createVisualization } from "../utils";

export function insertionSort(array: number[]): AlgorithmVisualization {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const completed: number[] = [0]; // First element starts as completed

  // Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: [...completed],
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Add step showing the current element to be inserted
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: false,
      completed: [...completed],
    });

    while (j >= 0 && arr[j] > key) {
      // Add step showing comparison
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: false,
        completed: [...completed],
      });

      // Shift elements
      arr[j + 1] = arr[j];

      // Add step showing the shift
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: true,
        completed: [...completed],
      });

      j--;
    }

    // Place the key at its correct position in the sorted sequence
    arr[j + 1] = key;

    // Add the current index to completed
    completed.push(i);

    // Add step showing the insertion completed
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: [...completed],
    });
  }

  return createVisualization("insertionSort", steps, {
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    reference: "https://en.wikipedia.org/wiki/Insertion_sort",
    pseudoCode: [
      "procedure insertionSort(A: list of sortable items)",
      "  n := length(A)",
      "  for i := 1 to n-1 do",
      "    key := A[i]",
      "    j := i - 1",
      "    while j >= 0 and A[j] > key do",
      "      A[j+1] := A[j]",
      "      j := j - 1",
      "    end while",
      "    A[j+1] := key",
      " end for",
      "end procedure",
    ],
  });
}
