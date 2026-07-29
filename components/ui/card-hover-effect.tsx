"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {useState, type FocusEvent, type ReactNode} from "react";

import {cn} from "@/lib/utils";

export type HoverEffectItem = {
  id: string;
  content: ReactNode;
  className?: string;
};

type HoverEffectProps = {
  items: readonly HoverEffectItem[];
  className?: string;
};

export function HoverEffect({className, items}: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleBlur = (event: FocusEvent<HTMLOListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setHoveredIndex(null);
    }
  };

  return (
    <LayoutGroup id="project-hover-effect">
      <ol
        className={cn(
          "grid grid-cols-1 gap-3 sm:grid-cols-2",
          className,
        )}
        onMouseLeave={() => setHoveredIndex(null)}
        onBlurCapture={handleBlur}
      >
        {items.map((item, index) => (
          <li
            className={cn("relative isolate min-w-0 p-1", item.className)}
            key={item.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onFocusCapture={() => setHoveredIndex(index)}
          >
            <AnimatePresence initial={false}>
              {hoveredIndex === index && (
                <motion.span
                  className="pointer-events-none absolute inset-0 bg-project-hover ring-1 ring-foreground/15"
                  layoutId="project-hover-background"
                  initial={false}
                  animate={{opacity: 1}}
                  exit={{
                    opacity: 0,
                    transition: {duration: shouldReduceMotion ? 0 : 0.12},
                  }}
                  transition={
                    shouldReduceMotion
                      ? {duration: 0}
                      : {type: "spring", stiffness: 260, damping: 28}
                  }
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
            <div className="relative z-10 h-full">{item.content}</div>
          </li>
        ))}
      </ol>
    </LayoutGroup>
  );
}
