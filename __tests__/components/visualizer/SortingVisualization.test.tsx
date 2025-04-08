// __tests__/components/visualizer/SortingVisualization.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import SortingVisualization from "@/components/visualizer/SortingVisualization";
import { SortingStep } from "@/lib/types";

describe("SortingVisualization", () => {
  const createMockStep = (
    array: number[] = [1, 2, 3],
    comparing: number[] = [],
    swapped: boolean = false,
    completed: number[] = []
  ): SortingStep => ({
    array,
    comparing,
    swapped,
    completed,
  });

  it("should render the array elements", () => {
    const mockStep = createMockStep([5, 10, 15]);
    render(<SortingVisualization step={mockStep} maxValue={15} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("should apply different colors based on element state", () => {
    // Create a step with one element comparing, one completed, and one normal
    const mockStep = createMockStep(
      [5, 10, 15],
      [1], // comparing index 1
      false,
      [2] // completed index 2
    );

    const { container } = render(
      <SortingVisualization step={mockStep} maxValue={15} />
    );

    // Get all the bar elements
    const bars = container.querySelectorAll(".bar-chart");
    expect(bars.length).toBe(3);

    // Check class names for color styles
    expect(bars[0]).toHaveClass("bg-blue-400"); // Normal bar
    expect(bars[1]).toHaveClass("bg-yellow-400"); // Comparing bar
    expect(bars[2]).toHaveClass("bg-green-400"); // Completed bar
  });

  it("should apply the swapped color when comparing and swapped is true", () => {
    // Create a step with elements being compared and swapped
    const mockStep = createMockStep(
      [5, 10, 15],
      [0, 1], // comparing indices 0 and 1
      true, // swapped is true
      []
    );

    const { container } = render(
      <SortingVisualization step={mockStep} maxValue={15} />
    );

    // Get the bar elements
    const bars = container.querySelectorAll(".bar-chart");

    // Both comparing bars should have the swapped color
    expect(bars[0]).toHaveClass("bg-red-400");
    expect(bars[1]).toHaveClass("bg-red-400");
  });

  it("should render bars with heights proportional to their values", () => {
    const mockStep = createMockStep([5, 10, 15]);
    const { container } = render(
      <SortingVisualization step={mockStep} maxValue={15} />
    );

    // Get all the bar elements
    const bars = container.querySelectorAll(".bar-chart");

    // Check that heights are set as percentages of maxValue
    expect(bars[0].style.height).toBe("33%"); // 5/15 * 100
    expect(bars[1].style.height).toBe("67%"); // 10/15 * 100
    expect(bars[2].style.height).toBe("100%"); // 15/15 * 100
  });

  it("should adjust bar widths based on the number of elements", () => {
    // Test with a small array
    const smallStep = createMockStep([1, 2, 3]);
    const { container: smallContainer } = render(
      <SortingVisualization step={smallStep} maxValue={3} />
    );

    // Test with a larger array
    const largeStep = createMockStep([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const { container: largeContainer } = render(
      <SortingVisualization step={largeStep} maxValue={10} />
    );

    // Get the bars from both renders
    const smallBars = smallContainer.querySelectorAll(".bar-chart");
    const largeBars = largeContainer.querySelectorAll(".bar-chart");

    // The width of bars in the small array should be wider than in the large array
    const smallBarWidth = parseFloat(smallBars[0].style.width);
    const largeBarWidth = parseFloat(largeBars[0].style.width);

    expect(smallBarWidth).toBeGreaterThan(largeBarWidth);
  });
});
