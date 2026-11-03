"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {/* Type cast to bypass React 19 vs React 18 type mismatch in third-party lib */}
      {children as any}
    </ReactLenis>
  );
}