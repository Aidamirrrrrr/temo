"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  initials: string;
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const testimonials: Testimonial[] = [
    {
      name: t.testimonials.t1name,
      role: t.testimonials.t1role,
      text: t.testimonials.t1text,
      initials: t.testimonials.t1name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    {
      name: t.testimonials.t2name,
      role: t.testimonials.t2role,
      text: t.testimonials.t2text,
      initials: t.testimonials.t2name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    {
      name: t.testimonials.t3name,
      role: t.testimonials.t3role,
      text: t.testimonials.t3text,
      initials: t.testimonials.t3name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    {
      name: t.testimonials.t4name,
      role: t.testimonials.t4role,
      text: t.testimonials.t4text,
      initials: t.testimonials.t4name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
  ];

  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const current = testimonials[active];

  // Parallax watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative z-10 overflow-hidden bg-neutral-950 py-32 lg:py-48"
    >
      {/* Background watermark */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-mono text-[20rem] font-black leading-none text-white/5 lg:text-[30rem]">
          &ldquo;
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28"
        >
          <LocaleTransition>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-500">
              <span className="inline-block h-px w-8 bg-neutral-700" />
              {t.testimonials.label}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.testimonials.title}{" "}
              <span className="text-neutral-600">
                {t.testimonials.titleAccent}
              </span>
            </h2>
          </LocaleTransition>
        </motion.div>

        {/* Two-column layout: big quote left, selector right */}
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-20">
          {/* Left: large quote */}
          <div className="lg:col-span-3">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <LocaleTransition>
                <blockquote className="mb-10 text-2xl leading-relaxed font-light text-neutral-300 sm:text-3xl lg:text-4xl lg:leading-snug">
                  &ldquo;{current.text}&rdquo;
                </blockquote>
              </LocaleTransition>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {current.initials}
                </div>
                <div>
                  <LocaleTransition>
                    <p className="text-base font-semibold text-white">
                      {current.name}
                    </p>
                    <p className="text-sm text-neutral-500">{current.role}</p>
                  </LocaleTransition>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: selector list */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-0">
              {testimonials.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group flex items-center gap-4 border-b border-neutral-800 py-5 text-left transition-all duration-400 last:border-b-0 ${
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {/* Progress bar for active */}
                    <div className="relative h-10 w-1 shrink-0 overflow-hidden rounded-full bg-neutral-800">
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 w-full rounded-full bg-white"
                          initial={{ height: "0%" }}
                          animate={{ height: "100%" }}
                          transition={{ duration: 7, ease: "linear" }}
                          key={`bar-${active}`}
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <LocaleTransition>
                        <p className="truncate text-sm font-semibold text-white">
                          {item.name}
                        </p>
                        <p className="truncate text-xs text-neutral-500">
                          {item.role}
                        </p>
                      </LocaleTransition>
                    </div>

                    {/* Stars */}
                    <div className="ml-auto flex shrink-0 gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className="text-[10px] text-white">
                          ★
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Counter */}
            <div className="mt-6 font-mono text-xs text-neutral-400">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
