import {
  saveState,
  loadState,
  generateRandomArray,
  getAlgorithmLabel,
  getDifficulty,
} from "@/lib/utils";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Utils Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("saveState", () => {
    it("should save state to localStorage", () => {
      const state = { data: [1, 2, 3], speed: 5, algorithm: "bubbleSort" };
      saveState(state);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "algorithm-visualizer-state",
        JSON.stringify(state)
      );
    });

    it("should handle errors", () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      // Simulate an error when setting item
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      const state = { data: [1, 2, 3] };
      saveState(state);

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe("loadState", () => {
    it("should load state from localStorage", () => {
      const state = { data: [1, 2, 3], speed: 5, algorithm: "bubbleSort" };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(state));

      const result = loadState();

      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        "algorithm-visualizer-state"
      );
      expect(result).toEqual(state);
    });

    it("should return undefined when localStorage is empty", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadState();

      expect(result).toBeUndefined();
    });

    it("should handle errors", () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      // Simulate an error when getting item
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      const result = loadState();

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(result).toBeUndefined();

      consoleErrorSpy.mockRestore();
    });
  });

  describe("generateRandomArray", () => {
    it("should generate a random array with the specified length", () => {
      const array = generateRandomArray(10, 50, 5);

      expect(array.length).toBe(5);
      array.forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(10);
        expect(value).toBeLessThanOrEqual(50);
      });
    });

    it("should generate different arrays on subsequent calls", () => {
      // Note: There's a small chance this test could fail if the random arrays happen to be identical
      const array1 = generateRandomArray(1, 1000, 10);
      const array2 = generateRandomArray(1, 1000, 10);

      expect(array1).not.toEqual(array2);
    });
  });

  describe("getAlgorithmLabel", () => {
    it("should return the correct label for known algorithms", () => {
      expect(getAlgorithmLabel("bubbleSort")).toBe("Bubble Sort");
      expect(getAlgorithmLabel("quickSort")).toBe("Quick Sort");
      expect(getAlgorithmLabel("mergeSort")).toBe("Merge Sort");
    });

    it("should return the algorithm key for unknown algorithms", () => {
      expect(getAlgorithmLabel("unknownAlgorithm")).toBe("unknownAlgorithm");
    });
  });

  describe("getDifficulty", () => {
    it("should return the correct difficulty for known algorithms", () => {
      expect(getDifficulty("bubbleSort")).toBe("Easy");
      expect(getDifficulty("mergeSort")).toBe("Medium");
      expect(getDifficulty("heapSort")).toBe("Hard");
    });

    it('should return "Unknown" for unknown algorithms', () => {
      expect(getDifficulty("unknownAlgorithm")).toBe("Unknown");
    });
  });
});
