// __tests__/utils/test-utils.tsx
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AlgorithmProvider } from "@/context/AlgorithmContext";

// Custom render function that includes the AlgorithmProvider
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AlgorithmProvider>{children}</AlgorithmProvider>
    ),
    ...options,
  });
};

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override the render method
export { customRender as render };

// Helper to generate random test arrays
export const generateTestArray = (length: number) => {
  return Array.from({ length }, (_, i) => i + 1);
};
