"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-500 hover:border-neutral-300 hover:shadow-2xl lg:p-10">
        {/* Quote mark */}
        <span className="absolute top-6 right-8 font-serif text-8xl leading-none text-neutral-100 transition-colors duration-500 group-hover:text-neutral-200">
          &ldquo;
        </span>

        <div className="relative z-10">
          {/* Stars */}
          <div className="mb-6 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={`star-${index}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 + i * 0.05 }}
                className="text-sm text-black"
              >
                ★
              </motion.span>
            ))}
          </div>

          <LocaleTransition>
            <p className="mb-8 text-base leading-relaxed text-neutral-600 lg:text-lg">
              {testimonial.text}
            </p>
          </LocaleTransition>

          <div className="flex items-center gap-4">
            {/* Avatar placeholder */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <LocaleTransition>
                <p className="text-sm font-bold text-black">
                  {testimonial.name}
                </p>
                <p className="text-xs text-neutral-500">{testimonial.role}</p>
              </LocaleTransition>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Marquee of logos/brands
function BrandMarquee() {
  const brands = [
    "FinanceApp",
    "EduTech",
    "HealthTech",
    "Quantum",
    "Nexus",
    "Aether",
    "Prism",
    "Catalyst",
  ];

  return (
    <div className="relative mt-20 overflow-hidden">
      <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="flex gap-16"
      >
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="shrink-0 font-mono text-lg font-bold text-neutral-200 transition-colors hover:text-neutral-400"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const { t } = useI18n();

  const testimonials: Testimonial[] = [
    {
      name: t.testimonials.t1name,
      role: t.testimonials.t1role,
      text: t.testimonials.t1text,
    },
    {
      name: t.testimonials.t2name,
      role: t.testimonials.t2role,
      text: t.testimonials.t2text,
    },
    {
      name: t.testimonials.t3name,
      role: t.testimonials.t3role,
      text: t.testimonials.t3text,
    },
    {
      name: t.testimonials.t4name,
      role: t.testimonials.t4role,
      text: t.testimonials.t4text,
    },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 bg-white py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <LocaleTransition>
            <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
              {t.testimonials.label}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
              {t.testimonials.title}{" "}
              <span className="text-neutral-400">
                {t.testimonials.titleAccent}
              </span>
            </h2>
          </LocaleTransition>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>

        <BrandMarquee />
      </div>
    </section>
  );
}
