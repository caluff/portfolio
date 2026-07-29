"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import {AnimatePresence, motion, useReducedMotion} from "motion/react";
import Image from "next/image";
import {useEffect, useState, type FocusEvent} from "react";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const AUTOPLAY_DELAY = 5000;

type ProjectMediaCarouselProps = {
  featured?: boolean;
  images: readonly string[];
  liveUrl: string;
  projectName: string;
};

export function ProjectMediaCarousel({
  featured = false,
  images,
  liveUrl,
  projectName,
}: ProjectMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || paused || shouldReduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length, paused, shouldReduceMotion]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setPaused(false);
    }
  };

  return (
    <div
      className={cn(
        "relative aspect-3/2 overflow-hidden bg-muted",
        featured && "sm:aspect-auto sm:min-h-80",
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={handleBlur}
    >
      <a
        className="absolute inset-0 block outline-none ring-inset transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
        href={liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${projectName} live site`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            className="absolute inset-0"
            key={images[activeIndex]}
            initial={{opacity: 0, scale: 1.015}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0}}
            transition={{duration: shouldReduceMotion ? 0 : 0.45}}
          >
            <Image
              className="object-cover"
              src={images[activeIndex]}
              alt={`${projectName} preview ${activeIndex + 1} of ${images.length}`}
              fill
              sizes={
                featured
                  ? "(max-width: 639px) calc(100vw - 4rem), 390px"
                  : "(max-width: 639px) calc(100vw - 4rem), 320px"
              }
            />
          </motion.div>
        </AnimatePresence>
      </a>

      {hasMultipleImages && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1 sm:right-3 sm:left-auto">
          <span className="mr-1 bg-background/85 px-2 py-1 text-xs font-medium tabular-nums text-foreground">
            {activeIndex + 1}/{images.length}
          </span>
          <Button
            className="shadow-sm"
            variant="secondary"
            size="icon-sm"
            type="button"
            onClick={showPrevious}
            aria-label={`Previous ${projectName} image`}
          >
            <ChevronLeft aria-hidden="true"/>
          </Button>
          <Button
            className="shadow-sm"
            variant="secondary"
            size="icon-sm"
            type="button"
            onClick={showNext}
            aria-label={`Next ${projectName} image`}
          >
            <ChevronRight aria-hidden="true"/>
          </Button>
        </div>
      )}
    </div>
  );
}
