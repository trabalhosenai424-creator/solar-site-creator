import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sun, PiggyBank, Leaf, TrendingUp, ClipboardCheck, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

import { SolarScrollAnimation } from "@/components/SolarScrollAnimation";
import { SolarHowItWorksPremium } from "@/components/SolarHowItWorksPremium";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SolViva Energia Solar — Economize até 95% na conta de luz" },
      { name: "description", content: "Projetos de energia solar fotovoltaica para residências e empresas. Simule sua economia, receba uma proposta em 24h e gere sua própria energia limpa." },
      { property: "og:title", content: "SolViva Energia Solar" },
      { property: "og:description", content: "Transforme o sol do seu telhado em economia real. Painéis de alta eficiência, instalação profissional e retorno garantido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function Index() {
  return <div className="min-h-screen bg-background text-foreground"><Header /><main><SolarScrollAnimation /><Beneficios /><SolarHowItWorksPremium /><Calculadora /><Depoimentos /><Contato /></main><Footer /></div>;
}

function Header() {
  return <header className="absolute inset-x-0 top-0 z-[60] border-b border-white/10 bg-black/10 text-white backdrop-blur-md"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"><a href="#" className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl border border-white/15 bg-white/10 text-white shadow-lg"><Sun className="size-5" /></span><span className="font-display text-lg font-bold tracking-tight">Sol<span className="text-cyan-200">Viva</span></span></a><nav className="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex"><a href="#beneficios" className="transition-colors hover:text-white">Benefícios</a><a href="#como-funciona" className="transition-colors hover:text-white">Como funciona</a><a href="#calculadora" className="transition-colors hover:text-white">Calculadora</a><a href="#depoimentos" className="transition-colors hover:text-white">Clientes</a></nav><a href="#contato" className="rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-100">Pedir orçamento</a></div></header>;
}

function Beneficios() {
  const itens = [
    { icon: PiggyBank, titulo: "Economia imediata", texto: "Reduza a fatura de energia em até 95% já no primeiro mês e proteja-se dos aumentos tarifários ano após ano." },
    { icon: TrendingUp, titulo: "Imóvel valorizado", texto: "Imóveis com energia solar podem ganhar valor de mercado e atratividade para compradores." },
    { icon: Leaf, titulo: "Energia limpa", texto: "Gere eletricidade a partir de uma fonte renovável e reduza sua dependência da rede elétrica." },
    { icon: ClipboardCheck, titulo: "Zero burocracia", texto: "Cuidamos do projeto, homologação junto à distribuidora e documentação do sistema." },
  ];
  return <section id="beneficios" className="border-y bg-secondary/60"><div className="mx-auto max-w-6xl px-5 py-20"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Por que energia solar</p><h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">Benefícios que aparecem na fatura e no seu bolso</h2><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{itens.map((item) => <div key={item.titulo} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md"><span className="grid size-11 place-items-center rounded-xl bg-sun/20 text-primary"><item.icon className="size-5" /></span><h3 className="mt-4 text-lg font-semibold">{item.titulo}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.texto}</p></div>)}</div></div></section>;
}

function Calculadora() {
  const [conta, setConta] = useState(600);
  const resultado = useMemo(() => { const economiaMes = conta * 0.9; const investimento = Math.max(conta * 28, 12000); const retornoAnos = investimento / (economiaMes * 12); const economia25 = economiaMes * 12 * 25; return { economiaMes, retornoAnos, economia25 }; }, [conta]);
  return <section id="calculadora" className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-sun">Calculadora solar</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Descubra quanto você pode economizar</h2><p className="mt-4 max-w-md text-primary-foreground/75">Arraste o controle até o valor médio da sua conta de luz e veja uma estimativa instantânea.</p></div><div className="rounded-3xl bg-background p-7 text-foreground shadow-2xl"><label htmlFor="conta" className="text-sm font-semibold">Valor médio da conta de luz</label><p className="mt-1 font-display text-4xl font-bold text-primary">{BRL.format(conta)}<span className="text-base font-medium text-muted-foreground">/mês</span></p><input id="conta" type="range" min={200} max={5000} step={50} value={conta} onChange={(e) => setConta(Number(e.target.value))} className="mt-5 w-full accent-[oklch(0.78_0.15_85)]" /><div className="mt-6 grid grid-cols-3 gap-3 text-center"><div className="rounded-xl bg-secondary p-4"><p className="font-display text-lg font-bold text-primary md:text-xl">{BRL.format(resultado.economiaMes)}</p><p className="text-[11px] font-medium text-muted-foreground">economia/mês</p></div><div className="rounded-xl bg-secondary p-4"><p className="font-display text-lg font-bold text-primary md:text-xl">{resultado.retornoAnos.toFixed(1).replace(".", ",")} anos</p><p className="text-[11px] font-medium text-muted-foreground">retorno</p></div><div className="rounded-xl bg-secondary p-4"><p className="font-display text-lg font-bold text-primary md:text-xl">{BRL.format(resultado.economia25)}</p><p className="text-[11px] font-medium text-muted-foreground">em 25 anos</p></div></div><a href="#contato" className="mt-6 block rounded-xl bg-sun py-3.5 text-center text-sm font-bold text-sun-foreground transition hover:opacity-90">Quero uma proposta personalizada</a></div></div></section>;
}

function Depoimentos() {
  const depoimentos = [{ nome: "Mariana Costa", texto: "A equipe explicou cada etapa e o acompanhamento da geração deixou tudo muito mais simples." }, { nome: "Rafael Mendes", texto: "O projeto ficou exatamente como planejado e hoje consigo acompanhar minha produção todos os dias." }, { nome: "Ana Paula", texto: "A instalação foi organizada e o resultado apareceu rapidamente na minha conta de energia." }];
  return <section id="depoimentos" className="mx-auto max-w-6xl px-5 py-20"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Clientes</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Quem escolheu gerar a própria energia</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{depoimentos.map((d) => <article key={d.nome} className="rounded-2xl border bg-card p-6 shadow-sm"><CheckCircle2 className="size-5 text-primary" /><p className="mt-4 text-sm leading-6 text-muted-foreground">“{d.texto}”</p><p className="mt-5 text-sm font-semibold">{d.nome}</p></article>)}</div></section>;
}

function Contato() {
  return <section id="contato" className="border-t bg-secondary/60"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Fale com a SolViva</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Pronto para transformar sol em economia?</h2><p className="mt-4 max-w-md text-muted-foreground">Envie seus dados e nossa equipe entra em contato para entender seu consumo e montar uma proposta.</p></div><div className="rounded-3xl border bg-card p-7 shadow-sm"><div className="grid gap-4 sm:grid-cols-2"><input className="rounded-xl border bg-background px-4 py-3 text-sm outline-none ring-primary focus:ring-2" placeholder="Seu nome" /><input className="rounded-xl border bg-background px-4 py-3 text-sm outline-none ring-primary focus:ring-2" placeholder="WhatsApp" /></div><input className="mt-4 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none ring-primary focus:ring-2" placeholder="E-mail" /><textarea className="mt-4 min-h-28 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none ring-primary focus:ring-2" placeholder="Conte um pouco sobre seu projeto" /><button className="mt-4 w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">Solicitar orçamento</button><div className="mt-5 grid gap-2 text-sm text-muted-foreground"><span className="inline-flex items-center gap-2"><Phone className="size-4" />(44) 99999-9999</span><span className="inline-flex items-center gap-2"><Mail className="size-4" />contato@solviva.com.br</span><span className="inline-flex items-center gap-2"><MapPin className="size-4" />Atendimento em todo o Brasil</span></div></div></div></section>;
}

function Footer() { return <footer className="border-t bg-background"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-2"><Sun className="size-4 text-primary" /><span>SolViva Energia Solar</span></div><p>© 2026 SolViva. Todos os direitos reservados.</p></div></footer>; }
