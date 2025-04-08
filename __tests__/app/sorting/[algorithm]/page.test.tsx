import React from "react";
import { render, screen } from "@testing-library/react";
import AlgorithmPage from "@/app/sorting/[algorithm]/page";
import { AlgorithmProvider } from "@/context/AlgorithmContext";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useParams: jest.fn(() => ({ algorithm: "bubbleSort" })),
  notFound: jest.fn(),
}));

// Mock the algorithms module
jest.mock("@/lib/algorithms", () => {
  const mockGetAlgorithmByName = jest.fn().mockReturnValue(() => ({
    steps: [
      { array: [5, 3, 8], comparing: [], swapped: false, completed: [] },
      { array: [3, 5, 8], comparing: [], swapped: false, completed: [2] },
    ],
    name: "Bubble Sort",
    key: "bubbleSort",
    category: "sorting",
    description: "A simple sorting algorithm",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    reference: "https://en.wikipedia.org/wiki/Bubble_sort",
    pseudoCode: ["procedure bubbleSort(A: list of sortable items)"],
  }));

  return {
    getAlgorithmByName: mockGetAlgorithmByName,
    availableAlgorithms: [
      {
        name: "Bubble Sort",
        key: "bubbleSort",
        category: "sorting",
        description: "A simple sorting algorithm",
        difficulty: "easy",
      },
    ],
  };
});

// Mock the PageLayout component
jest.mock("@/components/layout/PageLayout", () => {
  return ({ children, title, subtitle }: any) => (
    <div data-testid="page-layout">
      <h1 data-testid="page-title">{title}</h1>
      <p data-testid="page-subtitle">{subtitle}</p>
      <div data-testid="page-content">{children}</div>
    </div>
  );
});

// Mock the AlgorithmVisualizer component
jest.mock("@/components/visualizer/AlgorithmVisualizer", () => {
  return () => (
    <div data-testid="algorithm-visualizer">Algorithm Visualizer Mock</div>
  );
});

describe("AlgorithmPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the algorithm page with correct title and description", () => {
    render(
      <AlgorithmProvider>
        <AlgorithmPage />
      </AlgorithmProvider>
    );

    expect(screen.getByTestId("page-title")).toHaveTextContent("Bubble Sort");
    expect(screen.getByTestId("page-subtitle")).toHaveTextContent(
      "A simple sorting algorithm"
    );
  });

  it("should render the AlgorithmVisualizer component", () => {
    render(
      <AlgorithmProvider>
        <AlgorithmPage />
      </AlgorithmProvider>
    );

    expect(screen.getByTestId("algorithm-visualizer")).toBeInTheDocument();
  });

  it("should render algorithm not found message for invalid algorithm", () => {
    // Mock the useParams to return an invalid algorithm
    require("next/navigation").useParams.mockReturnValue({
      algorithm: "invalidAlgorithm",
    });

    // Mock the getAlgorithmByName to return null for invalid algorithm
    require("@/lib/algorithms").getAlgorithmByName.mockReturnValue(null);

    // Mock the availableAlgorithms to not include the invalid algorithm
    require("@/lib/algorithms").availableAlgorithms = [];

    render(
      <AlgorithmProvider>
        <AlgorithmPage />
      </AlgorithmProvider>
    );

    // Use queryAllByText to handle multiple matches and check the first occurrence
    const notFoundElements = screen.queryAllByText("Algorithm Not Found");
    expect(notFoundElements.length).toBeGreaterThan(0);
    expect(notFoundElements[0]).toBeInTheDocument();
  });

  it("should call getAlgorithmByName with the correct algorithm key", () => {
    // Reset the useParams mock to return bubbleSort
    require("next/navigation").useParams.mockReturnValue({
      algorithm: "bubbleSort",
    });

    // Reset algorithm mock data
    require("@/lib/algorithms").availableAlgorithms = [
      {
        name: "Bubble Sort",
        key: "bubbleSort",
        category: "sorting",
        description: "A simple sorting algorithm",
        difficulty: "easy",
      },
    ];

    // Get the mock function and clear it
    const mockedGetAlgorithmByName =
      require("@/lib/algorithms").getAlgorithmByName;
    mockedGetAlgorithmByName.mockClear();

    render(
      <AlgorithmProvider>
        <AlgorithmPage />
      </AlgorithmProvider>
    );

    // Check that getAlgorithmByName was called with the right algorithm key
    expect(mockedGetAlgorithmByName).toHaveBeenCalledWith("bubbleSort");
  });
});
