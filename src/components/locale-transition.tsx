"use client";

import { useI18n } from "@/lib/i18n";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

/**
 * Animates text on locale change with a slide-up reveal effect.
 * Container keeps its size via overflow:hidden — no layout shift.
 *
 * Phase 1: old text slides up & fades out (200ms)
 * Phase 2: new text slides up from below & fades in (300ms)
 */
export function LocaleTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { locale } = useI18n();
  const prevLocale = useRef(locale);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const [displayChildren, setDisplayChildren] = useState(children);

  // Store latest children for phase transitions
  const latestChildren = useRef(children);
  latestChildren.current = children;

  useEffect(() => {
    if (prevLocale.current !== locale) {
      prevLocale.current = locale;

      // Phase 1: slide old text out (up)
      setPhase("out");

      const t1 = setTimeout(() => {
        // Swap content while invisible
        setDisplayChildren(latestChildren.current);
        // Phase 2: slide new text in (from below)
        setPhase("in");
      }, 200);

      const t2 = setTimeout(() => {
        setPhase("idle");
      }, 500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    // Update children normally when not switching
    setDisplayChildren(children);
  }, [locale, children]);

  const getStyle = useCallback((): React.CSSProperties => {
    switch (phase) {
      case "out":
        return {
          transform: "translateY(-100%)",
          opacity: 0,
          transition:
            "transform 0.2s cubic-bezier(0.4, 0, 1, 1), opacity 0.15s ease",
        };
      case "in":
        return {
          transform: "translateY(0)",
          opacity: 1,
          transition:
            "transform 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.3s ease",
        };
      default:
        return {
          transform: "translateY(0)",
          opacity: 1,
          transition: "none",
        };
    }
  }, [phase]);

  // When phase is "in", we need to start from below
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    if (phase === "in") {
      // Force a reflow so "from below" starting position applies
      setMounted(false);
      requestAnimationFrame(() => {
        setMounted(true);
      });
    }
  }, [phase]);

  const inStartStyle: React.CSSProperties =
    phase === "in" && !mounted
      ? { transform: "translateY(60%)", opacity: 0, transition: "none" }
      : getStyle();

  return (
    <span
      className={className}
      style={{
        overflow: "hidden",
        display: "inline-block",
        verticalAlign: "baseline",
      }}
    >
      <span
        style={{
          display: "inline-block",
          ...inStartStyle,
        }}
      >
        {displayChildren}
      </span>
    </span>
  );
}
