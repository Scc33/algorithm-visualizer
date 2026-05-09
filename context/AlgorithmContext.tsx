"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import type { VisualizationState, VisualizationAction } from "@/lib/types";
import { generateRandomArray } from "@/lib/utils";

// Animation timing: speed 1-10 maps to delay 1000ms-100ms.
// delay = ANIMATION_BASE_DELAY_MS - speed * ANIMATION_STEP_DELAY_MS
const ANIMATION_BASE_DELAY_MS = 1100;
const ANIMATION_STEP_DELAY_MS = 100;

export function computeAnimationDelay(speed: number): number {
  return ANIMATION_BASE_DELAY_MS - speed * ANIMATION_STEP_DELAY_MS;
}

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

function handleNextStep(state: VisualizationState): VisualizationState {
  if (
    state.visualizationData &&
    state.currentStep < state.visualizationData.steps.length - 1
  ) {
    return { ...state, currentStep: state.currentStep + 1 };
  }
  return { ...state, isPlaying: false };
}

function handlePrevStep(state: VisualizationState): VisualizationState {
  if (state.currentStep > 0) {
    return { ...state, currentStep: state.currentStep - 1 };
  }
  return state;
}

function applySetAction(
  state: VisualizationState,
  action: VisualizationAction
): VisualizationState | undefined {
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
    default:
      return undefined;
  }
}

export function reducer(
  state: VisualizationState,
  action: VisualizationAction
): VisualizationState {
  const setResult = applySetAction(state, action);
  if (setResult !== undefined) return setResult;

  switch (action.type) {
    case "GENERATE_RANDOM_DATA": {
      const { min, max, length } = action.payload;
      return {
        ...state,
        data: generateRandomArray(min, max, length),
        currentStep: 0,
      };
    }
    case "GENERATE_VISUALIZATION":
      return { ...state, visualizationData: action.payload, currentStep: 0 };
    case "NEXT_STEP":
      return handleNextStep(state);
    case "PREV_STEP":
      return handlePrevStep(state);
    case "RESET":
      return { ...state, currentStep: 0, isPlaying: false };
    default:
      return state;
  }
}

// Provider component
export function AlgorithmProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isPlaying) {
      const playInterval = setInterval(() => {
        dispatch({ type: "NEXT_STEP" });
      }, computeAnimationDelay(state.speed));

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
