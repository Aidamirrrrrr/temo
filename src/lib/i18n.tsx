"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "ru" | "en";

const dictionaries = {
  ru: {
    nav: {
      about: "О нас",
      services: "Услуги",
      work: "Работы",
      contact: "Контакт",
      cta: "Написать",
    },
    hero: {
      line1: "Создаём",
      line2: "digital-продукты",
      subtitle1: "Студия разработки, сфокусированная на результате.",
      subtitle2: "Код, дизайн, запуск.",
      cta: "Смотреть работы",
      scroll: "Скролл",
    },
    about: {
      label: "О нас",
      title: "Мы команда, которая превращает идеи в",
      titleAccent: "продукты",
      text1:
        "NotFound — студия разработки, где каждый проект начинается с глубокого погружения в задачу. Мы проектируем и разрабатываем веб-приложения, сайты и цифровые сервисы, которые решают реальные бизнес-задачи.",
      text2:
        "Наш стек — современные технологии: React, Next.js, TypeScript, Node.js. Мы не просто пишем код — мы создаём продукты, которыми удобно пользоваться и легко масштабировать.",
      stat1: "Лет опыта",
      stat2: "Реализованных проектов",
      stat3: "Довольных клиентов",
    },
    services: {
      label: "Что мы делаем",
      title: "Услуги, созданные с",
      titleAccent: "точностью",
      branding: "Веб-приложения",
      brandingDesc:
        "Разрабатываем SPA и fullstack-приложения на React и Next.js. Быстрые, масштабируемые, с продуманным UX.",
      webdev: "Сайты и лендинги",
      webdevDesc:
        "Создаём сайты с высокой конверсией на современном стеке. SEO-оптимизация, адаптивность, скорость загрузки.",
      uiux: "UI/UX дизайн",
      uiuxDesc:
        "Проектируем интерфейсы, которые ощущаются естественно. От прототипа до готового дизайна в Figma.",
      motion: "Интеграции и API",
      motionDesc:
        "Подключаем платёжные системы, CRM, аналитику и любые сторонние сервисы. Надёжная архитектура бэкенда.",
    },
    projects: {
      label: "Избранные работы",
      title: "Наши",
      titleAccent: "проекты",
      cta: "Начать проект",
      p1cat: "Веб-приложение",
      p1desc:
        "SaaS-платформа для управления проектами с real-time функционалом",
      p2cat: "E-commerce",
      p2desc: "Интернет-магазин с кастомной CMS и интеграцией платёжных систем",
      p3cat: "Мобильное приложение",
      p3desc: "Кроссплатформенное приложение для фитнес-трекинга",
      p4cat: "Корпоративный сайт",
      p4desc: "Высоконагруженный портал для финтех-компании",
    },
    contact: {
      label: "Свяжитесь с нами",
      title: "Давайте",
      titleAccent: "создадим",
      text: "Есть идея продукта? Расскажите о задаче — мы предложим решение и оценим сроки. От концепции до запуска.",
    },
    footer: {
      rights: "Все права защищены.",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      work: "Work",
      contact: "Contact",
      cta: "Let's talk",
    },
    hero: {
      line1: "We build",
      line2: "digital products",
      subtitle1: "Development studio focused on results.",
      subtitle2: "Code, design, launch.",
      cta: "View our work",
      scroll: "Scroll",
    },
    about: {
      label: "About us",
      title: "We are a team that turns ideas into",
      titleAccent: "products",
      text1:
        "NotFound is a development studio where every project starts with deep understanding of the problem. We design and build web apps, websites, and digital services that solve real business challenges.",
      text2:
        "Our stack is modern tech: React, Next.js, TypeScript, Node.js. We don't just write code — we build products that are easy to use and scale.",
      stat1: "Years of experience",
      stat2: "Projects delivered",
      stat3: "Happy clients",
    },
    services: {
      label: "What we do",
      title: "Services crafted with",
      titleAccent: "precision",
      branding: "Web Applications",
      brandingDesc:
        "We build SPA and fullstack apps with React and Next.js. Fast, scalable, with thoughtful UX.",
      webdev: "Websites & Landing Pages",
      webdevDesc:
        "High-converting websites on a modern stack. SEO-optimized, responsive, blazing fast.",
      uiux: "UI/UX Design",
      uiuxDesc:
        "We design interfaces that feel natural. From wireframes to pixel-perfect Figma designs.",
      motion: "Integrations & API",
      motionDesc:
        "Payment systems, CRMs, analytics, and third-party services. Reliable backend architecture.",
    },
    projects: {
      label: "Selected work",
      title: "Recent",
      titleAccent: "projects",
      cta: "Start a project",
      p1cat: "Web App",
      p1desc: "SaaS platform for project management with real-time features",
      p2cat: "E-commerce",
      p2desc: "Online store with custom CMS and payment integration",
      p3cat: "Mobile App",
      p3desc: "Cross-platform fitness tracking application",
      p4cat: "Corporate Website",
      p4desc: "High-load portal for a fintech company",
    },
    contact: {
      label: "Get in touch",
      title: "Let's",
      titleAccent: "build",
      text: "Have a product idea? Tell us about the challenge — we'll propose a solution and estimate timelines. From concept to launch.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

type Dictionary = DeepStringify<(typeof dictionaries)["ru"]>;

interface I18nContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = dictionaries[locale];

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
