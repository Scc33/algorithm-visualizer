import { APP_URL } from "@/constants/URL";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Algorithm Visualizer - Learn algorithms through interactive visualizations";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
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
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 24 }}
          >
            <path
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 48, fontWeight: "bold" }}>
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
              marginBottom: 30,
            }}
          >
            Learn Algorithms Interactively
          </h1>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: "#16a34a", // Green
                borderRadius: 9999,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Sorting
            </div>
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: "#ca8a04", // Yellow
                borderRadius: 9999,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Searching
            </div>
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc2626", // Red
                borderRadius: 9999,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Graph Algorithms
            </div>
          </div>

          <p
            style={{
              fontSize: 24,
              textAlign: "center",
              margin: 0,
              color: "#cbd5e1",
            }}
          >
            See algorithms in action with step-by-step visualizations
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          {APP_URL}
        </div>
      </div>
    ),
    { ...size }
  );
}
