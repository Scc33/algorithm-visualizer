import { AlgorithmVisualization, SearchStep } from "../../types";
import { createVisualization } from "../utils";

export function binarySearch(
  array: number[],
  target: number = 42
): AlgorithmVisualization {
  const steps: SearchStep[] = [];
  // Make a copy of the array and sort it (binary search requires a sorted array)
  const arr = [...array].sort((a, b) => a - b);
  const visited: number[] = [];

  // Initial state
  steps.push({
    array: [...arr],
    current: -1,
    target: target,
    found: false,
    visited: [],
  });

  let left = 0;
  let right = arr.length - 1;
  let found = false;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Add current index to visited
    visited.push(mid);

    // Record the step of examining the middle value
    steps.push({
      array: [...arr],
      current: mid,
      target: target,
      found: false,
      visited: [...visited],
    });

    // Check if middle element is the target
    if (arr[mid] === target) {
      // Found the target
      steps.push({
        array: [...arr],
        current: mid,
        target: target,
        found: true,
        visited: [...visited],
      });
      found = true;
      break;
    } else if (arr[mid] < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
  }

  // If target was not found
  if (!found) {
    steps.push({
      array: [...arr],
      current: -1,
      target: target,
      found: false,
      visited: [...visited],
    });
  }

  return createVisualization("binarySearch", steps, {
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    reference: "https://en.wikipedia.org/wiki/Binary_search_algorithm",
    pseudoCode: [
      "procedure binarySearch(arr: sorted array, target: element)",
      "  left := 0",
      "  right := length(arr) - 1",
      "  while left <= right do",
      "    mid := floor((left + right) / 2)",
      "    if arr[mid] = target then",
      "      return mid       // Target found at index mid",
      "    else if arr[mid] < target then",
      "      left := mid + 1  // Target is in the right half",
      "    else",
      "      right := mid - 1 // Target is in the left half",
      "    end if",
      "  end while",
      "  return -1            // Target not found",
      "end procedure",
    ],
  });
}
