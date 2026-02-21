"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: number;
  gradient: string;
}

function BlogCard({
  post,
  index,
  minReadLabel,
  readMoreLabel,
}: {
  post: BlogPost;
  index: number;
  minReadLabel: string;
  readMoreLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group cursor-pointer"
    >
      {/* Card with gradient accent */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-500 hover:border-neutral-300 hover:shadow-2xl">
        {/* Top gradient bar */}
        <div
          className={`h-1.5 w-full ${post.gradient} transition-all duration-500 group-hover:h-2`}
        />

        {/* Pattern background */}
        <div className="relative overflow-hidden bg-neutral-50 px-8 py-12">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id={`blog-pattern-${index}`}
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="1" fill="black" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill={`url(#blog-pattern-${index})`}
              />
            </svg>
          </div>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          >
            <LocaleTransition>
              <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-xs text-neutral-500">
                {post.tag}
              </span>
            </LocaleTransition>
          </motion.div>

          {/* Big number */}
          <span className="absolute right-6 bottom-4 font-mono text-7xl font-black text-neutral-100 transition-colors duration-500 group-hover:text-neutral-200">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs text-neutral-400">
            <LocaleTransition>
              <span>{post.date}</span>
            </LocaleTransition>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>
              {post.readTime} {minReadLabel}
            </span>
          </div>

          <LocaleTransition>
            <h3 className="mb-3 text-xl font-bold leading-tight text-black transition-colors group-hover:text-neutral-700">
              {post.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              {post.excerpt}
            </p>
          </LocaleTransition>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-black transition-all group-hover:gap-3">
            <LocaleTransition className="inline">
              {readMoreLabel}
            </LocaleTransition>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// AI sparkle icon
function AiSparkle() {
  return (
    <motion.span
      animate={{
        rotate: [0, 15, -15, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="inline-block"
    >
      ✦
    </motion.span>
  );
}

export function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const { t } = useI18n();

  const posts: BlogPost[] = [
    {
      title: t.blog.post1title,
      excerpt: t.blog.post1excerpt,
      date: t.blog.post1date,
      tag: t.blog.post1tag,
      readTime: 5,
      gradient: "bg-gradient-to-r from-black to-neutral-600",
    },
    {
      title: t.blog.post2title,
      excerpt: t.blog.post2excerpt,
      date: t.blog.post2date,
      tag: t.blog.post2tag,
      readTime: 8,
      gradient: "bg-gradient-to-r from-neutral-600 to-neutral-400",
    },
    {
      title: t.blog.post3title,
      excerpt: t.blog.post3excerpt,
      date: t.blog.post3date,
      tag: t.blog.post3tag,
      readTime: 6,
      gradient: "bg-gradient-to-r from-neutral-400 to-neutral-300",
    },
  ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative z-10 bg-neutral-50 py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <LocaleTransition>
              <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
                <AiSparkle /> {t.blog.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                {t.blog.title}{" "}
                <span className="text-neutral-400">{t.blog.titleAccent}</span>
              </h2>
            </LocaleTransition>
          </div>

          <a
            href="#"
            className="hidden text-sm font-medium text-neutral-500 transition-colors hover:text-black md:block"
          >
            <LocaleTransition className="inline">
              {t.blog.allPosts}
            </LocaleTransition>{" "}
            →
          </a>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard
              key={post.title}
              post={post}
              index={i}
              minReadLabel={t.blog.minRead}
              readMoreLabel={t.blog.readMore}
            />
          ))}
        </div>

        {/* AI generated label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 font-mono text-xs text-neutral-400">
            <AiSparkle /> Generated with AI • Curated by humans
          </span>
        </motion.div>
      </div>
    </section>
  );
}
