// __tests__/components/AlgorithmCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import AlgorithmCard from "@/components/AlgorithmCard";
import { AlgorithmInfo } from "@/lib/types";

// Mock the Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("AlgorithmCard", () => {
  const mockAlgorithm: AlgorithmInfo = {
    name: "Bubble Sort",
    key: "bubbleSort",
    category: "sorting",
    description:
      "A simple sorting algorithm that repeatedly steps through the list.",
    difficulty: "easy",
  };

  it("should render the algorithm name", () => {
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    expect(screen.getByText("Bubble Sort")).toBeInTheDocument();
  });

  it("should render the algorithm description", () => {
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    expect(
      screen.getByText(
        "A simple sorting algorithm that repeatedly steps through the list."
      )
    ).toBeInTheDocument();
  });

  it("should render the correct difficulty badge", () => {
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    const badge = screen.getByText("easy");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("badge-easy");
  });

  it("should render the correct category badge", () => {
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    const badge = screen.getByText("sorting");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("badge-info");
  });

  it("should contain a link to the algorithm visualization page", () => {
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    const visualizeLink = screen.getByText("Visualize");
    expect(visualizeLink.closest("a")).toHaveAttribute(
      "href",
      "/sorting/bubbleSort"
    );
  });

  it("should contain a link to the difficulty page", () => {
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    const difficultyLink = screen.getByText("easy");
    expect(difficultyLink.closest("a")).toHaveAttribute("href", "/easy");
  });

  it("should contain a link to the category page", () => {
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    const categoryLink = screen.getByText("sorting");
    expect(categoryLink.closest("a")).toHaveAttribute("href", "/sorting");
  });

  it("should render with different difficulty badge styles", () => {
    // Test easy difficulty
    render(<AlgorithmCard algorithm={mockAlgorithm} />);
    expect(screen.getByText("easy")).toHaveClass("badge-easy");

    // Test medium difficulty
    render(
      <AlgorithmCard algorithm={{ ...mockAlgorithm, difficulty: "medium" }} />
    );
    expect(screen.getByText("medium")).toHaveClass("badge-medium");

    // Test hard difficulty
    render(
      <AlgorithmCard algorithm={{ ...mockAlgorithm, difficulty: "hard" }} />
    );
    expect(screen.getByText("hard")).toHaveClass("badge-hard");
  });
});
