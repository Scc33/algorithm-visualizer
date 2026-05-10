import { describe, it, expect } from "vitest";
import { reducer, computeAnimationDelay } from "@/context/AlgorithmContext";
import type { VisualizationState, AlgorithmVisualization } from "@/lib/types";

const baseState: VisualizationState = {
  currentStep: 0,
  isPlaying: false,
  speed: 5,
  algorithm: "bubbleSort",
  data: [3, 1, 2],
  target: 42,
  visualizationData: null,
};

const fakeViz: AlgorithmVisualization = {
  primitive: "array-bars",
  steps: [
    { array: [3, 1, 2], comparing: [], swapped: false, completed: [] },
    { array: [1, 2, 3], comparing: [], swapped: false, completed: [0, 1, 2] },
  ],
  name: "Fake",
  description: "",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  reference: "",
  pseudoCode: [],
  category: "sorting",
  difficulty: "easy",
  key: "bubbleSort",
};

describe("computeAnimationDelay", () => {
  it("maps speed 1 to 1000ms", () => {
    expect(computeAnimationDelay(1)).toBe(1000);
  });

  it("maps speed 10 to 100ms", () => {
    expect(computeAnimationDelay(10)).toBe(100);
  });

  it("maps speed 5 to 600ms", () => {
    expect(computeAnimationDelay(5)).toBe(600);
  });
});

describe("reducer SET_* actions", () => {
  it("SET_CURRENT_STEP updates currentStep", () => {
    const next = reducer(baseState, { type: "SET_CURRENT_STEP", payload: 7 });
    expect(next.currentStep).toBe(7);
  });

  it("SET_IS_PLAYING toggles isPlaying", () => {
    const next = reducer(baseState, { type: "SET_IS_PLAYING", payload: true });
    expect(next.isPlaying).toBe(true);
  });

  it("SET_SPEED updates speed", () => {
    const next = reducer(baseState, { type: "SET_SPEED", payload: 8 });
    expect(next.speed).toBe(8);
  });

  it("SET_ALGORITHM updates algorithm", () => {
    const next = reducer(baseState, {
      type: "SET_ALGORITHM",
      payload: "quickSort",
    });
    expect(next.algorithm).toBe("quickSort");
  });

  it("SET_DATA updates data", () => {
    const next = reducer(baseState, { type: "SET_DATA", payload: [9, 8, 7] });
    expect(next.data).toEqual([9, 8, 7]);
  });

  it("SET_TARGET updates target", () => {
    const next = reducer(baseState, { type: "SET_TARGET", payload: 99 });
    expect(next.target).toBe(99);
  });
});

describe("reducer GENERATE_* actions", () => {
  it("GENERATE_RANDOM_DATA creates an array and resets currentStep", () => {
    const state = { ...baseState, currentStep: 5 };
    const next = reducer(state, {
      type: "GENERATE_RANDOM_DATA",
      payload: { min: 1, max: 100, length: 10 },
    });
    expect(next.data).toHaveLength(10);
    next.data.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(100);
    });
    expect(next.currentStep).toBe(0);
  });

  it("GENERATE_VISUALIZATION sets data and resets currentStep", () => {
    const state = { ...baseState, currentStep: 5 };
    const next = reducer(state, {
      type: "GENERATE_VISUALIZATION",
      payload: fakeViz,
    });
    expect(next.visualizationData).toBe(fakeViz);
    expect(next.currentStep).toBe(0);
  });
});

describe("reducer NEXT_STEP", () => {
  it("advances when there are more steps", () => {
    const state = { ...baseState, visualizationData: fakeViz, currentStep: 0 };
    const next = reducer(state, { type: "NEXT_STEP" });
    expect(next.currentStep).toBe(1);
  });

  it("stops playback at the last step", () => {
    const state = {
      ...baseState,
      visualizationData: fakeViz,
      currentStep: 1,
      isPlaying: true,
    };
    const next = reducer(state, { type: "NEXT_STEP" });
    expect(next.currentStep).toBe(1);
    expect(next.isPlaying).toBe(false);
  });

  it("stops playback when no visualizationData", () => {
    const state = { ...baseState, isPlaying: true };
    const next = reducer(state, { type: "NEXT_STEP" });
    expect(next.isPlaying).toBe(false);
  });
});

describe("reducer PREV_STEP and RESET", () => {
  it("PREV_STEP decrements currentStep when above 0", () => {
    const state = { ...baseState, currentStep: 3 };
    const next = reducer(state, { type: "PREV_STEP" });
    expect(next.currentStep).toBe(2);
  });

  it("PREV_STEP stays at 0 when already at 0", () => {
    const next = reducer(baseState, { type: "PREV_STEP" });
    expect(next.currentStep).toBe(0);
  });

  it("RESET clears currentStep and isPlaying", () => {
    const state = { ...baseState, currentStep: 7, isPlaying: true };
    const next = reducer(state, { type: "RESET" });
    expect(next.currentStep).toBe(0);
    expect(next.isPlaying).toBe(false);
  });
});
