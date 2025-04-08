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

export function getRandomValueFromArray(array: number[]): number {
  if (array.length === 0) return 42;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
