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
    binarySearch: "Binary Search",
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
    binarySearch: "Medium",
  };

  return difficulties[algorithmKey] || "Unknown";
}

export function getRandomValueFromArray(array: number[]): number {
  if (array.length === 0) return 42;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
