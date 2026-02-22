"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";
import { Logo } from "@/components/logo";

const socials = [
  { name: "Telegram", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "Dribbble", href: "#" },
  { name: "Twitter", href: "#" },
];

const footerLinks = [
  { labelRu: "О нас", labelEn: "About", href: "#about" },
  { labelRu: "Услуги", labelEn: "Services", href: "#services" },
  { labelRu: "Работы", labelEn: "Work", href: "#projects" },
  { labelRu: "Блог", labelEn: "Blog", href: "#blog" },
];

/* ── Magnetic link component ── */
function MagneticLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ── Contact form ── */
function ContactForm({ isInView, isRu }: { isInView: boolean; isRu: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="group relative">
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={isRu ? "Имя" : "Name"}
            className="peer w-full border-b-2 border-neutral-300 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
          />
        </div>
        <div className="group relative">
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder={isRu ? "Email" : "Email"}
            className="peer w-full border-b-2 border-neutral-300 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
          />
        </div>
      </div>
      <div className="group relative">
        <textarea
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder={
            isRu ? "Расскажите о проекте..." : "Tell us about your project..."
          }
          rows={4}
          className="peer w-full resize-none border-b-2 border-neutral-300 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
        />
      </div>
      <div className="pt-2">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-3 rounded-full border border-black bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-neutral-800"
        >
          {submitted
            ? isRu
              ? "Отправлено ✓"
              : "Sent ✓"
            : isRu
              ? "Отправить"
              : "Send message"}
          {!submitted && (
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const { t } = useI18n();
  const isRu = t.footer.rights.includes("защищены");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-32 lg:py-48"
    >
      {/* Background decorative */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-mono text-[20rem] font-black leading-none text-neutral-100 lg:text-[30rem]">
          @
        </span>
      </motion.div>

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
                {t.contact.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                {t.contact.title}{" "}
                <span className="text-neutral-300">
                  {t.contact.titleAccent}
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
            <LocaleTransition>
              <p className="max-w-sm text-sm leading-relaxed text-neutral-400 md:ml-auto">
                {t.contact.text}
              </p>
            </LocaleTransition>
          </motion.div>
        </div>

        {/* Two-column: form + info */}
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
          {/* Left: email + form (3 cols) */}
          <div className="lg:col-span-3">
            {/* Email — big magnetic link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-14"
            >
              <MagneticLink
                href="mailto:hello@not-found.tech"
                className="group relative inline-block"
              >
                <span className="text-2xl font-bold tracking-tight text-black transition-colors duration-300 group-hover:text-neutral-500 sm:text-3xl lg:text-4xl">
                  hello@not-found.tech
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-px w-full origin-left bg-black/20"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </MagneticLink>
            </motion.div>

            {/* Contact form */}
            <ContactForm isInView={isInView} isRu={isRu} />
          </div>

          {/* Right: socials + location (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-12 lg:col-span-2"
          >
            {/* Social links */}
            <div>
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-neutral-400">
                Social
              </span>
              <div className="flex flex-col">
                {socials.map((social, i) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={social.href}
                      className="group flex items-center justify-between border-b border-neutral-200 py-4 transition-colors hover:border-black"
                    >
                      <span className="text-base font-medium text-neutral-700 transition-colors group-hover:text-black">
                        {social.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-neutral-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location / timezone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex gap-10"
            >
              <div>
                <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Location
                </span>
                <span className="text-sm font-medium text-neutral-700">
                  Moscow, Russia
                </span>
              </div>
              <div>
                <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Hours
                </span>
                <span className="text-sm font-medium text-neutral-700">
                  10:00 — 19:00 MSK
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const isRu = t.footer.rights.includes("защищены");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-neutral-200 bg-neutral-50 py-8">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
          {/* Left: logo + copyright */}
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex">
              <Logo variant="light" size="small" />
            </a>
            <span className="h-3 w-px bg-neutral-200" />
            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <span>&copy; {year}</span>
              <span>·</span>
              <LocaleTransition className="inline">
                <span>{t.footer.rights}</span>
              </LocaleTransition>
            </div>
          </div>

          {/* Right: nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-neutral-400 transition-colors duration-200 hover:text-black"
              >
                {isRu ? link.labelRu : link.labelEn}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
