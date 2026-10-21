"use client";

import Image from "next/image";
import {useEffect, useRef} from "react";

import type {CoverMotionEngine} from "@/lib/cover-motion/engine";

const imageSizes = "(max-width: 768px) calc(100vw - 16px), 752px";

export function AnimatedCover({src}: {src: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let engine: CoverMotionEngine | undefined;

    void import("@/lib/cover-motion/engine").then(({CoverMotionEngine}) => {
      if (disposed) return;
      try {
        engine = new CoverMotionEngine(canvas, src);
      } catch {
        canvas.style.opacity = "0";
      }
    });

    return () => {
      disposed = true;
      engine?.destroy();
    };
  }, [src]);

  return (
    <div aria-hidden="true" className="absolute inset-0 bg-cover-surface">
      <Image
        alt=""
        className="object-cover object-[center_58%]"
        fill
        loading="eager"
        sizes={imageSizes}
        src={src}
      />
      <canvas className="absolute inset-0 block size-full bg-cover-surface opacity-0" ref={canvasRef}/>
    </div>
  );
}
