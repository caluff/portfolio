export function ProjectDevelopmentRibbon({label}: {label: string}) {
  return (
    <span
      className="pointer-events-none absolute top-7 -right-11 z-20 w-44 rotate-45 border-y border-project-status-building-foreground/20 bg-project-status-building py-1 text-center text-[10px] font-bold tracking-[0.16em] text-project-status-building-foreground uppercase shadow-sm"
      role="status"
    >
      {label}
    </span>
  );
}
