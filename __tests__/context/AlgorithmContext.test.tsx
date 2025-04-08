// __tests__/context/AlgorithmContext.test.tsx
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlgorithmProvider, useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";

// Mock the algorithms module
jest.mock("@/lib/algorithms", () => ({
  getAlgorithmByName: jest.fn().mockReturnValue(() => ({
    steps: [{ array: [1, 2, 3], comparing: [], swapped: false, completed: [] }],
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
  loadState: jest.fn().mockReturnValue({
    data: [5, 3, 8],
    speed: 3,
    algorithm: "testAlgorithm",
  }),
  generateRandomArray: jest.fn().mockReturnValue([4, 2, 1]),
}));

// Test component that uses the algorithm context
const TestComponent = () => {
  const { state, dispatch } = useAlgorithm();

  return (
    <div>
      <div data-testid="current-step">{state.currentStep}</div>
      <div data-testid="algorithm">{state.algorithm}</div>
      <div data-testid="speed">{state.speed}</div>
      <div data-testid="is-playing">
        {state.isPlaying ? "playing" : "paused"}
      </div>
      <div data-testid="data">{state.data.join(",")}</div>

      <button
        data-testid="next-btn"
        onClick={() => dispatch({ type: "NEXT_STEP" })}
      >
        Next
      </button>

      <button
        data-testid="prev-btn"
        onClick={() => dispatch({ type: "PREV_STEP" })}
      >
        Previous
      </button>

      <button
        data-testid="play-btn"
        onClick={() => dispatch({ type: "SET_IS_PLAYING", payload: true })}
      >
        Play
      </button>

      <button
        data-testid="pause-btn"
        onClick={() => dispatch({ type: "SET_IS_PLAYING", payload: false })}
      >
        Pause
      </button>

      <button
        data-testid="reset-btn"
        onClick={() => dispatch({ type: "RESET" })}
      >
        Reset
      </button>

      <button
        data-testid="new-data-btn"
        onClick={() =>
          dispatch({
            type: "GENERATE_RANDOM_DATA",
            payload: { min: 1, max: 10, length: 5 },
          })
        }
      >
        New Data
      </button>
    </div>
  );
};

describe("AlgorithmContext", () => {
  // Reset timers between tests
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should initialize with the correct values from localStorage", async () => {
    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Wait for initial state to be set up
    await waitFor(() => {
      expect(screen.getByTestId("algorithm")).toHaveTextContent(
        "testAlgorithm"
      );
      expect(screen.getByTestId("speed")).toHaveTextContent("3");
      expect(screen.getByTestId("data")).toHaveTextContent("5,3,8");
    });
  });

  it("should update state when dispatching actions", async () => {
    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Click the next button to increment the step
    await userEvent.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");

    // Click the play button to set isPlaying to true
    await userEvent.click(screen.getByTestId("play-btn"));
    expect(screen.getByTestId("is-playing")).toHaveTextContent("playing");

    // Click the pause button to set isPlaying to false
    await userEvent.click(screen.getByTestId("pause-btn"));
    expect(screen.getByTestId("is-playing")).toHaveTextContent("paused");

    // Click the reset button to reset currentStep to 0
    await userEvent.click(screen.getByTestId("next-btn"));
    await userEvent.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("2");
    await userEvent.click(screen.getByTestId("reset-btn"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
  });

  it("should automatically advance steps when playing", async () => {
    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Start playing
    await userEvent.click(screen.getByTestId("play-btn"));
    expect(screen.getByTestId("is-playing")).toHaveTextContent("playing");

    // Fast-forward time to trigger the interval
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check that the step has advanced
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");
  });

  it("should generate new random data", async () => {
    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Check initial data
    expect(screen.getByTestId("data")).toHaveTextContent("5,3,8");

    // Generate new data
    await userEvent.click(screen.getByTestId("new-data-btn"));

    // Check that data has changed
    expect(screen.getByTestId("data")).toHaveTextContent("4,2,1");
  });
});
