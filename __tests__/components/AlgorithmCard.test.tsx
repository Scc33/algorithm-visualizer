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
});
