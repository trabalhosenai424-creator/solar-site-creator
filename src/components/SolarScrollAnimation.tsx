import { useEffect, useRef } from "react";

type SolarScrollAnimationProps = {
  frameCount?: number;
  framePath?: string;
  className?: string;
};

/**
 * Scroll-driven frame animation for the solar-energy story section.
 *
 * Drop optimized WebP frames into public/animations/solar/ using the
 * convention frame-001.webp, frame-002.webp, ... and the component will
 * preload them and draw the correct frame to a canvas as the user scrolls.
 */
export function SolarScrollAnimation({
  frameCount = 48,
  framePath = "/animations/solar/frame-",
  className = "",
}: SolarScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const frames: HTMLImageElement[] = [];
    let loaded = 0;
    let currentFrame = -1;
    let raf = 0;
    let destroyed = false;

    const frameUrl = (index: number) =>
      `${framePath}${String(index + 1).padStart(3, "0")}.webp`;

    const draw = (index: number) => {
      if (destroyed || !frames[index]?.complete) return;
      const image = frames[index];
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.clearRect(0, 0, width, height);
      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      context.drawImage(image, x, y, drawWidth, drawHeight);
      currentFrame = index;
    };

    const requestDraw = (index: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => draw(index));
    };

    for (let index = 0; index < frameCount; index += 1) {
      const image = new Image();
      image.decoding = "async";
      image.src = frameUrl(index);
      image.onload = () => {
        loaded += 1;
        if (loaded === 1) requestDraw(0);
      };
      frames.push(image);
    }

    const updateFromScroll = () => {
      const bounds = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
      const targetFrame = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount),
      );

      if (targetFrame !== currentFrame && frames[targetFrame]?.complete) {
        requestDraw(targetFrame);
      }
    };

    const onScroll = () => updateFromScroll();
    const onResize = () => {
      if (currentFrame >= 0) requestDraw(currentFrame);
      updateFromScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateFromScroll();

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      frames.forEach((image) => {
        image.onload = null;
        image.src = "";
      });
    };
  }, [frameCount, framePath]);

  return (
    <section ref={sectionRef} className={`relative h-[220vh] ${className}`}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-label="Animação do processo de geração de energia solar"
          className="h-full w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Role para acompanhar a energia sendo gerada
          </p>
        </div>
      </div>
    </section>
  );
}
