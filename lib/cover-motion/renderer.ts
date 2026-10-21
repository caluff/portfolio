import {getCoverFrame, sampleCoverGeometry, type CoverGeometry} from "@/lib/cover-motion/geometry";

/** Bend the hand gradually beyond the wrist while the forearm keeps its shape. */
export class CoverMotionRenderer {
  private context: CanvasRenderingContext2D;
  private texture = document.createElement("canvas");
  private geometry: CoverGeometry | undefined;
  private dpr = 1;
  private background: string;

  constructor(private canvas: HTMLCanvasElement, private image: HTMLImageElement) {
    const context = canvas.getContext("2d", {alpha: false});
    if (!context) throw new Error("2D canvas unavailable");
    this.context = context;
    context.imageSmoothingQuality = "high";
    this.background = getComputedStyle(canvas).backgroundColor;
  }

  get ready() {
    return Boolean(this.geometry);
  }

  resize() {
    if (!this.image.complete || !this.image.naturalWidth) return;
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (!width || !height) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    this.texture.width = width;
    this.texture.height = height;
    const context = this.texture.getContext("2d", {willReadFrequently: true});
    if (!context) return;

    const scale = Math.max(width / this.image.naturalWidth, height / this.image.naturalHeight);
    const imageWidth = this.image.naturalWidth * scale;
    const imageHeight = this.image.naturalHeight * scale;
    const box = {x: (width - imageWidth) * 0.5, y: (height - imageHeight) * 0.58, width: imageWidth, height: imageHeight};
    context.imageSmoothingQuality = "high";
    context.drawImage(this.image, box.x, box.y, box.width, box.height);
    this.geometry = sampleCoverGeometry(context.getImageData(0, 0, width, height).data, width, height, box);
  }

  draw(elapsed: number, still = false) {
    if (!this.geometry) return;
    const context = this.context;
    const dpr = this.dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.globalCompositeOperation = "source-over";
    context.fillStyle = this.background;
    context.fillRect(0, 0, this.geometry.width, this.geometry.height);

    if (still) {
      context.drawImage(this.texture, 0, 0);
      return;
    }

    const {columns, rightShift} = getCoverFrame(this.geometry, elapsed);
    const {split, width, height} = this.geometry;
    context.globalCompositeOperation = "lighten";
    context.drawImage(this.texture, split, 0, width - split, height, split + rightShift, 0, width - split, height);

    for (const {strip, transform: t} of columns) {
      context.save();
      context.setTransform(t.a * dpr, t.b * dpr, t.c * dpr, t.d * dpr, t.e * dpr, t.f * dpr);
      context.beginPath();
      context.rect(strip.x, 0, strip.width + 0.6, height);
      context.clip();
      // Sample the whole texture rather than enlarging each narrow slice.
      context.drawImage(this.texture, 0, 0);
      context.restore();
    }
    context.globalCompositeOperation = "source-over";
  }
}
