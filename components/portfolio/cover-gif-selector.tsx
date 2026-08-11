"use client";

import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {coverGifs, defaultCoverGifId, type CoverAccent} from "@/data/cover";
import {cn} from "@/lib/utils";

type CoverGifId = (typeof coverGifs)[number]["id"];

type CoverGifSelectorProps = {
  ariaLabel: string;
  gifLabels: readonly string[];
};

const accentClasses: Record<CoverAccent, string> = {
  cyan: "border-cover-accent-cyan after:bg-cover-accent-cyan",
  orange: "border-cover-accent-orange after:bg-cover-accent-orange",
  purple: "border-cover-accent-purple after:bg-cover-accent-purple",
};

export function CoverGifSelector({
                                   ariaLabel,
                                   gifLabels,
}: CoverGifSelectorProps) {
  const [selectedGifId, setSelectedGifId] = useState<CoverGifId>(defaultCoverGifId);
  const selectedGif = coverGifs.find(({id}) => id === selectedGifId) ?? coverGifs[0];

  useEffect(() => {
    document.documentElement.dataset.coverAccent = selectedGif.accent;

    return () => {
      if (document.documentElement.dataset.coverAccent === selectedGif.accent) {
        delete document.documentElement.dataset.coverAccent;
      }
    };
  }, [selectedGif.accent]);

  return (
    <>
      <video
        key={selectedGif.id}
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 size-full animate-in object-cover fade-in duration-300"
        loop
        muted
        playsInline
        poster={selectedGif.poster}
        preload="auto"
        src={selectedGif.src}
      />
      <div
        aria-label={ariaLabel}
        className="absolute bottom-2 left-2 z-10 flex items-center gap-1"
        role="group"
      >
        {coverGifs.map((gif, index) => {
          const isSelected = gif.id === selectedGif.id;
          const label = gifLabels[index] ?? `GIF ${index + 1}`;

          return (
            <Button
              aria-label={label}
              aria-pressed={isSelected}
              className="bg-transparent hover:bg-background/10"
              key={gif.id}
              onClick={() => setSelectedGifId(gif.id)}
              size="icon-xs"
              title={label}
              type="button"
              variant="ghost"
            >
              <span
                className={cn(
                  "size-3 rounded-full border border-border p-0.5 after:block after:size-full after:rounded-full after:transition-colors",
                  isSelected && accentClasses[gif.accent],
                )}
                aria-hidden="true"
              />
            </Button>
          );
        })}
      </div>
    </>
  );
}
