import { AlgorithmVisualization, SortingStep } from "../../types";
import { createVisualization } from "../utils";

export function heapSort(array: number[]): AlgorithmVisualization {
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

  // Build max heap
  buildMaxHeap(arr, n, steps, completed);

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (maximum element) to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Show the swap from root to end
    steps.push({
      array: [...arr],
      comparing: [0, i],
      swapped: true,
      completed: [...completed],
    });

    // Add the last position to completed elements
    completed.push(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: [...completed],
    });

    // Call max heapify on the reduced heap
    heapify(arr, 0, i, steps, completed);
  }

  // Add the first element to completed
  if (!completed.includes(0)) {
    completed.push(0);
  }

  // Final state
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: [...completed],
  });

  return createVisualization("heapSort", steps, {
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    reference: "https://en.wikipedia.org/wiki/Heapsort",
    pseudoCode: [
      "procedure heapSort(A: list of sortable items)",
      "  n := length(A)",
      "  // Build max heap",
      "  for i := floor(n/2) - 1 downto 0 do",
      "    heapify(A, n, i)",
      "  end for",
      "  // Extract elements from heap one by one",
      "  for i := n - 1 downto 0 do",
      "    swap A[0] with A[i]  // Move current root to end",
      "    heapify(A, i, 0)     // Call max heapify on reduced heap",
      "  end for",
      "end procedure",
      "",
      "procedure heapify(A: list of sortable items, n: int, i: int)",
      "  largest := i       // Initialize largest as root",
      "  left := 2*i + 1    // Left child",
      "  right := 2*i + 2   // Right child",
      "  // If left child is larger than root",
      "  if left < n and A[left] > A[largest] then",
      "    largest := left",
      "  end if",
      "  // If right child is larger than largest so far",
      "  if right < n and A[right] > A[largest] then",
      "    largest := right",
      "  end if",
      "  // If largest is not root",
      "  if largest ≠ i then",
      "    swap A[i] with A[largest]",
      "    heapify(A, n, largest)  // Recursively heapify the affected sub-tree",
      "  end if",
      "end procedure",
    ],
  });
}

function buildMaxHeap(
  arr: number[],
  n: number,
  steps: SortingStep[],
  completed: number[]
): void {
  // Build a max heap from the input array
  // Index of the last non-leaf node
  const startIdx = Math.floor(n / 2) - 1;

  // Show the array before heapification
  steps.push({
    array: [...arr],
    comparing: Array.from({ length: n }, (_, i) => i),
    swapped: false,
    completed: [...completed],
  });

  // Perform heapify operation for all non-leaf nodes
  for (let i = startIdx; i >= 0; i--) {
    heapify(arr, i, n, steps, completed);
  }

  // Show the array after being heapified
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: [...completed],
  });
}

function heapify(
  arr: number[],
  i: number,
  n: number,
  steps: SortingStep[],
  completed: number[]
): void {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child

  // Show the node and its children (if they exist)
  const nodesToCompare = [i];
  if (left < n) nodesToCompare.push(left);
  if (right < n) nodesToCompare.push(right);

  steps.push({
    array: [...arr],
    comparing: nodesToCompare,
    swapped: false,
    completed: [...completed],
  });

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    // Swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Show the swap
    steps.push({
      array: [...arr],
      comparing: [i, largest],
      swapped: true,
      completed: [...completed],
    });

    // Recursively heapify the affected sub-tree
    heapify(arr, largest, n, steps, completed);
  }
}
