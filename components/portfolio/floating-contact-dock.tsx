"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ContactIcon } from "@/components/portfolio/contact-icon";
import { Button } from "@/components/ui/button";
import { contactLinks } from "@/data/links";

const SCROLL_THRESHOLD = 320;

export function FloatingContactDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          className="fixed top-1/2 right-3 z-40 flex flex-col gap-1 rounded-2xl border bg-background/95 p-1.5 shadow-lg backdrop-blur-sm sm:right-5"
          initial={{ opacity: 0, x: 24, y: "-50%", scale: 0.94 }}
          animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
          exit={{ opacity: 0, x: 24, y: "-50%", scale: 0.94 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-label="Contact options"
        >
          {contactLinks.map(({ href, iconMode, iconSrc, label }) => (
            <Button
              variant="secondary"
              size="icon-lg"
              nativeButton={false}
              render={
                <a
                  href={href}
                  aria-label={`Contact via ${label}`}
                  title={label}
                />
              }
              key={label}
            >
              <ContactIcon iconMode={iconMode} iconSrc={iconSrc} />
            </Button>
          ))}

          <Button
            className="mt-1"
            variant="ghost"
            size="icon-lg"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ChevronUp aria-hidden="true" />
          </Button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
