"use client";

import {useEffect, useState} from "react";

import {AnimatedCover} from "@/components/portfolio/animated-cover";
import {Button} from "@/components/ui/button";
import {coverImages, defaultCoverImageId, type CoverAccent} from "@/data/cover";
import {cn} from "@/lib/utils";

type CoverImageId = (typeof coverImages)[number]["id"];

type CoverImageSelectorProps = {
  ariaLabel: string;
  imageLabels: readonly string[];
};

const accentClasses: Record<CoverAccent, string> = {
  cyan: "border-cover-accent-cyan after:bg-cover-accent-cyan",
  orange: "border-cover-accent-orange after:bg-cover-accent-orange",
  purple: "border-cover-accent-purple after:bg-cover-accent-purple",
};

export function CoverImageSelector({
  ariaLabel,
  imageLabels,
}: CoverImageSelectorProps) {
  const [selectedImageId, setSelectedImageId] = useState<CoverImageId>(defaultCoverImageId);
  const selectedImage = coverImages.find(({id}) => id === selectedImageId) ?? coverImages[0];

  useEffect(() => {
    document.documentElement.dataset.coverAccent = selectedImage.accent;

    return () => {
      if (document.documentElement.dataset.coverAccent === selectedImage.accent) {
        delete document.documentElement.dataset.coverAccent;
      }
    };
  }, [selectedImage.accent]);

  return (
    <>
      <AnimatedCover key={selectedImage.id} src={selectedImage.src}/>
      <div
        aria-label={ariaLabel}
        className="absolute bottom-2 left-2 z-10 flex items-center gap-1"
        role="group"
      >
        {coverImages.map((image, index) => {
          const isSelected = image.id === selectedImage.id;
          const label = imageLabels[index];

          return (
            <Button
              aria-label={label}
              aria-pressed={isSelected}
              className="bg-transparent hover:bg-background/10"
              key={image.id}
              onClick={() => setSelectedImageId(image.id)}
              size="icon-xs"
              title={label}
              type="button"
              variant="ghost"
            >
              <span
                className={cn(
                  "size-3 rounded-full border border-border p-0.5 after:block after:size-full after:rounded-full after:transition-colors",
                  isSelected && accentClasses[image.accent],
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
