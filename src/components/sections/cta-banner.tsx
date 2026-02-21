"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

export function CtaBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const { t } = useI18n();

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-neutral-50 py-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          style={{ scale }}
          className="relative overflow-hidden rounded-3xl bg-black p-12 sm:p-16 lg:p-24"
        >
          {/* Animated background shapes */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              style={{ rotate: bgRotate }}
              className="absolute -top-1/2 -right-1/4 h-[600px] w-[600px] rounded-full border border-white/5"
            />
            <motion.div
              style={{ rotate: bgRotate }}
              className="absolute -bottom-1/2 -left-1/4 h-[800px] w-[800px] rounded-full border border-white/5"
            />
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 right-1/4 h-2 w-2 rounded-full bg-white/20"
            />
            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute bottom-1/3 left-1/3 h-3 w-3 rounded-full bg-white/10"
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="cta-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <LocaleTransition>
                <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                  {t.ctaBanner.title}
                  <br />
                  <span className="text-neutral-500">
                    {t.ctaBanner.titleAccent}
                  </span>
                </h2>
              </LocaleTransition>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mb-10 max-w-lg text-neutral-400"
            >
              <LocaleTransition>{t.ctaBanner.text}</LocaleTransition>
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:gap-5 hover:bg-neutral-100"
            >
              <LocaleTransition className="inline">
                {t.ctaBanner.cta}
              </LocaleTransition>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
