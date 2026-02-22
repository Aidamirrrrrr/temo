"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n, type Locale } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";
import { Logo } from "@/components/logo";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { scrollY } = useScroll();
  const { locale, t, setLocale } = useI18n();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Detect dark-background sections via data-nav-theme="dark"
  useEffect(() => {
    const darkSections = document.querySelectorAll<HTMLElement>(
      '[data-nav-theme="dark"]',
    );
    if (!darkSections.length) return;

    const activeDark = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeDark.add(entry.target);
          } else {
            activeDark.delete(entry.target);
          }
        }
        setIsDark(activeDark.size > 0);
      },
      {
        rootMargin: "0px 0px -95% 0px", // only top ~5% of viewport
      },
    );

    for (const el of darkSections) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.blog, href: "#blog" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? "bg-neutral-950 backdrop-blur-xl border-b border-white/5"
            : "bg-white/80 backdrop-blur-xl border-b border-neutral-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <a href="#" className="inline-flex">
          <Logo variant={isDark ? "dark" : "light"} />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative text-sm font-medium transition-colors duration-500 ${
                isDark
                  ? "text-neutral-400 hover:text-white"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              <LocaleTransition className="inline">
                {item.name}
              </LocaleTransition>
              <span
                className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                  isDark ? "bg-white" : "bg-black"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
            className={`font-mono text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${
              isDark
                ? "text-neutral-500 hover:text-white"
                : "text-neutral-400 hover:text-black"
            }`}
          >
            {locale === "ru" ? "EN" : "RU"}
          </button>
          <a
            href="#contact"
            className={`hidden items-center gap-1.5 text-sm font-medium transition-all duration-500 md:inline-flex ${
              isDark
                ? "text-white hover:opacity-60"
                : "text-black hover:opacity-60"
            }`}
          >
            <LocaleTransition className="inline">{t.nav.cta}</LocaleTransition>
            <span className="leading-none">&rarr;</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
