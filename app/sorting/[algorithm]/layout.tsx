"use client";

import React from "react";
import { AlgorithmProvider } from "@/context/AlgorithmContext";

export default function VisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
