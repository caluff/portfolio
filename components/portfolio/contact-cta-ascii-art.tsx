import {contactAsciiArt} from "@/data/contact-ascii-art";
import {AnimatedAsciiArt} from "@/components/portfolio/animated-ascii-art";

export function ContactCtaAsciiArt() {
  return (
    <div
      className="pointer-events-none absolute top-24 left-full z-0 hidden w-[calc((100vw-48rem)/2)] xl:block"
      aria-hidden="true"
    >
      <AnimatedAsciiArt
        art={contactAsciiArt}
        className="absolute top-0 -left-48 origin-top-left scale-x-[0.68] font-mono text-[14px] leading-[0.92] font-medium text-border select-none"
      />
    </div>
  );
}
