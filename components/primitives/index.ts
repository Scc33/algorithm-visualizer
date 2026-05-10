import type { ReactElement } from "react";
import { createElement } from "react";
import type { AlgorithmVisualization } from "@/lib/types";
import ArrayBars from "./ArrayBars";
import ArrayCells from "./ArrayCells";
import Graph2D from "./Graph2D";

export { default as ArrayBars } from "./ArrayBars";
export { default as ArrayCells } from "./ArrayCells";
export { default as Graph2D } from "./Graph2D";
export { default as CodeView } from "./CodeView";

/**
 * Renders the visualization for the current step using the primitive
 * declared on the AlgorithmVisualization. The discriminated union on
 * `viz.primitive` makes the switch exhaustive at the type level — adding
 * a new primitive surfaces as a compile error here.
 */
export function renderPrimitive(
  viz: AlgorithmVisualization,
  currentStep: number
): ReactElement {
  switch (viz.primitive) {
    case "array-bars": {
      const step = viz.steps[currentStep]!;
      const maxValue =
        step.array.length > 0 ? Math.max(...step.array) : 100;
      return createElement(ArrayBars, { step, maxValue });
    }
    case "array-cells": {
      const step = viz.steps[currentStep]!;
      return createElement(ArrayCells, { step });
    }
    case "graph-2d": {
      const step = viz.steps[currentStep]!;
      return createElement(Graph2D, { step });
    }
  }
}
