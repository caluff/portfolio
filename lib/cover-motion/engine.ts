import {CoverMotionRenderer} from "@/lib/cover-motion/renderer";

/** A slow gesture, paused outside the viewport and for reduced motion. */
export class CoverMotionEngine {
  private image = new Image();
  private renderer: CoverMotionRenderer;
  private frameId = 0;
  private lastFrame = 0;
  private elapsed = 0;
  private visible = true;
  private disposed = false;
  private reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;

  constructor(private canvas: HTMLCanvasElement, src: string) {
    this.renderer = new CoverMotionRenderer(canvas, this.image);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(canvas);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.syncPlayback();
    });
    this.intersectionObserver.observe(canvas);
    this.reducedMotion.addEventListener("change", this.onMotionPreference);
    document.addEventListener("visibilitychange", this.syncPlayback);
    this.image.onload = this.resize;
    this.image.src = src;
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    this.image.onload = null;
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.onMotionPreference);
    document.removeEventListener("visibilitychange", this.syncPlayback);
  }

  private resize = () => {
    if (this.disposed) return;
    try {
      this.renderer.resize();
      if (!this.renderer.ready) return;
      this.renderer.draw(this.elapsed, this.reducedMotion.matches);
      this.canvas.style.opacity = "1";
      this.syncPlayback();
    } catch {
      this.canvas.style.opacity = "0";
    }
  };

  private syncPlayback = () => {
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
    if (this.disposed || !this.renderer.ready) return;
    if (this.reducedMotion.matches) {
      this.renderer.draw(0, true);
      return;
    }
    if (!this.visible || document.hidden) return;
    this.lastFrame = performance.now();
    this.frameId = requestAnimationFrame(this.frame);
  };

  private frame = (now: number) => {
    if (now - this.lastFrame >= 1000 / 30) {
      this.elapsed += Math.min(now - this.lastFrame, 100);
      this.lastFrame = now;
      this.renderer.draw(this.elapsed);
    }
    this.frameId = requestAnimationFrame(this.frame);
  };

  private onMotionPreference = () => {
    this.elapsed = 0;
    this.syncPlayback();
  };
}
