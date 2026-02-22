"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

/* ─── Tech data ─── */
type TechItem = {
  name: string;
  detail: string;
  url: string;
  featured?: boolean;
};

const techCategories = [
  {
    key: "frontend" as const,
    direction: "left" as const,
    items: [
      {
        name: "React",
        detail: "UI Library",
        url: "https://react.dev",
        featured: true,
      },
      {
        name: "Next.js",
        detail: "Meta-Framework",
        url: "https://nextjs.org",
        featured: true,
      },
      {
        name: "TypeScript",
        detail: "Type-safe JS",
        url: "https://typescriptlang.org",
        featured: true,
      },
      {
        name: "Tailwind CSS",
        detail: "Utility-First CSS",
        url: "https://tailwindcss.com",
      },
      {
        name: "Framer Motion",
        detail: "Animation Library",
        url: "https://motion.dev",
      },
      { name: "Three.js", detail: "3D & WebGL", url: "https://threejs.org" },
      {
        name: "Zustand",
        detail: "State Management",
        url: "https://zustand-demo.pmnd.rs",
      },
      {
        name: "Radix UI",
        detail: "Accessible Primitives",
        url: "https://www.radix-ui.com",
      },
      {
        name: "React Query",
        detail: "Server State",
        url: "https://tanstack.com/query",
      },
      {
        name: "React Hook Form",
        detail: "Form Handling",
        url: "https://react-hook-form.com",
      },
    ],
  },
  {
    key: "backend" as const,
    direction: "right" as const,
    items: [
      {
        name: "Node.js",
        detail: "JS Runtime",
        url: "https://nodejs.org",
        featured: true,
      },
      {
        name: "PostgreSQL",
        detail: "Relational DB",
        url: "https://www.postgresql.org",
        featured: true,
      },
      { name: "Prisma", detail: "Type-safe ORM", url: "https://www.prisma.io" },
      { name: "Redis", detail: "In-Memory Cache", url: "https://redis.io" },
      { name: "GraphQL", detail: "Query Language", url: "https://graphql.org" },
      {
        name: "tRPC",
        detail: "End-to-End Types",
        url: "https://trpc.io",
        featured: true,
      },
      { name: "Hono", detail: "Edge Functions", url: "https://hono.dev" },
      {
        name: "Drizzle",
        detail: "SQL-like ORM",
        url: "https://orm.drizzle.team",
      },
      {
        name: "Supabase",
        detail: "Backend-as-a-Service",
        url: "https://supabase.com",
      },
      {
        name: "Stripe",
        detail: "Payment Processing",
        url: "https://stripe.com",
      },
    ],
  },
  {
    key: "tools" as const,
    direction: "left" as const,
    items: [
      {
        name: "Figma",
        detail: "Design & Prototyping",
        url: "https://www.figma.com",
        featured: true,
      },
      { name: "Git", detail: "Version Control", url: "https://git-scm.com" },
      {
        name: "Biome",
        detail: "Linter & Formatter",
        url: "https://biomejs.dev",
      },
      {
        name: "Vitest",
        detail: "Unit Testing",
        url: "https://vitest.dev",
        featured: true,
      },
      {
        name: "Storybook",
        detail: "Component Docs",
        url: "https://storybook.js.org",
      },
      {
        name: "Sentry",
        detail: "Error Monitoring",
        url: "https://sentry.io/welcome",
      },
      {
        name: "Playwright",
        detail: "E2E Testing",
        url: "https://playwright.dev",
      },
      { name: "Zod", detail: "Schema Validation", url: "https://zod.dev" },
      {
        name: "PostHog",
        detail: "Product Analytics",
        url: "https://posthog.com",
      },
      { name: "Linear", detail: "Project Tracking", url: "https://linear.app" },
    ],
  },
  {
    key: "infra" as const,
    direction: "right" as const,
    items: [
      {
        name: "Vercel",
        detail: "Edge Deployment",
        url: "https://vercel.com",
        featured: true,
      },
      {
        name: "Docker",
        detail: "Containerization",
        url: "https://www.docker.com",
        featured: true,
      },
      { name: "AWS", detail: "Cloud Services", url: "https://aws.amazon.com" },
      {
        name: "GitHub Actions",
        detail: "CI/CD Pipelines",
        url: "https://github.com/features/actions",
      },
      {
        name: "Cloudflare",
        detail: "CDN & Edge Workers",
        url: "https://www.cloudflare.com",
      },
      {
        name: "Turborepo",
        detail: "Monorepo Build",
        url: "https://turbo.build",
      },
      {
        name: "Terraform",
        detail: "Infrastructure as Code",
        url: "https://www.hashicorp.com/products/terraform",
      },
      { name: "Grafana", detail: "Observability", url: "https://grafana.com" },
      { name: "Nginx", detail: "Web Server / Proxy", url: "https://nginx.org" },
      {
        name: "Kubernetes",
        detail: "Container Orchestration",
        url: "https://kubernetes.io",
      },
    ],
  },
];

/* ─── Infinite marquee row ─── */
function MarqueeRow({
  items,
  label,
  direction,
  index,
}: {
  items: TechItem[];
  label: string;
  direction: "left" | "right";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  const animationName = direction === "left" ? "marquee-left" : "marquee-right";
  const duration = 40 + index * 5;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group/row relative"
    >
      {/* Category label */}
      <div className="mb-3 flex items-center gap-3 px-6 lg:px-12">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-300 font-mono text-[9px] font-bold text-neutral-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <LocaleTransition>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            {label}
          </span>
        </LocaleTransition>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-neutral-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-neutral-50 to-transparent" />

        <div
          className="flex w-max gap-4 py-2 group-hover/row:paused"
          style={{
            animation: `${animationName} ${duration}s linear infinite`,
          }}
        >
          {duplicated.map((item, i) => (
            <TechCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Single tech card ─── */
function TechCard({ item }: { item: TechItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/card relative flex shrink-0 items-center gap-3 overflow-hidden rounded-xl border px-5 py-3.5 transition-all duration-500 ${
        item.featured
          ? "border-black/10 bg-black/5 hover:border-black/20 hover:bg-black/8 hover:shadow-lg hover:shadow-black/5"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-100"
      }`}
    >
      {/* Glow effect for featured */}
      {item.featured && (
        <div className="absolute -inset-px rounded-xl bg-linear-to-r from-black/5 via-transparent to-black/5 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      )}

      <span
        className={`relative z-10 whitespace-nowrap font-mono text-sm font-medium transition-colors duration-300 ${
          item.featured
            ? "text-black"
            : "text-neutral-700 group-hover/card:text-black"
        }`}
      >
        {item.name}
      </span>

      <span
        className={`relative z-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${
          item.featured
            ? "text-black/40"
            : "text-neutral-400 group-hover/card:text-neutral-600"
        }`}
      >
        {item.detail}
      </span>

      {/* Arrow */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        className={`relative z-10 shrink-0 translate-x-1 opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100 ${
          item.featured ? "text-black/50" : "text-neutral-400"
        }`}
      >
        <path
          d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

/* ─── Main section ─── */
export function Stack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const categoryNames: Record<string, string> = {
    frontend: t.stack.frontend,
    backend: t.stack.backend,
    tools: t.stack.tools,
    infra: t.stack.infra,
  };

  // Parallax for the big background number
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-32 lg:py-48"
    >
      {/* Big background decorative number */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute right-0 top-0 select-none font-mono text-[30vw] font-black leading-none text-black/3"
      >
        40+
      </motion.div>

      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-20 lg:mb-28 lg:grid lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <LocaleTransition>
                <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
                  <span className="inline-block h-px w-8 bg-neutral-300" />
                  {t.stack.label}
                </span>
                <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                  {t.stack.title}{" "}
                  <span className="text-neutral-300">
                    {t.stack.titleAccent}
                  </span>
                </h2>
              </LocaleTransition>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex items-end lg:col-span-4 lg:mt-0"
            >
              <p className="font-mono text-sm leading-relaxed text-neutral-500">
                <LocaleTransition>
                  {t.stack.frontend} · {t.stack.backend} · {t.stack.tools} ·{" "}
                  {t.stack.infra}
                </LocaleTransition>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Marquee rows — full width */}
        <div className="space-y-8">
          {techCategories.map((cat, i) => (
            <MarqueeRow
              key={cat.key}
              items={cat.items}
              label={categoryNames[cat.key]}
              direction={cat.direction}
              index={i}
            />
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-20 flex items-center justify-center gap-8 border-t border-neutral-200 pt-10 lg:mt-28 lg:gap-16"
          >
            <div className="text-center">
              <span className="block font-mono text-2xl font-black text-black lg:text-3xl">
                40+
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                <LocaleTransition className="inline">
                  {t.stack.label}
                </LocaleTransition>
              </span>
            </div>
            <div className="text-center">
              <span className="block font-mono text-2xl font-black text-black lg:text-3xl">
                4
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                categories
              </span>
            </div>
            <div className="text-center">
              <span className="block font-mono text-2xl font-black text-black lg:text-3xl">
                ∞
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                combos
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
