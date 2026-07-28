import Image from "next/image";

export function CoverSection() {
  return (
    <section
      className="relative mx-2 mt-1 h-52 overflow-hidden bg-muted sm:h-56"
      aria-label="Portada animada"
    >
      <Image
        alt=""
        className="object-cover"
        fill
        preload
        sizes="(max-width: 768px) 100vw, 768px"
        src="/svg/herogif.gif"
        unoptimized
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent"/>
      <span className="absolute bottom-3 left-3 font-mono text-[0.55rem] tracking-[0.18em] text-cover-label">
        CALUFF / DIGITAL GARDEN
      </span>
    </section>
  );
}
