import { ImageResponse } from "next/og";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { APP_URL } from "@/constants/URL";

export const runtime = "edge";

export const alt =
  "Algorithm Visualizer - Learn algorithms through interactive visualizations";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

type DifficultyColors = {
  easy: string;
  medium: string;
  hard: string;
  [key: string]: string; // Index signature for any string key
};

export default async function Image({
  params,
}: {
  params: { algorithm: string };
}) {
  const { algorithm } = params;

  const algorithmInfo = availableAlgorithms[algorithm];

  const description =
    algorithmInfo?.description || "Interactive algorithm visualization";
  const difficulty = algorithmInfo?.difficulty || "unknown";

  // Create difficulty badge color with proper type
  const difficultyColors: DifficultyColors = {
    easy: "#16a34a", // Green
    medium: "#ca8a04", // Yellow
    hard: "#dc2626", // Red
  };

  // Default to gray if not found
  const badgeColor = difficultyColors[difficulty] || "#6b7280";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0f172a",
          color: "white",
          fontFamily: "sans-serif",
          padding: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 20 }}
          >
            <path
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 36, fontWeight: "bold" }}>
            Algorithm Visualizer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
            width: "100%",
            maxWidth: 900,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: "bold",
              textAlign: "center",
              margin: 0,
              marginBottom: 20,
            }}
          >
            {algorithmInfo.name}
          </h1>

          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              backgroundColor: badgeColor,
              borderRadius: 9999,
              marginBottom: 30,
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {difficulty}
          </div>

          <p
            style={{
              fontSize: 24,
              textAlign: "center",
              margin: 0,
              color: "#cbd5e1",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#94a3b8",
          }}
        >
          Learn algorithms interactively at {APP_URL}
        </div>
      </div>
    ),
    { ...size }
  );
}
