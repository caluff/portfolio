"use client";

import Image from "next/image";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {coverGifs, defaultCoverGifId} from "@/data/cover";
import {cn} from "@/lib/utils";

type CoverGifId = (typeof coverGifs)[number]["id"];

type CoverGifSelectorProps = {
  ariaLabel: string;
  gifLabels: readonly string[];
};

export function CoverGifSelector({
                                   ariaLabel,
                                   gifLabels,
                                 }: CoverGifSelectorProps) {
  const [selectedGifId, setSelectedGifId] = useState<CoverGifId>(defaultCoverGifId);
  const selectedGif = coverGifs.find(({id}) => id === selectedGifId) ?? coverGifs[0];

  return (
    <>
      <Image
        key={selectedGif.id}
        alt=""
        className="animate-in fade-in object-cover duration-300"
        fill
        preload
        sizes="(max-width: 768px) 100vw, 768px"
        src={selectedGif.src}
        unoptimized
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
                  isSelected && "after:bg-foreground",
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
