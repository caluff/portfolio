import {ArrowUpRight} from "lucide-react";
import {getTranslations} from "next-intl/server";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const cvUrl = process.env.NEXT_PUBLIC_CV_URL;

export async function ViewCvButton({className}: { className?: string }) {
  if (!cvUrl) return null;
  const t = await getTranslations("Profile.cv");
  const label = t("label");

  return (
    <Button
      className={cn("neon-action h-8 rounded-none px-4", className)}
      nativeButton={false}
      render={
        <a
          aria-label={t("newTab", {label})}
          href={cvUrl}
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      size="lg"
      title={label}
    >
      <span className="flex items-center justify-center gap-1.5">
        {label}
        <ArrowUpRight data-icon="inline-end" aria-hidden="true"/>
      </span>
    </Button>
  );
}
