"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import {cn} from "@/lib/utils";

type AnimatedAsciiArtProps = {
  art: string;
  className?: string;
};

type PulseDirection = "dim" | "contrast";

const asciiGlowRadius = 30;

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

function renderAnimatedCharacters(art: string, columnCount: number) {
  const characters = Array.from(art);
  const pulseDirections = getPulseDirections(characters);
  const content: ReactNode[] = [];
  let textRun = "";
  let row = 0;
  let column = 0;

  characters.forEach((character, index) => {
    const characterRow = row;
    const characterColumn = column;

    if (character === "\n") {
      row += 1;
      column = 0;
    } else {
      column += 1;
    }

    if (character === " " || character === "\n") {
      textRun += character;
      return;
    }

    if (textRun) {
      content.push(textRun);
      textRun = "";
    }

    const pulseDirection = pulseDirections.get(index);

    content.push(
      <span
        className={cn(
          "ascii-character-highlight",
          pulseDirection && pulseClassNames[pulseDirection],
          pulseDirection &&
            pulsePhaseClasses[(index + character.charCodeAt(0)) % 4],
        )}
        data-grid-index={characterRow * columnCount + characterColumn}
        data-character={character}
        key={`character-${index}`}
      >
        {character}
      </span>,
    );
  });

  if (textRun) content.push(textRun);

  return content;
}

export function AnimatedAsciiArt({art, className}: AnimatedAsciiArtProps) {
  const asciiElement = useRef<HTMLPreElement>(null);
  const characterElements = useRef(new Map<number, HTMLSpanElement>());
  const litCharacters = useRef(new Set<HTMLSpanElement>());
  const animationFrame = useRef<number | null>(null);
  const lines = useMemo(() => art.split("\n"), [art]);
  const rowCount = lines.length;
  const columnCount = useMemo(
    () => Math.max(...lines.map((line) => Array.from(line).length)),
    [lines],
  );

  const clearLitCharacters = useCallback(() => {
    litCharacters.current.forEach((element) =>
      element.removeAttribute("data-pointer-lit"),
    );
    litCharacters.current.clear();
  }, []);

  const updateLitCharacters = useCallback(
    (element: HTMLPreElement, clientX: number, clientY: number) => {
      const bounds = element.getBoundingClientRect();
      const cellWidth = bounds.width / columnCount;
      const cellHeight = bounds.height / rowCount;

      if (cellWidth <= 0 || cellHeight <= 0) return;

      const pointerX = clientX - bounds.left;
      const pointerY = clientY - bounds.top;
      const centerColumn = Math.floor(pointerX / cellWidth);
      const centerRow = Math.floor(pointerY / cellHeight);
      const columnRadius = Math.ceil(asciiGlowRadius / cellWidth);
      const rowRadius = Math.ceil(asciiGlowRadius / cellHeight);
      const nextLitCharacters = new Set<HTMLSpanElement>();

      for (
        let candidateRow = Math.max(0, centerRow - rowRadius);
        candidateRow <= Math.min(rowCount - 1, centerRow + rowRadius);
        candidateRow += 1
      ) {
        for (
          let candidateColumn = Math.max(0, centerColumn - columnRadius);
          candidateColumn <=
          Math.min(columnCount - 1, centerColumn + columnRadius);
          candidateColumn += 1
        ) {
          const horizontalDistance =
            (candidateColumn + 0.5) * cellWidth - pointerX;
          const verticalDistance = (candidateRow + 0.5) * cellHeight - pointerY;
          const angle = Math.atan2(verticalDistance, horizontalDistance);
          const irregularEdge =
            0.86 +
            Math.sin(angle * 3 + centerRow * 0.31) * 0.08 +
            Math.sin(angle * 7 + centerColumn * 0.17) * 0.06;
          const localGlowRadius = asciiGlowRadius * irregularEdge;
          const distance = Math.hypot(horizontalDistance, verticalDistance);

          if (distance > localGlowRadius) {
            continue;
          }

          const character = characterElements.current.get(
            candidateRow * columnCount + candidateColumn,
          );

          if (character) {
            const normalizedDistance = distance / localGlowRadius;
            const edgeBlend =
              1 -
              normalizedDistance ** 2 * (3 - 2 * normalizedDistance);

            character.style.setProperty(
              "--ascii-pointer-light",
              edgeBlend.toFixed(3),
            );
            nextLitCharacters.add(character);
          }
        }
      }

      litCharacters.current.forEach((character) => {
        if (!nextLitCharacters.has(character)) {
          character.removeAttribute("data-pointer-lit");
        }
      });
      nextLitCharacters.forEach((character) => {
        character.setAttribute("data-pointer-lit", "true");
      });
      litCharacters.current = nextLitCharacters;
    },
    [columnCount, rowCount],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLPreElement>) => {
      const element = event.currentTarget;
      const {clientX, clientY} = event;

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        updateLitCharacters(element, clientX, clientY);
        animationFrame.current = null;
      });
    },
    [updateLitCharacters],
  );

  const handlePointerLeave = useCallback(() => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    clearLitCharacters();
  }, [clearLitCharacters]);

  useEffect(() => {
    const element = asciiElement.current;
    const mountedCharacterElements = characterElements.current;

    mountedCharacterElements.clear();
    element
      ?.querySelectorAll<HTMLSpanElement>("[data-grid-index]")
      .forEach((character) => {
        const gridIndex = Number(character.dataset.gridIndex);

        mountedCharacterElements.set(gridIndex, character);
      });

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
      mountedCharacterElements.clear();
    };
  }, [art, columnCount]);

  return (
    <pre
      className={cn("pointer-events-auto", className)}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={asciiElement}
    >
      {renderAnimatedCharacters(art, columnCount)}
    </pre>
  );
}
