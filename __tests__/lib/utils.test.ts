import {
  generateRandomArray,
  getAlgorithmLabel,
  getDifficulty,
} from "@/lib/utils";

// We need to mock localStorage before importing the module
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

// Replace the window.localStorage object with our mock
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

describe("Utils Functions", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
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
