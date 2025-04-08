"use client";

import SortingVisualization from "./SortingVisualization";
import SearchVisualization from "./SearchVisualization";
import VisualizerControls from "./VisualizerControls";
import AlgorithmInfo from "./AlgorithmInfo";
import AlgorithmPseudocode from "./AlgorithmPseudocode";
import ColorLegend from "./ColorLegend";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";
import { SearchStep, SortingStep } from "@/lib/types";

export default function AlgorithmVisualizer() {
  const { state, dispatch } = useAlgorithm();
  const { currentStep, algorithm, data, visualizationData, target } = state;

  // Generate a new random array
  const handleGenerateNewArray = () => {
    dispatch({
      type: "GENERATE_RANDOM_DATA",
      payload: { min: 5, max: 95, length: 15 },
    });

    // Regenerate visualization with the new data
    const algorithmFunction = getAlgorithmByName(algorithm);
    if (algorithmFunction) {
      try {
        const newData = [...state.data];

        // Special handling for binary search - ensure sorted array and target exists
        if (algorithm === "binarySearch") {
          newData.sort((a, b) => a - b);
        }

        const viz = algorithmFunction(newData, target);
        dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
      } catch (error) {
        console.error("Error generating visualization:", error);
      }
    }
  };

  // Check if the current algorithm is a search algorithm
  const isSearchAlgorithm = () => {
    return visualizationData?.category === "searching";
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

  const isSearching = isSearchAlgorithm();

  return (
    <div className="space-y-8">
      <AlgorithmInfo algorithm={visualizationData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            {isSearching ? (
              <SearchVisualization
                step={visualizationData.steps[currentStep] as SearchStep}
                maxValue={maxValue}
              />
            ) : (
              <SortingVisualization
                step={visualizationData.steps[currentStep] as SortingStep}
                maxValue={maxValue}
              />
            )}
          </div>

          <VisualizerControls
            currentStep={currentStep}
            totalSteps={visualizationData.steps.length}
            onGenerateNewArray={handleGenerateNewArray}
          />

          <ColorLegend isSearchAlgorithm={isSearching} />
        </div>

        <div className="lg:col-span-1">
          <AlgorithmPseudocode code={visualizationData.pseudoCode} />
        </div>
      </div>
    </div>
  );
}
