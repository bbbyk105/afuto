import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} | ${site.tagline}`;
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
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #08090b 0%, #16293c 100%)",
          padding: "80px",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#8fb6c4", letterSpacing: 4 }}>
          {site.nameEn.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.15 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 34, color: "#b8c2cc" }}>{site.name}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
