"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

// About section slides over the sticky Hero

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 30,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function ParallaxText({
  children,
  offset = 50,
}: {
  children: React.ReactNode;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const { t } = useI18n();

  const stats = [
    { value: 8, suffix: "+", label: t.about.stat1 },
    { value: 120, suffix: "+", label: t.about.stat2 },
    { value: 40, suffix: "+", label: t.about.stat3 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative z-10 overflow-hidden rounded-t-[2rem] bg-neutral-950 py-32 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] lg:py-48"
    >
      {/* Big parallax 404 */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-mono text-[20rem] font-black leading-none text-white/3 sm:text-[28rem] lg:text-[36rem]">
          404
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-20"
        >
          <LocaleTransition>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-500">
              <span className="inline-block h-px w-8 bg-neutral-700" />
              {t.about.label}
            </span>
            <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.about.title}{" "}
              <span className="text-neutral-600">{t.about.titleAccent}</span>
            </h2>
          </LocaleTransition>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          <ParallaxText offset={30}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg leading-relaxed text-neutral-400"
            >
              <LocaleTransition>{t.about.text1}</LocaleTransition>
            </motion.p>
          </ParallaxText>

          <ParallaxText offset={-20}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg leading-relaxed text-neutral-400"
            >
              <LocaleTransition>{t.about.text2}</LocaleTransition>
            </motion.p>
          </ParallaxText>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-3 gap-8 border-t border-neutral-800 pt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <LocaleTransition>
                <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
              </LocaleTransition>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
