import { useEffect, useRef, useState } from "react";

type SolarScrollAnimationProps = { className?: string };

const FRAME_COUNT = 30;
const FRAME_PATH = "/frame_";

const STORY = [
  { start: 0, end: 0.18, eyebrow: "01 · A origem", title: "Tudo começa com uma fonte.", body: "A luz do sol inicia uma jornada que transforma radiação em energia utilizável." },
  { start: 0.18, end: 0.38, eyebrow: "02 · Captação", title: "A luz encontra os painéis.", body: "A luz incide sobre os módulos fotovoltaicos e inicia a geração." },
  { start: 0.38, end: 0.55, eyebrow: "03 · Geração", title: "Energia sendo gerada em tempo real.", body: "O fluxo elétrico cresce conforme a energia solar é capturada." },
  { start: 0.55, end: 0.72, eyebrow: "04 · Conversão", title: "Energia solar → energia utilizável.", body: "O inversor transforma a energia produzida em eletricidade pronta para uso." },
  { start: 0.72, end: 0.88, eyebrow: "05 · Uso", title: "A energia chega onde importa.", body: "A eletricidade gerada passa a alimentar a casa e seus equipamentos." },
  { start: 0.88, end: 1, eyebrow: "06 · Resultado", title: "Sua energia. Seu controle.", body: "Acompanhe geração, consumo e economia com clareza." },
];

export function SolarScrollAnimation({ className = "" }: SolarScrollAnimationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `${FRAME_PATH}${String(i).padStart(3, "0")}.webp`;
      img.onload = () => {
        loaded++;
        if (!cancelled && loaded === FRAME_COUNT) {
          imagesRef.current = images;
          setReady(true);
        }
      };
      images.push(img);
    }
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const draw = () => {
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -bounds.top / distance));
      const rect = canvas.getBoundingClientRect();
      const images = imagesRef.current;
      const index = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
      const image = images[index];
      if (image?.naturalWidth && rect.width && rect.height) {
        const scale = Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
        const w = image.naturalWidth * scale;
        const h = image.naturalHeight * scale;
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = "#050b12";
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctx.drawImage(image, (rect.width - w) / 2, (rect.height - h) / 2, w, h);
      }
      setProgress((old) => Math.abs(old - p) > 0.01 ? p : old);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, [ready]);

  const story = STORY.find((item) => progress >= item.start && progress <= item.end) ?? STORY[5];
  const storyIndex = STORY.indexOf(story);
  const production = Math.min(5.2, Math.max(0, ((progress - 0.38) / 0.5) * 5.2));
  const savings = Math.round(Math.min(847, Math.max(0, ((progress - 0.72) / 0.28) * 847)));

  return (
    <section ref={sectionRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050b12]">
        <canvas ref={canvasRef} className="h-full w-full" aria-label="Jornada da energia solar" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div key={storyIndex} className="max-w-xl">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-200/90">{story.eyebrow}</p>
              <h2 className="text-4xl font-semibold leading-[0.98] tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">{story.title}</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/70 md:text-base">{story.body}</p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-6 top-6 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 backdrop-blur-md">
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/45">Jornada solar</p>
          <p className="mt-1 text-sm font-medium text-white">{String(storyIndex + 1).padStart(2, "0")} / 06</p>
        </div>
        {progress >= 0.38 && progress < 0.72 && <div className="pointer-events-none absolute bottom-20 right-6 rounded-2xl border border-cyan-200/20 bg-black/30 px-5 py-4 text-right backdrop-blur-md md:right-12"><p className="text-[9px] uppercase tracking-[0.25em] text-white/45">Potência gerada</p><p className="mt-1 text-2xl font-semibold tabular-nums text-white">{production.toFixed(1)} <span className="text-sm text-cyan-200">kW</span></p></div>}
        {progress >= 0.72 && <div className="pointer-events-none absolute bottom-20 right-6 rounded-2xl border border-cyan-200/20 bg-black/30 px-5 py-4 text-right backdrop-blur-md md:right-12"><p className="text-[9px] uppercase tracking-[0.25em] text-white/45">Economia acumulada</p><p className="mt-1 text-2xl font-semibold tabular-nums text-white">R$ {savings.toLocaleString("pt-BR")}</p></div>}
        <div className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"><span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50 backdrop-blur-md">Role para continuar</span></div>
      </div>
    </section>
  );
}
