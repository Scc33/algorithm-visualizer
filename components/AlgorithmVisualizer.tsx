"use client";

import React, { useEffect, useReducer, useRef } from "react";
import SortingVisualization from "./SortingVisualization";
import Controls from "./Controls";
import { bubbleSort, generateRandomArray } from "@/lib/algorithms";
import {
  AlgorithmVisualization,
  VisualizationState,
  VisualizationAction,
} from "@/lib/types";
import { saveState, loadState } from "@/lib/storage";

// Initial state
const initialState: VisualizationState = {
  currentStep: 0,
  isPlaying: false,
  speed: 5,
  algorithm: "bubbleSort",
  data: generateRandomArray(5, 95, 15),
  visualizationData: null,
};

// Reducer for visualization state
function reducer(
  state: VisualizationState,
  action: VisualizationAction
): VisualizationState {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_SPEED":
      return { ...state, speed: action.payload };
    case "SET_ALGORITHM":
      return { ...state, algorithm: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "GENERATE_RANDOM_DATA":
      const { min, max, length } = action.payload;
      const newData = generateRandomArray(min, max, length);
      return { ...state, data: newData, currentStep: 0 };
    case "GENERATE_VISUALIZATION":
      return { ...state, visualizationData: action.payload, currentStep: 0 };
    case "NEXT_STEP":
      if (
        state.visualizationData &&
        state.currentStep < state.visualizationData.steps.length - 1
      ) {
        return { ...state, currentStep: state.currentStep + 1 };
      }
      return { ...state, isPlaying: false };
    case "PREV_STEP":
      if (state.currentStep > 0) {
        return { ...state, currentStep: state.currentStep - 1 };
      }
      return state;
    case "RESET":
      return { ...state, currentStep: 0, isPlaying: false };
    default:
      return state;
  }
}

export default function AlgorithmVisualizer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentStep, isPlaying, speed, data, visualizationData } = state;

  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize the visualization
  useEffect(() => {
    // Try to load saved state from localStorage
    const savedState = loadState();
    let initialData = data;

    if (savedState) {
      if (savedState.data) {
        initialData = savedState.data;
        dispatch({ type: "SET_DATA", payload: initialData });
      }
      if (savedState.speed) {
        dispatch({ type: "SET_SPEED", payload: savedState.speed });
      }
    }

    // Generate initial visualization
    const viz = bubbleSort(initialData);
    dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
  }, []); // Empty dependency array to run only once

  // Save state changes to localStorage
  useEffect(() => {
    saveState({
      data,
      speed,
    });
  }, [data, speed]);

  // Handle playing animation
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        dispatch({ type: "NEXT_STEP" });
      }, 1100 - speed * 100); // Speed 1-10 maps to delay 1000ms - 100ms

      return () => {
        if (playIntervalRef.current) {
          clearInterval(playIntervalRef.current);
          playIntervalRef.current = null;
        }
      };
    }
  }, [isPlaying, speed, currentStep]);

  // Generate a new random array
  const handleGenerateNewArray = () => {
    const newData = generateRandomArray(5, 95, 15);
    dispatch({ type: "SET_DATA", payload: newData });
    const viz = bubbleSort(newData);
    dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
  };

  // Handlers for controls
  const handlePlay = () => dispatch({ type: "SET_IS_PLAYING", payload: true });
  const handlePause = () =>
    dispatch({ type: "SET_IS_PLAYING", payload: false });
  const handleNext = () => dispatch({ type: "NEXT_STEP" });
  const handlePrev = () => dispatch({ type: "PREV_STEP" });
  const handleReset = () => dispatch({ type: "RESET" });
  const handleSpeedChange = (newSpeed: number) =>
    dispatch({ type: "SET_SPEED", payload: newSpeed });
  const handleStepChange = (step: number) =>
    dispatch({ type: "SET_CURRENT_STEP", payload: step });

  // Find the maximum value in the array for scaling
  const maxValue = data.length > 0 ? Math.max(...data) : 100;

  return (
    <div className="flex flex-col w-full max-w-4xl p-6 mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Bubble Sort Visualizer</h1>

      {visualizationData && (
        <>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold">{visualizationData.name}</h2>
            <p className="mt-2">{visualizationData.description}</p>
            <div className="flex mt-2 space-x-4">
              <div>
                <span className="font-semibold">Time Complexity:</span>{" "}
                {visualizationData.timeComplexity}
              </div>
              <div>
                <span className="font-semibold">Space Complexity:</span>{" "}
                {visualizationData.spaceComplexity}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1">
              <SortingVisualization
                step={visualizationData.steps[currentStep]}
                maxValue={maxValue}
              />
            </div>

            <div className="w-full md:w-64 p-4 mt-4 md:mt-0 bg-gray-50 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">Pseudo Code</h3>
              <pre className="overflow-auto text-xs font-mono">
                {visualizationData.pseudoCode.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>

          <Controls
            currentStep={currentStep}
            totalSteps={visualizationData.steps.length}
            isPlaying={isPlaying}
            speed={speed}
            onPlay={handlePlay}
            onPause={handlePause}
            onNext={handleNext}
            onPrev={handlePrev}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
            onStepChange={handleStepChange}
            onGenerateNewArray={handleGenerateNewArray}
          />

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-2 text-lg font-semibold">Color Legend</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-blue-500"></div>
                <span>Unsorted</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-yellow-500"></div>
                <span>Comparing</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-red-500"></div>
                <span>Swapping</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-green-500"></div>
                <span>Sorted</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
