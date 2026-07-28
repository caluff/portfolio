export function CoverSection() {
  return (
    <section
      className="relative mx-2 mt-1 h-52 overflow-hidden bg-linear-to-br from-cover-deep via-cover-mid to-cover-light sm:h-56"
      aria-label="Portada decorativa"
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-cover-highlight/30 to-transparent" />
      <div className="absolute top-5 left-[45%] size-16 rounded-full bg-cover-sun opacity-90 blur-[2px]" />
      <div className="absolute -bottom-16 left-[8%] h-56 w-3/5 bg-cover-mountain [clip-path:polygon(0_100%,40%_8%,61%_55%,74%_0,100%_100%)]" />
      <div className="absolute -right-[12%] -bottom-16 h-56 w-3/5 -scale-x-100 bg-cover-mountain-deep [clip-path:polygon(0_100%,40%_8%,61%_55%,74%_0,100%_100%)]" />
      <div className="absolute top-16 left-[59%] h-52 w-8 rotate-6 bg-linear-to-r from-cover-water/40 via-cover-water to-cover-water/60 opacity-90" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-cover-foliage/70 [clip-path:polygon(0_0,65%_8%,45%_25%,85%_42%,48%_58%,92%_78%,55%_100%,0_100%)]" />
      <div className="absolute inset-y-0 right-0 w-1/3 -scale-x-100 bg-cover-foliage-deep/75 [clip-path:polygon(0_0,65%_8%,45%_25%,85%_42%,48%_58%,92%_78%,55%_100%,0_100%)]" />
      <span className="absolute bottom-3 left-3 font-mono text-[0.55rem] tracking-[0.18em] text-cover-label">
        CALUFF / DIGITAL GARDEN
      </span>
    </section>
  );
}
