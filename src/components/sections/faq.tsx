"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

interface FaqItem {
  question: string;
  answer: string;
}

function FaqAccordion({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-neutral-200 last:border-b-0"
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-7 text-left transition-colors"
      >
        <div className="flex items-center gap-6">
          <span className="font-mono text-sm text-neutral-300 transition-colors group-hover:text-black">
            {String(index + 1).padStart(2, "0")}
          </span>
          <LocaleTransition>
            <span className="text-lg font-medium text-black transition-colors group-hover:text-neutral-600">
              {item.question}
            </span>
          </LocaleTransition>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1V13M1 7H13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-12">
              <LocaleTransition>
                <p className="max-w-2xl text-base leading-relaxed text-neutral-500">
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
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const faqItems: FaqItem[] = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 bg-white py-32 lg:py-48">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <LocaleTransition>
            <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
              {t.faq.label}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
              {t.faq.title}{" "}
              <span className="text-neutral-400">{t.faq.titleAccent}</span>
            </h2>
          </LocaleTransition>
        </motion.div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-2 sm:p-4">
          {faqItems.map((item, i) => (
            <FaqAccordion
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
