"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

const MARQUEE_ITEMS = [
  "DESIGN",
  "DEVELOP",
  "DEPLOY",
  "STRATEGY",
  "UI/UX",
  "WEB",
  "MOBILE",
  "FULLSTACK",
  "NEXTJS",
  "REACT",
  "DEVOPS",
  "BRANDING",
];

export function Hero() {
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-0 flex min-h-screen flex-col overflow-hidden bg-white"
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Large NF watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="pointer-events-none absolute -right-[5%] top-1/2 -translate-y-1/2 select-none"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="block text-[clamp(20rem,40vw,50rem)] font-black leading-none tracking-tighter"
        >
          NF
        </motion.span>
      </motion.div>

      {/* Mouse-following gradient orb */}
      <motion.div
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-125 w-125 rounded-full bg-linear-to-br from-neutral-100 via-neutral-50 to-transparent opacity-80 blur-3xl" />
      </motion.div>

      {/* Corner frames */}
      <div className="pointer-events-none absolute left-6 top-6 h-14 w-14 border-l-2 border-t-2 border-neutral-200 lg:left-12 lg:top-8 lg:h-20 lg:w-20" />
      <div className="pointer-events-none absolute right-6 top-6 h-14 w-14 border-r-2 border-t-2 border-neutral-200 lg:right-12 lg:top-8 lg:h-20 lg:w-20" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-14 w-14 border-b-2 border-l-2 border-neutral-200 lg:bottom-8 lg:left-12 lg:h-20 lg:w-20" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-14 w-14 border-b-2 border-r-2 border-neutral-200 lg:bottom-8 lg:right-12 lg:h-20 lg:w-20" />

      {/* Left vertical text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:left-12 lg:block"
      >
        <span
          className="block font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-300"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <LocaleTransition className="inline">
            {locale === "ru" ? "Прокрутите вниз" : "Scroll down"}
          </LocaleTransition>
        </span>
      </motion.div>

      {/* Right vertical text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:right-12 lg:block"
      >
        <div
          className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-300"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="h-8 w-px bg-neutral-200" />
          <span>MSK</span>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 lg:px-12"
      >
        {/* Top line with label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex items-center gap-4 lg:mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            <LocaleTransition className="inline">
              {locale === "ru" ? "Студия разработки" : "Dev Studio"}
            </LocaleTransition>
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-px flex-1 origin-left bg-neutral-200"
          />
          <span className="font-mono text-xs text-neutral-300">EST. 2024</span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-8 lg:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,9rem)] font-bold leading-[1.15] tracking-tight"
          >
            <LocaleTransition>
              <span className="block text-black">{t.hero.line1}</span>
              <span className="block text-neutral-300">{t.hero.line2}</span>
            </LocaleTransition>
          </motion.h1>
        </div>

        {/* Marquee ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-12 overflow-hidden border-y border-neutral-100 py-3 lg:mb-16"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex w-max items-center gap-6"
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((word, i) => (
              <span
                key={i}
                className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-300"
              >
                {word}
                <span className="h-1 w-1 rounded-full bg-neutral-200" />
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom row: subtitle left, CTA right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-8 pb-16 sm:flex-row sm:items-end lg:pb-24"
        >
          {/* Subtitle */}
          <div className="max-w-md">
            <LocaleTransition>
              <p className="text-base leading-relaxed text-neutral-400 lg:text-lg">
                {t.hero.subtitle1}
                <br className="hidden sm:block" />
                {t.hero.subtitle2}
              </p>
            </LocaleTransition>
          </div>

          {/* CTA */}
          <div className="flex shrink-0 items-center gap-5">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 rounded-full border border-black bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              <LocaleTransition className="inline">
                {t.hero.cta}
              </LocaleTransition>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#about"
              className="hidden items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-black sm:inline-flex"
            >
              <LocaleTransition className="inline">
                {locale === "ru" ? "О нас" : "About"}
              </LocaleTransition>
              <span className="text-neutral-300">&darr;</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom scroll line */}
      <motion.div
        style={{ width: lineWidth }}
        className="absolute bottom-0 left-0 h-px bg-neutral-200"
      />
    </section>
  );
}
