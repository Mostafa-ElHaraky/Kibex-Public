"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Zap, ArrowRight, Shield, Database, 
  Cpu, Layers, Globe, Server, Check, X,
  Rocket, TrendingUp, BarChart3, Settings,
  Code2, Users, Layout, Smartphone, Lock, 
  Activity, Terminal, Network, Link as LinkIcon,
  AlertCircle, DollarSign, TrendingDown, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PlatformDiagnosticPopup from "./PlatformDiagnosticPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import s from "./platformy.module.css";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (!isInView) return;
    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }
    const target = parseFloat(numMatch[0]);
    const suffix = value.replace(numMatch[0], "");
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * easedProgress;
      const formatted = value.includes(".") ? current.toFixed(2) : Math.floor(current).toString();
      setDisplayValue(formatted + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue || "0"}</span>;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${s.faqItem} ${open ? s.faqOpen : ""}`} itemScope itemType="https://schema.org/Question">
      <button className={s.faqButton} onClick={() => setOpen(!open)} itemProp="name">
        <span className={s.faqQuestion}>{q}</span>
        <motion.span className={s.faqIcon} animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer"
          >
            <div className={s.faqAnswer} itemProp="text">
              {a}
              <div className={s.engNote}>// Примечание инженера: архитектурное решение проектируется индивидуально под бизнес-логику проекта.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



// ─── DATA ─────────────────────────────────────────────────────────────────────

const businessPains = [
  { className: "painCardSale", title: "Упущенные продажи", desc: "Сайт тормозит при пиковых нагрузках, клиенты уходят к конкурентам из-за медленной загрузки каталога." },
  { className: "painCardError", title: "Ошибки интеграций", desc: "Нестабильный обмен данными с 1С и ERP приводит к неверным остаткам и сорванным заказам." },
  { className: "painCardExpensive", title: "Дорогая эксплуатация", desc: "Технические ограничения WordPress и Bitrix требуют всё больших бюджетов на доработки и поддержку." },
  { className: "painCardSecurity", title: "Риски безопасности", desc: "Устаревшие CMS становятся уязвимыми для атак, угрожая потерей данных клиентов и репутации." },
];

const whatWeBuild = [
  { icon: Smartphone, title: "Интернет-магазины", desc: "Разработка e-commerce платформ для крупных брендов с высокими требованиями к скорости." },
  { icon: Layout, title: "B2B платформы", desc: "Создание систем автоматизации оптовых продаж и дистрибуции с интеграцией ERP." },
  { icon: Globe, title: "Маркетплейсы", desc: "Масштабируемые площадки для тысяч продавцов и миллионов товаров (SKU)." },
  { icon: Database, title: "Нагруженные каталоги", desc: "Архитектура для мгновенного поиска и фильтрации товаров в реальном времени." },
  { icon: Users, title: "Личные кабинеты", desc: "Персонализированные порталы для клиентов с интеграцией программ лояльности." },
  { icon: Layers, title: "Инфраструктурные ядра", desc: "Центральные шины данных (ESB) для управления всей экосистемой бизнеса." },
];

const FrontendVisual = () => {
  return (
    <div className={s.feWireframe}>
      <div className={s.feHeader}>
        <div className={s.feLogo} />
        <div className={s.feNav}>
          <div className={s.feNavItem} />
          <div className={s.feNavItem} />
        </div>
        <div className={s.feUser} />
      </div>
      <div className={s.feGrid}>
        <div className={`${s.feCard} ${s.feCard1Active}`}>
          <div className={s.feImg}>
            <div className={s.feShimmer} />
          </div>
          <div className={s.feTitle} />
          <div className={s.fePrice} />
        </div>
        <div className={`${s.feCard} ${s.feCard2Active}`}>
          <div className={s.feImg}>
            <div className={s.feShimmer} />
          </div>
          <div className={s.feTitle} />
          <div className={s.fePrice} />
        </div>
      </div>
      <div className={s.feCursor} />
    </div>
  );
};

const APIGatewayVisual = () => {
  return (
    <svg className={s.apiGatewaySvg} viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 40 L200 120" className={s.apiPulseLine} />
      <path d="M300 40 L200 120" className={s.apiPulseLine} />
      <path d="M200 120 L60 200" className={s.apiPulseLine} />
      <path d="M200 120 L150 200" className={s.apiPulseLine} />
      <path d="M200 120 L250 200" className={s.apiPulseLine} />
      <path d="M200 120 L340 200" className={s.apiPulseLine} />
      <circle cx="100" cy="40" r="16" className={s.apiNode} />
      <text x="100" y="44" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="800" textAnchor="middle">WEB</text>
      <circle cx="300" cy="40" r="16" className={s.apiNode} />
      <text x="300" y="44" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="800" textAnchor="middle">APP</text>
      <circle cx="200" cy="120" r="28" className={s.apiNodeActive} />
      <text x="200" y="124" fill="#fff" fontSize="10" fontWeight="900" textAnchor="middle">API</text>
      <circle cx="60" cy="200" r="16" className={s.apiNode} />
      <text x="60" y="204" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="800" textAnchor="middle">OMS</text>
      <circle cx="150" cy="200" r="16" className={s.apiNode} />
      <text x="150" y="204" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="800" textAnchor="middle">ERP</text>
      <circle cx="250" cy="200" r="16" className={s.apiNode} />
      <text x="250" y="204" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="800" textAnchor="middle">CRM</text>
      <circle cx="340" cy="200" r="16" className={s.apiNode} />
      <text x="340" y="204" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="800" textAnchor="middle">PAY</text>
    </svg>
  );
};

const CommerceCoreVisual = () => {
  return (
    <svg className={s.apiGatewaySvg} viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="120" r="40" fill="rgba(70, 51, 255, 0.05)" className={s.corePulse} />
      <circle cx="200" cy="120" r="55" fill="rgba(70, 51, 255, 0.02)" className={s.corePulse} style={{ animationDelay: "1.25s" }} />
      <line x1="200" y1="120" x2="80" y2="60" className={`${s.coreLine} ${s.coreLineActive}`} />
      <line x1="200" y1="120" x2="320" y2="60" className={`${s.coreLine} ${s.coreLineActive}`} />
      <line x1="200" y1="120" x2="80" y2="180" className={`${s.coreLine} ${s.coreLineActive}`} />
      <line x1="200" y1="120" x2="320" y2="180" className={`${s.coreLine} ${s.coreLineActive}`} />
      <circle cx="80" cy="60" r="22" className={s.apiNode} />
      <text x="80" y="64" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="800" textAnchor="middle">Заказы</text>
      <circle cx="320" cy="60" r="22" className={s.apiNode} />
      <text x="320" y="64" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="800" textAnchor="middle">Платежи</text>
      <circle cx="80" cy="180" r="22" className={s.apiNode} />
      <text x="80" y="184" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="800" textAnchor="middle">Скидки</text>
      <circle cx="320" cy="180" r="22" className={s.apiNode} />
      <text x="320" y="184" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="800" textAnchor="middle">Склад</text>
      <circle cx="200" cy="120" r="26" className={s.apiNodeActive} />
      <text x="200" y="123" fill="#fff" fontSize="10" fontWeight="900" textAnchor="middle">CORE</text>
    </svg>
  );
};

const ERPSyncVisual = () => {
  return (
    <svg className={s.apiGatewaySvg} viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M120 100 L280 100" className={`${s.erpSyncLine} ${s.erpSyncLineRight}`} />
      <path d="M280 140 L120 140" className={`${s.erpSyncLine} ${s.erpSyncLineLeft}`} />
      <rect x="20" y="80" width="80" height="80" rx="16" className={s.apiNodeActive} />
      <text x="60" y="116" fill="#fff" fontSize="10" fontWeight="900" textAnchor="middle">KIBEX</text>
      <text x="60" y="130" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="800" textAnchor="middle">CORE</text>
      <rect x="300" y="80" width="80" height="80" rx="16" className={s.apiNode} />
      <text x="340" y="116" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="900" textAnchor="middle">1С / ERP</text>
      <text x="340" y="130" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="800" textAnchor="middle">WMS</text>
    </svg>
  );
};

const InfrastructureVisual = () => {
  return (
    <svg className={s.apiGatewaySvg} viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="200" y1="50" x2="100" y2="120" className={s.coreLine} />
      <line x1="200" y1="50" x2="200" y2="120" className={s.coreLine} />
      <line x1="200" y1="50" x2="300" y2="120" className={s.coreLine} />
      <line x1="100" y1="120" x2="120" y2="190" className={s.coreLine} />
      <line x1="200" y1="120" x2="200" y2="190" className={s.coreLine} />
      <line x1="300" y1="120" x2="280" y2="190" className={s.coreLine} />
      <path d="M220 190 H260" className={s.dbReplLine} />
      <rect x="170" y="30" width="60" height="28" rx="8" className={s.apiNodeActive} />
      <text x="200" y="47" fill="#fff" fontSize="8" fontWeight="900" textAnchor="middle">BALANCER</text>
      <rect x="75" y="105" width="50" height="28" rx="8" className={s.apiNode} />
      <text x="100" y="122" fill="rgba(255,255,255,0.7)" fontSize="8" fontWeight="800" textAnchor="middle">APP-01</text>
      <rect x="175" y="105" width="50" height="28" rx="8" className={s.apiNode} />
      <text x="200" y="122" fill="rgba(255,255,255,0.7)" fontSize="8" fontWeight="800" textAnchor="middle">APP-02</text>
      <rect x="275" y="105" width="50" height="28" rx="8" className={s.apiNode} />
      <text x="300" y="122" fill="rgba(255,255,255,0.7)" fontSize="8" fontWeight="800" textAnchor="middle">APP-03</text>
      <circle cx="120" cy="190" r="16" className={s.apiNode} />
      <text x="120" y="194" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="800" textAnchor="middle">REDIS</text>
      <circle cx="200" cy="190" r="16" className={s.apiNode} />
      <text x="200" y="194" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="800" textAnchor="middle">DB-M</text>
      <circle cx="280" cy="190" r="16" className={s.apiNode} />
      <text x="280" y="194" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="800" textAnchor="middle">DB-S</text>
    </svg>
  );
};

const SecurityVisual = () => {
  return (
    <svg className={s.apiGatewaySvg} viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="120" r="50" className={s.securityShield} strokeWidth="1.5" />
      <circle cx="150" cy="120" r="62" className={s.securityShield} strokeWidth="1" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
      <circle cx="150" cy="120" r="28" className={s.apiNodeActive} />
      <text x="150" y="124" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle">SECURE API</text>
      <rect x="270" y="60" width="100" height="120" rx="12" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
      <path d="M280 150 Q295 110, 310 130 T340 90 T360 110" className={s.monitorLine} />
      <text x="320" y="170" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="700" textAnchor="middle">REALTIME MON</text>
    </svg>
  );
};

const archLayersData = [
  {
    num: "01",
    label: "FRONTEND",
    title: "Frontend слой",
    stack: "Next.js · React · TypeScript",
    badge: "LCP < 1.0с",
    desc: "Высокоскоростной интерфейс с мгновенной загрузкой страниц, оптимизацией Core Web Vitals и серверным рендерингом.",
    Visual: FrontendVisual,
  },
  {
    num: "02",
    label: "API",
    title: "API-шлюз",
    stack: "REST · GraphQL · Webhooks",
    badge: "Задержка 12ms",
    desc: "Централизованный API-слой для синхронизации frontend, ERP, CRM, складов и внешних сервисов.",
    Visual: APIGatewayVisual,
  },
  {
    num: "03",
    label: "CORE LOGIC",
    title: "Слой бизнес-логики",
    stack: "OMS · Checkout · Pricing",
    badge: "Оркестрация в реальном времени",
    desc: "Ядро платформы управляет заказами, ценами, остатками, скидками и всей бизнес-логикой в реальном времени.",
    Visual: CommerceCoreVisual,
  },
  {
    num: "04",
    label: "INTEGRATIONS",
    title: "Интеграционный слой",
    stack: "1С · CRM · WMS · ERP",
    badge: "Синхронизация < 1.2s",
    desc: "Интеграционный слой обеспечивает стабильный обмен данными между платформой и внутренними системами компании.",
    Visual: ERPSyncVisual,
  },
  {
    num: "05",
    label: "INFRASTRUCTURE",
    title: "Инфраструктурный слой",
    stack: "Kubernetes · Redis · PostgreSQL",
    badge: "99.99% uptime",
    desc: "Отказоустойчивая highload инфраструктура с горизонтальным масштабированием и распределёнными сервисами.",
    Visual: InfrastructureVisual,
  },
  {
    num: "06",
    label: "SECURITY",
    title: "Безопасность и мониторинг",
    stack: "WAF · RBAC · Observability",
    badge: "Защищённая инфраструктура",
    desc: "Многоуровневая защита платформы, контроль доступа и мониторинг инфраструктуры в режиме реального времени.",
    Visual: SecurityVisual,
  },
];

const timelineSteps = [
  { n: "01", title: "Бизнес-аналитика", dur: "2–3 недели", out: "Архитектурная карта", desc: "Изучение бизнес-процессов, выявление проблем масштабирования и проектирование логики." },
  { n: "02", title: "Проектирование ядра", dur: "3–4 недели", out: "Техническое задание", desc: "Создание фундамента платформы, готовой к десятикратному росту нагрузок и каталога." },
  { n: "03", title: "Системная разработка", dur: "12–20 недель", out: "Рабочая платформа", desc: "Итеративная реализация компонентов e-commerce платформы с проверкой качества." },
  { n: "04", title: "Интеграции и API", dur: "4–6 недель", out: "Связанная среда", desc: "Синхронизация с 1С, ERP и CRM через надежный и быстрый интеграционный слой." },
  { n: "05", title: "Тестирование и Запуск", dur: "2 недели", out: "Защищенная система", desc: "Аудит безопасности, нагрузочные тесты и контролируемый старт платформы." },
];

const outcomes = [
  { val: "< 1.2с", title: "Мгновенная работа", desc: "Стабильная скорость загрузки каталога даже при 500k+ товаров.", size: "cardLarge" },
  { val: "99.99%", title: "Надёжность", desc: "Uptime инфраструктуры корпоративного уровня для крупных ритейлеров.", size: "cardMedium" },
  { val: "500k+", title: "Масштабируемость", desc: "Готовность к нелинейному росту SKU без потери производительности.", size: "cardMetric" },
  { val: "API-first", title: "Гибкая логика", desc: "Легкое подключение маркетплейсов и внешних сервисов через API.", size: "cardMedium" },
  { val: "100%", title: "Владение", desc: "Полный контроль над кодом, данными и инфраструктурой без вендоров.", size: "cardMedium" },
];

const faqs = [
  { q: "Сколько стоит разработка e-commerce платформы?", a: "Стоимость разработки кастомной платформы начинается от 2.5 млн рублей. Точная оценка формируется после аудита бизнес-процессов и проектирования архитектуры. Мы оцениваем не часы, а сложность системы и интеграций." },
  { q: "Чем кастомная платформа отличается от типовой CMS?", a: "CMS (Bitrix, WordPress) ограничены своей архитектурой. При росте каталога и нагрузки они тормозят. Кастомная платформа Kibex проектируется специально под ваш бизнес, обеспечивая мгновенную скорость и безграничное масштабирование." },
  { q: "Можно ли сохранить SEO при переезде на новую платформу?", a: "Да. Мы сохраняем структуру URL, настраиваем 301-редиректы и переносим все мета-данные. Благодаря улучшению Core Web Vitals сайты обычно растут в поиске после модернизации." },
  { q: "Как масштабировать интернет-магазин до 1 млн товаров?", a: "Для таких нагрузок мы используем микросервисную архитектуру и распределенные базы данных. Это позволяет системе работать стабильно независимо от объёма каталога." },
  { q: "Кто владеет кодом и системой после запуска?", a: "Все права на интеллектуальную собственность, код и данные полностью передаются вам. Вы не зависите от нас и можете развивать систему самостоятельно." },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as any } } };

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function RazrabotkaPlatformyPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const timelineRef = useRef(null);
  const { scrollYProgress: timeScroll } = useScroll({ target: timelineRef, offset: ["start center", "end end"] });
  const timeProgress = useSpring(timeScroll, { stiffness: 100, damping: 30 });
  const blueprintRef = useRef(null);

  const breadcrumbItems = [
    { name: "Решения", item: "/solutions" },
    { name: "Разработка платформ", item: "/solutions/razrabotka-platformy" }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Разработка e-commerce платформ",
    "serviceType": "E-commerce Platform Development",
    "description": "Профессиональная разработка интернет-магазинов и масштабируемых e-commerce платформ на заказ. Высоконагруженные системы, интеграция с 1С и архитектура без ограничений.",
    "provider": { "@type": "Organization", "name": "Kibex" },
    "areaServed": "Russia"
  };

  return (
    <div className={s.page}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── 1. HERO (SEO H1) ────────────────────────────────────────────────── */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden><div className={s.heroGrid} /><div className={s.heroAtmosphere} /></div>
        <div className={s.heroInner}>
          <div className={s.heroBreadcrumbs}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div className={s.heroContent} initial="hidden" animate="show" variants={stagger}>
            <motion.span className={s.heroLabel} variants={fadeUp}>E-commerce Инфраструктура</motion.span>
            <motion.h1 className={s.heroTitle} variants={fadeUp}>
              Разработка e-commerce платформ,{" "}
              <span className={s.heroTitleAccent}>спроектированных</span> для роста
            </motion.h1>
            <motion.p className={s.heroSubtitle} variants={fadeUp}>
              Создаем интернет-магазины и B2B платформы с высокой производительностью, устойчивой архитектурой и полной независимостью от ограничений Bitrix и WordPress.
            </motion.p>
            <motion.div className={s.heroActions} variants={fadeUp}>
              <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>Начать проект</button>
            </motion.div>
            <motion.div className={s.heroTrustLine} variants={fadeUp}>
              <span className={s.trustBadge}><Network size={16} /> Разработка интернет-магазинов</span>
              <span className={s.trustBadge}><Database size={16} /> B2B Платформы</span>
              <span className={s.trustBadge}><Lock size={16} /> Highload системы</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 1.5 PROOF TICKER ────────────────────────────────────────────────── */}
      <div className={s.proofBar}>
        <div className={s.sectionInner}><div className={s.proofTrack}>
          <div className={s.proofItem}><span className={s.proofVal}>500k+</span><span className={s.proofLabel}>SKU в каталоге</span></div>
          <div className={s.proofItem}><span className={s.proofVal}>99.99%</span><span className={s.proofLabel}>Uptime систем</span></div>
          <div className={s.proofItem}><span className={s.proofVal}>&lt; 1.2c</span><span className={s.proofLabel}>LCP производительность</span></div>
          <div className={s.proofItem}><span className={s.proofVal}>API-first</span><span className={s.proofLabel}>Архитектурный контроль</span></div>
        </div></div>
      </div>

      <div className={s.visualPause} />

      {/* ── 2. BUSINESS PROBLEMS (Long-tail SEO) ─────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Проблематика</span>
            <h2 className={s.sectionTitle}>Бизнес-задачи, которые решает платформа Kibex</h2>
            <p className={s.sectionSubtitleCenter}>
              Мы устраняем технические барьеры, которые мешают интернет-магазинам расти и масштабироваться.
            </p>
          </div>
          <div className={s.painGrid}>
            {businessPains.map((p, i) => (
              <motion.div key={i} className={`${s.painCard} ${s[p.className]}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className={s.painCardTitle}>{p.title}</h3>
                <p className={s.painCardDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPARISON ───────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Диагностика</span>
            <h2 className={s.sectionTitle}>Разница между CMS и платформой для роста</h2>
          </div>
          <div className={s.compGrid}>
            <motion.div className={`${s.compCol} ${s.compLegacy}`} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className={s.compTitle}>Ограничения Bitrix / WP</h3>
              <div className={s.compItem}><X className={s.compIcon} color="#ef4444" size={20} /><div className={s.compText}>Медленная работа интернет-магазина при росте</div></div>
              <div className={s.compItem}><X className={s.compIcon} color="#ef4444" size={20} /><div className={s.compText}>Нестабильные интеграции с 1С и ERP</div></div>
              <div className={s.compItem}><X className={s.compIcon} color="#ef4444" size={20} /><div className={s.compText}>Высокая стоимость любой доработки</div></div>
            </motion.div>
            <motion.div className={`${s.compCol} ${s.compPlatform}`} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className={s.compTitle}>Платформа Kibex</h3>
              <div className={s.compItem}><Check className={s.compIcon} color="#4633ff" size={20} /><div className={s.compText}>Мгновенный поиск по 500 000+ товарам</div></div>
              <div className={s.compItem}><Check className={s.compIcon} color="#4633ff" size={20} /><div className={s.compText}>Надежный API-слой для всех интеграций</div></div>
              <div className={s.compItem}><Check className={s.compIcon} color="#4633ff" size={20} /><div className={s.compText}>Масштабирование без остановки продаж</div></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE BUILD ────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionTag}>Экспертиза</span>
            <h2 className={s.sectionTitle}>Какие e-commerce системы мы разрабатываем</h2>
          </div>
          <div className={s.whatGrid}>
            {whatWeBuild.map((w, i) => (
              <motion.div key={i} className={s.whatCard} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                <div className={s.whatMicroVisual}><Activity size={40} strokeWidth={1} opacity={0.3} /></div>
                <h3 className={s.whatTitle}>{w.title}</h3>
                <p className={s.whatDesc}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className={s.internalLinks}>
            <Link href="/solutions/modernizaciya" className={s.seoLink}>Модернизация интернет-магазина <LinkIcon size={14} /></Link>
            <Link href="/solutions/security" className={s.seoLink}>Аудит безопасности платформы <LinkIcon size={14} /></Link>
            <Link href="/solutions/highload" className={s.seoLink}>Высоконагруженные e-commerce системы <LinkIcon size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── 5. BLUEPRINT (Architecture) ─────────────────────────────────────── */}
      <section className={s.blueprint}>
        <div className={s.blueprintGrid} />
        <div className={s.blueprintGlow} />
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Инженерия</span>
            <h2 className={s.sectionTitle}>Архитектура e-commerce платформы</h2>
            <p className={s.sectionSubtitleCenter}>
              Мы проектируем платформы как многослойную инфраструктуру, где каждый компонент отвечает за производительность, масштабируемость и стабильность системы.
            </p>
          </div>
          
          <div className={s.blueprintStack}>
            {archLayersData.map((layer, i) => (
              <div key={layer.num} style={{ width: "100%" }}>
                <motion.div 
                  className={s.archRow}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className={s.archColInfo}>
                    <span className={s.archLayerNum}>{layer.num} &nbsp; // &nbsp; {layer.label}</span>
                    <h3 className={s.archLayerTitle}>{layer.title}</h3>
                    <div className={s.archLayerStack}>{layer.stack}</div>
                    <span className={s.archLayerBadge}>{layer.badge}</span>
                    <p className={s.archLayerDesc}>{layer.desc}</p>
                  </div>
                  <div className={s.archColVisual}>
                    <layer.Visual />
                  </div>
                </motion.div>
                {i < archLayersData.length - 1 && (
                  <div className={s.connectionLine} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TIMELINE ─────────────────────────────────────────────────────── */}
      <section className={s.section} ref={timelineRef} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionTag}>Цикл</span>
            <h2 className={s.sectionTitle}>Как создается цифровая инфраструктура</h2>
          </div>
          <div className={s.timeline}>
            <div className={s.timelineLine} />
            <motion.div className={s.timelineProgress} style={{ height: "100%", scaleY: timeProgress, originY: 0 }} />
            {timelineSteps.map((step, i) => (
              <motion.div key={i} className={s.timelineStep} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <div className={s.stepNode}>{step.n}</div>
                <div className={s.stepContent}>
                  <div className={s.stepMeta}><span className={s.stepDuration}>{step.dur}</span><span className={s.stepOutput}>Результат: {step.out}</span></div>
                  <h3 className={s.stepTitle}>{step.title}</h3>
                  <p className={s.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. OUTCOMES ─────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Результаты</span>
            <h2 className={s.sectionTitle}>Что получает бизнес после разработки платформы</h2>
          </div>
          <div className={s.outcomeGrid}>
            {outcomes.map((o, i) => (
              <motion.div key={i} className={`${s.outcomeCard} ${s[o.size]}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <span className={s.outcomeVal}>{o.val}</span>
                <h3 className={s.outcomeTitle}>{o.title}</h3>
                <p className={s.outcomeDesc}>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CASES ────────────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionTag}>Трансформация</span>
            <h2 className={s.sectionTitle}>Реальные показатели масштабирования</h2>
          </div>
          <div className={s.caseStack}>
            <motion.div className={s.caseCard} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
              <div className={s.caseInfo}>
                <span className={s.caseLabel}>Проблема: 180 000 SKU</span>
                <div className={s.caseBefore}>Зависания при импорте остатков и 10с ожидание в каталоге.</div>
              </div>
              <div className={s.caseVisual}><Activity size={100} strokeWidth={0.5} opacity={0.1} /></div>
              <div className={s.caseInfo}>
                <span className={s.caseLabel}>Решение: Распределенный API</span>
                <div className={s.caseAfter}>1.2с загрузка и стабильная синхронизация с 1С без ошибок.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Вопросы</span>
            <h2 className={s.sectionTitle}>FAQ: разработка e-commerce систем</h2>
          </div>
          <div className={s.faqList}>{faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* ── 10. SEO CONTENT BLOCK ───────────────────────────────────────────── */}
      <section className={s.seoDepth}>
        <div className={s.sectionInner}>
          <h2 className={s.seoTitle}>Разработка e-commerce платформ в России: комплексный подход Kibex</h2>
          <div className={s.seoText}>
            <p>Создание современных интернет-магазинов сегодня требует выхода за рамки коробочных CMS. Разработка e-commerce платформ от Kibex — это процесс проектирования высоконагруженной инфраструктуры, готовой к масштабированию каталога до 1 млн SKU и выше. Мы специализируемся на разработке B2B платформ и маркетплейсов, где критически важна стабильность интеграций с 1С, ERP и CRM системами.</p>
            <p>В отличие от стандартной разработки интернет-магазина, мы фокусируемся на архитектуре API-first, что позволяет вашему бизнесу быть гибким. Модернизация текущих систем, замена Bitrix на кастомные решения и аудит безопасности — ключевые этапы создания устойчивого цифрового актива. С Kibex вы получаете полное владение кодом и инфраструктуру, которая не тормозит рост ваших продаж.</p>
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className={s.finalCta}>
        <div className={s.ctaBg} />
        <div className={s.ctaVisual} />
        <div className={s.sectionInner}>
          <motion.div className={s.ctaInner} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h2 className={s.ctaTitle}>Платформа должна помогать расти</h2>
            <p className={s.ctaSubtitle}>Закажите аудит и проектирование вашей будущей e-commerce инфраструктуры.</p>
            <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>Начать проектирование</button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <PlatformDiagnosticPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
