"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group cursor-pointer"
    >
      <div className="relative mb-6 overflow-hidden rounded-2xl bg-neutral-100">
        <motion.div
          style={{ y: imgY }}
          className="flex aspect-[4/3] items-center justify-center transition-transform duration-700 group-hover:scale-105"
        >
          {/* Placeholder with dynamic pattern */}
          <div className="relative flex h-full w-full items-center justify-center bg-neutral-100">
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id={`grid-${index}`}
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="black"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
              </svg>
            </div>
            <span className="font-mono text-6xl font-black text-neutral-200 transition-colors duration-500 group-hover:text-neutral-300 sm:text-8xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <LocaleTransition>
            <p className="text-sm text-white/90">{project.description}</p>
          </LocaleTransition>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-black transition-colors group-hover:text-neutral-600">
            {project.title}
          </h3>
          <LocaleTransition>
            <p className="mt-1 text-sm text-neutral-500">{project.category}</p>
          </LocaleTransition>
        </div>
        <span className="font-mono text-sm text-neutral-400">
          {project.year}
        </span>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const { t } = useI18n();

  const projects: Project[] = [
    {
      title: "Monochrome",
      category: t.projects.p1cat,
      year: "2025",
      description: t.projects.p1desc,
    },
    {
      title: "Void",
      category: t.projects.p2cat,
      year: "2025",
      description: t.projects.p2desc,
    },
    {
      title: "Silence",
      category: t.projects.p3cat,
      year: "2024",
      description: t.projects.p3desc,
    },
    {
      title: "Fragment",
      category: t.projects.p4cat,
      year: "2024",
      description: t.projects.p4desc,
    },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 bg-white py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <LocaleTransition>
              <span className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
                {t.projects.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                {t.projects.title}{" "}
                <span className="text-neutral-400">
                  {t.projects.titleAccent}
                </span>
              </h2>
            </LocaleTransition>
          </div>
          <a
            href="#contact"
            className="hidden text-sm font-medium text-neutral-500 transition-colors hover:text-black md:block"
          >
            <LocaleTransition className="inline">
              {t.projects.cta}
            </LocaleTransition>{" "}
            &rarr;
          </a>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
