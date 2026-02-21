"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

const stepsMeta = [
  { number: "01", key: "step1" as const, descKey: "step1desc" as const },
  { number: "02", key: "step2" as const, descKey: "step2desc" as const },
  { number: "03", key: "step3" as const, descKey: "step3desc" as const },
  { number: "04", key: "step4" as const, descKey: "step4desc" as const },
];

/* ─── Step card (right column) ─── */
const StepCard = ({
  number,
  title,
  description,
  isLast,
  cardRef,
}: {
  number: string;
  title: string;
  description: string;
  isLast: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });

  /* progress bar at card top */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 lg:rounded-3xl ${
        isLast
          ? "border-neutral-800 bg-black text-white"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xl"
      }`}
    >
      {/* Animated progress bar at top */}
      <div
        className={`h-[2px] w-full ${isLast ? "bg-white/10" : "bg-neutral-100"}`}
      >
        <motion.div
          className={`h-full ${isLast ? "bg-white/40" : "bg-black"}`}
          style={{ width: barWidth }}
        />
      </div>

      <div className="p-8 lg:p-12">
        {/* Watermark number */}
        <span
          className={`pointer-events-none absolute -top-6 right-4 font-mono text-[9rem] font-black leading-none transition-transform duration-700 group-hover:scale-105 ${
            isLast ? "text-white/[0.03]" : "text-neutral-50"
          }`}
        >
          {number}
        </span>

        <div className="relative">
          {/* Step badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 ${
              isLast ? "border-white/15" : "border-neutral-200"
            }`}
          >
            <motion.div
              className={`h-1.5 w-1.5 rounded-full ${
                isLast ? "bg-white" : "bg-black"
              }`}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                isLast ? "text-white/50" : "text-neutral-400"
              }`}
            >
              Step {number}
            </span>
          </div>

          <LocaleTransition>
            <h3
              className={`mb-4 text-2xl font-bold leading-tight lg:text-3xl ${
                isLast ? "text-white" : "text-black"
              }`}
            >
              {title}
            </h3>
            <p
              className={`max-w-xl text-base leading-relaxed lg:text-lg ${
                isLast ? "text-white/55" : "text-neutral-500"
              }`}
            >
              {description}
            </p>
          </LocaleTransition>

          {/* Decorative corner lines */}
          {!isLast && (
            <div className="pointer-events-none absolute -top-2 -right-2 h-12 w-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute top-0 right-0 h-6 w-px bg-neutral-300" />
              <div className="absolute top-0 right-0 h-px w-6 bg-neutral-300" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main section ─── */
export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  const { t } = useI18n();

  // Refs for each card — used for scroll position calculation
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Native scroll listener: find which card center is closest to viewport center
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight * 0.45;
        let closest = 0;
        let minDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < cardRefs.length; i++) {
          const el = cardRefs[i].current;
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }

        setActiveStep((prev) => (prev !== closest ? closest : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative z-10 bg-white py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center lg:mb-28"
        >
          <LocaleTransition>
            <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
              {t.process.label}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-7xl">
              {t.process.title}{" "}
              <span className="text-neutral-400">{t.process.titleAccent}</span>
            </h2>
          </LocaleTransition>
        </motion.div>

        {/* Two-column layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-20">
          {/* ── Left: sticky indicator panel (desktop) ── */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 pb-24">
              {/* Decorative rotating ring */}
              <motion.div
                className="pointer-events-none absolute -top-12 -left-8 h-64 w-64 rounded-full border border-dashed border-neutral-100"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 50,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Big animated step number */}
              <div className="relative mb-10 h-44 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeStep}
                    initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -80, filter: "blur(12px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute font-mono text-[11rem] font-black leading-none text-neutral-100"
                  >
                    {stepsMeta[activeStep].number}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Active step title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${activeStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-3"
                >
                  <LocaleTransition>
                    <h3 className="text-2xl font-bold text-black">
                      {t.process[stepsMeta[activeStep].key]}
                    </h3>
                  </LocaleTransition>
                </motion.div>
              </AnimatePresence>

              {/* Active step description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`desc-${activeStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-14"
                >
                  <LocaleTransition>
                    <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
                      {t.process[stepsMeta[activeStep].descKey]}
                    </p>
                  </LocaleTransition>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicator */}
              <div className="flex items-center gap-3">
                {stepsMeta.map((step, i) => (
                  <div key={step.number} className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 items-center justify-center">
                      {/* Active ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-black"
                        initial={false}
                        animate={{
                          scale: i === activeStep ? 1 : 0,
                          opacity: i === activeStep ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Dot */}
                      <motion.div
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                          i <= activeStep ? "bg-black" : "bg-neutral-200"
                        }`}
                        animate={
                          i === activeStep
                            ? { scale: [1, 1.4, 1] }
                            : { scale: 1 }
                        }
                        transition={
                          i === activeStep
                            ? {
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }
                            : { duration: 0.3 }
                        }
                      />
                    </div>

                    {/* Connector */}
                    {i < stepsMeta.length - 1 && (
                      <div className="relative h-px w-10 bg-neutral-200">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-black"
                          initial={false}
                          animate={{ width: i < activeStep ? "100%" : "0%" }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step count */}
              <div className="mt-8 font-mono text-xs text-neutral-300">
                {String(activeStep + 1).padStart(2, "0")} /{" "}
                {String(stepsMeta.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* ── Right: scrolling step cards ── */}
          <div className="lg:col-span-7">
            {/* Mobile header — small progress */}
            <div className="mb-10 flex items-center gap-2 lg:hidden">
              {stepsMeta.map((step, i) => (
                <div
                  key={step.number}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= activeStep ? "bg-black" : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>

            {/* Cards */}
            <div className="space-y-8 lg:space-y-14">
              {stepsMeta.map((step, i) => (
                <StepCard
                  key={step.number}
                  number={step.number}
                  title={t.process[step.key]}
                  description={t.process[step.descKey]}
                  isLast={i === stepsMeta.length - 1}
                  cardRef={cardRefs[i]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
