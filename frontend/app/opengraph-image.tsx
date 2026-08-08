import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, display: "flex" }}>
          Marriam Fatima
        </div>
        <div style={{ fontSize: 32, color: "#94a3b8", marginTop: 20, display: "flex" }}>
          AI / ML Engineer · Educator · Founder, MK AI HUB
        </div>
        <div style={{ fontSize: 24, color: "#64748b", marginTop: 40, display: "flex" }}>
          NLP · Chatbots · Automation
        </div>
      </div>
    ),
    { ...size }
  );
}
