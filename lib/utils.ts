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

// Glossary utility functions
export function sortByAlphabet<T extends { term: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.term.localeCompare(b.term));
}

export function groupTermsByFirstLetter<T extends { term: string }>(
  items: T[]
): Record<string, T[]> {
  const sorted = sortByAlphabet(items);

  return sorted.reduce((groups: Record<string, T[]>, item) => {
    const firstLetter = item.term.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(item);
    return groups;
  }, {});
}
