"use client";

import { Suspense, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getDataStructureAlgorithm } from "@/lib/algorithms";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { decodeUrlParams, encodeUrlParams } from "@/lib/urlState";

function DataStructurePageInner() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializedFromUrl = useRef(false);

  const algorithmInfo = availableAlgorithms[algorithmKey];

  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;
    const decoded = decodeUrlParams(searchParams);
    if (decoded.data) dispatch({ type: "SET_DATA", payload: decoded.data });
    if (decoded.speed) dispatch({ type: "SET_SPEED", payload: decoded.speed });
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (!algorithmKey) return;
    dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });
    if (!state.visualizationData || algorithmKey !== state.algorithm) {
      const fn = getDataStructureAlgorithm(algorithmKey);
      if (fn) {
        const viz = fn(state.data);
        dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
      }
    }
  }, [
    algorithmKey,
    dispatch,
    state.algorithm,
    state.data,
    state.visualizationData,
  ]);

  useEffect(() => {
    const urlParams = encodeUrlParams({ data: state.data, speed: state.speed });
    router.replace(`?${urlParams.toString()}`, { scroll: false });
  }, [state.data, state.speed, router]);

  if (!algorithmInfo) {
    return (
      <PageLayout title="Algorithm Not Found">
        <div className="py-12 text-center">
          <h2 className="heading-lg text-red-600">Algorithm Not Found</h2>
          <p className="mt-4 text-gray-600">
            The algorithm you are looking for does not exist or is not
            available.
          </p>
        </div>
      </PageLayout>
    );
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

export default function DataStructureAlgorithmPage() {
  return (
    <Suspense>
      <DataStructurePageInner />
    </Suspense>
  );
}
