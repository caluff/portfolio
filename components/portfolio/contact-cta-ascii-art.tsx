import {contactAsciiArt} from "@/data/contact-ascii-art";
import {AnimatedAsciiArt} from "@/components/portfolio/animated-ascii-art";

export function ContactCtaAsciiArt() {
  return (
    <div
      className="pointer-events-none absolute top-20 left-full z-0 hidden w-[calc((100vw-48rem)/2)] xl:block"
      aria-hidden="true"
    >
      <AnimatedAsciiArt
        art={contactAsciiArt}
        className="absolute top-0 -left-88 origin-top-left font-mono text-sm leading-[0.92] font-medium text-border select-none"
      />
    </div>
  );
}
