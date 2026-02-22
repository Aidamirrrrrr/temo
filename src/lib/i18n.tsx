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
      blog: "Блог",
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
    process: {
      label: "Как мы работаем",
      title: "Прозрачный",
      titleAccent: "процесс",
      step1: "Бриф и аналитика",
      step1desc:
        "Погружаемся в бизнес-задачу. Анализируем рынок, конкурентов, целевую аудиторию. Формируем чёткое ТЗ и роадмап проекта.",
      step2: "Дизайн и прототип",
      step2desc:
        "Создаём wireframes и интерактивные прототипы. Тестируем UX на реальных сценариях. Утверждаем визуальный стиль.",
      step3: "Разработка",
      step3desc:
        "Пишем чистый, типизированный код. Еженедельные демо и ревью. CI/CD с первого дня — никаких сюрпризов при деплое.",
      step4: "Запуск и поддержка",
      step4desc:
        "Деплоим проект, настраиваем мониторинг и аналитику. Остаёмся на связи для итераций и масштабирования.",
    },
    stack: {
      label: "Наш стек",
      title: "Технологии, которым",
      titleAccent: "доверяем",
      frontend: "Фронтенд",
      backend: "Бэкенд",
      tools: "Инструменты",
      infra: "Инфраструктура",
    },
    testimonials: {
      label: "Отзывы",
      title: "Клиенты",
      titleAccent: "говорят",
      t1name: "Алексей Петров",
      t1role: "CEO, FinanceApp",
      t1text:
        "NotFound полностью переделали наш продукт. Скорость загрузки упала в 3 раза, конверсия выросла на 42%. Работать с командой — одно удовольствие.",
      t2name: "Мария Соколова",
      t2role: "CTO, EduTech",
      t2text:
        "Ребята вникают в задачу как никто. Мы пришли с идеей — ушли с готовым SaaS-продуктом, который уже генерирует выручку.",
      t3name: "Дмитрий Волков",
      t3role: "Founder, E-commerce Platform",
      t3text:
        "Третий раз работаем с NotFound. Каждый проект — как часы: вовремя, в бюджете, без компромиссов по качеству.",
      t4name: "Анна Козлова",
      t4role: "Product Manager, HealthTech",
      t4text:
        "Интеграция с 5 внешними API за 3 недели, включая платёжку и аналитику. Такой скорости не ожидали. Рекомендуем.",
    },
    blog: {
      label: "Блог",
      title: "Пишем о",
      titleAccent: "важном",
      readMore: "Читать",
      allPosts: "Все статьи",
      minRead: "мин чтения",
      post1title: "Почему Next.js — лучший выбор для стартапа в 2026",
      post1excerpt:
        "Разбираем преимущества Server Components, streaming SSR и почему это критично для стартапов с ограниченным бюджетом.",
      post1date: "18 фев 2026",
      post1tag: "Разработка",
      post2title: "Как мы сократили время загрузки на 70% с Edge Runtime",
      post2excerpt:
        "Кейс оптимизации высоконагруженного SaaS-приложения: от 3.2s до 0.9s TTI. Конкретные шаги и метрики.",
      post2date: "12 фев 2026",
      post2tag: "Перформанс",
      post3title: "Дизайн-система с нуля: наш подход",
      post3excerpt:
        "Как мы строим масштабируемые UI-библиотеки для клиентов на базе shadcn/ui и Tailwind CSS v4.",
      post3date: "5 фев 2026",
      post3tag: "Дизайн",
    },
    faq: {
      label: "FAQ",
      title: "Частые",
      titleAccent: "вопросы",
      q1: "Сколько стоит разработка сайта?",
      a1: "Стоимость зависит от сложности проекта. Лендинг — от 150 000 ₽, веб-приложение — от 500 000 ₽. Мы всегда начинаем с бесплатной оценки.",
      q2: "Какие сроки разработки?",
      a2: "Лендинг — 2–4 недели. Веб-приложение средней сложности — 2–3 месяца. Сложный SaaS — от 4 месяцев. Точные сроки фиксируем после брифа.",
      q3: "Какой стек вы используете?",
      a3: "React, Next.js, TypeScript, Node.js, PostgreSQL, Prisma. Для мобильных — React Native. Всегда выбираем стек под задачу, а не наоборот.",
      q4: "Работаете ли вы с зарубежными клиентами?",
      a4: "Да, работаем с клиентами из любых стран. Коммуникация на русском и английском. Принимаем оплату в разных валютах.",
      q5: "Что входит в поддержку после запуска?",
      a5: "Мониторинг, исправление багов, обновление зависимостей, мелкие доработки. Предлагаем пакеты поддержки от 8 часов в месяц.",
    },
    ctaBanner: {
      title: "Давайте построим",
      titleAccent: "ваш продукт",
      text: "Бесплатная консультация и оценка проекта за 24 часа. Без обязательств.",
      cta: "Получить оценку бесплатно",
      stat1val: "42%",
      stat1label: "рост конверсии",
      stat2val: "24ч",
      stat2label: "время ответа",
      stat3val: "50+",
      stat3label: "проектов",
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
      blog: "Blog",
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
    process: {
      label: "How we work",
      title: "Transparent",
      titleAccent: "process",
      step1: "Brief & Research",
      step1desc:
        "We dive deep into the business challenge. Analyze the market, competitors, target audience. Create a clear spec and project roadmap.",
      step2: "Design & Prototype",
      step2desc:
        "We craft wireframes and interactive prototypes. Test UX on real scenarios. Finalize the visual direction.",
      step3: "Development",
      step3desc:
        "Clean, typed code. Weekly demos and reviews. CI/CD from day one — no surprises at deployment.",
      step4: "Launch & Support",
      step4desc:
        "We deploy, set up monitoring and analytics. Stay available for iterations and scaling.",
    },
    stack: {
      label: "Our stack",
      title: "Technologies we",
      titleAccent: "trust",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
      infra: "Infrastructure",
    },
    testimonials: {
      label: "Testimonials",
      title: "Clients",
      titleAccent: "speak",
      t1name: "Alex Petrov",
      t1role: "CEO, FinanceApp",
      t1text:
        "NotFound completely rebuilt our product. Load time dropped 3x, conversion grew 42%. Working with the team is a pleasure.",
      t2name: "Maria Sokolova",
      t2role: "CTO, EduTech",
      t2text:
        "These guys understand the problem like no one else. We came with an idea — left with a working SaaS product already generating revenue.",
      t3name: "Dmitry Volkov",
      t3role: "Founder, E-commerce Platform",
      t3text:
        "Third project with NotFound. Every single one — on time, on budget, no quality compromises.",
      t4name: "Anna Kozlova",
      t4role: "Product Manager, HealthTech",
      t4text:
        "Integration with 5 external APIs in 3 weeks, including payments and analytics. Didn't expect this speed. Highly recommend.",
    },
    blog: {
      label: "Blog",
      title: "We write about",
      titleAccent: "what matters",
      readMore: "Read",
      allPosts: "All posts",
      minRead: "min read",
      post1title: "Why Next.js is the best choice for startups in 2026",
      post1excerpt:
        "Breaking down Server Components, streaming SSR, and why it's critical for budget-conscious startups.",
      post1date: "Feb 18, 2026",
      post1tag: "Development",
      post2title: "How we cut load time by 70% with Edge Runtime",
      post2excerpt:
        "Optimizing a high-load SaaS app: from 3.2s to 0.9s TTI. Steps and metrics included.",
      post2date: "Feb 12, 2026",
      post2tag: "Performance",
      post3title: "Design system from scratch: our approach",
      post3excerpt:
        "How we build scalable UI libraries for clients using shadcn/ui and Tailwind CSS v4.",
      post3date: "Feb 5, 2026",
      post3tag: "Design",
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked",
      titleAccent: "questions",
      q1: "How much does website development cost?",
      a1: "Cost depends on complexity. Landing page — from $2,000, web app — from $7,000. We always start with a free estimate.",
      q2: "What are the typical timelines?",
      a2: "Landing page — 2–4 weeks. Medium-complexity web app — 2–3 months. Complex SaaS — from 4 months. Exact timelines fixed after the brief.",
      q3: "What tech stack do you use?",
      a3: "React, Next.js, TypeScript, Node.js, PostgreSQL, Prisma. For mobile — React Native. We always choose the stack for the task, not the other way around.",
      q4: "Do you work with international clients?",
      a4: "Yes, we work with clients worldwide. Communication in Russian and English. We accept payments in multiple currencies.",
      q5: "What's included in post-launch support?",
      a5: "Monitoring, bug fixes, dependency updates, minor improvements. We offer support packages starting from 8 hours per month.",
    },
    ctaBanner: {
      title: "Let's build",
      titleAccent: "your product",
      text: "Free consultation and project estimate within 24 hours. No strings attached.",
      cta: "Get a free estimate",
      stat1val: "42%",
      stat1label: "conversion growth",
      stat2val: "24h",
      stat2label: "response time",
      stat3val: "50+",
      stat3label: "projects",
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
