"use client";

import React from "react";

import {
  type PixelatedCanvasProps,
  usePixelatedCanvas,
} from "@/hooks/use-pixelated-canvas";

export function PixelatedCanvas({
  ariaLabel = "Pixelated rendering of source image",
  className,
  ...canvasProps
}: PixelatedCanvasProps) {
  const canvasRef = usePixelatedCanvas(canvasProps);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label={ariaLabel}
      role="img"
    />
  );
}
