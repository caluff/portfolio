import {getTranslations} from "next-intl/server";

import {CoverGifSelector} from "@/components/portfolio/cover-gif-selector";

export async function CoverSection() {
  const t = await getTranslations("Cover");

  return (
    <section
      className="relative mx-2 mt-1 h-52 overflow-hidden bg-muted sm:h-56"
      aria-label={t("ariaLabel")}
    >
      <CoverGifSelector
        ariaLabel={t("selectorLabel")}
        gifLabels={[t("gifOptions.1"), t("gifOptions.2"), t("gifOptions.3")]}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent"/>
    </section>
  );
}
