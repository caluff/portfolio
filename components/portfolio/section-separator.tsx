export function SectionSeparator() {
  return (
    <div
      className="relative h-px"
      role="separator"
      aria-orientation="horizontal"
    >
      <span
        className="absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border"
        aria-hidden="true"
      />
    </div>
  );
}
