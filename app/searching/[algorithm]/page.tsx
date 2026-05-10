"use client";

import { Suspense, useEffect, useRef } from "react";
import {
  useParams,
  useRouter,
  useSearchParams,
  notFound,
} from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getSearchAlgorithm } from "@/lib/algorithms";
import { getRandomValueFromArray } from "@/lib/utils";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { decodeUrlParams, encodeUrlParams } from "@/lib/urlState";

function SearchingPageInner() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializedFromUrl = useRef(false);

  const algorithmInfo = availableAlgorithms[algorithmKey];

  // Initialize state from URL on first load
  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;
    const decoded = decodeUrlParams(searchParams);
    if (decoded.data) dispatch({ type: "SET_DATA", payload: decoded.data });
    if (decoded.target)
      dispatch({ type: "SET_TARGET", payload: decoded.target });
    if (decoded.speed) dispatch({ type: "SET_SPEED", payload: decoded.speed });
  }, [searchParams, dispatch]);

  // Set algorithm and generate visualization when algorithm, data, or target changes
  useEffect(() => {
    if (!algorithmKey) return;
    dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });

    const target =
      state.target ||
      (state.data.length > 0 ? getRandomValueFromArray(state.data) : 42);

    dispatch({ type: "SET_TARGET", payload: target });

    if (!state.visualizationData || algorithmKey !== state.algorithm) {
      const algorithmFunction = getSearchAlgorithm(algorithmKey);
      if (algorithmFunction) {
        try {
          const data = [...state.data];
          const viz = algorithmFunction(data, target);
          dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
        } catch (error) {
          console.error("Error generating visualization:", error);
        }
      }
    }
  }, [
    algorithmKey,
    dispatch,
    state.algorithm,
    state.data,
    state.visualizationData,
    state.target,
  ]);

  // Keep URL in sync with current state
  useEffect(() => {
    const urlParams = encodeUrlParams({
      data: state.data,
      ...(state.target !== undefined ? { target: state.target } : {}),
      speed: state.speed,
    });
    router.replace(`?${urlParams.toString()}`, { scroll: false });
  }, [state.data, state.target, state.speed, router]);

  if (!algorithmInfo) {
    return notFound();
  }

  return (
    <PageLayout
      title={algorithmInfo.name}
      subtitle={algorithmInfo.subtitle}
      {...(state.visualizationData !== null
        ? { algorithmData: state.visualizationData }
        : {})}
    >
      <AlgorithmVisualizer />
    </PageLayout>
  );
}

export default function SearchingAlgorithmPage() {
  return (
    <Suspense>
      <SearchingPageInner />
    </Suspense>
  );
}
