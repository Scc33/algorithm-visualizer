"use client";

import SortingVisualization from "./SortingVisualization";
import SearchVisualization from "./SearchVisualization";
import GraphVisualization from "./GraphVisualization";
import VisualizerControls from "./VisualizerControls";
import AlgorithmInfo from "./AlgorithmInfo";
import AlgorithmPseudocode from "./AlgorithmPseudocode";
import ColorLegend from "./ColorLegend";
import ArrayInputPanel from "./ArrayInputPanel";
import { useAlgorithm } from "@/context/AlgorithmContext";
import {
  getGraphAlgorithm,
  getSearchAlgorithm,
  getSortingAlgorithm,
  isGraphAlgorithm,
} from "@/lib/algorithms";
import { defaultGraphFor } from "@/lib/algorithms/graph/sampleGraphs";
import { generateRandomArray, getRandomValueFromArray } from "@/lib/utils";
import type {
  AlgorithmVisualization,
  GraphStep,
  SearchStep,
  SortingStep,
} from "@/lib/types";

function regenerateGraph(
  algorithm: string,
  startVertex?: number
): AlgorithmVisualization | null {
  if (!isGraphAlgorithm(algorithm)) return null;
  const graphFn = getGraphAlgorithm(algorithm);
  if (!graphFn) return null;
  try {
    const graph = defaultGraphFor(algorithm);
    const vertex =
      startVertex !== undefined
        ? startVertex
        : Math.floor(Math.random() * graph.numVertices);
    return graphFn(graph, vertex);
  } catch (error) {
    console.error("Error generating graph visualization:", error);
    return null;
  }
}

function regenerateSearch(
  algorithm: string,
  data: number[],
  target: number
): AlgorithmVisualization | null {
  const fn = getSearchAlgorithm(algorithm);
  if (!fn) return null;
  try {
    const newData =
      algorithm === "binarySearch" ? [...data].sort((a, b) => a - b) : data;
    return fn(newData, target);
  } catch (error) {
    console.error("Error generating visualization:", error);
    return null;
  }
}

function regenerateSort(
  algorithm: string,
  data: number[]
): AlgorithmVisualization | null {
  const fn = getSortingAlgorithm(algorithm);
  if (!fn) return null;
  try {
    return fn(data);
  } catch (error) {
    console.error("Error generating visualization:", error);
    return null;
  }
}

export default function AlgorithmVisualizer() {
  const { state, dispatch } = useAlgorithm();
  const { currentStep, algorithm, data, visualizationData, target } = state;
  const category = visualizationData?.category ?? "";

  const numVertices =
    category === "graph" && visualizationData
      ? (visualizationData.steps[0] as GraphStep).graph.numVertices
      : 6;

  const handleRandomize = () => {
    if (category === "graph") {
      const randomStart = Math.floor(Math.random() * numVertices);
      dispatch({ type: "SET_TARGET", payload: randomStart });
      const viz = regenerateGraph(algorithm, randomStart);
      if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
      return;
    }

    const newData = generateRandomArray(5, 95, 15);
    dispatch({ type: "SET_DATA", payload: newData });

    if (category === "searching") {
      const newTarget = getRandomValueFromArray(newData);
      dispatch({ type: "SET_TARGET", payload: newTarget });
      const viz = regenerateSearch(algorithm, newData, newTarget);
      if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
    } else {
      const viz = regenerateSort(algorithm, newData);
      if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
    }
  };

  const handleSetArray = (newData: number[]) => {
    dispatch({ type: "SET_DATA", payload: newData });
    const currentTarget = target ?? getRandomValueFromArray(newData);
    if (target === undefined) {
      dispatch({ type: "SET_TARGET", payload: currentTarget });
    }
    const viz =
      category === "searching"
        ? regenerateSearch(algorithm, newData, currentTarget)
        : regenerateSort(algorithm, newData);
    if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
  };

  const handleSetTarget = (newTarget: number) => {
    dispatch({ type: "SET_TARGET", payload: newTarget });
    const viz = regenerateSearch(algorithm, data, newTarget);
    if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
  };

  const handleSetStart = (start: number) => {
    dispatch({ type: "SET_TARGET", payload: start });
    const viz = regenerateGraph(algorithm, start);
    if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
  };

  const maxValue = data.length > 0 ? Math.max(...data) : 100;

  if (!visualizationData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading visualization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AlgorithmInfo algorithm={visualizationData} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card">
            {category === "sorting" && (
              <SortingVisualization
                step={visualizationData.steps[currentStep] as SortingStep}
                maxValue={maxValue}
              />
            )}
            {category === "searching" && (
              <SearchVisualization
                step={visualizationData.steps[currentStep] as SearchStep}
                maxValue={maxValue}
              />
            )}
            {category === "graph" && (
              <GraphVisualization
                step={visualizationData.steps[currentStep] as GraphStep}
              />
            )}
          </div>

          <ArrayInputPanel
            category={category}
            numVertices={numVertices}
            onSetArray={handleSetArray}
            onSetTarget={handleSetTarget}
            onSetStart={handleSetStart}
            onRandomize={handleRandomize}
          />

          <VisualizerControls
            currentStep={currentStep}
            totalSteps={visualizationData.steps.length}
          />

          <ColorLegend
            isSearchAlgorithm={category === "searching"}
            isGraphAlgorithm={category === "graph"}
          />
        </div>

        <div className="lg:col-span-1">
          <AlgorithmPseudocode code={visualizationData.pseudoCode} />
        </div>
      </div>
    </div>
  );
}
