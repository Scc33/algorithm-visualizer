"use client";

import SortingVisualization from "./SortingVisualization";
import SearchVisualization from "./SearchVisualization";
import GraphVisualization from "./GraphVisualization";
import VisualizerControls from "./VisualizerControls";
import AlgorithmInfo from "./AlgorithmInfo";
import AlgorithmPseudocode from "./AlgorithmPseudocode";
import ColorLegend from "./ColorLegend";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";
import { GraphStep, SearchStep, SortingStep } from "@/lib/types";

export default function AlgorithmVisualizer() {
  const { state, dispatch } = useAlgorithm();
  const { currentStep, algorithm, data, visualizationData, target } = state;

  // Function to generate new data based on algorithm type
  const handleGenerateNewData = () => {
    // For graph algorithms, we just need to regenerate with a new starting vertex
    if (category === "graph") {
      const algorithmFunction = getAlgorithmByName(algorithm);
      if (algorithmFunction) {
        try {
          // Generate a random starting vertex between 0-5
          const startVertex = Math.floor(Math.random() * 6);
          const viz = algorithmFunction([], startVertex);
          dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
        } catch (error) {
          console.error("Error generating graph visualization:", error);
        }
      }
      return;
    }

    // For array-based algorithms, generate a new random array
    dispatch({
      type: "GENERATE_RANDOM_DATA",
      payload: { min: 5, max: 95, length: 15 },
    });

    // Regenerate visualization with the new data
    const algorithmFunction = getAlgorithmByName(algorithm);
    if (algorithmFunction) {
      try {
        let viz;

        if (algorithm === "binarySearch") {
          // For binary search - ensure sorted array and target exists
          const newData = [...state.data].sort((a, b) => a - b);
          viz = algorithmFunction(newData, target);
        } else {
          // For other algorithms like sorting
          viz = algorithmFunction(state.data, target);
        }

        dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
      } catch (error) {
        console.error("Error generating visualization:", error);
      }
    }
  };

  // Check the algorithm category
  const getAlgorithmCategory = () => {
    return visualizationData?.category || "";
  };

  // Find the maximum value in the array for scaling
  const maxValue = data.length > 0 ? Math.max(...data) : 100;

  if (!visualizationData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading visualization...</p>
        </div>
      </div>
    );
  }

  const category = getAlgorithmCategory();

  return (
    <div className="space-y-8">
      <AlgorithmInfo algorithm={visualizationData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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

          <VisualizerControls
            currentStep={currentStep}
            totalSteps={visualizationData.steps.length}
            onGenerateNewArray={handleGenerateNewData}
            algorithmCategory={category}
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
