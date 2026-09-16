import { useEffect, useRef, useState } from "react";
import { Sun, Zap, Cable, Home, BatteryCharging, ArrowDown } from "lucide-react";

const scenes = [
  { number: "01", title: "CAPTAÇÃO", text: "A luz do sol chega aos módulos fotovoltaicos e começa a transformação da energia solar em eletricidade.", icon: Sun, label: "Luz solar", kind: "sun" },
  { number: "02", title: "GERAÇÃO", text: "As células fotovoltaicas convertem a radiação solar em energia elétrica para alimentar o sistema.", icon: Zap, label: "Energia gerada", kind: "panels" },
  { number: "03", title: "CONVERSÃO", text: "O inversor recebe a energia produzida e faz a conversão para o padrão utilizado pelos equipamentos do imóvel.", icon: BatteryCharging, label: "Inversor", kind: "inverter" },
  { number: "04", title: "DISTRIBUIÇÃO", text: "A energia percorre a instalação elétrica e chega aos ambientes onde será utilizada.", icon: Cable, label: "Distribuição", kind: "flow" },
  { number: "05", title: "CONSUMO", text: "Iluminação, eletrodomésticos e equipamentos passam a utilizar a energia produzida pelo próprio sistema.", icon: Home, label: "Energia em uso", kind: "home" },
];

function SceneVisual({ kind }: { kind: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(129,140,248,0.18),transparent_36%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      {kind === "sun" && <><div className="absolute right-[14%] top-[12%] grid size-24 place-items-center rounded-full bg-amber-300/90 shadow-[0_0_90px_rgba(251,191,36,0.65)] sm:size-32"><Sun className="size-14 text-amber-950 sm:size-20" /></div><div className="absolute bottom-[18%] left-[8%] h-1/3 w-[84%] -skew-y-3 rounded-xl border border-white/15 bg-slate-900/90" /><div className="absolute bottom-[20%] left-[13%] grid w-[74%] grid-cols-5 gap-1 -skew-y-3 opacity-90">{Array.from({ length: 20 }).map((_, i) => <span key={i} className="aspect-[1.4] rounded-sm border border-cyan-200/20 bg-gradient-to-br from-cyan-500/35 to-blue-900/80" />)}</div><div className="absolute left-[18%] top-[30%] h-px w-[48%] origin-left rotate-[18deg] bg-gradient-to-r from-amber-200/80 to-transparent animate-pulse" /><div className="absolute left-[27%] top-[39%] h-px w-[48%] origin-left rotate-[18deg] bg-gradient-to-r from-amber-200/70 to-transparent animate-pulse" /></>}
      {kind === "panels" && <><div className="absolute inset-x-[8%] bottom-[17%] grid grid-cols-4 gap-2 -skew-y-6">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="aspect-[1.35] rounded border border-cyan-200/25 bg-gradient-to-br from-cyan-400/45 via-blue-800/80 to-indigo-950" />)}</div><div className="absolute bottom-[10%] left-[48%] h-12 w-px bg-white/25" /><div className="absolute left-[12%] top-[28%] text-6xl font-black tracking-tighter text-cyan-200/80 sm:text-8xl">kWh</div><div className="absolute right-[12%] top-[25%] flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100"><Zap className="size-4" /> energia fluindo</div></>}
      {kind === "inverter" && <><div className="absolute left-1/2 top-1/2 h-52 w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-gradient-to-br from-slate-700 to-slate-950 shadow-[0_0_80px_rgba(56,189,248,0.2)] sm:h-64 sm:w-44"><div className="mx-5 mt-8 h-12 rounded-lg border border-cyan-200/20 bg-cyan-300/10 text-center font-mono text-lg leading-[3rem] text-cyan-200">DC → AC</div><div className="mx-auto mt-6 size-3 rounded-full bg-emerald-300 shadow-[0_0_25px_rgba(110,231,183,0.9)]" /><div className="mx-5 mt-5 h-1 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" /></div><div className="absolute left-[7%] top-[42%] flex items-center gap-2 text-xs text-cyan-100"><Zap className="size-4" /> corrente contínua</div><div className="absolute right-[7%] top-[42%] flex items-center gap-2 text-xs text-emerald-100">corrente alternada <ArrowDown className="size-4 rotate-[-90deg]" /></div></>}
      {kind === "flow" && <><div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-white/15" />{["25%", "50%", "75%"].map((left) => <div key={left} className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,0.9)]" style={{ left }}><span className="absolute left-5 top-1/2 h-px w-24 -translate-y-1/2 bg-gradient-to-r from-cyan-300 to-transparent" /></div>)}<div className="absolute left-[8%] top-[35%] text-xs uppercase tracking-[0.2em] text-white/50">inversor</div><div className="absolute right-[8%] top-[35%] text-xs uppercase tracking-[0.2em] text-white/50">imóvel</div><div className="absolute left-1/2 top-[57%] -translate-x-1/2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100">energia percorrendo a instalação</div></>}
      {kind === "home" && <><div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 text-white"><Home className="size-48 stroke-[0.7] text-white/85 sm:size-64" /></div><div className="absolute bottom-[27%] left-[37%] size-5 rounded-full bg-amber-200 shadow-[0_0_35px_rgba(253,230,138,0.95)] animate-pulse" /><div className="absolute bottom-[29%] right-[35%] size-5 rounded-full bg-amber-200 shadow-[0_0_35px_rgba(253,230,138,0.95)] animate-pulse" /><div className="absolute left-1/2 top-[17%] -translate-x-1/2 text-center"><div className="text-5xl font-black tracking-tight text-white sm:text-7xl">ENERGIA</div><div className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-200">gerada e utilizada</div></div></>}
    </div>
  );
}

export function SolarHowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => { const el = sectionRef.current; if (!el) return; const rect = el.getBoundingClientRect(); const total = Math.max(el.offsetHeight - window.innerHeight, 1); setProgress(Math.min(1, Math.max(0, -rect.top / total))); };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const rawIndex = progress * (scenes.length - 1);
  const activeIndex = Math.min(scenes.length - 1, Math.floor(rawIndex));
  const local = rawIndex - activeIndex;
  const scene = scenes[activeIndex];
  const next = scenes[Math.min(activeIndex + 1, scenes.length - 1)];
  const SceneIcon = scene.icon;
  const NextIcon = next.icon;
  const currentOpacity = activeIndex === scenes.length - 1 ? 1 : Math.max(0, 1 - local * 1.35);
  const nextOpacity = activeIndex === scenes.length - 1 ? 0 : Math.max(0, (local - 0.35) / 0.65);
  const currentScale = 1 + local * 0.045;
  const nextScale = 1.045 - local * 0.045;

  return (
    <section ref={sectionRef} id="como-funciona" className="relative h-[650vh] bg-slate-950 text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
          <div className="mb-7 flex items-end justify-between gap-5 md:mb-10"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Como funciona</p><h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">Do sol até a energia no seu imóvel.</h2></div><div className="hidden items-center gap-2 text-xs font-medium text-white/45 md:flex"><span className="inline-block size-2 rounded-full bg-cyan-300" /> role o mouse para explorar</div></div>
          <div className="grid min-h-[62vh] items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative z-10 order-2 lg:order-1"><div className="mb-6 flex items-center gap-3"><span className="font-mono text-sm text-cyan-300">{scene.number}</span><div className="h-px w-12 bg-white/20" /><span className="text-xs uppercase tracking-[0.18em] text-white/40">{scene.label}</span></div><div className="relative min-h-[210px] md:min-h-[260px]"><div style={{ opacity: currentOpacity, transform: `translateY(${local * -22}px)` }} className="absolute inset-0 transition-none"><SceneIcon className="size-9 text-cyan-300" /><h3 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{scene.title}</h3><p className="mt-5 max-w-lg text-base leading-7 text-white/60 md:text-lg">{scene.text}</p></div>{activeIndex < scenes.length - 1 && <div style={{ opacity: nextOpacity, transform: `translateY(${(1 - local) * 22}px)` }} className="absolute inset-0 transition-none"><NextIcon className="size-9 text-cyan-300" /><h3 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{next.title}</h3><p className="mt-5 max-w-lg text-base leading-7 text-white/60 md:text-lg">{next.text}</p></div>}</div><div className="mt-6 h-1 max-w-md overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300 transition-none" style={{ width: `${progress * 100}%` }} /></div><div className="mt-4 flex gap-2">{scenes.map((s, i) => <span key={s.number} className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "w-8 bg-cyan-300" : "w-2 bg-white/20"}`} />)}</div></div>
            <div className="relative order-1 h-[42vh] min-h-[300px] lg:order-2 lg:h-[58vh]"><div style={{ opacity: currentOpacity, transform: `scale(${currentScale})` }} className="absolute inset-0 transition-none"><SceneVisual kind={scene.kind} /></div>{activeIndex < scenes.length - 1 && <div style={{ opacity: nextOpacity, transform: `scale(${nextScale})` }} className="absolute inset-0 transition-none"><SceneVisual kind={next.kind} /></div>}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
