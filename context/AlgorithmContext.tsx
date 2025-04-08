"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { VisualizationState, VisualizationAction } from "@/lib/types";
import { generateRandomArray } from "@/lib/utils";

// Initial state
const initialState: VisualizationState = {
  currentStep: 0,
  isPlaying: false,
  speed: 5,
  algorithm: "bubbleSort",
  data: generateRandomArray(5, 95, 15),
  target: 42, // Default target value for search algorithms
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
    case "SET_TARGET":
      return { ...state, target: action.payload };
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
