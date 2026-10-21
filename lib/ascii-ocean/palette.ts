import {oceanSharkShapes} from "@/data/ocean-sharks";
import type {SharkKind} from "./world";

export type OceanPalette = {
  background: string;
  grid: string;
  fish: string;
  wake: string;
  sharks: Record<SharkKind, string>;
  accents: string[];
  ink: string;
  inkMuted: string;
  eye: string;
  mark: string;
  glint: string;
  heat: string;
  heatSpark: string;
};

/** Resolve theme tokens to actual canvas colors, including CSS color-mix(). */
export function readOceanPalette(canvas: HTMLCanvasElement): OceanPalette {
  const swatch = document.createElement("span");
  swatch.hidden = true;
  canvas.parentElement!.append(swatch);

  const read = (token: string) => {
    swatch.style.color = `var(${token})`;
    return getComputedStyle(swatch).color;
  };

  const palette: OceanPalette = {
    background: read("--background"),
    grid: read("--ocean-grid"),
    fish: read("--ocean-fish"),
    wake: read("--cover-accent-cyan"),
    sharks: Object.fromEntries(
      Object.keys(oceanSharkShapes).map((kind) => [kind, read(`--ocean-shark-${kind}`)]),
    ) as Record<SharkKind, string>,
    accents: [
      "--cover-accent-orange", "--project-rose", "--cover-accent-purple",
      "--cover-accent-cyan", "--project-lime", "--project-blue", "--project-sand",
    ].map(read),
    ink: read("--background"),
    inkMuted: read("--ocean-ink-muted"),
    eye: read("--muted-foreground"),
    mark: read("--ocean-shark-mark"),
    glint: read("--foreground"),
    heat: read("--project-rose"),
    heatSpark: read("--cover-accent-orange"),
  };

  swatch.remove();
  return palette;
}
