import { useEffect, useRef } from "react";

type SolarScrollAnimationProps = {
  className?: string;
};

/**
 * Premium scroll-driven solar story.
 * The canvas renders deterministic animation frames from scroll progress,
 * so the section works immediately without external image assets.
 */
export function SolarScrollAnimation({ className = "" }: SolarScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let destroyed = false;
    let progress = -1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(progress < 0 ? 0 : progress);
    };

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      const radius = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
    };

    const drawPanel = (x: number, y: number, w: number, h: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.09);
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#1b3157");
      gradient.addColorStop(0.5, "#244a78");
      gradient.addColorStop(1, "#10243f");
      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(0,0,0,.28)";
      ctx.shadowBlur = 22;
      ctx.shadowOffsetY = 12;
      roundRect(0, 0, w, h, 5);
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "rgba(122,211,255,.55)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.16)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i += 1) {
        ctx.beginPath();
        ctx.moveTo((w / 6) * i, 0);
        ctx.lineTo((w / 6) * i, h);
        ctx.stroke();
      }
      for (let i = 1; i < 4; i += 1) {
        ctx.beginPath();
        ctx.moveTo(0, (h / 4) * i);
        ctx.lineTo(w, (h / 4) * i);
        ctx.stroke();
      }
      ctx.restore();
    };

    function draw(p: number) {
      if (destroyed) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (!width || !height) return;
      progress = Math.max(0, Math.min(1, p));

      ctx.clearRect(0, 0, width, height);
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#07111f");
      sky.addColorStop(0.58, "#102744");
      sky.addColorStop(1, "#07111f");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.74, height * 0.25, 8, width * 0.74, height * 0.25, width * 0.5);
      glow.addColorStop(0, `rgba(255,210,85,${0.3 + progress * 0.25})`);
      glow.addColorStop(1, "rgba(255,210,85,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // stars / atmosphere
      ctx.fillStyle = "rgba(255,255,255,.32)";
      for (let i = 0; i < 38; i += 1) {
        const x = (i * 137) % width;
        const y = ((i * 71) % (height * 0.52));
        ctx.globalAlpha = 0.15 + ((i * 17) % 30) / 100;
        ctx.beginPath();
        ctx.arc(x, y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // sun enters first, then intensifies.
      const sunP = Math.min(1, progress / 0.22);
      const sunX = width * 0.75;
      const sunY = height * 0.22 - (1 - sunP) * height * 0.12;
      const sunRadius = Math.min(width, height) * (0.045 + sunP * 0.012);
      ctx.save();
      ctx.globalAlpha = sunP;
      for (let i = 0; i < 16; i += 1) {
        const a = (Math.PI * 2 * i) / 16;
        const r1 = sunRadius * 1.7;
        const r2 = sunRadius * 2.45;
        ctx.strokeStyle = `rgba(255,210,75,${0.25 + sunP * 0.25})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sunX + Math.cos(a) * r1, sunY + Math.sin(a) * r1);
        ctx.lineTo(sunX + Math.cos(a) * r2, sunY + Math.sin(a) * r2);
        ctx.stroke();
      }
      ctx.shadowColor = "rgba(255,196,45,.7)";
      ctx.shadowBlur = 45;
      ctx.fillStyle = "#ffd65a";
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // House/building appears as the story progresses.
      const houseP = Math.max(0, Math.min(1, (progress - 0.08) / 0.55));
      const baseY = height * 0.77;
      const houseW = Math.min(width * 0.55, 620);
      const houseH = houseW * 0.34;
      const houseX = width * 0.5 - houseW / 2;
      const houseY = baseY - houseH * houseP;
      ctx.globalAlpha = houseP;
      ctx.fillStyle = "#f2f5f8";
      ctx.shadowColor = "rgba(0,0,0,.28)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 18;
      ctx.fillRect(houseX, houseY, houseW, houseH);
      ctx.shadowColor = "transparent";
      ctx.fillStyle = "#b8c4d0";
      ctx.beginPath();
      ctx.moveTo(houseX - 30, houseY);
      ctx.lineTo(houseX + houseW * 0.5, houseY - houseH * 0.32);
      ctx.lineTo(houseX + houseW + 30, houseY);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#16283f";
      ctx.fillRect(houseX + houseW * 0.46, houseY + houseH * 0.48, houseW * 0.12, houseH * 0.52);
      ctx.fillStyle = "#7ed7ff";
      ctx.fillRect(houseX + houseW * 0.12, houseY + houseH * 0.38, houseW * 0.19, houseH * 0.22);
      ctx.fillRect(houseX + houseW * 0.72, houseY + houseH * 0.38, houseW * 0.16, houseH * 0.22);
      ctx.globalAlpha = 1;

      // Solar panels deploy between 20% and 50%.
      const panelP = Math.max(0, Math.min(1, (progress - 0.18) / 0.32));
      const panelW = Math.min(width * 0.24, 230);
      const panelH = panelW * 0.54;
      const panelY = houseY - panelH * 0.18;
      ctx.globalAlpha = panelP;
      drawPanel(houseX + houseW * 0.12, panelY, panelW, panelH);
      drawPanel(houseX + houseW * 0.42, panelY - panelH * 0.02, panelW, panelH);
      ctx.globalAlpha = 1;

      // Energy path: panels -> inverter -> house.
      const energyP = Math.max(0, Math.min(1, (progress - 0.43) / 0.42));
      if (energyP > 0) {
        const startX = houseX + houseW * 0.48;
        const startY = panelY + panelH * 0.65;
        const inverterX = houseX + houseW * 0.86;
        const inverterY = houseY + houseH * 0.35;
        const endX = houseX + houseW * 0.62;
        const endY = houseY + houseH * 0.52;

        ctx.strokeStyle = "rgba(91,220,255,.9)";
        ctx.lineWidth = 3;
        ctx.shadowColor = "rgba(91,220,255,.7)";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(inverterX, inverterY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.shadowColor = "transparent";

        ctx.fillStyle = "#111d2e";
        roundRect(inverterX - 28, inverterY - 22, 56, 44, 9);
        ctx.fill();
        ctx.strokeStyle = "rgba(126,215,255,.55)";
        ctx.stroke();

        for (let i = 0; i < 8; i += 1) {
          const t = (energyP * 1.7 + i / 8) % 1;
          let x: number;
          let y: number;
          if (t < 0.55) {
            const q = t / 0.55;
            x = startX + (inverterX - startX) * q;
            y = startY + (inverterY - startY) * q;
          } else {
            const q = (t - 0.55) / 0.45;
            x = inverterX + (endX - inverterX) * q;
            y = inverterY + (endY - inverterY) * q;
          }
          ctx.fillStyle = "#a5edff";
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Consumption / savings UI enters at the end.
      const resultP = Math.max(0, Math.min(1, (progress - 0.78) / 0.22));
      if (resultP > 0) {
        ctx.globalAlpha = resultP;
        const cardW = Math.min(width * 0.72, 420);
        const cardH = 76;
        const cardX = width / 2 - cardW / 2;
        const cardY = height * 0.09;
        ctx.fillStyle = "rgba(8,17,31,.78)";
        ctx.strokeStyle = "rgba(126,215,255,.32)";
        roundRect(cardX, cardY, cardW, cardH, 18);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#7ed7ff";
        ctx.font = "700 12px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("ENERGIA SOLAR EM AÇÃO", width / 2, cardY + 27);
        ctx.fillStyle = "#ffffff";
        ctx.font = "700 25px Inter, sans-serif";
        ctx.fillText("Economia gerada pelo sol", width / 2, cardY + 55);
        ctx.globalAlpha = 1;
      }
    }

    const update = () => {
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      const next = Math.max(0, Math.min(1, -bounds.top / distance));
      if (Math.abs(next - progress) > 0.001) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => draw(next));
      }
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
  }, []);

  return (
    <section ref={sectionRef} className={`relative h-[230vh] ${className}`}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-label="Animação do processo de geração de energia solar"
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            Role para acompanhar a energia sendo gerada
          </p>
        </div>
      </div>
    </section>
  );
}
