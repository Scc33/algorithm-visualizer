"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  AlgorithmVisualization,
  VisualizationState,
  VisualizationAction,
} from "@/lib/types";
import { generateRandomArray, saveState, loadState } from "@/lib/utils";
import { getAlgorithmByName } from "@/lib/algorithms";

// Initial state
const initialState: VisualizationState = {
  currentStep: 0,
  isPlaying: false,
  speed: 5,
  algorithm: "bubbleSort",
  data: generateRandomArray(5, 95, 15),
  visualizationData: null,
};

// Create context with initial state and dispatch function
const AlgorithmContext = createContext<{
  state: VisualizationState;
  dispatch: React.Dispatch<VisualizationAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

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

// Provider component
export function AlgorithmProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize with saved state and generate visualization
  useEffect(() => {
    // Try to load saved state from localStorage
    const savedState = loadState();
    let initialData = state.data;
    let initialAlgorithm = state.algorithm;

    if (savedState) {
      if (savedState.data) {
        initialData = savedState.data;
        dispatch({ type: "SET_DATA", payload: initialData });
      }
      if (savedState.speed) {
        dispatch({ type: "SET_SPEED", payload: savedState.speed });
      }
      if (savedState.algorithm) {
        initialAlgorithm = savedState.algorithm;
        dispatch({ type: "SET_ALGORITHM", payload: initialAlgorithm });
      }
    }

    // Generate initial visualization
    const algorithmFunction = getAlgorithmByName(initialAlgorithm);
    if (algorithmFunction) {
      const viz = algorithmFunction(initialData);
      dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    saveState({
      data: state.data,
      speed: state.speed,
      algorithm: state.algorithm,
    });
  }, [state.data, state.speed, state.algorithm]);

  // Handle playing animation
  useEffect(() => {
    if (state.isPlaying) {
      const playInterval = setInterval(() => {
        dispatch({ type: "NEXT_STEP" });
      }, 1100 - state.speed * 100); // Speed 1-10 maps to delay 1000ms - 100ms

      return () => {
        clearInterval(playInterval);
      };
    }
  }, [state.isPlaying, state.speed, state.currentStep]);

  return (
    <AlgorithmContext.Provider value={{ state, dispatch }}>
      {children}
    </AlgorithmContext.Provider>
  );
}

// Custom hook for using the algorithm context
export function useAlgorithm() {
  const context = useContext(AlgorithmContext);
  if (context === undefined) {
    throw new Error("useAlgorithm must be used within an AlgorithmProvider");
  }
  return context;
}
