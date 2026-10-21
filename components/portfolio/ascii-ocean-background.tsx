"use client";

import {useEffect, useRef} from "react";

import type {OceanEngine} from "@/lib/ascii-ocean/engine";

export function AsciiOceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let engine: OceanEngine | undefined;

    // Keep the simulation out of the initial content bundle.
    void import("@/lib/ascii-ocean/engine").then(({OceanEngine}) => {
      if (!disposed) engine = new OceanEngine(canvas);
    });

    return () => {
      disposed = true;
      engine?.destroy();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas className="block size-full font-mono text-sm opacity-80" ref={canvasRef}/>
    </div>
  );
}
