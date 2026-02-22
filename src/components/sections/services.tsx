"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Monitor, Layers, Plug, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const services = [
    {
      icon: Monitor,
      title: t.services.branding,
      description: t.services.brandingDesc,
      num: "01",
    },
    {
      icon: Code,
      title: t.services.webdev,
      description: t.services.webdevDesc,
      num: "02",
    },
    {
      icon: Layers,
      title: t.services.uiux,
      description: t.services.uiuxDesc,
      num: "03",
    },
    {
      icon: Plug,
      title: t.services.motion,
      description: t.services.motionDesc,
      num: "04",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-32 lg:py-48"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 grid gap-8 md:mb-24 md:grid-cols-2 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <LocaleTransition>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
                <span className="inline-block h-px w-8 bg-neutral-300" />
                {t.services.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                {t.services.title}{" "}
                <span className="text-neutral-300">
                  {t.services.titleAccent}
                </span>
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
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              <LocaleTransition className="inline">
                {t.services.branding.includes("Веб")
                  ? "Обсудить проект"
                  : "Discuss a project"}
              </LocaleTransition>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Services grid — 2×2 cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i;
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
              >
                {/* Hover bg */}
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Card content */}
                <div className="relative z-10 flex h-full min-h-52 flex-col justify-between lg:min-h-60">
                  {/* Top: number + icon */}
                  <div className="flex items-start justify-between">
                    <motion.span
                      animate={{ color: isHovered ? "#737373" : "#d4d4d4" }}
                      transition={{ duration: 0.5 }}
                      className="font-mono text-sm"
                    >
                      {service.num}
                    </motion.span>
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? -8 : 0,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Icon
                        className={`h-7 w-7 transition-colors duration-500 ${
                          isHovered ? "text-white" : "text-neutral-300"
                        }`}
                        strokeWidth={1.2}
                      />
                    </motion.div>
                  </div>

                  {/* Bottom: title + description */}
                  <div>
                    <LocaleTransition>
                      <h3
                        className={`mb-3 text-xl font-bold transition-colors duration-500 lg:text-2xl ${
                          isHovered ? "text-white" : "text-black"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-500 ${
                          isHovered ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        {service.description}
                      </p>
                    </LocaleTransition>
                  </div>
                </div>

                {/* Corner arrow on hover */}
                <motion.div
                  className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
