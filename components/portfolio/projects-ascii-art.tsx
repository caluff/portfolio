import {projectsAsciiArt} from "@/data/projects-ascii-art";
import {AnimatedAsciiArt} from "@/components/portfolio/animated-ascii-art";

export function ProjectsAsciiArt() {
  return (
    <div
      className="pointer-events-none absolute -top-12 right-full z-0 hidden w-[calc((100vw-48rem)/2)] xl:block"
      aria-hidden="true"
    >
      <AnimatedAsciiArt
        art={projectsAsciiArt}
        className="absolute top-0 -right-32 origin-top-right scale-x-[0.85] font-mono text-[14px] leading-[0.92] font-medium text-border select-none"
      />
    </div>
  );
}
