import {GridIntersectionNodes} from "@/components/portfolio/grid-intersection-nodes";

export function SectionSeparator() {
  return (
    <div
      className="relative h-px"
      role="separator"
      aria-orientation="horizontal"
    >
      <span
        className="absolute top-0 left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-border"
        aria-hidden="true"
      />
      <GridIntersectionNodes/>
    </div>
  );
}
