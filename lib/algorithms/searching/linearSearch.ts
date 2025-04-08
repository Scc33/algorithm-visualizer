import { AlgorithmVisualization, SearchStep } from "../../types";
import { createVisualization } from "../utils";

export function linearSearch(
  array: number[],
  target: number = 42
): AlgorithmVisualization {
  const steps: SearchStep[] = [];
  const arr = [...array];
  const visited: number[] = [];

  // Initial state
  steps.push({
    array: [...arr],
    current: -1,
    target: target,
    found: false,
    visited: [],
  });

  // Linear search algorithm
  for (let i = 0; i < arr.length; i++) {
    // Add current index to visited
    visited.push(i);

    // Record the step of examining this index
    steps.push({
      array: [...arr],
      current: i,
      target: target,
      found: false,
      visited: [...visited],
    });

    // Check if current element equals target
    if (arr[i] === target) {
      // Found the target, record final step
      steps.push({
        array: [...arr],
        current: i,
        target: target,
        found: true,
        visited: [...visited],
      });
      break;
    }
  }

  // If we've gone through the entire array without finding the target
  if (!steps[steps.length - 1].found) {
    steps.push({
      array: [...arr],
      current: -1,
      target: target,
      found: false,
      visited: [...visited],
    });
  }

  return createVisualization("linearSearch", steps, {
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    reference: "https://en.wikipedia.org/wiki/Linear_search",
    pseudoCode: [
      "procedure linearSearch(arr: array of elements, target: element)",
      "  for i := 0 to length(arr) - 1 do",
      "    if arr[i] = target then",
      "      return i",
      "    end if",
      "  end for",
      "  return -1  // Target not found",
      "end procedure",
    ],
  });
}
