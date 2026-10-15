import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  FileText,
  Gauge,
  Gem,
  Layers,
  LockKeyhole,
  MousePointer2,
  RefreshCcw,
  Scale,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Timer,
  UploadCloud,
  Users,
  Wallet,
  WandSparkles,
} from "lucide-react";
import { DitheredLogo } from "@/components/ui/dithered-logo";
import CardNav from "@/components/CardNav";
import { CursorImageTrail } from "@/components/ui/skiper18";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import "@/components/ui/SpotlightCard.css";
import { BlurText } from "@/components/ui/BlurText";



type RouteId = "home" | "showcase" | "how" | "team" | "docs" | "faq" | "app";

const brand = {
  name: "SollinFT",
  tagline: "Fair Solana mint rooms for culture-led NFT launches.",
};


const routes: Array<{ id: RouteId; label: string; path: string }> = [
  { id: "home", label: "Home", path: "/" },
  { id: "showcase", label: "Showcase", path: "/showcase" },
  { id: "how", label: "How It Works", path: "/how-it-works" },
  { id: "team", label: "Team", path: "/team" },
  { id: "docs", label: "Docs", path: "/docs" },
  { id: "faq", label: "FAQ", path: "/faq" },
  { id: "app", label: "Launch App", path: "/app" },
];


const showcases = [
  {
    title: "Aether Index",
    label: "Generative archive",
    img: "/nft-aether.png",
    tone: "Mint window locked",
    supply: "4,444",
    copy: "A disclosure-first drop with collection notes, royalty terms, and trait math visible before mint.",
  },
  {
    title: "Oracle Grove",
    label: "Lore collection",
    img: "/nft-oracle.png",
    tone: "Creator reviewed",
    supply: "2,100",
    copy: "A slower launch cadence with staged reveals and collector limits designed around access, not speed.",
  },
  {
    title: "Archive Zero",
    label: "Membership pass",
    img: "/nft-archive.png",
    tone: "Manual appeal open",
    supply: "777",
    copy: "Eligibility preview shows reason codes, confidence ranges, and a human review path for edge cases.",
  },
  {
    title: "Civic Sigil",
    label: "Public goods mint",
    img: "/nft-civic.png",
    tone: "Queue protected",
    supply: "1,250",
    copy: "The mint queue uses wallet caps, cooldowns, and price windows that cannot be silently changed mid-launch.",
  },
];

const teamSeats = [
  {
    name: "Riya Sen",
    role: "Launch Strategy",
    focus: "Creator onboarding, launch sequencing, collector communications",
    initials: "RS",
    image: "/team-riya.png",
  },
  {
    name: "Malik Stone",
    role: "Protocol Design",
    focus: "Mint mechanics, queue policy, wallet caps, incident playbooks",
    initials: "MS",
    image: "/team-malik.png",
  },
  {
    name: "Ava Reed",
    role: "Interface Systems",
    focus: "Motion language, accessibility, launch portal ergonomics",
    initials: "AR",
    image: "/team-ava.png",
  },
  {
    name: "Noor Patel",
    role: "Risk Review",
    focus: "Fairness notes, appeal flows, audit trails, public criteria",
    initials: "NP",
    image: "/team-noor.png",
  },
];

const docs = [
  "Launch checklist",
  "Eligibility preview policy",
  "Mint queue controls",
  "Royalty and metadata notes",
  "Incident response",
  "Creator disclosure template",
];

const greetings = ["Hello", "Guten tag", "Hola", "Bonjour", "Namaste", "Salaam", "Ciao", "Konnichiwa"];

const posterSlides = [
  { word: "SOLLINFT", accent: "#ffffff", image: "/nft-aether.png" },
  { word: "FAIR", accent: "#ff2d38", image: "/nft-oracle.png" },
  { word: "MINTS", accent: "#c9ff39", image: "/nft-archive.png" },
  { word: "VISIBLE", accent: "#53e3ff", image: "/nft-civic.png" },
];

const heroTrailItems = [
  <img key="1" src="/cursor-arrow.png" alt="" className="h-full w-full object-contain filter drop-shadow-[0_20px_45px_rgba(255,45,56,0.4)] pointer-events-none select-none" />,
  <img key="2" src="/cursor-shard.png" alt="" className="h-full w-full object-contain filter drop-shadow-[0_20px_45px_rgba(83,227,255,0.4)] pointer-events-none select-none" />,
  <img key="3" src="/cursor-cube.png" alt="" className="h-full w-full object-contain filter drop-shadow-[0_20px_45px_rgba(201,255,57,0.4)] pointer-events-none select-none" />,
  <img key="4" src="/cursor-coin.png" alt="" className="h-full w-full object-contain filter drop-shadow-[0_20px_45px_rgba(255,123,213,0.4)] pointer-events-none select-none" />,
];



function pathFor(route: RouteId) {
  return routes.find((item) => item.id === route)?.path ?? "/";
}

function routeFromPath(pathname: string): RouteId {
  return routes.find((item) => item.path === pathname)?.id ?? "home";
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [route, setRoute] = useState<RouteId>(() => routeFromPath(window.location.pathname));
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onPopState = () => setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (next: RouteId) => {
    const path = pathFor(next);
    window.history.pushState({}, "", path);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--auralis-paper)] text-[var(--auralis-ink)]">
      <InitialPreloader />
      <Navbar route={route} onNavigate={navigate} />
      <AnimatePresence mode="wait">
        <motion.main
          key={route}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className={route !== "home" ? "pt-28 md:pt-32" : ""}
        >
          {route === "home" && <HomePage onNavigate={navigate} />}
          {route === "showcase" && <ShowcasePage onNavigate={navigate} />}
          {route === "how" && <HowItWorksPage onNavigate={navigate} />}
          {route === "team" && <TeamPage onNavigate={navigate} />}
          {route === "docs" && <DocsPage onNavigate={navigate} />}
          {route === "faq" && <FaqPage onNavigate={navigate} />}
          {route === "app" && <LaunchPortal />}
        </motion.main>
      </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function Navbar({
  route,
  onNavigate,
}: {
  route: RouteId;
  onNavigate: (route: RouteId) => void;
}) {
  const navItems = [
    {
      label: route === "home" ? "SollinFT" : "Explore",
      bgColor: "#ff2d38",
      textColor: "#ffffff",
      links: [
        { label: "Home", href: "/", ariaLabel: "Go to home", onClick: navClick("home", onNavigate) },
        { label: "Showcase", href: "/showcase", ariaLabel: "Open showcase", onClick: navClick("showcase", onNavigate) },
      ],
    },
    {
      label: "Build",
      bgColor: "#d7fff0",
      textColor: "#101010",
      links: [
        { label: "How it works", href: "/how-it-works", ariaLabel: "Open how it works", onClick: navClick("how", onNavigate) },
        { label: "Team", href: "/team", ariaLabel: "Open team page", onClick: navClick("team", onNavigate) },
      ],
    },
    {
      label: "Launch",
      bgColor: "#c9ff39",
      textColor: "#101010",
      links: [
        { label: "Docs", href: "/docs", ariaLabel: "Open docs", onClick: navClick("docs", onNavigate) },
        { label: "FAQ", href: "/faq", ariaLabel: "Open FAQ", onClick: navClick("faq", onNavigate) },
        { label: "Launch app", href: "/app", ariaLabel: "Open launch app", onClick: navClick("app", onNavigate) },
      ],
    },
  ];


  return (
    <header className="auralis-card-nav fixed inset-x-0 top-0 z-50 h-24">
      <CardNav
        logo="/auralis-logo.png"
        logoAlt="SollinFT"
        items={navItems}
        baseColor="#111111"
        menuColor="#ffffff"
        buttonBgColor="#ff2d38"
        buttonTextColor="#ffffff"
        ctaLabel="Launch App"
        onCtaClick={() => onNavigate("app")}
      />
    </header>
  );
}

function navClick(route: RouteId, onNavigate: (route: RouteId) => void) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(route);
  };
}

function HomePage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <ProjectOverview onNavigate={onNavigate} />
      <ShowcaseSection onNavigate={onNavigate} />
      <EndingSection onNavigate={onNavigate} />
    </>
  );
}

function InitialPreloader() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setIndex((i) => {
        if (i >= greetings.length - 1) {
          window.clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return i;
        }
        return i + 1;
      });
    }, 600);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white"
        >
          <motion.div
            key={greetings[index]}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="font-display text-6xl font-black text-white md:text-8xl"
          >
            {greetings[index]}
          </motion.div>

          <div className="absolute bottom-12 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--auralis-red)] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">Entering SollinFT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function IntroPoster() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion) return;
    const next = Math.min(posterSlides.length - 1, Math.floor(latest * posterSlides.length));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section ref={ref} className="-mt-28 md:-mt-32 relative h-[360vh] bg-black text-white pt-28 md:pt-32">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4">
        <div className="absolute left-1/2 top-24 z-20 flex -translate-x-1/2 items-center gap-3 overflow-x-auto p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/12">
          {posterSlides.map((item, index) => (
            <motion.button
              type="button"
              key={`${item.word}-${index}`}
              onPointerDown={() => setActive(index)}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className={cx(
                "h-14 w-14 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-2.5 transition-all focus-ring",
                active === index && "border-[var(--auralis-red)] bg-white/16 shadow-[0_0_20px_rgba(255,45,56,0.4)] scale-110"
              )}
              aria-label={`Show ${item.word}`}
            >
              <img src={item.image} alt="" className="h-full w-full object-contain filter drop-shadow-md" />
            </motion.button>
          ))}
        </div>

        <div className="mx-auto w-full max-w-[1500px]">


          <AnimatePresence mode="wait">
            <motion.h2
              key={posterSlides[active].word}
              initial={{ opacity: 0, y: 120, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -120, scale: 1.04 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="poster-word text-center uppercase drop-shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
              style={{ color: posterSlides[active].accent }}
            >
              {posterSlides[active].word}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--auralis-paper)] pointer-events-none" />
      </div>
    </section>
  );
}

function Hero({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], prefersReducedMotion ? [1, 1] : [1, 0.25]);

  return (
    <CursorImageTrail
      items={heroTrailItems}
      itemSize={160}
      spawnDistance={45}
      trailLength={8}
      rotationRange={20}
      className="relative isolate min-h-[94dvh] border-b border-black/10 px-4 pt-28"
    >
      <div className="absolute inset-0 hero-grid opacity-70" />
      <div className="absolute inset-x-0 top-24 flex justify-center">
        <div className="flex flex-col items-center gap-4 text-center text-[11px] font-bold uppercase leading-tight tracking-[0.14em] text-black/38">
          <MousePointer2 className="h-5 w-5" />
          <span>Move your mouse across the hero to reveal floating artifacts</span>
          <span className="h-16 w-px bg-black/20" />
        </div>
      </div>

      <motion.div
        ref={heroRef}
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        className="relative z-20 mx-auto grid w-full max-w-7xl items-center pb-16 pt-24"
      >
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full border border-black/15 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--auralis-red)] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/80">
              SollinFT Mint Protocol
            </span>
          </motion.div>

          <BlurText
            as="h1"
            text="Mints that feel discovered, not dropped."
            delay={55}
            className="font-display text-6xl font-black tracking-tight hero-text-shine md:text-8xl lg:text-[6.2rem] leading-[0.98]"
          />

          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-black/62 md:text-xl">
            A fair launch room for Solana NFT collections, with visible rules, collector-first queueing,
            and a portal that explains each decision before anyone connects a wallet.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton onClick={() => onNavigate("app")}>
              Launch Portal
              <ArrowUpRight className="h-4 w-4" />
            </PrimaryButton>
            <SecondaryButton onClick={() => onNavigate("showcase")}>
              View Showcase
              <Gem className="h-4 w-4" />
            </SecondaryButton>
          </div>
        </div>

        <div className="mt-20 grid gap-3 md:grid-cols-3">
          <Metric label="Queue fairness" value="wallet caps" icon={<ShieldCheck className="h-5 w-5" />} />
          <Metric label="Creator review" value="public criteria" icon={<SearchCheck className="h-5 w-5" />} />
          <Metric label="Mint state" value="clear windows" icon={<Timer className="h-5 w-5" />} />
        </div>
      </motion.div>
    </CursorImageTrail>
  );
}



function ProjectOverview({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const steps = [
    ["Apply", "Creators submit scope, supply, links, rights, and collection disclosures."],
    ["Review", "The portal returns reason-coded checks and flags anything that needs manual review."],
    ["Configure", "Teams set wallet caps, pricing windows, reveal timing, and public mint terms."],
    ["Open", "Collectors enter a queue that values eligibility and timing rules over raw speed."],
  ];

  return (
    <section className="border-b border-black/10 px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[28px] border border-black/10 bg-white/72 p-5 shadow-[0_22px_80px_rgba(15,19,23,0.08)] sm:p-7">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="section-kicker">How our project works</p>
              <h2 className="mt-2 font-display text-4xl font-black tracking-normal md:text-5xl">A launch flow people can read.</h2>
            </div>
            <div className="hidden rounded-2xl bg-[var(--auralis-lime)] p-4 text-black sm:block">
              <Layers className="h-7 w-7" />
            </div>
          </div>

          <div className="space-y-3">
            {steps.map(([title, copy], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-black/10 bg-[var(--auralis-paper)] p-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black font-mono text-sm font-black text-white">
                  0{index + 1}
                </span>
                <span>
                  <span className="block font-display text-xl font-black">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-black/60">{copy}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-black p-5 text-white shadow-[0_22px_80px_rgba(15,19,23,0.16)] sm:p-7">
          <div className="absolute inset-0 opacity-45 brand-mesh" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_280px]">
            <div>
              <p className="section-kicker text-white/54">What the project is</p>
              <h2 className="mt-2 max-w-xl font-display text-4xl font-black tracking-normal md:text-6xl">
                A mint room with receipts, not vibes.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                {brand.name} is a front-end system for NFT launches where policy is visible: pricing, wallet
                limits, review status, eligibility reasons, and creator docs sit in the same experience as the mint.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["No opaque scores", "Manual appeal path", "Reduced motion ready", "Docs before mint"].map((item) => (
                  <span key={item} className="rounded-full border border-white/16 bg-white/8 px-4 py-2 text-sm font-bold text-white/82">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-9">
                <SecondaryDarkButton onClick={() => onNavigate("how")}>
                  Read the flow
                  <ChevronRight className="h-4 w-4" />
                </SecondaryDarkButton>
              </div>
            </div>
            <div className="relative min-h-[260px] rounded-[24px] border border-white/12 bg-white/[0.06] p-5">
              <DitheredLogo
                imageSrc="/auralis-logo.png"
                className="absolute inset-0 h-full w-full"
                gridSize={220}
                dotScale={0.92}
                particleColor="#ffffff"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/14 bg-black/72 p-4 backdrop-blur">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/46">Brand mark</p>
                <p className="mt-1 font-display text-2xl font-black">Dithered live signal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <section className="border-b border-black/10 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Some showcases</p>
            <h2 className="mt-2 max-w-3xl font-display text-4xl font-black tracking-normal md:text-6xl">
              Drops with art up front and terms close by.
            </h2>
          </div>
          <SecondaryButton onClick={() => onNavigate("showcase")}>
            Open Gallery
            <ArrowUpRight className="h-4 w-4" />
          </SecondaryButton>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {showcases.map((item, index) => (
            <ShowcaseCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GlassGlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
}) {
  return (
    <SpotlightCard
      className={cx(
        "group relative rounded-[28px] p-[1.5px] transition-all duration-300",
        "border border-black/12 bg-gradient-to-b from-black/15 via-black/5 to-black/15 hover:from-[var(--auralis-red)] hover:to-[var(--auralis-lime)]",
        "shadow-[0_14px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_65px_rgba(255,45,56,0.14)]",
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-white">
        {children}
      </div>
    </SpotlightCard>
  );
}

function ShowcaseCard({
  item,
  index,
}: {
  item: (typeof showcases)[number];
  index: number;
}) {
  return (
    <GlassGlowCard className="h-full">
      <motion.article
        initial={{ y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -6 }}
        className="group min-h-[420px] overflow-hidden rounded-[26px] bg-white"
      >

        <div className="relative flex aspect-square items-center justify-center overflow-hidden border-b border-black/10 bg-[var(--auralis-paper)]">
          <div className="absolute inset-0 dot-field opacity-60" />
          <img
            src={item.img}
            alt=""
            className="relative h-[72%] w-[72%] transition duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/38">{item.label}</p>
              <h3 className="mt-1 font-display text-2xl font-black">{item.title}</h3>
            </div>
            <span className="rounded-full border border-black/10 bg-[var(--auralis-mint)] px-3 py-1 text-xs font-black">
              {item.supply}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-black/62">{item.copy}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-xs font-bold text-white">
            <BadgeCheck className="h-4 w-4 text-[var(--auralis-lime)]" />
            {item.tone}
          </div>
        </div>
      </motion.article>
    </GlassGlowCard>
  );
}


function EndingSection({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 final-grid opacity-70" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.88fr]">
          <div>
            <p className="section-kicker">Docs, about, launch readiness</p>
            <h2 className="mt-2 max-w-4xl font-display text-5xl font-black tracking-normal md:text-7xl">
              The ending is the control room.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/64">
              No decorative filler. The last section gives collectors the launch status, tells teams what is still loading,
              and routes everyone to docs before the mint button becomes the loudest thing on the page.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={() => onNavigate("docs")}>
                Open Docs
                <FileText className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton onClick={() => onNavigate("app")}>
                Enter Launch App
                <Wallet className="h-4 w-4" />
              </SecondaryButton>
            </div>
          </div>

          <div className="rounded-[30px] border border-black/10 bg-black p-4 text-white shadow-[0_28px_90px_rgba(15,19,23,0.17)]">
            <div className="rounded-[24px] border border-white/12 bg-white/[0.05] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/42">Launch readiness</p>
                  <h3 className="mt-1 font-display text-3xl font-black">Portal status</h3>
                </div>
                <CircleDashed className="h-6 w-6 animate-spin-slow text-[var(--auralis-lime)]" />
              </div>
              <div className="mt-6 grid gap-3">
                <StatusRow label="Docs loaded" value="6 pages" done />
                <StatusRow label="Collection terms" value="required" done />
                <StatusRow label="Wallet policy" value="reviewing" />
                <StatusRow label="Final mint state" value="demo mode" />
              </div>
              <div className="mt-6 rounded-2xl border border-white/12 bg-black/40 p-4">
                <p className="text-sm leading-6 text-white/66">
                  This interface labels demo data clearly. Production launches should connect a real audit log,
                  a signed creator disclosure, and a visible appeal contact before eligibility controls go live.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <InfoPanel title="About us" icon={<Users className="h-5 w-5" />}>
            A small studio-shaped launch system for artists, protocol teams, and collectors who want readable rules
            instead of mystery mechanics.
          </InfoPanel>
          <InfoPanel title="Docs page" icon={<FileText className="h-5 w-5" />}>
            Policies, launch checklists, appeal language, and mint state definitions are written as product surfaces,
            not hidden legal leftovers.
          </InfoPanel>
          <InfoPanel title="Loading states" icon={<RefreshCcw className="h-5 w-5" />}>
            Every async step has a visible pending, ready, or review state so people know whether they are waiting
            on data, a wallet, or the team.
          </InfoPanel>
        </div>
      </div>
    </section>
  );
}

function CollectionModal({
  item,
  onClose,
  onNavigate,
}: {
  item: (typeof showcases)[number];
  onClose: () => void;
  onNavigate: (route: RouteId) => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 font-bold text-black hover:bg-black/10"
        >
          ✕
        </button>

        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          <div className="flex items-center justify-center rounded-2xl border border-black/10 bg-[var(--auralis-paper)] p-4">
            <img src={item.img} alt="" className="h-44 w-44 object-contain filter drop-shadow-lg" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--auralis-red)]">
              {item.label}
            </span>
            <h2 className="mt-1 font-display text-4xl font-black">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-black/65">{item.copy}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-black/10 bg-[var(--auralis-paper)] p-3">
                <span className="text-xs font-bold text-black/40">Total Supply</span>
                <p className="font-display text-xl font-black">{item.supply} NFTs</p>
              </div>
              <div className="rounded-xl border border-black/10 bg-[var(--auralis-paper)] p-3">
                <span className="text-xs font-bold text-black/40">Mint Price</span>
                <p className="font-display text-xl font-black">1.25 SOL</p>
              </div>
              <div className="rounded-xl border border-black/10 bg-[var(--auralis-paper)] p-3">
                <span className="text-xs font-bold text-black/40">Program Standard</span>
                <p className="font-display text-sm font-black text-emerald-600">Metaplex Core</p>
              </div>
              <div className="rounded-xl border border-black/10 bg-[var(--auralis-paper)] p-3">
                <span className="text-xs font-bold text-black/40">Royalties</span>
                <p className="font-display text-sm font-black">5.0% (Enforced)</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <SecondaryButton onClick={onClose}>Close</SecondaryButton>
              <PrimaryButton onClick={() => { onClose(); onNavigate("app"); }}>
                Launch in Portal
                <ArrowUpRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ShowcasePage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [selectedItem, setSelectedItem] = useState<(typeof showcases)[number] | null>(null);

  return (
    <PageShell
      eyebrow="Showcase"
      title="Collections presented like launches, not thumbnails."
      copy="Each card pairs the artwork with the launch rule that matters most. Click any collection to inspect launch details and trait terms."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {showcases.map((item, index) => (
          <div key={item.title} onClick={() => setSelectedItem(item)} className="cursor-pointer">
            <ShowcaseCard item={item} index={index} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <CollectionModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>

      <div className="mt-10 rounded-[30px] border border-black/10 bg-black p-6 text-white">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker text-white/48">Gallery rules</p>
            <h2 className="mt-2 font-display text-4xl font-black">Every showcase must earn the badge.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Supply visible", "Creator links verified", "Price windows locked", "Appeal route available"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 font-bold">
                <CheckCircle2 className="mb-4 h-5 w-5 text-[var(--auralis-lime)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <PrimaryButton onClick={() => onNavigate("app")}>
          Configure a Launch
          <ArrowUpRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </PageShell>
  );
}


function RentCalculator() {
  const [supply, setSupply] = useState(2500);
  const solPriceUSD = 195;

  const legacyRentSOL = supply * 0.0284;
  const coreRentSOL = supply * 0.0029;
  const solSaved = legacyRentSOL - coreRentSOL;
  const usdSaved = solSaved * solPriceUSD;

  return (
    <div className="mt-10 rounded-[30px] border border-black/10 bg-black p-6 text-white shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--auralis-lime)]">
            Economics Calculator
          </span>
          <h3 className="mt-2 font-display text-4xl font-black">
            Solana Rent Savings on Metaplex Core
          </h3>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Legacy Token Metadata requires 4 separate accounts per NFT. Auralis compresses all asset state into a single account, reducing collection storage cost by 90%.
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Collection Supply Size</span>
              <span className="font-mono text-base text-[var(--auralis-lime)]">{supply.toLocaleString()} NFTs</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={supply}
              onChange={(e) => setSupply(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--auralis-lime)] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.06] p-5">
          <div className="grid gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Legacy Token Metadata Rent:</span>
              <span className="font-mono font-bold text-red-400">{legacyRentSOL.toFixed(2)} SOL</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Auralis Metaplex Core Rent:</span>
              <span className="font-mono font-bold text-[var(--auralis-lime)]">{coreRentSOL.toFixed(2)} SOL</span>
            </div>
            <div className="my-2 border-t border-white/10" />
            <div className="flex justify-between text-base font-black">
              <span>Total Capital Saved:</span>
              <span className="font-mono text-[var(--auralis-lime)]">{solSaved.toFixed(2)} SOL</span>
            </div>
            <p className="text-right font-mono text-xs text-white/50">
              ≈ ${usdSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD (at ${solPriceUSD}/SOL)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const rows = [
    ["Creator intake", "Collects links, rights, supply, royalty settings, mint windows, and team contact.", "Upload"],
    ["Transparent review", "Flags missing docs, risky terms, or unclear mechanics with reason codes and confidence labels.", "Review"],
    ["Queue setup", "Locks wallet caps, cooldowns, allowlist logic, and price windows before public launch.", "Policy"],
    ["Collector portal", "Shows status, docs, appeal language, and mint readiness without forcing blind wallet approval.", "Mint"],
  ];

  return (
    <PageShell
      eyebrow="How our site works"
      title="A four-stage launch system with fairness checks built in."
      copy="The flow is intentionally boring where trust matters: clear states, visible criteria, and no hidden eligibility decisions."
    >
      <div className="grid gap-4">
        {rows.map(([title, copy, tag], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="grid gap-4 rounded-[26px] border border-black/10 bg-white p-5 transition-shadow hover:shadow-lg md:grid-cols-[120px_1fr_160px] md:items-center"
          >
            <span className="font-mono text-sm font-black text-black/42">0{index + 1}</span>
            <span>
              <span className="block font-display text-2xl font-black">{title}</span>
              <span className="mt-1 block text-sm leading-6 text-black/62">{copy}</span>
            </span>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-bold text-white">
              {tag}
              <ChevronRight className="h-4 w-4" />
            </span>
          </motion.div>
        ))}
      </div>

      <RentCalculator />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <InfoPanel title="No silent denial" icon={<Scale className="h-5 w-5" />}>
          Eligibility is shown as a preview with reason codes. Edge cases route to manual review instead of disappearing.
        </InfoPanel>
        <InfoPanel title="No speed-only wins" icon={<Timer className="h-5 w-5" />}>
          Queue controls use wallet caps, cooldowns, and mint windows so faster clicks do not become the whole game.
        </InfoPanel>
        <InfoPanel title="No vague trust labels" icon={<ShieldCheck className="h-5 w-5" />}>
          Badges describe what was checked. They do not claim certainty, personhood, or broad safety without criteria.
        </InfoPanel>
      </div>

      <div className="mt-8 flex justify-end">
        <PrimaryButton onClick={() => onNavigate("docs")}>
          Open Policy Docs
          <FileText className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </PageShell>
  );
}


function TeamPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <>
      <IntroPoster />
      <section className="px-4 pb-16 pt-20">

        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="section-kicker">Team</p>
            <h1 className="mt-3 font-display text-5xl font-black tracking-normal md:text-7xl">
              The team page is a living roster system.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/64">
              The top stage follows your motion reference: static on touch, shifting on scroll,
              thumbnail rail up top, and one loud red active marker.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {teamSeats.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>

          <div className="mt-10 rounded-[30px] border border-black/10 bg-[var(--auralis-mint)] p-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="section-kicker">Operating promise</p>
                <h2 className="mt-2 font-display text-4xl font-black">Humans stay in the loop where labels can hurt people.</h2>
              </div>
              <p className="text-lg leading-8 text-black/64">
                Any automated launch review is framed as a preview, with reasons and appeals. The interface avoids
                protected-trait targeting, vague trust scoring, and claims that a wallet score equals a person.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <PrimaryButton onClick={() => onNavigate("app")}>
              Open Team Portal
              <ArrowUpRight className="h-4 w-4" />
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}

function TeamCard({

  member,
  index,
}: {
  member: (typeof teamSeats)[number];
  index: number;
}) {
  return (
    <GlassGlowCard className="h-full">
      <motion.article
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -6 }}
        className="relative min-h-[360px] overflow-hidden rounded-[26px] bg-white p-5"
      >
        <div className="absolute inset-0 team-card-sheen opacity-0 transition duration-500 hover:opacity-100" />
        <div className="relative">
          <div className="h-40 overflow-hidden rounded-[24px] border border-black/10 bg-black">
            <img src={member.image} alt="" className="h-full w-full object-cover object-top" />
          </div>
          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-black/38">{member.role}</p>
            <h3 className="mt-1 font-display text-3xl font-black">{member.name}</h3>
            <p className="mt-4 text-sm leading-6 text-black/62">{member.focus}</p>
          </div>
          <div className="mt-8 flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-bold text-white">
            <Users className="h-4 w-4 text-[var(--auralis-cyan)]" />
            Core seat
          </div>
        </div>
      </motion.article>
    </GlassGlowCard>

  );
}

function DocsPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  };

  return (
    <PageShell
      eyebrow="Docs"
      title="Docs that feel part of the product."
      copy="Collectors should not need a private chat to understand the launch. The docs page surfaces launch language, criteria, and current loading state."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[30px] border border-black/10 bg-black p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/44">Docs loader</p>
              <h2 className="mt-1 font-display text-3xl font-black">Knowledge state</h2>
            </div>
            <button type="button" onClick={refresh} className="rounded-full bg-white/10 p-3 focus-ring" aria-label="Refresh docs">
              <RefreshCcw className={cx("h-4 w-4", loading && "animate-spin")} />
            </button>
          </div>
          <div className="mt-7 grid gap-3">
            {docs.map((doc, index) => (
              <div key={doc} className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold">{doc}</span>
                  {loading && index > 2 ? (
                    <CircleDashed className="h-4 w-4 animate-spin text-white/50" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-[var(--auralis-lime)]" />
                  )}
                </div>
                {loading && index > 2 && <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><span className="loading-bar block h-full rounded-full bg-[var(--auralis-lime)]" /></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <InfoPanel title="Eligibility language" icon={<Scale className="h-5 w-5" />}>
            Scores are not identity labels. They must show confidence, reasons, and a path to appeal when automated checks are uncertain.
          </InfoPanel>
          <InfoPanel title="Creator disclosures" icon={<UploadCloud className="h-5 w-5" />}>
            Collection terms should include supply, mint windows, royalty settings, metadata timing, external links, and owner contact.
          </InfoPanel>
          <InfoPanel title="Collector safety" icon={<LockKeyhole className="h-5 w-5" />}>
            Wallet approval should appear after readable terms, not before. The launch app separates demo states from production states.
          </InfoPanel>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <PrimaryButton onClick={() => onNavigate("app")}>
          Continue to App
          <Wallet className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </PageShell>
  );
}

const faqData = [
  {
    category: "Solana Architecture",
    question: "How does Auralis save 90% rent fees on Solana?",
    answer: "Legacy Solana NFT programs (like SPL Token Metadata) require multiple account initializations for mint, metadata, master edition, and token record accounts, consuming over 0.028 SOL (~$5.60) per NFT in rent deposit. Auralis uses the Metaplex Core standard, which compresses all asset data into a single unified account structure, dropping rent costs down to 0.0029 SOL (~$0.55) per NFT.",
  },
  {
    category: "Collectors",
    question: "How does the Sybil Shield prevent bot snipe attacks?",
    answer: "Auralis replaces raw click-speed races with multi-layered queue protection. Wallets are evaluated in real time using transaction recency, cluster analysis, and token age. Suspicious bot clusters are flagged before mint activation, while genuine collectors receive guaranteed mint slots based on wallet caps (default 2 per wallet).",
  },
  {
    category: "Creators",
    question: "What mandatory disclosures are required before launching?",
    answer: "Creators must disclose collection supply, exact mint pricing tiers, royalty enforcement mechanisms, trait rarity math, metadata reveal timing, and team contact points. All disclosure terms are signed into the launch room contract and rendered on-chain before collectors connect their wallets.",
  },
  {
    category: "Safety & Rent",
    question: "What happens if automated scoring flags my wallet by mistake?",
    answer: "Auralis enforces a strict 'No Silent Denial' policy. If automated scoring flags an edge case (e.g. a newly generated hardware wallet), the collector is shown a human review option with specific reason codes instead of being quietly blocked. Manual appeals are processed within 15 minutes by on-duty risk team members.",
  },
  {
    category: "Solana Architecture",
    question: "What is the Virtual Bonding Curve protocol?",
    answer: "For collections utilizing automated price discovery, Auralis deploys a virtual bonding curve reserve (x · y = k). As mints progress through predetermined volume milestones, the price curves smoothly, ensuring transparent price discovery without sudden gas spikes or front-running.",
  },
  {
    category: "Creators",
    question: "Can creators change collection rules mid-launch?",
    answer: "No. Once a launch room transitions from 'Draft' to 'Locked', key parameters (wallet caps, price tiers, royalty percentages, and total supply) are immutable on-chain. Mid-launch price changes or supply inflations are mathematically impossible.",
  },
];

function FaqPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const categories = ["All", "Solana Architecture", "Collectors", "Creators", "Safety & Rent"];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageShell
      eyebrow="Frequently Asked Questions"
      title="Everything you need to know about Auralis."
      copy="Detailed answers on Metaplex Core rent economics, Sybil bot defense, virtual bonding curves, and creator disclosure requirements."
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cx(
                  "rounded-full px-4 py-2 text-xs font-bold transition focus-ring",
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-white/80 text-black/70 hover:bg-black/10 border border-black/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="sr-only" htmlFor="faq-search">Search FAQ</label>
          <input
            id="faq-search"
            type="search"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm focus-ring"
          />
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <GlassGlowCard key={faq.question}>
                <div className="p-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left focus-ring"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--auralis-red)]">
                        {faq.category}
                      </span>
                      <h3 className="mt-1 font-display text-2xl font-black text-black">
                        {faq.question}
                      </h3>
                    </div>
                    <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black font-bold text-lg">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-t border-black/10 pt-4 text-base leading-7 text-black/70">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassGlowCard>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <SecondaryButton onClick={() => onNavigate("docs")}>
            View Docs
            <FileText className="h-4 w-4" />
          </SecondaryButton>
          <PrimaryButton onClick={() => onNavigate("app")}>
            Launch App
            <ArrowUpRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>
    </PageShell>
  );
}


function LaunchPortal() {
  const [active, setActive] = useState("overview");
  const [connecting, setConnecting] = useState(false);
  const [wallet, setWallet] = useState(false);

  const connectWallet = () => {
    setConnecting(true);
    window.setTimeout(() => {
      setConnecting(false);
      setWallet(true);
    }, 950);
  };

  const tabs = [
    ["overview", "Overview", Gauge],
    ["review", "Review", ShieldCheck],
    ["studio", "AI Studio", WandSparkles],
    ["queue", "Queue", Timer],
  ] as const;

  return (
    <section className="min-h-screen px-4 pb-16 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[30px] border border-black/10 bg-black p-4 text-white lg:sticky lg:top-28">
            <div className="rounded-[24px] border border-white/12 bg-white/[0.05] p-4">
              <img src="/auralis-logo.png" alt="" className="h-12 w-12 rounded-2xl bg-white object-cover" />
              <h1 className="mt-5 font-display text-3xl font-black">Launch App</h1>
              <p className="mt-2 text-sm leading-6 text-white/58">Demo portal for creator setup, review states, and collector-safe mint controls.</p>
            </div>

            <div className="mt-4 grid gap-2">
              {tabs.map(([id, label, Icon]) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  whileTap={{ scale: 0.96 }}
                  className={cx(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition focus-ring",
                    active === id ? "bg-white text-black" : "bg-white/[0.06] text-white/70 hover:bg-white/[0.1]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </motion.button>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={connectWallet}
              whileTap={{ scale: 0.96 }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--auralis-lime)] px-4 py-3 font-black text-black focus-ring"
            >
              {connecting ? <CircleDashed className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
              {wallet ? "Demo Wallet Connected" : connecting ? "Connecting" : "Connect Demo Wallet"}
            </motion.button>
          </aside>

          <div className="grid gap-5">
            <div className="rounded-[34px] border border-black/10 bg-white p-5 shadow-[0_20px_80px_rgba(15,19,23,0.08)]">
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="section-kicker">Auralis launch room</p>
                  <h2 className="mt-2 font-display text-5xl font-black tracking-normal md:text-7xl">
                    A portal built for the part after the hype.
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-black/64">
                    Configure launch terms, preview eligibility, review AI-generated metadata language,
                    and publish docs without turning trust into a black box.
                  </p>
                </div>
                <div className="rounded-[26px] border border-black/10 bg-[var(--auralis-paper)] p-4">
                  <div className="stats stats-vertical w-full bg-transparent shadow-none">
                    <div className="stat px-0">
                      <div className="stat-title text-black/42">Mode</div>
                      <div className="stat-value font-display text-3xl text-black">Demo</div>
                      <div className="stat-desc text-black/48">Production contracts not connected</div>
                    </div>
                    <div className="stat px-0">
                      <div className="stat-title text-black/42">Mint window</div>
                      <div className="stat-value font-display text-3xl text-black">Locked</div>
                      <div className="stat-desc text-black/48">Visible before wallet approval</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {active === "overview" && <PortalOverview />}
            {active === "review" && <PortalReview />}
            {active === "studio" && <PortalStudio />}
            {active === "queue" && <PortalQueue />}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalOverview() {
  const [mintedCount, setMintedCount] = useState(1284);
  const [minting, setMinting] = useState(false);
  const [lastTx, setLastTx] = useState<string | null>(null);

  const handleSimulateMint = () => {
    setMinting(true);
    window.setTimeout(() => {
      setMintedCount((prev) => prev + 1);
      const randomHash = Array.from({ length: 16 }, () =>
        "0123456789abcdefABCDEF"[Math.floor(Math.random() * 22)]
      ).join("");
      setLastTx(`5k9F${randomHash}xR2a`);
      setMinting(false);
    }, 1100);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <PortalPanel title="Launch checklist" icon={<CheckCircle2 className="h-5 w-5" />}>
        <ul className="space-y-3 text-sm leading-6 text-black/64">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Collection terms uploaded
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Wallet cap set to 2 per wallet
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Manual review contact visible
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Metaplex Core account rent verified
          </li>
        </ul>
      </PortalPanel>

      <PortalPanel title="Mint simulator" icon={<Gauge className="h-5 w-5" />}>
        <div className="space-y-4">
          <div className="rounded-2xl bg-[var(--auralis-mint)] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-black/50">Live Supply</span>
              <span className="font-mono text-xs font-bold text-black/70">4,444 Max</span>
            </div>
            <p className="mt-1 font-display text-4xl font-black">{mintedCount.toLocaleString()} / 4,444</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{ width: `${(mintedCount / 4444) * 100}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulateMint}
            disabled={minting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 font-bold text-white transition focus-ring hover:bg-black/80 disabled:opacity-50"
          >
            {minting ? <CircleDashed className="h-4 w-4 animate-spin text-[var(--auralis-lime)]" /> : <Sparkles className="h-4 w-4 text-[var(--auralis-lime)]" />}
            {minting ? "Signing Metaplex Core Mint..." : "Simulate Demo Mint"}
          </button>

          {lastTx && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-emerald-500/30 bg-emerald-50 p-3 text-xs"
            >
              <span className="font-bold text-emerald-800">✓ Mint Confirmed on Solana</span>
              <p className="mt-1 font-mono text-[11px] text-emerald-700 truncate">
                Tx: {lastTx}
              </p>
            </motion.div>
          )}
        </div>
      </PortalPanel>

      <PortalPanel title="Collector notice" icon={<FileText className="h-5 w-5" />}>
        <div className="space-y-3 text-sm leading-6 text-black/64">
          <p>
            Wallet connection remains optional in this demo. Production requires signed disclosures before public mint activation.
          </p>
          <div className="rounded-xl border border-black/10 bg-[var(--auralis-paper)] p-3">
            <span className="font-bold text-black text-xs uppercase tracking-wider block">Single Account Spec</span>
            <span className="font-mono text-xs text-black/60">Program: MetaCore1111111111111111111111111</span>
          </div>
        </div>
      </PortalPanel>
    </div>
  );
}


function PortalReview() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <PortalPanel title="Eligibility preview" icon={<ShieldCheck className="h-5 w-5" />}>
        <div className="rounded-[24px] border border-black/10 bg-[var(--auralis-paper)] p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-black/42">Confidence range</p>
              <p className="font-display text-6xl font-black">82%</p>
            </div>
            <span className="rounded-full bg-[var(--auralis-lime)] px-4 py-2 text-sm font-black">Needs review</span>
          </div>
          <p className="mt-5 text-sm leading-6 text-black/64">
            This is a preview, not a personhood label or automatic denial. It should be checked against public criteria and appeal notes.
          </p>
        </div>
      </PortalPanel>
      <PortalPanel title="Reason codes" icon={<SearchCheck className="h-5 w-5" />}>
        <div className="space-y-3">
          {["Wallet age meets public threshold", "No protected traits used", "One signal has low confidence", "Manual appeal route available"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </PortalPanel>
    </div>
  );
}

function PortalStudio() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <PortalPanel title="AI metadata draft" icon={<WandSparkles className="h-5 w-5" />}>
        <textarea
          className="min-h-48 w-full resize-none rounded-2xl border border-black/10 bg-[var(--auralis-paper)] p-4 text-sm leading-6 outline-none focus:border-black"
          defaultValue="Write collection notes for a Solana mint. Include supply, reveal timing, royalty terms, and collector risks. Do not target eligibility using protected traits."
          aria-label="AI metadata draft"
        />
      </PortalPanel>
      <PortalPanel title="Guardrails" icon={<LockKeyhole className="h-5 w-5" />}>
        <div className="grid gap-3 sm:grid-cols-2">
          {["No protected-trait eligibility", "No fake scarcity claims", "No unaudited safety badge", "Human review before export"].map((item) => (
            <div key={item} className="rounded-2xl border border-black/10 bg-[var(--auralis-paper)] p-4 font-bold">
              <Sparkles className="mb-4 h-5 w-5 text-[var(--auralis-pink)]" />
              {item}
            </div>
          ))}
        </div>
      </PortalPanel>
    </div>
  );
}

function PortalQueue() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <PortalPanel title="Queue policy" icon={<Timer className="h-5 w-5" />}>
        <div className="steps steps-vertical text-left">
          <div className="step step-primary">Docs visible</div>
          <div className="step step-primary">Wallet cap checked</div>
          <div className="step">Randomized queue slot</div>
          <div className="step">Mint transaction</div>
        </div>
      </PortalPanel>
      <PortalPanel title="Fairness controls" icon={<Scale className="h-5 w-5" />}>
        <p className="text-sm leading-6 text-black/64">
          Auralis avoids pure first-click advantage by combining public windows, wallet caps, cooldowns, and clear queue rules.
        </p>
      </PortalPanel>
      <PortalPanel title="Price window" icon={<Gem className="h-5 w-5" />}>
        <p className="font-display text-5xl font-black">1.25 SOL</p>
        <p className="mt-3 text-sm leading-6 text-black/64">Locked for the published mint window unless the creator posts a visible update.</p>
      </PortalPanel>
    </div>
  );
}

function PageShell({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen px-4 pb-16 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-4xl">
          <p className="section-kicker">{eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl font-black tracking-normal md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/64">{copy}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function InfoPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <GlassGlowCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="h-full bg-white p-5"
      >
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">{icon}</div>
        <h3 className="font-display text-2xl font-black">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-black/62">{children}</p>
      </motion.div>
    </GlassGlowCard>
  );
}

function PortalPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <GlassGlowCard className="h-full">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="h-full bg-white p-5"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">{icon}</span>
          <h3 className="font-display text-2xl font-black">{title}</h3>
        </div>
        {children}
      </motion.section>
    </GlassGlowCard>
  );
}


function Metric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-[24px] border border-black/10 bg-white/68 p-4 shadow-[0_16px_60px_rgba(15,19,23,0.05)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">{icon}</div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-black/38">{label}</p>
        <p className="font-display text-2xl font-black">{value}</p>
      </div>
    </div>
  );
}

function StatusRow({ label, value, done }: { label: string; value: string; done?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-4">
      <span className="font-bold">{label}</span>
      <span className={cx("rounded-full px-3 py-1 text-xs font-black", done ? "bg-[var(--auralis-lime)] text-black" : "bg-white/10 text-white/70")}>
        {value}
      </span>
    </div>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black text-white shadow-[0_14px_40px_rgba(15,19,23,0.18)] transition hover:-translate-y-0.5 hover:bg-black/88 focus-ring"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/12 bg-white/70 px-6 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-white focus-ring"
    >
      {children}
    </button>
  );
}

function SecondaryDarkButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16 focus-ring"
    >
      {children}
    </button>
  );
}

export default App;
