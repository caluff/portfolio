// Adapted from stackedlol/ascii-sharks, commit c521e24a787e6d4cc460d4cf2b9815f25e4fe453.
// https://github.com/stackedlol/ascii-sharks

import {AsciiRenderer} from "./renderer";
import {World} from "./world";

const STEP = 1 / 60;
const FRAME_INTERVAL = 1 / 30;
const MAX_STEPS = 4;

/** A decorative ocean with a bounded render rate and a static reduced-motion view. */
export class OceanEngine {
  private world = new World();
  private renderer: AsciiRenderer;
  private raf = 0;
  private scrollRaf = 0;
  private last = 0;
  private acc = 0;
  private visible = true;
  private disposed = false;
  private scene: HTMLElement;
  private sceneTop = 0;
  private cameraY = 0;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private themeObserver: MutationObserver;

  constructor(private canvas: HTMLCanvasElement) {
    this.scene = canvas.closest("main") ?? document.body;
    this.renderer = new AsciiRenderer(canvas);
    const typography = getComputedStyle(canvas);
    this.renderer.setTypography(typography.fontFamily, Number.parseFloat(typography.fontSize));

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.resizeObserver.observe(this.scene);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(canvas);
    this.themeObserver = new MutationObserver(() => {
      this.renderer.refreshTheme();
      if (this.reducedMotion.matches) this.drawStill();
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-cover-accent"],
    });

    this.reducedMotion.addEventListener("change", this.onMotionPreference);
    document.addEventListener("visibilitychange", this.schedule);
    window.addEventListener("scroll", this.onScroll, {passive: true});
    window.addEventListener("pointermove", this.onPointerMove, {passive: true});
    window.addEventListener("pointerdown", this.onPointerDown, {passive: true});
    document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
    window.addEventListener("blur", this.onPointerLeave);

    this.resize();
    void document.fonts.ready.then(() => {
      if (!this.disposed && this.reducedMotion.matches) this.drawStill();
    });
    this.schedule();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    cancelAnimationFrame(this.scrollRaf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.themeObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.onMotionPreference);
    document.removeEventListener("visibilitychange", this.schedule);
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
    window.removeEventListener("blur", this.onPointerLeave);
  }

  private resize() {
    const {width, height} = this.canvas.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    this.sceneTop = window.scrollY + this.scene.getBoundingClientRect().top;
    this.cameraY = Math.max(0, window.scrollY - this.sceneTop);
    if (width !== this.canvasWidth || height !== this.canvasHeight) {
      this.canvasWidth = width;
      this.canvasHeight = height;
      this.renderer.resize(width, height, Math.min(window.devicePixelRatio || 1, 1.5));
    }
    const sceneHeight = Math.max(height, this.scene.scrollHeight);
    if (width !== this.world.width || sceneHeight !== this.world.height) {
      this.world.resize(width, sceneHeight, this.renderer.cellWidth, this.renderer.cellHeight);
    }
    if (this.reducedMotion.matches) this.drawStill();
  }

  private schedule = () => {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || document.hidden || this.reducedMotion.matches) return;
    this.last = performance.now();
    this.acc = 0;
    this.raf = requestAnimationFrame(this.frame);
  };

  private frame = (now: number) => {
    const elapsed = (now - this.last) / 1000;
    if (elapsed < FRAME_INTERVAL) {
      this.raf = requestAnimationFrame(this.frame);
      return;
    }
    const dt = Math.min(0.1, elapsed);
    this.last = now;
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < MAX_STEPS) {
      this.world.step(STEP);
      this.acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) this.acc = 0;
    this.renderer.render(this.world, dt, this.cameraY);
    this.raf = requestAnimationFrame(this.frame);
  };

  private drawStill() {
    if (this.world.time < 4) {
      for (let i = 0; i < 240; i++) this.world.step(STEP);
    }
    this.renderer.render(this.world, STEP, this.cameraY);
  }

  private onScroll = () => {
    this.cameraY = Math.max(0, window.scrollY - this.sceneTop);
    this.world.pointer.active = false;
    // Scroll still moves the scene when automatic swimming is disabled.
    if (!this.reducedMotion.matches || document.hidden || this.scrollRaf) return;
    this.scrollRaf = requestAnimationFrame(() => {
      this.scrollRaf = 0;
      if (!this.disposed) this.drawStill();
    });
  };

  private onMotionPreference = () => {
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
      this.drawStill();
    } else {
      this.schedule();
    }
  };

  private toLocal(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const viewportY = e.clientY - rect.top;
    const y = viewportY + this.cameraY;
    return {x, y, inside: x >= 0 && viewportY >= 0 && x <= rect.width && viewportY <= rect.height};
  }

  private onPointerMove = (e: PointerEvent) => {
    const {x, y, inside} = this.toLocal(e);
    Object.assign(this.world.pointer, {x, y, active: inside && e.pointerType !== "touch"});
  };

  private onPointerDown = (e: PointerEvent) => {
    if (e.target instanceof Element && e.target.closest("a, button, input, textarea, select")) return;
    const {x, y, inside} = this.toLocal(e);
    if (inside && !this.reducedMotion.matches) this.world.splash(x, y);
  };

  private onPointerLeave = () => {
    this.world.pointer.active = false;
  };
}
