import Image from "next/image";
import {getTranslations} from "next-intl/server";

export async function CoverSection() {
  const t = await getTranslations("Cover");

  return (
    <section
      className="relative mx-2 mt-1 h-52 overflow-hidden bg-muted sm:h-56"
      aria-label={t("ariaLabel")}
    >
      <Image
        alt=""
        className="object-cover"
        fill
        preload
        sizes="(max-width: 768px) 100vw, 768px"
        src="/gif/herogif.gif"
        unoptimized
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent"/>
    </section>
  );
}
