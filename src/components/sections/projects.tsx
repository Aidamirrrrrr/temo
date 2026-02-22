"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
}

/* ─── Stacked card (scroll-pinned) ─── */
function StackedCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Each card sticks slightly lower than the previous
  const topOffset = 120 + index * 40;

  // Slight scale-down as next card arrives
  const scale = useTransform(
    scrollYProgress,
    [0.7, 1],
    [1, 0.95 - index * 0.01],
  );

  const num = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div
        className="sticky z-10 mx-auto w-full max-w-6xl px-4 sm:px-6"
        style={{ top: topOffset, scale }}
      >
        <a href="#contact" className="group block">
          <div
            className={`relative overflow-hidden rounded-3xl border transition-all duration-700 ${
              isEven
                ? "border-neutral-800 bg-neutral-950 hover:border-neutral-600"
                : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xl hover:shadow-neutral-200/50"
            }`}
          >
            {/* Background grid */}
            <div
              className={`pointer-events-none absolute inset-0 ${isEven ? "opacity-[0.03]" : "opacity-[0.02]"}`}
            >
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id={`card-grid-${index}`}
                    width="48"
                    height="48"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 48 0 L 0 0 0 48"
                      fill="none"
                      stroke={isEven ? "white" : "black"}
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#card-grid-${index})`}
                />
              </svg>
            </div>

            {/* Card content */}
            <div className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-16">
              {/* Left: main info */}
              <div className="flex-1">
                {/* Top meta line */}
                <div className="mb-8 flex items-center gap-4 lg:mb-12">
                  <span
                    className={`font-mono text-xs uppercase tracking-[0.2em] ${
                      isEven ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  >
                    {num} / {String(total).padStart(2, "0")}
                  </span>
                  <div
                    className={`h-px flex-1 ${isEven ? "bg-neutral-800" : "bg-neutral-200"}`}
                  />
                  <span
                    className={`font-mono text-xs ${isEven ? "text-neutral-600" : "text-neutral-400"}`}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`mb-4 text-4xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl lg:text-7xl ${
                    isEven ? "text-white" : "text-black"
                  }`}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <LocaleTransition>
                  <p
                    className={`mb-8 max-w-lg text-sm leading-relaxed sm:text-base ${
                      isEven ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {project.description}
                  </p>
                </LocaleTransition>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <LocaleTransition>
                    <span
                      className={`rounded-full border px-4 py-1.5 text-xs font-medium ${
                        isEven
                          ? "border-neutral-700 bg-neutral-900 text-neutral-300"
                          : "border-neutral-200 bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {project.category}
                    </span>
                  </LocaleTransition>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        isEven
                          ? "border-neutral-800 text-neutral-500"
                          : "border-neutral-200 text-neutral-400"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: big number + CTA */}
              <div className="flex shrink-0 items-end justify-between gap-8 lg:flex-col lg:items-end">
                <span
                  className={`font-mono text-8xl font-black leading-none sm:text-9xl lg:text-[11rem] ${
                    isEven ? "text-white/10" : "text-neutral-100"
                  }`}
                >
                  {num}
                </span>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    isEven
                      ? "border-neutral-700 group-hover:border-white group-hover:bg-white"
                      : "border-neutral-300 group-hover:border-black group-hover:bg-black"
                  }`}
                >
                  <ArrowUpRight
                    className={`h-5 w-5 transition-all duration-500 ${
                      isEven
                        ? "text-neutral-500 group-hover:text-black"
                        : "text-neutral-400 group-hover:text-white"
                    }`}
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

/* ─── Main section ─── */
export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const projects: Project[] = [
    {
      title: "Monochrome",
      category: t.projects.p1cat,
      year: "2025",
      description: t.projects.p1desc,
      tags: ["React", "Next.js", "WebSocket"],
    },
    {
      title: "Void",
      category: t.projects.p2cat,
      year: "2025",
      description: t.projects.p2desc,
      tags: ["Next.js", "Stripe", "CMS"],
    },
    {
      title: "Silence",
      category: t.projects.p3cat,
      year: "2024",
      description: t.projects.p3desc,
      tags: ["React Native", "Node.js"],
    },
    {
      title: "Fragment",
      category: t.projects.p4cat,
      year: "2024",
      description: t.projects.p4desc,
      tags: ["React", "PostgreSQL", "AWS"],
    },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 bg-neutral-50 py-32 lg:py-48"
    >
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-32"
        >
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <LocaleTransition>
                <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
                  <span className="inline-block h-px w-8 bg-neutral-300" />
                  {t.projects.label}
                </span>
                <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                  {t.projects.title}{" "}
                  <span className="text-neutral-300">
                    {t.projects.titleAccent}
                  </span>
                </h2>
              </LocaleTransition>
            </div>

            <a
              href="#contact"
              className="group hidden items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-black md:inline-flex"
            >
              <LocaleTransition className="inline">
                {t.projects.cta}
              </LocaleTransition>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stacked cards */}
      {projects.map((project, i) => (
        <StackedCard
          key={project.title}
          project={project}
          index={i}
          total={projects.length}
        />
      ))}

      {/* Mobile CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-16 text-center md:hidden"
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          <LocaleTransition className="inline">
            {t.projects.cta}
          </LocaleTransition>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}
