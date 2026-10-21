type Point = {x: number; y: number};
type ImageBox = Point & {width: number; height: number};
type Strip = {x: number; width: number; maxX: number; top: number; bottom: number};
type Transform = {a: number; b: number; c: number; d: number; e: number; f: number};

export type CoverGeometry = {
  width: number;
  height: number;
  split: number;
  wrist: Point;
  strips: Strip[];
  rightEdge: number;
};

/** Find the visible silhouette so the two hands always retain a clear gap. */
export function sampleCoverGeometry(
  pixels: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
  image: ImageBox,
): CoverGeometry {
  const split = Math.min(width, image.x + image.width * 0.525);
  const strips: Strip[] = [];
  let rightEdge = width;

  for (let x = 0; x < width; x += 2) {
    const strip: Strip = {x, width: Math.min(2, split - x), maxX: x, top: height, bottom: 0};
    for (let sx = x; sx < Math.min(x + 2, width); sx++) {
      for (let y = 0; y < height; y++) {
        const index = (y * width + sx) * 4;
        if (pixels[index + 3] < 16 || Math.max(pixels[index], pixels[index + 1], pixels[index + 2]) < 9) continue;
        if (sx >= split) {
          rightEdge = Math.min(rightEdge, sx);
        } else {
          strip.maxX = Math.max(strip.maxX, sx);
          strip.top = Math.min(strip.top, y);
          strip.bottom = Math.max(strip.bottom, y);
        }
      }
    }
    if (strip.top < height && strip.width > 0) strips.push(strip);
  }

  return {
    width, height, split, strips, rightEdge,
    wrist: {x: image.x + image.width * 0.28, y: image.y + image.height * 0.445},
  };
}

export function getCoverFrame(geometry: CoverGeometry, elapsed: number) {
  const reach = (1 - Math.cos(elapsed / 9000 * Math.PI * 2)) / 2;
  const start = Math.min(1, elapsed / 900);
  const intro = start * start * (3 - 2 * start);
  const armShift = geometry.width * (-0.008 + reach * 0.011) * intro;
  const rightShift = geometry.width * -0.0035 * reach * intro;
  const bend = (1 - reach * 1.6) * Math.PI / 180 * intro;
  const stretch = 1 + (-0.015 + reach * 0.023) * intro;
  let leftEdge = -Infinity;

  const columns = geometry.strips.map((strip) => {
    const position = Math.max(0, Math.min(1, (strip.x - geometry.wrist.x + geometry.width * 0.025) / (geometry.width * 0.1)));
    const flex = position * position * (3 - 2 * position);
    const angle = bend * flex;
    const scale = 1 + (stretch - 1) * flex;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const transform: Transform = {
      a: cos * scale, b: sin * scale, c: -sin, d: cos,
      e: geometry.wrist.x * (1 - cos * scale) + geometry.wrist.y * sin + armShift,
      f: geometry.wrist.y * (1 - cos) - geometry.wrist.x * sin * scale,
    };
    // Include pixel edges and the small strip overlap used by the renderer.
    const edgeY = transform.c > 0 ? strip.bottom + 1 : strip.top;
    leftEdge = Math.max(leftEdge, transform.a * (strip.maxX + 2) + transform.c * edgeY + transform.e);
    return {strip, transform};
  });

  const minimumGap = Math.max(4, geometry.width * 0.01);
  const correction = Math.min(0, geometry.rightEdge + rightShift - minimumGap - leftEdge);
  for (const {transform} of columns) transform.e += correction;

  return {
    columns, rightShift, minimumGap,
    leftEdge: leftEdge + correction,
    rightEdge: geometry.rightEdge + rightShift,
  };
}
