"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

import {cn} from "@/lib/utils";

type AnimatedAsciiArtProps = {
  art: string;
  className?: string;
};

type PulseDirection = "dim" | "contrast";

const asciiSparkleLayerCount = 6;
const asciiSparkleInterval = 150;
const asciiSparkleDuration = 900;
const asciiSparkleDensity = 4;
const asciiGlowVariantCount = 3;
const asciiGlowStrengths = [0.82, 0.64, 0.48] as const;

const pulsePhaseClasses = [
  "",
  "ascii-character-pulse-delay-1",
  "ascii-character-pulse-delay-2",
  "ascii-character-pulse-delay-3",
] as const;

const pulseClassNames = {
  dim: "ascii-character-pulse-dim",
  contrast: "ascii-character-pulse-contrast",
} satisfies Record<PulseDirection, string>;

function getPulseDirections(characters: string[]) {
  const visibleCharacterIndexes = characters.flatMap((character, index) =>
    character === " " || character === "\n" ? [] : [index],
  );
  const directions = new Map<number, PulseDirection>();
  const groupSize = 20;
  const completeGroupCount = Math.floor(
    visibleCharacterIndexes.length / groupSize,
  );

  for (let groupIndex = 0; groupIndex < completeGroupCount; groupIndex += 1) {
    const groupStart = groupIndex * groupSize;
    const dimOffset = (groupIndex * 7) % groupSize;
    const contrastOffset = (dimOffset + 11) % groupSize;

    directions.set(visibleCharacterIndexes[groupStart + dimOffset], "dim");
    directions.set(
      visibleCharacterIndexes[groupStart + contrastOffset],
      "contrast",
    );
  }

  return directions;
}

function renderPulsingCharacters(art: string) {
  const characters = Array.from(art);
  const pulseDirections = getPulseDirections(characters);
  const content: ReactNode[] = [];
  let textRun = "";

  characters.forEach((character, index) => {
    const pulseDirection = pulseDirections.get(index);

    if (!pulseDirection) {
      textRun += character;
      return;
    }

    if (textRun) {
      content.push(textRun);
      textRun = "";
    }

    content.push(
      <span
        className={cn(
          pulseClassNames[pulseDirection],
          pulsePhaseClasses[(index + character.charCodeAt(0)) % 4],
        )}
        key={`${pulseDirection}-${index}`}
      >
        {character}
      </span>,
    );
  });

  if (textRun) content.push(textRun);

  return content;
}

function createRandomGlowFrame(art: string, seed: number) {
  return Array.from(art)
    .map((character, index) => {
      if (character === " " || character === "\n") return character;

      let hash =
        Math.imul(index + 1, 1_103_515_245) ^
        Math.imul(seed + 1, 12_345) ^
        character.charCodeAt(0) * 97;
      hash ^= hash >>> 16;

      return (hash >>> 0) % asciiSparkleDensity === 0 ? character : " ";
    })
    .join("");
}

type GlowPosition = {
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
};

function positionGlow(glow: HTMLPreElement, position: GlowPosition) {
  const {scaleX, scaleY, x, y} = position;

  glow.style.setProperty("--ascii-pointer-x", `${x}px`);
  glow.style.setProperty("--ascii-pointer-y", `${y}px`);
  glow.style.setProperty("--ascii-pointer-x-left", `${x - 9 * scaleX}px`);
  glow.style.setProperty("--ascii-pointer-y-left", `${y + 6 * scaleY}px`);
  glow.style.setProperty("--ascii-pointer-x-right", `${x + 8 * scaleX}px`);
  glow.style.setProperty("--ascii-pointer-y-right", `${y - 7 * scaleY}px`);
  glow.style.setProperty("--ascii-pointer-x-bottom", `${x + 2 * scaleX}px`);
  glow.style.setProperty("--ascii-pointer-y-bottom", `${y + 10 * scaleY}px`);
  glow.style.setProperty("--ascii-glow-radius-x", `${24 * scaleX}px`);
  glow.style.setProperty("--ascii-glow-radius-y", `${21 * scaleY}px`);
  glow.style.setProperty("--ascii-glow-left-x", `${17 * scaleX}px`);
  glow.style.setProperty("--ascii-glow-left-y", `${13 * scaleY}px`);
  glow.style.setProperty("--ascii-glow-right-x", `${15 * scaleX}px`);
  glow.style.setProperty("--ascii-glow-right-y", `${17 * scaleY}px`);
  glow.style.setProperty("--ascii-glow-bottom-x", `${12 * scaleX}px`);
  glow.style.setProperty("--ascii-glow-bottom-y", `${14 * scaleY}px`);
}

function createSparkleLayer(variantIndex: number) {
  const sparkle = document.createElement("pre");

  sparkle.className = cn(
    "ascii-pointer-glow",
    `ascii-pointer-glow-variant-${variantIndex}`,
  );
  sparkle.ariaHidden = "true";

  return sparkle;
}

export function AnimatedAsciiArt({art, className}: AnimatedAsciiArtProps) {
  const asciiElement = useRef<HTMLDivElement>(null);
  const sparkleLayers = useRef<HTMLPreElement[]>([]);
  const nextSparkleLayer = useRef(0);
  const sparkleSeed = useRef(0);
  const sparkleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointerPosition = useRef<GlowPosition | null>(null);

  const showRandomSparkles = useCallback(() => {
    const layerIndex = nextSparkleLayer.current;
    const sparkle = sparkleLayers.current[layerIndex];
    const position = pointerPosition.current;

    if (!sparkle || !position) return;

    const variantIndex = layerIndex % asciiGlowVariantCount;
    const strength = asciiGlowStrengths[variantIndex];
    sparkle.textContent = createRandomGlowFrame(art, sparkleSeed.current);
    positionGlow(sparkle, position);
    sparkle.getAnimations().forEach((animation) => animation.cancel());
    sparkle.animate(
      [
        {opacity: 0},
        {opacity: strength, offset: 0.14},
        {opacity: 0},
      ],
      {
        duration: asciiSparkleDuration,
        easing: "ease-in-out",
        fill: "forwards",
      },
    );
    sparkleSeed.current += 1;
    nextSparkleLayer.current =
      (nextSparkleLayer.current + 1) % sparkleLayers.current.length;
  }, [art]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const element = event.currentTarget;
      const bounds = element.getBoundingClientRect();

      if (bounds.width <= 0 || bounds.height <= 0) return;

      const scaleX = element.offsetWidth / bounds.width;
      const scaleY = element.offsetHeight / bounds.height;
      pointerPosition.current = {
        scaleX,
        scaleY,
        x: (event.clientX - bounds.left) * scaleX,
        y: (event.clientY - bounds.top) * scaleY,
      };

      if (sparkleTimer.current !== null) return;

      showRandomSparkles();
      sparkleTimer.current = setInterval(
        showRandomSparkles,
        asciiSparkleInterval,
      );
    },
    [showRandomSparkles],
  );

  const handlePointerLeave = useCallback(() => {
    pointerPosition.current = null;

    if (sparkleTimer.current !== null) {
      clearInterval(sparkleTimer.current);
      sparkleTimer.current = null;
    }
  }, []);

  useEffect(() => {
    const element = asciiElement.current;

    if (!element) return;

    const mountedSparkleLayers = Array.from(
      {length: asciiSparkleLayerCount},
      (_, index) => createSparkleLayer(index % asciiGlowVariantCount),
    );
    element.append(...mountedSparkleLayers);
    sparkleLayers.current = mountedSparkleLayers;

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.setAttribute(
          "data-ascii-visible",
          entry.isIntersecting ? "true" : "false",
        );
      },
      {rootMargin: "100px"},
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (sparkleTimer.current !== null) {
        clearInterval(sparkleTimer.current);
        sparkleTimer.current = null;
      }
      pointerPosition.current = null;
      mountedSparkleLayers.forEach((sparkle) => {
        sparkle.getAnimations().forEach((animation) => animation.cancel());
        sparkle.remove();
      });
      sparkleLayers.current = [];
    };
  }, []);

  return (
    <div
      className={cn("animated-ascii-art pointer-events-auto", className)}
      data-ascii-visible="false"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={asciiElement}
    >
      <pre className="pointer-events-none m-0">
        {renderPulsingCharacters(art)}
      </pre>
    </div>
  );
}
