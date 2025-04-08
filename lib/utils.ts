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

export function generateRandomArray(
  min: number,
  max: number,
  length: number
): number[] {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export function getAlgorithmLabel(algorithmKey: string): string {
  const labels: Record<string, string> = {
    bubbleSort: "Bubble Sort",
    selectionSort: "Selection Sort",
    insertionSort: "Insertion Sort",
    mergeSort: "Merge Sort",
    quickSort: "Quick Sort",
    heapSort: "Heap Sort",
    linearSearch: "Linear Search",
  };

  return labels[algorithmKey] || algorithmKey;
}

export function getDifficulty(algorithmKey: string): string {
  const difficulties: Record<string, string> = {
    bubbleSort: "Easy",
    selectionSort: "Easy",
    insertionSort: "Easy",
    mergeSort: "Medium",
    quickSort: "Medium",
    heapSort: "Hard",
    linearSearch: "Easy",
  };

  return difficulties[algorithmKey] || "Unknown";
}

export function getRandomValueFromArray(array: number[]): number {
  if (array.length === 0) return 0;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
