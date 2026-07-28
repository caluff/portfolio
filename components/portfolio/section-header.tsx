import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  action?: ReactNode;
};

export function SectionHeader({ action, title }: SectionHeaderProps) {
  return (
    <header>
      <div
        className="relative h-5 before:absolute before:inset-y-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:border-y before:border-dashed before:border-border before:bg-muted/30"
        aria-hidden="true"
      />
      <div className="relative flex min-h-14 items-center justify-between px-5 sm:px-6">
        <h2 className="font-heading text-3xl tracking-tighter">{title}</h2>
        {action}
        <span
          className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-border"
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
