"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

interface FaqItem {
  question: string;
  answer: string;
}

/* ── Single FAQ row — underline + rotate number ── */
function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group border-b border-neutral-800"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-6 py-7 text-left sm:gap-8 sm:py-9 lg:gap-10"
      >
        {/* Number — rotates on open */}
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`shrink-0 font-mono text-xs transition-colors duration-400 ${
            isOpen ? "text-white" : "text-neutral-600"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Question */}
        <LocaleTransition>
          <span
            className={`min-w-0 flex-1 text-lg font-semibold transition-colors duration-400 sm:text-xl lg:text-2xl ${
              isOpen ? "text-white" : "text-neutral-400"
            }`}
          >
            {item.question}
          </span>
        </LocaleTransition>

        {/* Arrow that flips */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 text-neutral-400"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-12 sm:pl-14 lg:pl-16">
              <LocaleTransition>
                <p className="max-w-2xl text-sm leading-relaxed text-neutral-500 lg:text-base">
                  {item.answer}
                </p>
              </LocaleTransition>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const faqItems: FaqItem[] = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
  ];

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
          FAQ
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 grid gap-8 md:mb-24 md:grid-cols-2 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <LocaleTransition>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-500">
                <span className="inline-block h-px w-8 bg-neutral-700" />
                {t.faq.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.faq.title}{" "}
                <span className="text-neutral-600">{t.faq.titleAccent}</span>
              </h2>
            </LocaleTransition>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:text-right"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-white"
            >
              <LocaleTransition className="inline">
                {t.faq.q5.includes("поддержку")
                  ? "Не нашли ответ? Напишите нам"
                  : "Didn't find your answer? Contact us"}
              </LocaleTransition>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* FAQ list — clean accordion */}
        <div>
          {faqItems.map((item, i) => (
            <FaqRow
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
