"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

const stepsMeta = [
  { number: "01", key: "step1" as const, descKey: "step1desc" as const },
  { number: "02", key: "step2" as const, descKey: "step2desc" as const },
  { number: "03", key: "step3" as const, descKey: "step3desc" as const },
  { number: "04", key: "step4" as const, descKey: "step4desc" as const },
];

/* ─── Horizontal scroll step ─── */
function HorizontalStep({
  number,
  title,
  description,
  index,
  total,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
  total: number;
}) {
  return (
    <div className="group relative flex h-105 w-[85vw] shrink-0 flex-col sm:w-[70vw] lg:h-115 lg:w-[40vw]">
      {/* Card */}
      <div className="flex flex-1 flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900 p-8 transition-all duration-500 hover:border-neutral-600 hover:bg-neutral-800 lg:p-12">
        {/* Top */}
        <div>
          {/* Number + progress indicator */}
          <div className="mb-10 flex items-center justify-between lg:mb-14">
            <span className="font-mono text-7xl font-black text-white/6 lg:text-8xl">
              {number}
            </span>

            {/* Step dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-white"
                      : i < index
                        ? "w-1.5 bg-white/40"
                        : "w-1.5 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <LocaleTransition>
            <h3 className="mb-5 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {title}
            </h3>
          </LocaleTransition>

          {/* Description */}
          <LocaleTransition>
            <p className="max-w-md text-sm leading-relaxed text-neutral-400 lg:text-base">
              {description}
            </p>
          </LocaleTransition>
        </div>

        {/* Bottom decorative */}
        <div className="mt-10 flex items-center gap-4 lg:mt-14">
          <div className="h-px flex-1 bg-neutral-800 transition-colors duration-500 group-hover:bg-neutral-700" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-600">
            Step {number}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-neutral-600 transition-transform duration-500 group-hover:translate-x-1"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ─── */
export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { t } = useI18n();

  // Horizontal scroll driven by vertical scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // First 20% of scroll = no movement (delay), then cards scroll
  const x = useTransform(
    scrollYProgress,
    [0, 0.15, 0.95, 1],
    ["2%", "2%", "-65%", "-65%"],
  );

  // Progress line
  const progressWidth = useTransform(
    scrollYProgress,
    [0.15, 0.95],
    ["0%", "100%"],
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative z-10 h-[350vh] bg-neutral-950"
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="mx-auto w-full max-w-6xl px-6 pt-20 lg:px-12 lg:pt-28">
          <div className="mb-8 lg:mb-12 lg:grid lg:grid-cols-12 lg:items-end lg:gap-16">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <LocaleTransition>
                <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-500">
                  <span className="inline-block h-px w-8 bg-neutral-700" />
                  {t.process.label}
                </span>
                <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {t.process.title}{" "}
                  <span className="text-neutral-600">
                    {t.process.titleAccent}
                  </span>
                </h2>
              </LocaleTransition>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 lg:col-span-5 lg:mt-0"
            >
              <LocaleTransition>
                <p className="max-w-md text-sm leading-relaxed text-neutral-500 lg:text-base">
                  {t.process.step1desc}
                </p>
              </LocaleTransition>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="relative h-px w-full bg-neutral-800">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        {/* Horizontal scrolling cards */}
        <div className="flex flex-1 items-center">
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-6 pl-6 lg:gap-8 lg:pl-12"
            style={{ x }}
          >
            {stepsMeta.map((step, i) => (
              <HorizontalStep
                key={step.number}
                number={step.number}
                title={t.process[step.key]}
                description={t.process[step.descKey]}
                index={i}
                total={stepsMeta.length}
              />
            ))}

            {/* End spacer */}
            <div className="w-[20vw] shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
