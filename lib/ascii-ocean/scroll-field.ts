/** Keep wakes at their document positions as rows enter or leave the viewport. */
export function shiftOceanField(field: Float32Array, columns: number, deltaRows: number) {
  const offset = deltaRows * columns;
  if (offset === 0) return;
  if (Math.abs(offset) >= field.length) {
    field.fill(0);
    return;
  }
  if (offset > 0) {
    field.copyWithin(0, offset);
    field.fill(0, field.length - offset);
  } else {
    field.copyWithin(-offset, 0);
    field.fill(0, 0, -offset);
  }
}
