import { VisualizationState } from "./types";

const STORAGE_KEY = "algorithm-visualizer-state";

export function saveState(state: Partial<VisualizationState>): void {
  if (typeof window === "undefined") return;

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function loadState(): Partial<VisualizationState> | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return undefined;
  }
}
