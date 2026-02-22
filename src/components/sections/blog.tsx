"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: number;
  accent: string;
}

/* ── Featured (large) article card ── */
function FeaturedCard({
  post,
  minReadLabel,
  readMoreLabel,
  isInView,
}: {
  post: BlogPost;
  minReadLabel: string;
  readMoreLabel: string;
  isInView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.04), transparent 60%)`,
  );

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-neutral-900 md:col-span-2 md:row-span-2"
    >
      {/* Radial spotlight that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="featured-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#featured-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex h-full min-h-96 flex-col justify-between p-8 lg:p-12">
        {/* Top row: tag + date */}
        <div className="flex items-center justify-between">
          <LocaleTransition>
            <span className="rounded-full border border-neutral-700 bg-neutral-800 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-neutral-300">
              {post.tag}
            </span>
          </LocaleTransition>
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
            <LocaleTransition>
              <span>{post.date}</span>
            </LocaleTransition>
            <span className="h-1 w-1 rounded-full bg-neutral-600" />
            <span>
              {post.readTime} {minReadLabel}
            </span>
          </div>
        </div>

        {/* Bottom: title + excerpt + CTA */}
        <div className="mt-auto pt-12">
          <LocaleTransition>
            <h3 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl xl:text-5xl">
              {post.title}
            </h3>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-neutral-400 lg:text-lg">
              {post.excerpt}
            </p>
          </LocaleTransition>

          <span className="inline-flex items-center gap-3 text-sm font-medium text-white transition-all duration-300 group-hover:gap-4">
            <LocaleTransition className="inline">
              {readMoreLabel}
            </LocaleTransition>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </span>
          </span>
        </div>
      </div>

      {/* Decorative corner number */}
      <span className="pointer-events-none absolute right-8 bottom-8 font-mono text-9xl font-black text-white/3 lg:right-12 lg:bottom-12">
        01
      </span>
    </motion.article>
  );
}

/* ── Compact article card ── */
function CompactCard({
  post,
  index,
  minReadLabel,
  readMoreLabel,
  isInView,
}: {
  post: BlogPost;
  index: number;
  minReadLabel: string;
  readMoreLabel: string;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.15 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900"
    >
      {/* Accent line on left */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1 rounded-full bg-white"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 p-6 lg:p-8">
        {/* Tag + date */}
        <div className="mb-5 flex items-center justify-between">
          <LocaleTransition>
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              {post.tag}
            </span>
          </LocaleTransition>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-600">
            <LocaleTransition>
              <span>{post.date}</span>
            </LocaleTransition>
            <span className="text-neutral-700">•</span>
            <span>
              {post.readTime} {minReadLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <LocaleTransition>
          <h3 className="mb-3 text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-neutral-200 lg:text-xl">
            {post.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-neutral-500">
            {post.excerpt}
          </p>
        </LocaleTransition>

        {/* Read more */}
        <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors duration-300 group-hover:text-white">
          <LocaleTransition className="inline">
            {readMoreLabel}
          </LocaleTransition>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* Decorative number */}
      <span className="pointer-events-none absolute right-6 bottom-4 font-mono text-6xl font-black text-white/3">
        {String(index + 2).padStart(2, "0")}
      </span>
    </motion.article>
  );
}

/* ── Floating keyword pills ── */
function FloatingPills({ isInView }: { isInView: boolean }) {
  const pills = [
    "Next.js",
    "React 19",
    "Edge Runtime",
    "TypeScript",
    "Design Systems",
    "Performance",
    "SSR",
    "Tailwind",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
      className="mt-16 flex flex-wrap justify-center gap-3"
    >
      {pills.map((pill, i) => (
        <motion.span
          key={pill}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.6 + i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1.5 font-mono text-xs text-neutral-500 backdrop-blur-sm"
        >
          {pill}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const { t } = useI18n();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const posts: BlogPost[] = [
    {
      title: t.blog.post1title,
      excerpt: t.blog.post1excerpt,
      date: t.blog.post1date,
      tag: t.blog.post1tag,
      readTime: 5,
      accent: "#ffffff",
    },
    {
      title: t.blog.post2title,
      excerpt: t.blog.post2excerpt,
      date: t.blog.post2date,
      tag: t.blog.post2tag,
      readTime: 8,
      accent: "#ffffff",
    },
    {
      title: t.blog.post3title,
      excerpt: t.blog.post3excerpt,
      date: t.blog.post3date,
      tag: t.blog.post3tag,
      readTime: 6,
      accent: "#ffffff",
    },
  ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-32 lg:py-48"
    >
      {/* Background glow orbs */}
      <motion.div
        style={{ y: floatY }}
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-neutral-200/50 blur-3xl"
      />
      <motion.div
        style={{ y: floatY }}
        className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-neutral-200/50 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <LocaleTransition>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
                <span className="inline-block h-px w-8 bg-neutral-300" />
                {t.blog.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                {t.blog.title}{" "}
                <span className="text-neutral-300">{t.blog.titleAccent}</span>
              </h2>
            </LocaleTransition>
          </div>

          <a
            href="#"
            className="group/link hidden items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-black md:inline-flex"
          >
            <LocaleTransition className="inline">
              {t.blog.allPosts}
            </LocaleTransition>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Grid: featured + 2 compact */}
        <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
          <FeaturedCard
            post={posts[0]}
            minReadLabel={t.blog.minRead}
            readMoreLabel={t.blog.readMore}
            isInView={isInView}
          />
          {posts.slice(1).map((post, i) => (
            <CompactCard
              key={post.title}
              post={post}
              index={i}
              minReadLabel={t.blog.minRead}
              readMoreLabel={t.blog.readMore}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Keyword pills */}
        <FloatingPills isInView={isInView} />

        {/* Mobile all posts link */}
        <div className="mt-10 text-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-black"
          >
            <LocaleTransition className="inline">
              {t.blog.allPosts}
            </LocaleTransition>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
