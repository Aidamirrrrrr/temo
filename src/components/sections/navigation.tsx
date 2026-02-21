"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useI18n, type Locale } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { locale, t, setLocale } = useI18n();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <a href="#" className="group flex items-center gap-1">
          <span className="font-mono text-xl font-bold tracking-tighter text-black">
            Not
          </span>
          <span className="font-mono text-xl font-bold tracking-tighter text-neutral-400 transition-colors group-hover:text-black">
            Found
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              <LocaleTransition className="inline">
                {item.name}
              </LocaleTransition>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
            className="font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 transition-colors hover:text-black"
          >
            {locale === "ru" ? "EN" : "RU"}
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 text-sm font-medium text-black transition-opacity hover:opacity-60 md:inline-flex"
          >
            <LocaleTransition className="inline">{t.nav.cta}</LocaleTransition>
            <span className="leading-none">&rarr;</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
