import {getTranslations} from "next-intl/server";

import {CoverImageSelector} from "@/components/portfolio/cover-image-selector";
import {coverImages} from "@/data/cover";

export async function CoverSection() {
  const t = await getTranslations("Cover");

  return (
    <section
      className="relative mx-2 mt-1 h-52 overflow-hidden bg-muted sm:h-56"
      aria-label={t("ariaLabel")}
    >
      <CoverImageSelector
        ariaLabel={t("selectorLabel")}
        imageLabels={coverImages.map(({labelKey}) => t(`imageOptions.${labelKey}`))}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent"/>
    </section>
  );
}
