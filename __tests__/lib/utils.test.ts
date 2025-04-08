import { generateRandomArray } from "@/lib/utils";

describe("Utils Functions", () => {
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
});
