"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

const socials = [
  { name: "Telegram", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "Dribbble", href: "#" },
  { name: "Twitter", href: "#" },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const { t } = useI18n();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center"
        >
          <LocaleTransition>
            <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
              {t.contact.label}
            </span>

            <h2 className="mx-auto mb-8 text-6xl font-bold leading-none tracking-tight text-black sm:text-7xl md:text-8xl lg:text-9xl">
              {t.contact.title}{" "}
              <span className="italic text-neutral-300">
                {t.contact.titleAccent}
              </span>
            </h2>
          </LocaleTransition>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-12 max-w-md text-lg text-neutral-500"
          >
            <LocaleTransition>{t.contact.text}</LocaleTransition>
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            href="mailto:hello@not-found.tech"
            className="group relative inline-block text-2xl font-medium text-black sm:text-3xl"
          >
            hello@not-found.tech
            <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-left scale-x-0 bg-black transition-transform duration-500 group-hover:scale-x-100" />
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex justify-center gap-10"
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="group relative text-sm font-medium text-neutral-400 transition-colors hover:text-black"
            >
              {social.name}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-neutral-200 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
        <div className="flex items-center gap-1">
          <span className="font-mono text-sm font-bold tracking-tighter text-black">
            Not
          </span>
          <span className="font-mono text-sm font-bold tracking-tighter text-neutral-400">
            Found
          </span>
        </div>
        <p className="text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} NotFound Studio.{" "}
          <LocaleTransition className="inline">
            {t.footer.rights}
          </LocaleTransition>
        </p>
      </div>
    </footer>
  );
}
