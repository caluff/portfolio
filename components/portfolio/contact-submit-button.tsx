"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { contactCta } from "@/data/contact";

type ContactSubmitButtonProps = {
  isConfigured: boolean;
  isSending: boolean;
};

export function ContactSubmitButton({
  isConfigured,
  isSending,
}: ContactSubmitButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Button
      aria-busy={isSending}
      className="relative h-11 min-w-40 overflow-hidden rounded-none px-7"
      disabled={isSending || !isConfigured}
      size="lg"
      type="submit"
    >
      {isSending && !reduceMotion && (
        <motion.span
          animate={{ x: ["-150%", "500%"] }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 -skew-x-12 bg-primary-foreground/15"
          transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      <AnimatePresence initial={false} mode="wait">
        {isSending ? (
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="relative flex items-center gap-1.5"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 8 }}
            key="sending"
          >
            <motion.span
              animate={reduceMotion ? undefined : { scale: [0.85, 1, 0.85] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            >
              <Spinner data-icon="inline-start" />
            </motion.span>
            <span aria-live="polite">{contactCta.sendingLabel}</span>
          </motion.span>
        ) : (
          <motion.span
            animate={{ opacity: 1, x: 0 }}
            className="relative flex items-center gap-1.5"
            exit={{ opacity: 0, x: 28 }}
            initial={{ opacity: 0, x: -8 }}
            key="idle"
          >
            {contactCta.submitLabel}
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
