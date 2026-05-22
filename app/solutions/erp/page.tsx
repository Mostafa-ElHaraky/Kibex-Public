"use client";

import { useState, useRef, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
} from "framer-motion";
import { 
  Database, 
  ShoppingBag, 
  Box, 
  DollarSign, 
  Users, 
  Truck, 
  BarChart3, 
  UserCheck, 
  Network, 
  Check, 
  ArrowRight, 
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  FileText,
  Warehouse,
  AlertCircle,
  Shield
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ERPDiagnosticPopup from "./ERPDiagnosticPopup";
import s from "./erp.module.css";
import Schema from "../../../components/Schema";

// ── DATA DEFINITIONS ──

const HERO_NODES = [
  { id: "sales", label: "Продажи", Icon: ShoppingBag, angle: -140 },
  { id: "warehouse", label: "Склад", Icon: Box, angle: -100 },
  { id: "finance", label: "Финансы", angle: -60, Icon: DollarSign },
  { id: "crm", label: "CRM", angle: -20, Icon: Users },
  { id: "hr", label: "HR", angle: 20, Icon: UserCheck },
  { id: "logistics", label: "Логистика", angle: 60, Icon: Truck },
  { id: "analytics", label: "Аналитика", angle: 100, Icon: BarChart3 },
  { id: "api", label: "API", angle: 140, Icon: Network },
];

const DIAGNOSTICS = [
  { 
    title: "Разрозненные процессы продаж", 
    desc: "Менеджеры используют Excel, таблицы и мессенджеры вместо единой системы управления, что приводит к потере лидов и задержке сделок." 
  },
  { 
    title: "Рассинхронизация данных", 
    desc: "Склад, CRM и бухгалтерия не связаны. Остатки обновляются вручную или с задержкой в несколько часов, провоцируя конфликты заказов." 
  },
  { 
    title: "Операционные риски", 
    desc: "Человеческий фактор при сборке и отгрузке ведет к потере товаров, ошибкам комплектации и росту возвратов." 
  },
  { 
    title: "Непрозрачная аналитика", 
    desc: "Руководство не видит реальную маржинальность направлений, чистую прибыль и состояние активов в режиме реального времени." 
  }
];

const ERP_MODULES = [
  {
    title: "Продажи и CRM",
    desc: "Кабинеты дистрибьюторов, сквозная CRM-система, автоматизация воронки лидов и гибкая система скидок.",
    icon: ShoppingBag,
    diagram: (
      <div className={s.miniChart}>
        <div className={s.chartBar} style={{ height: "40%" }} />
        <div className={s.chartBar} style={{ height: "65%" }} />
        <div className={s.chartBar} style={{ height: "90%" }} />
      </div>
    )
  },
  {
    title: "Склад и логистика",
    desc: "WMS-модуль, адресное хранение, автоматический расчет габаритов, интеграция с ПВЗ и курьерскими службами.",
    icon: Warehouse,
    diagram: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", width: "100%" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            style={{ height: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}
            animate={{ background: i === 3 || i === 6 ? ["rgba(129, 140, 248, 0.05)", "rgba(129, 140, 248, 0.25)", "rgba(129, 140, 248, 0.05)"] : "rgba(255,255,255,0.03)" }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    )
  },
  {
    title: "Финансы и документы",
    desc: "Автоматический расчет P&L и CashFlow, разнесение платежей по счетам, генерация ЭДО и закрывающих актов.",
    icon: DollarSign,
    diagram: (
      <div style={{ display: "flex", gap: "6px", alignItems: "center", width: "100%" }}>
        <div style={{ width: "30px", height: "40px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", position: "relative" }}>
          <motion.div style={{ position: "absolute", top: "8px", left: "6px", right: "6px", height: "2px", background: "rgba(255,255,255,0.2)" }} />
          <motion.div style={{ position: "absolute", top: "14px", left: "6px", right: "12px", height: "2px", background: "rgba(255,255,255,0.2)" }} />
          <motion.div style={{ position: "absolute", top: "20px", left: "6px", right: "8px", height: "2px", background: "rgba(129,140,248,0.5)" }} />
        </div>
        <ArrowRight size={14} className="text-white/20" />
        <div style={{ width: "30px", height: "40px", border: "1px dashed rgba(129, 140, 248, 0.3)", borderRadius: "4px", position: "relative" }}>
          <motion.div style={{ position: "absolute", top: "8px", left: "6px", right: "6px", height: "2px", background: "#818cf8" }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </div>
    )
  },
  {
    title: "Аналитика и BI",
    desc: "Панели показателей эффективности в реальном времени, когортный анализ и прогнозирование дефицита остатков.",
    icon: BarChart3,
    diagram: (
      <svg viewBox="0 0 120 40" style={{ width: "100px", height: "30px" }}>
        <motion.path
          d="M 10 30 Q 30 10 60 25 T 110 5"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop" }}
        />
      </svg>
    )
  },
  {
    title: "HR и роли",
    desc: "Разделение уровней доступа сотрудников, учет времени, KPI-матрицы и автоматическое логирование действий.",
    icon: UserCheck,
    diagram: (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4633ff" }} />
        <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#818cf8" }} />
        <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
      </div>
    )
  },
  {
    title: "API и интеграции",
    desc: "Двусторонняя интеграция с 1С без задержек, автоматический импорт накладных и экспорт данных в корпоративные хранилища.",
    icon: Network,
    diagram: (
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px" }}>
        <Network size={16} className="text-white/20 animate-pulse" />
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)", position: "relative" }}>
          <motion.div style={{ position: "absolute", top: "-1.5px", left: 0, width: "4px", height: "4px", borderRadius: "50%", background: "#818cf8" }} animate={{ left: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </div>
      </div>
    )
  }
];

const TIMELINE_STEPS = [
  { step: "01", title: "Аудит процессов", desc: "Погружение в специфику компании, аудит текущих процессов и выявление узких мест." },
  { step: "02", title: "Проектирование", desc: "Создание технического фундамента системы, проектирование базы данных и интеграционных схем." },
  { step: "03", title: "UX и интерфейсы", desc: "Разработка удобных интерфейсов для сотрудников разных отделов с учётом их ролей." },
  { step: "04", title: "Разработка ядра", desc: "Программирование основной логики, модулей и системы управления данными." },
  { step: "05", title: "Интеграции", desc: "Подключение внешних сервисов, настройка обмена данными и автоматизация рутины." },
  { step: "06", title: "Запуск", desc: "Финальная проверка всех сценариев, обучение команды и контролируемый старт." },
];

const COMPARISON_ROWS = [
  { before: "Ручная сверка отчетов в таблицах", after: "Автоматическая синхронизация всех систем компании" },
  { before: "Работа в разрозненных Excel-файлах", after: "Единый достоверный центр бизнес-данных" },
  { before: "Ошибки остатков и пересорт на складе", after: "Real-time обновление остатков во всех каналах" },
  { before: "Долгие согласования и бумажная рутина", after: "Автоматический ЭДО и генерация закрывающих документов" }
];

const LAYERS = [
  { title: "Интерфейсы", desc: "React / Next.js SPA панели для сотрудников с ролевой моделью доступа", icon: Zap },
  { title: "Бизнес-логика", desc: "Модули управления: заказы, закупки, финансы и складские регламенты", icon: Layers },
  { title: "API и интеграции", desc: "Двусторонние коннекторы: gRPC, Webhooks, REST, интеграция 1С и телефонии", icon: Network },
  { title: "Data Layer", desc: "Оптимизированные СУБД (PostgreSQL / Redis) с версионированием операций", icon: Database },
  { title: "Infrastructure", desc: "Отказоустойчивые контейнеры Docker/K8s с автоматическим бэкапом данных", icon: Activity }
];

// ── SUB-COMPONENTS ──

function DataPackets({ x1, y1, x2, y2, delay = 0, color = "#4633ff" }: { x1: number, y1: number, x2: number, y2: number, delay?: number, color?: string }) {
  return (
    <motion.circle
      r="1.5"
      fill={color}
      filter="blur(1px)"
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{ 
        duration: 2.5 + Math.random() * 2, 
        repeat: Infinity, 
        ease: "linear",
        delay 
      }}
      style={{ offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')` }}
    />
  );
}



function DiagnosticCard({ item, index }: { item: typeof DIAGNOSTICS[0], index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={s.diagCard}
    >
      <AlertCircle size={22} className={s.diagIcon} />
      <div className={s.diagContent}>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </motion.div>
  );
}

function DataArchitectureHorizontal() {
  return (
    <div className={s.architectureScheme}>
      <div className={s.archGrid}>
        {/* Top Row: Sales */}
        <div className={s.archRow}>
          <div className={`${s.archNode} ${s.archNodeActive}`}>
            <ShoppingBag size={18} />
            <span>Продажи</span>
          </div>
        </div>

        {/* Middle Row: ERP Core */}
        <div className={s.archRow}>
          <div className={`${s.archNode} ${s.archNodeActive}`} style={{ borderColor: 'rgba(70, 51, 255, 0.5)', background: 'rgba(70, 51, 255, 0.15)' }}>
            <Database size={20} color="#818cf8" />
            <span style={{ color: '#818cf8' }}>ERP CORE</span>
          </div>
        </div>

        {/* Bottom Row: Modules */}
        <div className={s.archRow}>
          <div className={s.archNode}>
            <Warehouse size={16} />
            <span>Склад</span>
          </div>
          <div className={s.archNode}>
            <DollarSign size={16} />
            <span>Финансы</span>
          </div>
          <div className={s.archNode}>
            <Users size={16} />
            <span>CRM</span>
          </div>
        </div>
      </div>

      {/* SVG Connections underneath */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {/* Line 1: Sales to Core */}
        <line x1="50%" y1="20%" x2="50%" y2="46%" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1.5" />
        <motion.circle
          r="2"
          fill="#818cf8"
          animate={{
            cx: ["50%", "50%"],
            cy: ["20%", "46%"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Line 2: Core to Warehouse */}
        <line x1="50%" y1="54%" x2="35%" y2="78%" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1.5" />
        <motion.circle
          r="2"
          fill="#818cf8"
          animate={{
            cx: ["50%", "35%"],
            cy: ["54%", "78%"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Line 3: Core to Finance */}
        <line x1="50%" y1="54%" x2="50%" y2="78%" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1.5" />
        <motion.circle
          r="2"
          fill="#818cf8"
          animate={{
            cx: ["50%", "50%"],
            cy: ["54%", "78%"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.3 }}
        />

        {/* Line 4: Core to CRM */}
        <line x1="50%" y1="54%" x2="65%" y2="78%" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1.5" />
        <motion.circle
          r="2"
          fill="#818cf8"
          animate={{
            cx: ["50%", "65%"],
            cy: ["54%", "78%"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.6 }}
        />
      </svg>
    </div>
  );
}

function HorizontalTimeline({ scrollProgress }: { scrollProgress: any }) {
  const steps = TIMELINE_STEPS;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollProgress.onChange((latest: number) => {
      const idx = Math.min(
        steps.length - 1,
        Math.floor(latest * steps.length * 1.1)
      );
      setActiveStep(idx);
    });
  }, [scrollProgress, steps.length]);

  const trackWidth = useTransform(scrollProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <div className={s.timelineHorizontal}>
      <div className={s.timelineTrack} />
      <motion.div className={s.timelineTrackActive} style={{ width: trackWidth }} />
      {steps.map((step, i) => {
        const isActive = i <= activeStep;
        return (
          <div key={i} className={s.timelineNode}>
            <span className={`${s.timelineNum} ${isActive ? s.timelineNumActive : ""}`}>{step.step}</span>
            <div className={`${s.timelineDot} ${isActive ? s.timelineDotActive : ""}`} />
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function LayeredArchitecture() {
  return (
    <div className={s.architectureDashboard}>
      <div className={s.archStack}>
        {LAYERS.map((layer, i) => (
          <motion.div
            key={i}
            className={s.archLayer}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className={s.layerInfo}>
              <h4>{layer.title}</h4>
              <span>{layer.desc}</span>
            </div>
            <layer.icon size={20} className={s.layerIcon} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──

export default function ERPPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const heroRef = useRef(null);
  const timelineSectionRef = useRef(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Разработка кастомных ERP систем",
    "serviceType": "ERP System Development",
    "provider": {
      "@type": "Organization",
      "name": "Kibex"
    },
    "description": "Проектирование и разработка корпоративных ERP платформ для управления продажами, складами, логистикой и финансами.",
    "areaServed": "RU",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ERP Modules",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Управление складом (WMS)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Финансовый учет и аналитика" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Интеграция с 1С и внешними API" } }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Чем кастомная ERP лучше готовых SaaS решений?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Кастомная ERP строится вокруг ваших уникальных бизнес-процессов, а не заставляет вас подстраиваться под логику программы. Это дает полное владение данными, отсутствие лицензионных платежей за пользователей и неограниченную масштабируемость."
        }
      },
      {
        "@type": "Question",
        "name": "Сколько времени занимает разработка ERP системы?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Срок разработки зависит от сложности модулей. Обычно запуск MVP версии (основной контур управления) занимает от 3 до 5 месяцев с последующим итерационным развитием системы."
        }
      },
      {
        "@type": "Question",
        "name": "Возможна ли интеграция с 1С и существующими сервисами?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, мы проектируем ERP с API-first архитектурой, что позволяет бесшовно интегрировать её с 1С, CRM-системами, банковскими сервисами и любыми внешними API."
        }
      }
    ]
  };

  const breadcrumbItems = [
    { name: "Решения", item: "/solutions" },
    { name: "ERP системы", item: "/solutions/erp" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://kibex.ru" },
      { "@type": "ListItem", "position": 2, "name": "Решения", "item": "https://kibex.ru/solutions" },
      { "@type": "ListItem", "position": 3, "name": "ERP системы", "item": "https://kibex.ru/solutions/erp" }
    ]
  };

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(heroScroll, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineSectionRef,
    offset: ["start center", "end center"]
  });
  const timelineSpring = useSpring(timelineProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className={s.page}>
      <Schema data={serviceSchema} />
      <Schema data={faqSchema} />
      <Schema data={breadcrumbSchema} />
      <div className={s.gridBackground} />
      <div className={s.topologyNoise} />
      <Header />

      {/* ── 1. HERO ── */}
      <section className={s.hero} ref={heroRef}>
        {/* Background Image & Gradient overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img 
            src="/erpgpt.png" 
            alt="" 
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/90 via-[#050508]/50 to-[#050508]/90" />
          
          {/* Subtle Indigo Glow and Grid Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.06)_0%,transparent_60%)] blur-3xl opacity-70" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: `linear-gradient(rgba(140, 118, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140, 118, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className={s.container}>
          <Breadcrumbs items={breadcrumbItems} />
          <div className={s.heroInner}>
            <motion.div style={{ y: heroParallax, opacity: heroOpacity }} className={s.heroContent}>
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={s.heroLabel}>
                ЦИФРОВАЯ ERP ИНФРАСТРУКТУРА
              </motion.span>
              <h1 className={s.heroH1}>
                <span>ERP платформы,</span>
                <span>которые создают</span>
                <span>единый центр управления</span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className={s.heroSubtitle}
              >
                Проектируем корпоративные ERP системы для управления продажами, складами, логистикой, финансами и внутренними процессами в единой цифровой инфраструктуре.
              </motion.p>

              <div className={s.useInText}>
                Используется в: E-commerce • Retail • Производстве • Дистрибуции • B2B • Логистике
              </div>
              
              <div className={s.heroActions}>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className={s.primaryBtn} 
                  onClick={() => setIsPopupOpen(true)}
                >
                  Обсудить ERP систему
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className={s.secondaryBtn}
                  onClick={() => {
                    document.getElementById("modules-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Изучить модули
                </motion.button>
              </div>

              {/* Technical Indicators */}
              <div className={s.indicators}>
                <div className={s.indicatorItem}>
                  <span className={s.indicatorLabel}>ERP Status</span>
                  <span className={s.indicatorValue}>ACTIVE</span>
                </div>
                <div className={s.indicatorItem}>
                  <span className={s.indicatorLabel}>Sync</span>
                  <span className={s.indicatorValue}>REAL-TIME</span>
                </div>
                <div className={s.indicatorItem}>
                  <span className={s.indicatorLabel}>API Response</span>
                  <span className={s.indicatorValue}>31ms</span>
                </div>
                <div className={s.indicatorItem}>
                  <span className={s.indicatorLabel}>Modules</span>
                  <span className={s.indicatorValue}>CONNECTED</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. DIAGNOSTICS ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.diagLayout}>
            <div className={s.diagLeft}>
              <h2 className={s.sectionTitle}>Когда процессы начинают тормозить рост бизнеса</h2>
              <p className={s.sectionSubtitle}>
                На определенном этапе масштабирования проблемы коммуникаций и ручного контроля перерастают в финансовые потери.
              </p>
            </div>
            <div className={s.diagRight}>
              {DIAGNOSTICS.map((item, i) => (
                <DiagnosticCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DATA ARCHITECTURE ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeaderCenter}>
            <h2 className={s.sectionTitle}>Единая архитектура данных</h2>
            <p className={s.sectionSubtitle} style={{ margin: "0 auto" }}>
              ERP платформа консолидирует потоки информации от продаж к операционным модулям без задержек и человеческого фактора.
            </p>
          </div>
          <DataArchitectureHorizontal />
        </div>
      </section>

      {/* ── 4. WHAT'S INCLUDED ── */}
      <section className={s.section} id="modules-section">
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Что входит в ERP платформу</h2>
            <p className={s.sectionSubtitle}>Проектируем модульную структуру, закрывающую ключевые контуры управления предприятием.</p>
          </div>
          <div className={s.modulesGrid}>
            {ERP_MODULES.map((item, i) => (
              <motion.div 
                key={i} 
                className={s.moduleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <item.icon size={28} className={s.moduleIcon} />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <div className={s.microDiagram}>
                  {item.diagram}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TIMELINE ── */}
      <section className={s.section} ref={timelineSectionRef} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Процесс проектирования ERP</h2>
          </div>
          <HorizontalTimeline scrollProgress={timelineSpring} />
        </div>
      </section>

      {/* ── 6. BEFORE / AFTER ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Что меняется после внедрения ERP</h2>
            <p className={s.sectionSubtitle}>Переход от ручных сверок к автоматизированному управлению на основе достоверных данных.</p>
          </div>
          <div className={s.beforeAfter}>
            <div className={s.baHeader}>
              <div className={s.baHeaderCell}>До внедрения ERP</div>
              <div className={s.baHeaderCell}>После внедрения ERP</div>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div key={i} className={s.baRow}>
                <div className={`${s.baCell} ${s.baCellBefore}`}>
                  <span className={s.baStatusIcon} style={{ color: "rgba(255, 255, 255, 0.2)" }}>—</span>
                  <span>{row.before}</span>
                </div>
                <div className={`${s.baCell} ${s.baCellAfter}`}>
                  <span className={s.baStatusIcon} style={{ color: "#818cf8" }}>✓</span>
                  <span>{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. COMPARISON SaaS VS CUSTOM ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>SaaS решения vs Custom ERP</h2>
          </div>
          <div className={s.comparisonTable}>
            <div className={s.tableHeader}>
              <div className={s.tableCell}>Критерий</div>
              <div className={s.tableCell} style={{ color: "rgba(255, 255, 255, 0.45)" }}>Типовые SaaS решения</div>
              <div className={`${s.tableCell} ${s.kibexCol}`}>Custom ERP Kibex</div>
            </div>
            {[
              { p: "Полное владение архитектурой", s: "Привязка к облачной платформе и ограничениям вендора", k: "Собственный программный код без ограничений и зависимости от платформы" },
              { p: "Гибкость процессов", s: "Бизнес вынужден подстраиваться под готовую логику софта", k: "Система полностью адаптируется под регламенты вашей компании" },
              { p: "Владение данными", s: "Хранение на стороне провайдера с рисками утечки или блокировки", k: "Размещение на изолированных серверах компании под вашим контролем" },
              { p: "Интеграции", s: "Ограничены готовыми плагинами и закрытыми протоколами обмена", k: "Бесшовное подключение любых корпоративных API и сервисов" },
              { p: "Развитие и масштабирование", s: "Зависят от дорожной карты обновлений SaaS-провайдера", k: "Полная свобода доработок и расширения функционала силами команды" },
            ].map((row, i) => (
              <motion.div 
                key={i} 
                className={s.tableRow}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className={s.tableCell}>{row.p}</div>
                <div className={s.tableCell} style={{ color: "rgba(255,255,255,0.4)" }}>{row.s}</div>
                <div className={`${s.tableCell} ${s.kibexCol}`}>{row.k}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TECH ARCHITECTURE ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeaderCenter}>
            <h2 className={s.sectionTitle}>Технологическая архитектура</h2>
            <p className={s.sectionSubtitle} style={{ margin: "0 auto" }}>
              Слоистая архитектурная структура обеспечивает высокую отказоустойчивость, надежность хранения данных и производительность под нагрузкой.
            </p>
          </div>
          <LayeredArchitecture />
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className={s.finalCta}>
        <div className={s.ctaGlow} />
        <div className={s.container}>
          <div className={s.ctaContent}>
            <h2 className={s.ctaH2}>ERP система должна упрощать управление,<br />а не создавать новые ограничения</h2>
            <p className={s.ctaSubtitleLarge}>Получите архитектурную оценку и план проектирования ERP платформы под процессы вашей компании.</p>
            <div className={s.ctaActions}>
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                className={s.primaryBtn} 
                onClick={() => setIsPopupOpen(true)}
              >
                Обсудить ERP систему
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                className={s.secondaryBtn} 
                onClick={() => setIsPopupOpen(true)}
              >
                Запросить архитектурную оценку
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ERPDiagnosticPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
