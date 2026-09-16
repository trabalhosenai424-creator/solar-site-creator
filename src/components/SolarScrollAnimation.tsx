import { useEffect, useRef, useState } from "react";

type SolarScrollAnimationProps = {
  className?: string;
};

const FRAME_COUNT = 30;
const FRAME_PATH = "/animations/solar/frames/frame_";

/**
 * Cinematic, scroll-controlled solar story.
 * The supplied Flow frames are preloaded and cross-faded between adjacent
 * frames so the 30-frame sequence feels smoother than a hard image swap.
 * If the assets are not present yet, the component falls back to a subtle
 * dark cinematic background instead of breaking the page.
 */
export function SolarScrollAnimation({ className = "" }: SolarScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetError, setAssetError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i += 1) {
      const image = new Image();
      image.decoding = "async";
      image.src = `${FRAME_PATH}${String(i).padStart(3, "0")}.webp`;
      image.onload = () => {
        loaded += 1;
        if (!cancelled && loaded === FRAME_COUNT) {
          imagesRef.current = images;
          setAssetsReady(true);
        }
      };
      image.onerror = () => {
        if (!cancelled) setAssetError(true);
      };
      images.push(image);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section || !assetsReady) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let destroyed = false;
    let currentProgress = -1;

    const drawCover = (image: HTMLImageElement, alpha = 1) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (!width || !height || !image.naturalWidth) return;

      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.globalAlpha = alpha;
      ctx.drawImage(image, x, y, drawWidth, drawHeight);
      ctx.globalAlpha = 1;
    };

    const draw = (progress: number) => {
      if (destroyed) return;
      currentProgress = Math.max(0, Math.min(1, progress));

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#050b12";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const position = currentProgress * (FRAME_COUNT - 1);
      const index = Math.min(FRAME_COUNT - 1, Math.floor(position));
      const nextIndex = Math.min(FRAME_COUNT - 1, index + 1);
      const blend = position - index;
      const images = imagesRef.current;

      drawCover(images[index], 1);
      if (nextIndex !== index && blend > 0) {
        drawCover(images[nextIndex], blend);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(currentProgress < 0 ? 0 : currentProgress);
    };

    const update = () => {
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      const next = Math.max(0, Math.min(1, -bounds.top / distance));

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => draw(next));
    };

    resize();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
    };
  }, [assetsReady]);

  return (
    <section ref={sectionRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050b12]">
        <canvas
          ref={canvasRef}
          aria-label="Jornada cinematográfica da geração de energia solar"
          className="h-full w-full"
        />

        {/* Cinematic readability layer */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />

        {/* Website typography stays outside the generated frames. */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto w-full max-w-6xl -translate-y-1/2 px-6 md:px-10">
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-200/80">
              Energia solar
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white drop-shadow-2xl md:text-6xl">
              {assetsReady ? "Tudo começa com uma fonte." : "Transforme luz em energia."}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/65 md:text-base">
              Uma jornada visual controlada pelo seu scroll — do sol aos painéis, do inversor à energia que movimenta sua casa.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-white/20" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
            Role para continuar
          </span>
          <span className="h-px w-12 bg-white/20" />
        </div>

        {assetError && !assetsReady && (
          <div className="pointer-events-none absolute inset-x-0 bottom-16 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
            Adicione os frames em public/animations/solar/frames
          </div>
        )}
      </div>
    </section>
  );
}
