// __tests__/components/visualizer/VisualizerControls.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VisualizerControls from "@/components/visualizer/VisualizerControls";
import { AlgorithmProvider, useAlgorithm } from "@/context/AlgorithmContext";

// Mock the algorithms module
jest.mock("@/lib/algorithms", () => ({
  getAlgorithmByName: jest.fn().mockReturnValue(() => ({
    steps: [
      { array: [1, 2, 3], comparing: [], swapped: false, completed: [] },
      { array: [1, 2, 3], comparing: [0, 1], swapped: false, completed: [] },
      { array: [1, 2, 3], comparing: [], swapped: false, completed: [0] },
    ],
    name: "Test Algorithm",
    key: "testAlgorithm",
    category: "sorting",
    description: "Test description",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    reference: "test-reference",
    pseudoCode: ["test pseudocode"],
  })),
}));

// Mock utility functions
jest.mock("@/lib/utils", () => ({
  saveState: jest.fn(),
  loadState: jest.fn().mockReturnValue(null),
  generateRandomArray: jest.fn().mockReturnValue([4, 2, 1]),
}));

// Wrapper component to provide context and access props
const TestWrapper = ({
  onGenerateNewArray,
}: {
  onGenerateNewArray: () => void;
}) => {
  const { state } = useAlgorithm();

  return (
    <VisualizerControls
      currentStep={state.currentStep}
      totalSteps={state.visualizationData?.steps.length || 0}
      onGenerateNewArray={onGenerateNewArray}
    />
  );
};

describe("VisualizerControls", () => {
  // Create a mock for the generateNewArray function
  const mockGenerateNewArray = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render control buttons", () => {
    render(
      <AlgorithmProvider>
        <TestWrapper onGenerateNewArray={mockGenerateNewArray} />
      </AlgorithmProvider>
    );

    // Check that basic control buttons are rendered
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("New Array")).toBeInTheDocument();
  });

  it("should update state when play button is clicked", () => {
    render(
      <AlgorithmProvider>
        <TestWrapper onGenerateNewArray={mockGenerateNewArray} />
      </AlgorithmProvider>
    );

    // Click the play button
    fireEvent.click(screen.getByText("Play"));

    // The play button should be replaced with a pause button
    expect(screen.getByText("Pause")).toBeInTheDocument();
    expect(screen.queryByText("Play")).not.toBeInTheDocument();
  });

  it("should call onGenerateNewArray when New Array button is clicked", () => {
    render(
      <AlgorithmProvider>
        <TestWrapper onGenerateNewArray={mockGenerateNewArray} />
      </AlgorithmProvider>
    );

    // Click the New Array button
    fireEvent.click(screen.getByText("New Array"));

    // Check that the callback was called
    expect(mockGenerateNewArray).toHaveBeenCalledTimes(1);
  });

  it("should display the correct step information", async () => {
    render(
      <AlgorithmProvider>
        <TestWrapper onGenerateNewArray={mockGenerateNewArray} />
      </AlgorithmProvider>
    );

    // Wait for initialization
    const stepText = await screen.findByText(/Step 1 of/);
    expect(stepText).toBeInTheDocument();
  });

  it("should update step when progress slider is changed", () => {
    render(
      <AlgorithmProvider>
        <TestWrapper onGenerateNewArray={mockGenerateNewArray} />
      </AlgorithmProvider>
    );

    // Get the progress slider and change its value
    const slider = screen.getByLabelText("Progress");
    fireEvent.change(slider, { target: { value: 1 } });

    // Check that step information has updated (step 2 of 3)
    expect(screen.getByText(/Step 2 of/)).toBeInTheDocument();
  });

  it("should disable next button when on the last step", async () => {
    render(
      <AlgorithmProvider>
        <TestWrapper onGenerateNewArray={mockGenerateNewArray} />
      </AlgorithmProvider>
    );

    // Move to the last step
    const slider = screen.getByLabelText("Progress");
    fireEvent.change(slider, { target: { value: 2 } });

    // Get the next button and check that it's disabled
    const nextButton = screen.getByLabelText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("should disable prev button when on the first step", async () => {
    render(
      <AlgorithmProvider>
        <TestWrapper onGenerateNewArray={mockGenerateNewArray} />
      </AlgorithmProvider>
    );

    // Should already be on the first step
    const prevButton = screen.getByLabelText("Previous");
    expect(prevButton).toBeDisabled();

    // Move to a later step and check that the button is enabled
    const slider = screen.getByLabelText("Progress");
    fireEvent.change(slider, { target: { value: 1 } });
    expect(prevButton).not.toBeDisabled();
  });
});
