// __tests__/context/AlgorithmContext.test.tsx
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlgorithmProvider, useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";

// Mock the window.localStorage before importing context
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

// Replace the window.localStorage object with our mock
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

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
jest.mock("@/lib/utils", () => {
  const originalModule = jest.requireActual("@/lib/utils");

  return {
    ...originalModule,
    saveState: jest.fn(),
    loadState: jest.fn().mockReturnValue({
      data: [5, 3, 8],
      speed: 3,
      algorithm: "testAlgorithm",
    }),
    generateRandomArray: jest.fn().mockReturnValue([4, 2, 1]),
  };
});

// Test component that uses the algorithm context
const TestComponent = () => {
  const { state, dispatch } = useAlgorithm();

  // Quick visualization component to show state
  React.useEffect(() => {
    console.log("Current state in TestComponent:", state);
  }, [state]);

  return (
    <div>
      <div data-testid="current-step">{state.currentStep}</div>
      <div data-testid="algorithm">{state.algorithm}</div>
      <div data-testid="speed">{state.speed}</div>
      <div data-testid="is-playing">
        {state.isPlaying ? "playing" : "paused"}
      </div>
      <div data-testid="data">{state.data?.join(",") || "No data"}</div>
      <div data-testid="viz-data">
        {state.visualizationData ? "Has Viz Data" : "No Viz Data"}
      </div>

      <button
        data-testid="next-btn"
        onClick={() => dispatch({ type: "NEXT_STEP" })}
        disabled={
          !state.visualizationData ||
          state.currentStep >= state.visualizationData.steps.length - 1
        }
      >
        Next
      </button>

      <button
        data-testid="prev-btn"
        onClick={() => dispatch({ type: "PREV_STEP" })}
        disabled={state.currentStep <= 0}
      >
        Previous
      </button>

      <button
        data-testid="play-btn"
        onClick={() => dispatch({ type: "SET_IS_PLAYING", payload: true })}
        disabled={
          !state.visualizationData ||
          state.currentStep >= state.visualizationData.steps.length - 1
        }
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
        onClick={() => {
          dispatch({
            type: "GENERATE_RANDOM_DATA",
            payload: { min: 1, max: 10, length: 5 },
          });

          // This would normally be handled via an effect in the real component
          setTimeout(() => {
            const algorithm = state.algorithm;
            if (getAlgorithmByName && algorithm) {
              const algorithmFn = getAlgorithmByName(algorithm);
              if (algorithmFn) {
                const viz = algorithmFn(state.data);
                dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
              }
            }
          }, 0);
        }}
      >
        New Data
      </button>
    </div>
  );
};

describe("AlgorithmContext", () => {
  // Reset timers and mocks between tests
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should initialize with the correct values from localStorage", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Wait for initial state to be loaded
    await waitFor(() => {
      expect(screen.getByTestId("algorithm")).toHaveTextContent(
        "testAlgorithm"
      );
    });

    // Check all state values
    expect(screen.getByTestId("speed")).toHaveTextContent("3");
    expect(screen.getByTestId("data")).toHaveTextContent("5,3,8");

    // Verify visualization data is generated during initialization
    await waitFor(() => {
      expect(screen.getByTestId("viz-data")).toHaveTextContent("Has Viz Data");
    });
  });

  it("should update step when next button is clicked", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Wait for context to be initialized
    await waitFor(() => {
      expect(screen.getByTestId("viz-data")).toHaveTextContent("Has Viz Data");
    });

    // Get initial step
    expect(screen.getByTestId("current-step")).toHaveTextContent("0");

    // Click the next button to increment the step
    await user.click(screen.getByTestId("next-btn"));

    // Check step updated
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");
  });

  it("should toggle playing state", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Wait for context to be initialized
    await waitFor(() => {
      expect(screen.getByTestId("viz-data")).toHaveTextContent("Has Viz Data");
    });

    // Initially paused
    expect(screen.getByTestId("is-playing")).toHaveTextContent("paused");

    // Click play
    await user.click(screen.getByTestId("play-btn"));
    expect(screen.getByTestId("is-playing")).toHaveTextContent("playing");

    // Click pause
    await user.click(screen.getByTestId("pause-btn"));
    expect(screen.getByTestId("is-playing")).toHaveTextContent("paused");
  });

  it("should reset to step 0", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Wait for context to be initialized
    await waitFor(() => {
      expect(screen.getByTestId("viz-data")).toHaveTextContent("Has Viz Data");
    });

    // Move to step 1
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");

    // Reset to step 0
    await user.click(screen.getByTestId("reset-btn"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
  });

  it("should automatically advance steps when playing", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Wait for context to be initialized
    await waitFor(() => {
      expect(screen.getByTestId("viz-data")).toHaveTextContent("Has Viz Data");
    });

    // Start playing
    await user.click(screen.getByTestId("play-btn"));
    expect(screen.getByTestId("is-playing")).toHaveTextContent("playing");

    // Fast-forward time to trigger the interval
    act(() => {
      jest.advanceTimersByTime(1000); // Advance by 1 second
    });

    // Check that the step has advanced
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");
  });

  it("should generate new random data", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <AlgorithmProvider>
        <TestComponent />
      </AlgorithmProvider>
    );

    // Wait for context to be initialized
    await waitFor(() => {
      expect(screen.getByTestId("viz-data")).toHaveTextContent("Has Viz Data");
      expect(screen.getByTestId("data")).toHaveTextContent("5,3,8");
    });

    // Reset mocks to track new calls
    jest.clearAllMocks();

    // Generate new data
    await user.click(screen.getByTestId("new-data-btn"));

    // Wait for state to update
    await waitFor(() => {
      expect(screen.getByTestId("data")).toHaveTextContent("4,2,1");
    });
  });
});
