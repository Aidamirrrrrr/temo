"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Monitor, Layers, Plug } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const { t } = useI18n();

  const services = [
    {
      icon: Monitor,
      title: t.services.branding,
      description: t.services.brandingDesc,
    },
    {
      icon: Code,
      title: t.services.webdev,
      description: t.services.webdevDesc,
    },
    {
      icon: Layers,
      title: t.services.uiux,
      description: t.services.uiuxDesc,
    },
    {
      icon: Plug,
      title: t.services.motion,
      description: t.services.motionDesc,
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 bg-neutral-50 py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
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
            <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
              {t.services.label}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
              {t.services.title}{" "}
              <span className="text-neutral-400">{t.services.titleAccent}</span>
            </h2>
          </LocaleTransition>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-colors duration-500 hover:bg-black"
            >
              {/* Fill animation */}
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-out group-hover:scale-y-100" />

              <div className="relative z-10">
                <service.icon
                  className="mb-6 h-8 w-8 text-black transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.5}
                />
                <LocaleTransition>
                  <h3 className="mb-3 text-xl font-bold text-black transition-colors duration-500 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500 transition-colors duration-500 group-hover:text-neutral-400">
                    {service.description}
                  </p>
                </LocaleTransition>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
