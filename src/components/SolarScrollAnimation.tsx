import { useEffect, useRef, useState } from "react";

type SolarScrollAnimationProps = {
  className?: string;
};

const FRAME_COUNT = 30;
const FRAME_PATH = "/animations/solar/frames/frame_";

const STORY = [
  { start: 0, end: 0.18, eyebrow: "01 · A origem", title: "Tudo começa com uma fonte.", body: "A luz do sol inicia uma jornada que transforma radiação em energia utilizável." },
  { start: 0.18, end: 0.38, eyebrow: "02 · Captação", title: "A luz encontra os painéis.", body: "Cada módulo fotovoltaico captura a energia da luz e começa a gerar eletricidade." },
  { start: 0.38, end: 0.55, eyebrow: "03 · Geração", title: "Energia sendo gerada em tempo real.", body: "O fluxo elétrico cresce conforme a luz incide sobre o sistema fotovoltaico." },
  { start: 0.55, end: 0.72, eyebrow: "04 · Conversão", title: "Energia solar → energia utilizável.", body: "O inversor converte a energia produzida pelos módulos para alimentar as cargas da propriedade." },
  { start: 0.72, end: 0.88, eyebrow: "05 · Uso", title: "A energia chega onde importa.", body: "A eletricidade gerada passa a alimentar iluminação, equipamentos e os demais consumos da casa." },
  { start: 0.88, end: 1, eyebrow: "06 · Resultado", title: "Sua energia. Seu controle.", body: "Produção, consumo e economia apresentados de forma clara para acompanhar o desempenho do sistema." },
];

export function SolarScrollAnimation({ className = "" }: SolarScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetError, setAssetError] = useState(false);
  const [progress, setProgress] = useState(0);

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
    let lastUiProgress = -1;

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

    const draw = (nextProgress: number) => {
      if (destroyed) return;
      currentProgress = Math.max(0, Math.min(1, nextProgress));

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
      if (nextIndex !== index && blend > 0) drawCover(images[nextIndex], blend);

      if (Math.abs(currentProgress - lastUiProgress) > 0.02) {
        lastUiProgress = currentProgress;
        setProgress(currentProgress);
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

  const activeStory = STORY.find((item) => progress >= item.start && progress <= item.end) ?? STORY[STORY.length - 1];
  const storyIndex = STORY.indexOf(activeStory);
  const production = Math.min(5.2, Math.max(0, ((progress - 0.38) / 0.5) * 5.2));
  const savings = Math.round(Math.min(847, Math.max(0, ((progress - 0.72) / 0.28) * 847)));

  return (
    <section ref={sectionRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050b12]">
        <canvas
          ref={canvasRef}
          aria-label="Jornada cinematográfica da geração de energia solar"
          className="h-full w-full"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />

        <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto w-full max-w-7xl -translate-y-1/2 px-6 md:px-12">
          <div className="max-w-xl transition-all duration-500" key={storyIndex}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-200/85">
              {activeStory.eyebrow}
            </p>
            <h2 className="text-4xl font-semibold leading-[0.98] tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
              {activeStory.title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70 md:text-base">
              {activeStory.body}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute right-6 top-6 hidden rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-md md:block">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">Jornada solar</p>
          <p className="mt-1 text-sm font-medium text-white">{String(storyIndex + 1).padStart(2, "0")} / 06</p>
        </div>

        {progress >= 0.38 && progress < 0.72 && (
          <div className="pointer-events-none absolute bottom-20 right-6 rounded-2xl border border-cyan-200/20 bg-black/30 px-5 py-4 text-right backdrop-blur-md md:right-12">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">Potência gerada</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-white">{production.toFixed(1)} <span className="text-sm text-cyan-200">kW</span></p>
          </div>
        )}

        {progress >= 0.72 && (
          <div className="pointer-events-none absolute bottom-20 right-6 rounded-2xl border border-cyan-200/20 bg-black/30 px-5 py-4 text-right backdrop-blur-md md:right-12">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">Economia acumulada</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-white">R$ {savings.toLocaleString("pt-BR")}</p>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-7 flex items-center justify-center gap-3">
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
