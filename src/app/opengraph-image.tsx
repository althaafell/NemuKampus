import { ImageResponse } from "next/og";

export const alt = "NemuKampus — barang hilang dan temuan Universitas Brawijaya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// the preview card WhatsApp and other apps show when a NemuKampus link is shared
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
          background: "#f8f8f8",
          color: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          <span style={{ display: "flex", width: 40, height: 40, marginRight: 16, background: "#1f6b3a", borderRadius: 999 }} />
          NemuKampus
        </div>
        <div style={{ marginTop: 32, fontSize: 68, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          Kehilangan atau menemukan barang di kampus UB?
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#4d4d4a" }}>
          Cari dan laporkan barang hilang atau temuan · Gratis, tanpa akun
        </div>
      </div>
    ),
    size,
  );
}
