export function GridIntersectionNodes() {
  return (
    <span
      className="pointer-events-none absolute inset-x-0 top-0 z-10"
      aria-hidden="true"
    >
      <span className="grid-intersection-node absolute left-0"/>
      <span className="grid-intersection-node absolute right-0"/>
    </span>
  );
}
