"use client";

import { motion, type Variants } from "framer-motion";
import { HeroScene } from "@/components/three/scene";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.8 + i * 0.04,
      ease: "easeOut",
    },
  }),
};

function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ perspective: "600px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section className="sticky top-0 z-0 flex min-h-screen items-center justify-center overflow-hidden bg-white">
      <HeroScene />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8">
            <AnimatedText
              key={`line1-${locale}`}
              text={t.hero.line1}
              className="block text-6xl font-bold leading-none tracking-tight text-black sm:text-7xl md:text-8xl lg:text-9xl"
            />
            <AnimatedText
              key={`line2-${locale}`}
              text={t.hero.line2}
              className="block text-6xl font-bold leading-none tracking-tight text-black sm:text-7xl md:text-8xl lg:text-9xl"
            />
          </div>

          <LocaleTransition>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mx-auto mb-12 max-w-md text-lg text-neutral-500 sm:text-xl"
            >
              {t.hero.subtitle1}
              <br />
              {t.hero.subtitle2}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 2.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex justify-center"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full border border-black bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                {t.hero.cta}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </motion.div>
          </LocaleTransition>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <LocaleTransition>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              {t.hero.scroll}
            </span>
          </LocaleTransition>
          <div className="h-10 w-px bg-gradient-to-b from-neutral-300 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
