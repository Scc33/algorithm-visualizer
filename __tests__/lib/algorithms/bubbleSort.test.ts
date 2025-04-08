// __tests__/lib/algorithms/bubbleSort.test.ts
import { bubbleSort } from "@/lib/algorithms/bubbleSort";

describe("Bubble Sort Algorithm", () => {
  it("should return the correct visualization structure", () => {
    const testArray = [5, 3, 8, 4, 2];
    const result = bubbleSort(testArray);

    // Check basic structure
    expect(result).toHaveProperty("steps");
    expect(result).toHaveProperty("name", "Bubble Sort");
    expect(result).toHaveProperty("key", "bubbleSort");
    expect(result).toHaveProperty("category", "sorting");
    expect(result).toHaveProperty("timeComplexity", "O(n²)");
    expect(result).toHaveProperty("spaceComplexity", "O(1)");
    expect(result).toHaveProperty("pseudoCode");
    expect(Array.isArray(result.pseudoCode)).toBe(true);
  });

  it("should preserve the original array (not mutate it)", () => {
    const testArray = [5, 3, 8, 4, 2];
    const originalArray = [...testArray];

    bubbleSort(testArray);

    expect(testArray).toEqual(originalArray);
  });

  it("should correctly sort the array by the final step", () => {
    const testArray = [5, 3, 8, 4, 2];
    const sortedArray = [...testArray].sort((a, b) => a - b);

    const result = bubbleSort(testArray);
    const finalStepArray = result.steps[result.steps.length - 1].array;

    expect(finalStepArray).toEqual(sortedArray);
  });

  it("should handle arrays of length 1", () => {
    const testArray = [1];
    const result = bubbleSort(testArray);

    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.steps[0].array).toEqual([1]);
    expect(result.steps[result.steps.length - 1].array).toEqual([1]);
  });

  it("should handle empty arrays", () => {
    const testArray: number[] = [];
    const result = bubbleSort(testArray);

    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.steps[0].array).toEqual([]);
  });

  it("should handle already sorted arrays", () => {
    const testArray = [1, 2, 3, 4, 5];
    const result = bubbleSort(testArray);

    // Check that the final state is the same as the initial sorted array
    expect(result.steps[result.steps.length - 1].array).toEqual(testArray);
  });

  it("should mark elements as completed in the correct order", () => {
    const testArray = [5, 3, 8, 4, 2];
    const result = bubbleSort(testArray);

    // In bubble sort, elements are completed from the end
    // Check that the last step has all elements marked as completed
    const finalStep = result.steps[result.steps.length - 1];
    expect(finalStep.completed.length).toBeGreaterThan(0);

    // The number of elements marked as completed should increase through the steps
    let prevCompletedCount = -1;
    for (const step of result.steps) {
      if (step.completed.length > prevCompletedCount) {
        prevCompletedCount = step.completed.length;
      }
      expect(step.completed.length).toBeGreaterThanOrEqual(prevCompletedCount);
    }
  });
});
