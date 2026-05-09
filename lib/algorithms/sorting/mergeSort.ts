import type { AlgorithmVisualization, SortingStep } from "../../types";
import { createVisualization } from "../utils";

interface MergeSortCtx {
  arr: number[];
  aux: number[];
  steps: SortingStep[];
  completed: number[];
}

export function mergeSort(array: number[]): AlgorithmVisualization {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const completed: number[] = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: [],
  });

  const ctx: MergeSortCtx = { arr, aux: new Array(n), steps, completed };
  mergeSortHelper(ctx, 0, n - 1);

  const finalCompleted = Array.from({ length: n }, (_, i) => i);
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    completed: finalCompleted,
  });

  return createVisualization("mergeSort", steps, {
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    reference: "https://en.wikipedia.org/wiki/Merge_sort",
    pseudoCode: [
      "procedure mergeSort(A: list of sortable items, lo: int, hi: int)",
      "  if lo < hi then",
      "    mid := floor((lo + hi) / 2)",
      "    mergeSort(A, lo, mid)",
      "    mergeSort(A, mid + 1, hi)",
      "    merge(A, lo, mid, hi)",
      "  end if",
      "end procedure",
      "",
      "procedure merge(A: list of sortable items, lo: int, mid: int, hi: int)",
      "  i := lo; j := mid + 1; k := lo",
      "  Let aux be a new array of same size as A",
      "  while i <= mid and j <= hi do",
      "    if A[i] <= A[j] then",
      "      aux[k] := A[i]",
      "      i := i + 1",
      "    else",
      "      aux[k] := A[j]",
      "      j := j + 1",
      "    end if",
      "    k := k + 1",
      "  end while",
      "  while i <= mid do",
      "    aux[k] := A[i]",
      "    i := i + 1; k := k + 1",
      "  end while",
      "  while j <= hi do",
      "    aux[k] := A[j]",
      "    j := j + 1; k := k + 1",
      "  end while",
      "  for k := lo to hi do",
      "    A[k] := aux[k]",
      "  end for",
      "end procedure",
    ],
  });
}

function mergeSortHelper(ctx: MergeSortCtx, lo: number, hi: number): void {
  if (lo >= hi) return;

  const mid = Math.floor((lo + hi) / 2);
  const comparing = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  ctx.steps.push({
    array: [...ctx.arr],
    comparing: comparing,
    swapped: false,
    completed: [...ctx.completed],
  });

  mergeSortHelper(ctx, lo, mid);
  mergeSortHelper(ctx, mid + 1, hi);
  merge(ctx, lo, mid, hi);
}

function markCompleted(
  completed: number[],
  lo: number,
  hi: number,
  arrLength: number
): void {
  if (lo === 0 && hi === arrLength - 1) {
    for (let k = lo; k <= hi; k++) completed.push(k);
  } else if (hi - lo + 1 >= 3) {
    const midElement = Math.floor((lo + hi) / 2);
    if (!completed.includes(midElement)) completed.push(midElement);
  }
}

function merge(ctx: MergeSortCtx, lo: number, mid: number, hi: number): void {
  const { arr, aux, steps, completed } = ctx;

  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k]!;
  }

  let i = lo;
  let j = mid + 1;

  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      arr[k] = aux[j++]!;
      steps.push({ array: [...arr], comparing: [j - 1], swapped: true, completed: [...completed] });
    } else if (j > hi) {
      arr[k] = aux[i++]!;
      steps.push({ array: [...arr], comparing: [i - 1], swapped: true, completed: [...completed] });
    } else if (aux[i]! <= aux[j]!) {
      steps.push({ array: [...arr], comparing: [i, j], swapped: false, completed: [...completed] });
      arr[k] = aux[i++]!;
      steps.push({ array: [...arr], comparing: [k], swapped: true, completed: [...completed] });
    } else {
      steps.push({ array: [...arr], comparing: [i, j], swapped: false, completed: [...completed] });
      arr[k] = aux[j++]!;
      steps.push({ array: [...arr], comparing: [k], swapped: true, completed: [...completed] });
    }
  }

  markCompleted(completed, lo, hi, arr.length);
  steps.push({ array: [...arr], comparing: [], swapped: false, completed: [...completed] });
}
