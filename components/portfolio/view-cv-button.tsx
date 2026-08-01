import {ArrowUpRight} from "lucide-react";

import {Button} from "@/components/ui/button";
import {contactCta} from "@/data/contact";
import {cn} from "@/lib/utils";

const cvUrl = process.env.NEXT_PUBLIC_CV_URL;

export function ViewCvButton({className}: { className?: string }) {
  if (!cvUrl) return null;

  return (
    <Button
      className={cn("h-8 rounded-none px-4", className)}
      nativeButton={false}
      render={
        <a
          aria-label={`${contactCta.cvLabel} (opens in a new tab)`}
          href={cvUrl}
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      size="lg"
      title={contactCta.cvLabel}
    >
      <span className="flex items-center justify-center gap-1.5">
        {contactCta.cvLabel}
        <ArrowUpRight data-icon="inline-end" aria-hidden="true"/>
      </span>
    </Button>
  );
}
