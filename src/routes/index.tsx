import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Sun,
  Zap,
  PiggyBank,
  Leaf,
  TrendingUp,
  ClipboardCheck,
  DraftingCompass,
  Wrench,
  LineChart,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import heroSolar from "@/assets/hero-solar.jpg";
import instalacao from "@/assets/instalacao.jpg";
import { SolarScrollAnimation } from "@/components/SolarScrollAnimation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SolViva Energia Solar — Economize até 95% na conta de luz" },
      {
        name: "description",
        content:
          "Projetos de energia solar fotovoltaica para residências e empresas. Simule sua economia, receba uma proposta em 24h e gere sua própria energia limpa.",
      },
      { property: "og:title", content: "SolViva Energia Solar" },
      {
        property: "og:description",
        content:
          "Transforme o sol do seu telhado em economia real. Painéis de alta eficiência, instalação profissional e retorno garantido.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <SolarScrollAnimation />
        <Beneficios />
        <ComoFunciona />
        <Calculadora />
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-sun text-sun-foreground">
            <Sun className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Sol<span className="text-primary">Viva</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#beneficios" className="transition-colors hover:text-foreground">Benefícios</a>
          <a href="#como-funciona" className="transition-colors hover:text-foreground">Como funciona</a>
          <a href="#calculadora" className="transition-colors hover:text-foreground">Calculadora</a>
          <a href="#depoimentos" className="transition-colors hover:text-foreground">Clientes</a>
        </nav>
        <a
          href="#contato"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Pedir orçamento
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-6rem] size-96 rounded-full bg-sun/20 blur-[110px]" />
        <div className="absolute bottom-[-8rem] left-[-6rem] size-96 rounded-full bg-primary/10 blur-[110px]" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-primary">
            <Zap className="size-3.5" /> Energia solar residencial e empresarial
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            Sua conta de luz até <span className="text-primary">95% menor</span> com energia do sol
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Projetamos, instalamos e homologamos seu sistema fotovoltaico completo. Você só acompanha a economia
            cair na fatura — mês após mês, por mais de 25 anos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#calculadora"
              className="inline-flex items-center gap-2 rounded-xl bg-sun px-6 py-3.5 text-sm font-bold text-sun-foreground shadow-lg transition hover:opacity-90"
            >
              Simular minha economia <ArrowRight className="size-4" />
            </a>
            <a
              href="#como-funciona"
              className="rounded-xl border bg-card px-6 py-3.5 text-sm font-semibold transition hover:bg-secondary"
            >
              Como funciona
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6">
            <div>
              <dt className="sr-only">Sistemas instalados</dt>
              <dd className="font-display text-2xl font-bold md:text-3xl">+3.800</dd>
              <dd className="text-xs font-medium text-muted-foreground">sistemas instalados</dd>
            </div>
            <div>
              <dt className="sr-only">Satisfação</dt>
              <dd className="font-display text-2xl font-bold md:text-3xl">4,9/5</dd>
              <dd className="text-xs font-medium text-muted-foreground">avaliação de clientes</dd>
            </div>
            <div>
              <dt className="sr-only">Garantia</dt>
              <dd className="font-display text-2xl font-bold md:text-3xl">25 anos</dd>
              <dd className="text-xs font-medium text-muted-foreground">de garantia de geração</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <img
            src={heroSolar}
            alt="Casa moderna com painéis solares instalados no telhado sob luz do sol"
            width={1280}
            height={768}
            className="w-full rounded-3xl border object-cover shadow-2xl"
          />
          <div className="absolute -bottom-5 left-5 rounded-2xl border bg-card px-5 py-4 shadow-xl">
            <p className="text-xs font-medium text-muted-foreground">Economia média dos nossos clientes</p>
            <p className="font-display text-2xl font-bold text-primary">R$ 890/mês</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Beneficios() {
  const itens = [
    {
      icon: PiggyBank,
      titulo: "Economia imediata",
      texto:
        "Reduza a fatura de energia em até 95% já no primeiro mês e proteja-se dos aumentos tarifários ano após ano.",
    },
    {
      icon: TrendingUp,
      titulo: "Imóvel valorizado",
      texto:
        "Imóveis com energia solar valem até 8% a mais no mercado e vendem mais rápido, segundo pesquisas do setor.",
    },
    {
      icon: Leaf,
      titulo: "Energia 100% limpa",
      texto:
        "Cada sistema residencial evita o equivalente a dezenas de árvores plantadas por ano em emissões de CO₂.",
    },
    {
      icon: ClipboardCheck,
      titulo: "Zero burocracia",
      texto:
        "Cuidamos de todo o projeto, homologação junto à distribuidora e documentação. Você não precisa se preocupar.",
    },
  ];

  return (
    <section id="beneficios" className="border-y bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Por que energia solar</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
          Benefícios que aparecem na fatura e no seu bolso
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map((item) => (
            <div key={item.titulo} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
              <span className="grid size-11 place-items-center rounded-xl bg-sun/20 text-primary">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const passos = [
    {
      icon: LineChart,
      titulo: "Análise da sua conta",
      texto: "Estudamos seu consumo e a irradiação solar da sua região para dimensionar o sistema ideal.",
    },
    {
      icon: DraftingCompass,
      titulo: "Projeto personalizado",
      texto: "Você recebe uma proposta com economia projetada, investimento e prazo de retorno em até 24h.",
    },
    {
      icon: Wrench,
      titulo: "Instalação certificada",
      texto: "Equipe própria credenciada instala em 1 a 2 dias, com equipamentos de primeira linha e nota fiscal.",
    },
    {
      icon: Sun,
      titulo: "Economia ativa",
      texto: "Homologamos junto à distribuidora e você acompanha a geração em tempo real pelo aplicativo.",
    },
  ];

  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid items-start gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div className="md:sticky md:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Como funciona</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Do orçamento à economia em 4 passos simples
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Processo transparente do início ao fim. Você acompanha cada etapa e só começa a pagar quando o sistema
            estiver gerando.
          </p>
          <img
            src={instalacao}
            alt="Técnicos instalando painéis solares em um telhado residencial"
            width={1280}
            height={768}
            loading="lazy"
            className="mt-8 w-full rounded-2xl border object-cover shadow-lg"
          />
        </div>
        <ol className="space-y-4">
          {passos.map((passo, i) => (
            <li key={passo.titulo} className="flex gap-5 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center gap-2">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <passo.icon className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{passo.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{passo.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Calculadora() {
  const [conta, setConta] = useState(600);

  const resultado = useMemo(() => {
    const economiaMes = conta * 0.9;
    const investimento = Math.max(conta * 28, 12000);
    const retornoAnos = investimento / (economiaMes * 12);
    const economia25 = economiaMes * 12 * 25;
    return { economiaMes, retornoAnos, economia25 };
  }, [conta]);

  return (
    <section id="calculadora" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sun">Calculadora solar</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Descubra quanto você pode economizar
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/75">
            Arraste o controle até o valor médio da sua conta de luz e veja uma estimativa instantânea de economia
            e retorno do investimento.
          </p>
        </div>
        <div className="rounded-3xl bg-background p-7 text-foreground shadow-2xl">
          <label htmlFor="conta" className="text-sm font-semibold">
            Valor médio da conta de luz
          </label>
          <p className="mt-1 font-display text-4xl font-bold text-primary">{BRL.format(conta)}<span className="text-base font-medium text-muted-foreground">/mês</span></p>
          <input
            id="conta"
            type="range"
            min={200}
            max={5000}
            step={50}
            value={conta}
            onChange={(e) => setConta(Number(e.target.value))}
            className="mt-5 w-full accent-[oklch(0.78_0.15_85)]"
          />
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-secondary p-4">
              <p className="font-display text-lg font-bold text-primary md:text-xl">{BRL.format(resultado.economiaMes)}</p>
              <p className="text-[11px] font-medium text-muted-foreground">economia/mês</p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="font-display text-lg font-bold text-primary md:text-xl">
                {resultado.retornoAnos.toFixed(1).replace(".", ",")} anos
              </p>
              <p className="text-[11px] font-medium text-muted-foreground">retorno</p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="font-display text-lg font-bold text-primary md:text-xl">{BRL.format(resultado.economia25)}</p>
              <p className="text-[11px] font-medium text-muted-foreground">em 25 anos</p>
            </div>
          </div>
          <a
            href="#contato"
            className="mt-6 block rounded-xl bg-sun py-3.5 text-center text-sm font-bold text-sun-foreground transition hover:opacity-90"
          >
            Receber proposta exata e gratuita
          </a>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Estimativa aproximada. A proposta considera telhado, região e tarifa da sua distribuidora.
          </p>
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const depoimentos = [
    {
      nome: "Carla Mendes",
      local: "Residência · Goiânia, GO",
      texto:
        "Minha conta caiu de R$ 780 para R$ 62. A instalação foi rápida e a equipe explicou tudo com muita clareza.",
    },
    {
      nome: "Eduardo Tavares",
      local: "Padaria · Belo Horizonte, MG",
      texto:
        "No comércio a energia pesava no custo fixo. Hoje economizo mais de R$ 3 mil por mês e o sistema já se pagou.",
    },
    {
      nome: "Família Rocha",
      local: "Residência · Curitiba, PR",
      texto:
        "Fizeram todo o processo com a distribuidora. Só acompanhei pelo app a geração crescendo. Recomendo de olhos fechados.",
    },
  ];

  return (
    <section id="depoimentos" className="border-b bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Quem já fez a troca</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
          Clientes que trocaram a fatura pela luz do sol
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.nome} className="rounded-2xl border bg-card p-6 shadow-sm">
              <blockquote className="text-sm leading-relaxed text-foreground/90">“{d.texto}”</blockquote>
              <figcaption className="mt-5 border-t pt-4">
                <p className="font-semibold">{d.nome}</p>
                <p className="text-xs text-muted-foreground">{d.local}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contato() {
  const [enviado, setEnviado] = useState(false);

  return (
    <section id="contato" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Fale com a SolViva</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Peça sua proposta gratuita
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Em até 24h úteis um especialista envia um estudo completo com dimensionamento, economia projetada e
            condições de pagamento — sem compromisso.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-primary" /> (62) 3555-0142
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-primary" /> contato@solviva.com.br
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-primary" /> Atendimento em todo o Brasil
            </li>
          </ul>
        </div>

        {enviado ? (
          <div className="flex flex-col items-center rounded-3xl border bg-card p-10 text-center shadow-sm">
            <CheckCircle2 className="size-12 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Pedido recebido!</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Obrigado pelo interesse. Um especialista SolViva entrará em contato em até 24h úteis com sua proposta
              personalizada.
            </p>
          </div>
        ) : (
          <form
            className="space-y-4 rounded-3xl border bg-card p-7 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setEnviado(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="text-xs font-semibold">Nome</label>
                <input
                  id="nome"
                  required
                  placeholder="Seu nome"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="text-xs font-semibold">Telefone / WhatsApp</label>
                <input
                  id="telefone"
                  required
                  placeholder="(00) 90000-0000"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-semibold">E-mail</label>
              <input
                id="email"
                type="email"
                required
                placeholder="voce@email.com"
                className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tipo" className="text-xs font-semibold">Tipo de imóvel</label>
                <select
                  id="tipo"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                >
                  <option>Residencial</option>
                  <option>Comercial</option>
                  <option>Industrial</option>
                  <option>Rural</option>
                </select>
              </div>
              <div>
                <label htmlFor="valor" className="text-xs font-semibold">Conta de luz média (R$)</label>
                <input
                  id="valor"
                  placeholder="Ex.: 600"
                  className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              Enviar pedido de orçamento
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              Sem spam e sem compromisso. Seus dados são usados apenas para elaborar a proposta.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-center md:flex-row md:text-left">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-sun text-sun-foreground">
            <Sun className="size-4" />
          </span>
          <span className="font-display font-bold">SolViva Energia Solar</span>
        </Link>
        <p className="text-xs text-primary-foreground/60">
          © 2026 SolViva Energia Solar · Energia limpa que se paga.
        </p>
      </div>
    </footer>
  );
}
