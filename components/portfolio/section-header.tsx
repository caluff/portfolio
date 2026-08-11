import type { ReactNode } from "react";

import {GridIntersectionNodes} from "@/components/portfolio/grid-intersection-nodes";

type SectionHeaderProps = {
  title: string;
  action?: ReactNode;
};

export function SectionHeader({ action, title }: SectionHeaderProps) {
  return (
    <header>
      <div className="relative h-5" aria-hidden="true">
        <span className="absolute top-0 left-1/2 h-full w-screen -translate-x-1/2 border-y border-dashed border-border bg-subtle-band"/>
        <GridIntersectionNodes/>
        <span className="absolute inset-x-0 bottom-0">
          <GridIntersectionNodes/>
        </span>
      </div>
      <div className="relative flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-2 sm:px-6">
        <h2 className="font-heading text-3xl tracking-tighter">{title}</h2>
        {action}
        <span
          className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-border"
          aria-hidden="true"
        />
        <span className="absolute inset-x-0 bottom-0">
          <GridIntersectionNodes/>
        </span>
      </div>
    </header>
  );
}
