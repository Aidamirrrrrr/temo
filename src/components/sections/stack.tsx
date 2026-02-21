"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

/* ─── Tech data with URLs ─── */
const techCategories = [
  {
    key: "frontend" as const,
    items: [
      { name: "React", detail: "UI Library", url: "https://react.dev" },
      { name: "Next.js", detail: "Framework", url: "https://nextjs.org" },
      {
        name: "TypeScript",
        detail: "Language",
        url: "https://typescriptlang.org",
      },
      {
        name: "Tailwind CSS",
        detail: "Styling",
        url: "https://tailwindcss.com",
      },
      { name: "Framer Motion", detail: "Animation", url: "https://motion.dev" },
      { name: "Three.js", detail: "3D / WebGL", url: "https://threejs.org" },
      { name: "Zustand", detail: "State", url: "https://zustand-demo.pmnd.rs" },
      {
        name: "Radix UI",
        detail: "Primitives",
        url: "https://www.radix-ui.com",
      },
    ],
  },
  {
    key: "backend" as const,
    items: [
      { name: "Node.js", detail: "Runtime", url: "https://nodejs.org" },
      {
        name: "PostgreSQL",
        detail: "Database",
        url: "https://www.postgresql.org",
      },
      { name: "Prisma", detail: "ORM", url: "https://www.prisma.io" },
      { name: "Redis", detail: "Cache", url: "https://redis.io" },
      { name: "GraphQL", detail: "API", url: "https://graphql.org" },
      { name: "tRPC", detail: "Type-safe RPC", url: "https://trpc.io" },
      { name: "Hono", detail: "Edge Runtime", url: "https://hono.dev" },
      { name: "Drizzle", detail: "ORM", url: "https://orm.drizzle.team" },
    ],
  },
  {
    key: "tools" as const,
    items: [
      { name: "Figma", detail: "Design", url: "https://www.figma.com" },
      { name: "Git", detail: "VCS", url: "https://git-scm.com" },
      { name: "Biome", detail: "Linter", url: "https://biomejs.dev" },
      { name: "Vitest", detail: "Testing", url: "https://vitest.dev" },
      { name: "Storybook", detail: "UI Docs", url: "https://storybook.js.org" },
      {
        name: "Sentry",
        detail: "Monitoring",
        url: "https://sentry.io/welcome",
      },
      {
        name: "Playwright",
        detail: "E2E Tests",
        url: "https://playwright.dev",
      },
      { name: "Zod", detail: "Validation", url: "https://zod.dev" },
    ],
  },
  {
    key: "infra" as const,
    items: [
      { name: "Vercel", detail: "Hosting", url: "https://vercel.com" },
      { name: "Docker", detail: "Containers", url: "https://www.docker.com" },
      { name: "AWS", detail: "Cloud", url: "https://aws.amazon.com" },
      {
        name: "GitHub Actions",
        detail: "CI/CD",
        url: "https://github.com/features/actions",
      },
      {
        name: "Cloudflare",
        detail: "CDN / Edge",
        url: "https://www.cloudflare.com",
      },
      { name: "Turborepo", detail: "Monorepo", url: "https://turbo.build" },
      {
        name: "Terraform",
        detail: "IaC",
        url: "https://www.hashicorp.com/products/terraform",
      },
      { name: "Grafana", detail: "Observability", url: "https://grafana.com" },
    ],
  },
];

/* ─── Single tech card ─── */
function TechCard({
  name,
  detail,
  url,
  index,
}: {
  name: string;
  detail: string;
  url: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative h-full overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-500 hover:border-black hover:shadow-lg"
      >
        {/* Fill animation on hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={false}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "bottom" }}
        />

        <div className="relative flex flex-col items-center gap-3 px-4 py-6 sm:py-8">
          {/* Monogram circle */}
          <motion.div
            className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs font-bold transition-colors duration-500 ${
              isHovered
                ? "border-white/20 bg-white/10 text-white"
                : "border-neutral-200 bg-neutral-50 text-neutral-600"
            }`}
            animate={isHovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            {name.slice(0, 2).toUpperCase()}
          </motion.div>

          {/* Name */}
          <span
            className={`text-center font-mono text-xs font-medium transition-colors duration-500 sm:text-sm ${
              isHovered ? "text-white" : "text-black"
            }`}
          >
            {name}
          </span>

          {/* Detail tag */}
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest transition-all duration-500 ${
              isHovered
                ? "bg-white/10 text-white/60"
                : "bg-neutral-100 text-neutral-400"
            }`}
          >
            {detail}
          </span>

          {/* External link arrow — appears on hover */}
          <motion.span
            className="absolute top-3 right-3 text-white/50"
            initial={{ opacity: 0, x: -4, y: 4 }}
            animate={
              isHovered
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: -4, y: 4 }
            }
            transition={{ duration: 0.3 }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
            </svg>
          </motion.span>
        </div>
      </a>
    </motion.div>
  );
}

/* ─── Category tab ─── */
function CategoryTab({
  label,
  isActive,
  count,
  onClick,
}: {
  label: string;
  isActive: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-3 rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-400 ${
        isActive
          ? "border-black bg-black text-white"
          : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400 hover:text-black"
      }`}
    >
      <span>{label}</span>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-colors duration-400 ${
          isActive
            ? "bg-white/20 text-white"
            : "bg-neutral-100 text-neutral-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/* ─── Floating decorative grid ─── */
function DecoGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="stack-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path d="M60 0H0v60" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stack-grid)" />
      </svg>
    </div>
  );
}

/* ─── Main section ─── */
export function Stack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const { t } = useI18n();

  const [activeCategory, setActiveCategory] = useState(0);

  const categoryNames: Record<string, string> = {
    frontend: t.stack.frontend,
    backend: t.stack.backend,
    tools: t.stack.tools,
    infra: t.stack.infra,
  };

  const totalItems = techCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0,
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-32 lg:py-48"
    >
      <DecoGrid />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center lg:mb-20"
        >
          <LocaleTransition>
            <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
              {t.stack.label}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-7xl">
              {t.stack.title}{" "}
              <span className="text-neutral-400">{t.stack.titleAccent}</span>
            </h2>
          </LocaleTransition>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-wrap justify-center gap-3"
        >
          {techCategories.map((cat, i) => (
            <LocaleTransition key={cat.key} className="inline-flex">
              <CategoryTab
                label={categoryNames[cat.key]}
                isActive={activeCategory === i}
                count={cat.items.length}
                onClick={() => setActiveCategory(i)}
              />
            </LocaleTransition>
          ))}
        </motion.div>

        {/* Cards grid with AnimatePresence */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4 lg:gap-4"
            >
              {techCategories[activeCategory].items.map((item, i) => (
                <TechCard
                  key={item.name}
                  name={item.name}
                  detail={item.detail}
                  url={item.url}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 mb-14 h-px max-w-3xl bg-neutral-200"
          style={{ transformOrigin: "left" }}
        />

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
        >
          <div className="text-center">
            <span className="block font-mono text-3xl font-black text-black lg:text-4xl">
              {totalItems}+
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              <LocaleTransition className="inline">
                {t.stack.label}
              </LocaleTransition>
            </span>
          </div>

          <div className="h-8 w-px bg-neutral-200" />

          <div className="text-center">
            <span className="block font-mono text-3xl font-black text-black lg:text-4xl">
              4
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              categories
            </span>
          </div>

          <div className="h-8 w-px bg-neutral-200" />

          <div className="text-center">
            <span className="block font-mono text-3xl font-black text-black lg:text-4xl">
              ∞
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              possibilities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
