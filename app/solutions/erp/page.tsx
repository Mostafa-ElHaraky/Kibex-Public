"use client";

import { useState, useRef, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView as useFramerInView
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
  Globe,
  Settings,
  Briefcase,
  FileText,
  Warehouse,
  AlertCircle,
  TrendingUp,
  Clock,
  Lock,
  Cpu,
  ChevronDown,
  LineChart,
  Target,
  Maximize2,
  Shield
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ERPDiagnosticPopup from "./ERPDiagnosticPopup";
import s from "./erp.module.css";

// ── DATA DEFINITIONS ──

const HERO_NODES = [
  { id: "sales", label: "Продажи", Icon: ShoppingBag, angle: -140 },
  { id: "warehouse", label: "Склад", Icon: Box, angle: -100 },
  { id: "finance", label: "Финансы", angle: -60, Icon: DollarSign },
  { id: "crm", label: "CRM", angle: -20, Icon: Users },
  { id: "hr", label: "Кадры", angle: 20, Icon: UserCheck },
  { id: "logistics", label: "Логистика", angle: 60, Icon: Truck },
  { id: "analytics", label: "Аналитика", angle: 100, Icon: BarChart3 },
  { id: "api", label: "API", angle: 140, Icon: Network },
];

const DIAGNOSTICS = [
  { 
    status: "CRITICAL", 
    type: "critical",
    title: "Продажи работают вручную", 
    desc: "Менеджеры используют Excel, таблицы и мессенджеры вместо единой системы управления." 
  },
  { 
    status: "WARNING", 
    type: "warning",
    title: "Данные рассинхронизированы", 
    desc: "Склад, CRM и бухгалтерия не связаны. Остатки обновляются с задержкой в несколько часов." 
  },
  { 
    status: "ALERT", 
    type: "alert",
    title: "Операционные ошибки", 
    desc: "Человеческий фактор приводит к потере заказов и ошибкам в комплектации на складе." 
  },
  { 
    status: "CRITICAL", 
    type: "critical",
    title: "Непрозрачная аналитика", 
    desc: "Руководство не видит реальную маржинальность и остатки в режиме реального времени." 
  }
];

const INTERACTIVE_NODES = [
  { id: "warehouse", label: "Склад", desc: "Контроль остатков, резервов и поставок в режиме реального времени.", x: -280, y: -180, Icon: Warehouse },
  { id: "sales", label: "Продажи", desc: "Автоматизация воронки, контроль оплат и отгрузок.", x: 280, y: -180, Icon: ShoppingBag },
  { id: "finance", label: "Финансы", desc: "Финансовые операции, платежи и аналитика прибыли компании.", x: 340, y: 0, Icon: DollarSign },
  { id: "logistics", label: "Логистика", desc: "Управление маршрутами и интеграция с курьерскими службами.", x: 280, y: 180, Icon: Truck },
  { id: "hr", label: "Кадры", desc: "Учет рабочего времени, расчет KPI и управление доступом.", x: -280, y: 180, Icon: UserCheck },
  { id: "analytics", label: "Аналитика", desc: "Дашборды по всем бизнес-метрикам в одном окне.", x: -340, y: 0, Icon: BarChart3 },
  { id: "procurement", label: "Закупки", desc: "Контроль цен поставщиков и автоматизация заказов.", x: -140, y: -260, Icon: Box },
  { id: "documents", label: "Документы", desc: "Электронный документооборот и автоматическая генерация актов.", x: 140, y: -260, Icon: FileText },
];

const INCLUDED_MODULES = [
  { title: "Продажи", icon: ShoppingBag, desc: "B2B кабинеты и CRM" },
  { title: "Склад", icon: Warehouse, desc: "WMS и учет остатков" },
  { title: "CRM", icon: Users, desc: "База клиентов и лояльность" },
  { title: "Финансы", icon: DollarSign, desc: "P&L, CashFlow, счета" },
  { title: "Закупки", icon: Box, desc: "Работа с поставщиками" },
  { title: "HR", icon: UserCheck, desc: "KPI и штатное расписание" },
  { title: "Документы", icon: FileText, desc: "Электронный архив и ЭДО" },
  { title: "Аналитика", icon: BarChart3, desc: "BI и отчеты" },
  { title: "Производство", icon: Settings, desc: "Цеха и рецептуры" },
  { title: "Логистика", icon: Truck, desc: "Маршруты и курьеры" },
];

const TIMELINE_STEPS = [
  { step: "01", title: "Анализ бизнес-процессов", desc: "Погружение в специфику компании, аудит текущих процессов и выявление узких мест." },
  { step: "02", title: "Проектирование архитектуры", desc: "Создание технического фундамента системы, проектирование базы данных и интеграционных схем." },
  { step: "03", title: "UX и интерфейсы", desc: "Разработка удобных интерфейсов для сотрудников разных отделов с учётом их ролей." },
  { step: "04", title: "Разработка ядра", desc: "Программирование основной логики, модулей и системы управления данными." },
  { step: "05", title: "Интеграции и автоматизация", desc: "Подключение внешних сервисов, настройка обмена данными и автоматизация рутины." },
  { step: "06", title: "Тестирование и запуск", desc: "Финальная проверка всех сценариев, обучение команды и контролируемый старт." },
];

const ROI_METRICS = [
  { title: "Меньше ошибок", desc: "Исключение дублей и человеческого фактора в заказах.", icon: AlertCircle },
  { title: "Быстрее обработка", desc: "Сокращение времени на рутинные операции в 2–3 раза.", icon: Zap },
  { title: "Прозрачность", desc: "Полный контроль маржинальности в реальном времени.", icon: LineChart },
  { title: "Меньше рутины", desc: "Автоматическая генерация документов и отчетов.", icon: FileText },
  { title: "Контроль в Live", desc: "Визуализация состояния склада и логистики.", icon: Activity },
  { title: "Снижение потерь", desc: "Минимизация списаний и ошибок при отгрузках.", icon: Shield },
];

const ARCH_LAYERS = [
  { title: "Интерфейсный слой", desc: "Быстрые и удобные панели управления для сотрудников", icon: Zap },
  { title: "Слой бизнес-логики", desc: "Ядро системы: автоматизация операций и правил бизнеса", icon: Layers },
  { title: "Интеграционный слой", desc: "Бесшовный обмен данными с 1С, CRM и внешними API", icon: Network },
  { title: "Инфраструктурный слой", desc: "Масштабируемая облачная или On-Premise среда", icon: Activity },
  { title: "Слой безопасности", desc: "Контроль доступа, шифрование и защита данных", icon: ShieldCheck },
];

// ── COMPONENTS ──

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

function TopologyHero() {
  const radius = 220;
  const cx = 350;
  const cy = 300;

  return (
    <div className={s.heroVisual}>
      <svg className={s.topologySvg} viewBox="0 0 700 600">
        <defs>
          <filter id="glowHero">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Connection Lines */}
        {HERO_NODES.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const tx = cx + radius * Math.cos(rad);
          const ty = cy + radius * Math.sin(rad);
          return (
            <g key={`line-${i}`}>
              <motion.line
                x1={cx} y1={cy} x2={tx} y2={ty}
                stroke="rgba(70, 51, 255, 0.15)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
              <DataPackets x1={tx} y1={ty} x2={cx} y2={cy} delay={i * 0.4} />
              <DataPackets x1={cx} y1={cy} x2={tx} y2={ty} delay={i * 0.7} />
            </g>
          );
        })}

        {/* Center Node */}
        <motion.g 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", damping: 12 }}
        >
          <circle cx={cx} cy={cy} r="50" fill="rgba(70, 51, 255, 0.1)" stroke="#4633ff" strokeWidth="2" filter="url(#glowHero)" />
          <foreignObject x={cx - 20} y={cy - 20} width="40" height="40">
            <div style={{ color: "#4633ff", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Database size={32} />
            </div>
          </foreignObject>
          <text x={cx} y={cy + 80} textAnchor="middle" className={s.coreLabel}>ERP CORE</text>
        </motion.g>

        {/* Surrounding Nodes */}
        {HERO_NODES.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const tx = cx + radius * Math.cos(rad);
          const ty = cy + radius * Math.sin(rad);
          return (
            <motion.g 
              key={n.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <motion.circle
                cx={tx} cy={ty} r="25"
                fill="rgba(15, 14, 26, 0.9)"
                stroke="rgba(255,255,255,0.1)"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              />
              <foreignObject x={tx - 10} y={ty - 10} width="20" height="20">
                <div style={{ color: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <n.Icon size={14} />
                </div>
              </foreignObject>
              <text x={tx} y={ty + 45} textAnchor="middle" className={s.nodeLabel}>{n.label}</text>
            </motion.g>
          );
        })}
      </svg>

      <LiveOpsPanel />
    </div>
  );
}

function LiveOpsPanel() {
  const [metrics, setMetrics] = useState([
    { label: "Обработано заказов", value: 1242, suffix: "", trend: "активно" },
    { label: "Синхронизация склада", value: 99.8, suffix: "%", trend: "синхронизировано" },
    { label: "Активные счета", value: 48, suffix: "", trend: "работает" },
    { label: "Задержка API", value: 24, suffix: "ms", trend: "стабильно" }
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        value: m.label.includes("Задержка") 
          ? Math.max(18, Math.min(35, m.value + (Math.random() * 4 - 2)))
          : m.label.includes("Синхронизация")
          ? Math.max(99.1, Math.min(100, m.value + (Math.random() * 0.2 - 0.1)))
          : m.value + Math.floor(Math.random() * 2)
      })));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className={s.opsPanel}
    >
      {metrics.map((m, i) => (
        <div key={i} className={s.opsItem}>
          <div className={s.opsHeader}>
            <div className={s.opsDot} />
            <span className={s.opsLabel}>{m.label}</span>
          </div>
          <div className={s.opsValue}>
            {m.label.includes("Синхронизация") ? m.value.toFixed(1) : Math.floor(m.value)}{m.suffix}
          </div>
          <div className={s.opsStatus}>{m.trend}</div>
        </div>
      ))}
    </motion.div>
  );
}

function DiagnosticCard({ item, index }: { item: typeof DIAGNOSTICS[0], index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      className={s.diagCard}
    >
      <div className={`${s.diagStatus} ${s[`status${item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}`]}`}>
        {item.status}
      </div>
      <div className={s.diagContent}>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </motion.div>
  );
}

function InteractiveTopology() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className={s.interactiveTopology}>
      <div className={s.topologyCenter}>
        <motion.div className={s.topologyCore} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}>
          <Database size={48} color="#4633ff" />
          <span>ERP CORE</span>
        </motion.div>
      </div>

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {INTERACTIVE_NODES.map((n, i) => {
          const isHovered = hoveredNode === n.id;
          return (
            <g key={`line-int-${i}`}>
              <motion.line
                x1="50%" y1="50%" x2={`calc(50% + ${n.x}px)`} y2={`calc(50% + ${n.y}px)`}
                stroke={isHovered ? "#4633ff" : "rgba(70, 51, 255, 0.1)"}
                strokeWidth={isHovered ? 2 : 1}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
              />
              {isHovered && (
                <>
                  <DataPackets x1={350 + n.x} y1={300 + n.y} x2={350} y2={300} color="#4633ff" />
                  <DataPackets x1={350} y1={300} x2={350 + n.x} y2={300 + n.y} color="#4633ff" delay={0.5} />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {INTERACTIVE_NODES.map((n) => (
        <motion.div
          key={n.id}
          className={`${s.topologyNode} ${hoveredNode && hoveredNode !== n.id ? s.nodeDimmed : ""}`}
          style={{ 
            left: `calc(50% + ${n.x}px)`, 
            top: `calc(50% + ${n.y}px)`, 
            transform: "translate(-50%, -50%)",
            borderColor: hoveredNode === n.id ? "#4633ff" : "rgba(255,255,255,0.1)"
          }}
          onMouseEnter={() => setHoveredNode(n.id)}
          onMouseLeave={() => setHoveredNode(null)}
          animate={{ scale: hoveredNode === n.id ? 1.1 : 1 }}
        >
          <n.Icon size={24} color={hoveredNode === n.id ? "#4633ff" : "rgba(255,255,255,0.4)"} />
          <h4>{n.label}</h4>
        </motion.div>
      ))}

      <AnimatePresence>
        {hoveredNode && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className={s.contextPanel}
            style={{ borderLeft: "4px solid #4633ff" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              {INTERACTIVE_NODES.find(n => n.id === hoveredNode)?.Icon && 
                (() => {
                  const Icon = INTERACTIVE_NODES.find(n => n.id === hoveredNode)!.Icon;
                  return <Icon size={20} color="#4633ff" />;
                })()
              }
              <h4 style={{ margin: 0 }}>{INTERACTIVE_NODES.find(n => n.id === hoveredNode)?.label}</h4>
            </div>
            <p>{INTERACTIVE_NODES.find(n => n.id === hoveredNode)?.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TimelineStep({ step, index }: { step: typeof TIMELINE_STEPS[0], index: number }) {
  const stepRef = useRef(null);
  const isInView = useFramerInView(stepRef, { margin: "-40% 0px -40% 0px" });

  return (
    <div ref={stepRef} className={`${s.timelineStep} ${isInView ? s.stepActive : ""}`}>
      <div className={s.stepContent}>
        <div className={s.stepNumberBig}>{step.step}</div>
        <motion.h3 
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {step.desc}
        </motion.p>
      </div>
      <motion.div 
        className={s.stepNumberWrap}
      />
    </div>
  );
}

import Schema from "../../../components/Schema";

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
  const heroParallax = useTransform(heroScroll, [0, 1], [0, -150]);
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
        <div className={s.container}>
          <Breadcrumbs items={breadcrumbItems} />
          <div className={s.heroInner}>
            <motion.div style={{ y: heroParallax, opacity: heroOpacity }} className={s.heroLeft}>
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={s.heroLabel}>
                ЦИФРОВАЯ ERP ИНФРАСТРУКТУРА
              </motion.span>
              <h1 className={s.heroH1}>
                {["ERP платформы,", "которые объединяют", "бизнес в единую систему"].map((line, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className={s.heroSubtitle}
              >
                Проектируем корпоративные ERP системы для компаний, которым необходим полный контроль над операциями, данными, сотрудниками и внутренними процессами.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className={s.heroSubtitle}
                style={{ fontWeight: 700, color: "#fff", borderLeft: "2px solid #4633ff", paddingLeft: "20px" }}
              >
                Рост компании не должен превращаться в рост операционного хаоса.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className={s.heroSubtitleSecond}
              >
                Продажи, склады, логистика, аналитика, финансы и интеграции — в единой цифровой инфраструктуре.
              </motion.p>

              <div className={s.qualifiers}>
                <span>Подходит для:</span>
                {["e-commerce", "дистрибуции", "retail", "логистики", "производства", "B2B"].map((q, i) => (
                  <span key={i} className={s.qualifierItem}>{q}</span>
                ))}
              </div>
              
              <div className={s.heroActions}>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  className={s.primaryBtn} 
                  onClick={() => setIsPopupOpen(true)}
                >
                  Обсудить ERP систему
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className={s.secondaryBtn}
                >
                  Изучить возможности
                </motion.button>
              </div>

              <div className={s.trustLine}>
                {["Полный контроль", "Автоматизация", "1С Интеграции"].map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                    className={s.trustItem}
                  >
                    <Check size={16} className={s.trustIcon} /> {t}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className={s.heroRight}>
              <TopologyHero />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. DIAGNOSTICS ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Операционная диагностика</h2>
            <p className={s.sectionSubtitle}>На определённом этапе рост компании начинает замедляться не из-за продаж, а из-за хаоса во внутренних процессах.</p>
          </div>
          <div className={s.diagGrid}>
            {DIAGNOSTICS.map((item, i) => (
              <DiagnosticCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE TOPOLOGY ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeader} style={{ textAlign: "center", margin: "0 auto 100px" }}>
            <h2 className={s.sectionTitle}>Инфраструктурная визуализация бизнеса</h2>
            <p className={s.sectionSubtitle} style={{ margin: "0 auto" }}>ERP платформа объединяет разрозненные отделы в единую управляемую экосистему с общим источником данных.</p>
          </div>
          <InteractiveTopology />
        </div>
      </section>

      {/* ── 4. WHAT'S INCLUDED ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Что может входить в ERP систему</h2>
            <p className={s.sectionSubtitle}>Мы проектируем модульную архитектуру, которая автоматизирует все ключевые контуры вашего предприятия.</p>
          </div>
          <div className={s.includedGrid}>
            {INCLUDED_MODULES.map((item, i) => (
              <motion.div 
                key={i} 
                className={s.includedCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <item.icon size={32} color="#4633ff" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
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
          <div className={s.timelineContainer}>
            <div className={s.timelineLine} />
            <motion.div className={s.timelineProgress} style={{ height: useTransform(timelineSpring, [0, 1], ["0%", "100%"]) }} />
            {TIMELINE_STEPS.map((step, i) => (
              <TimelineStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. RESULTS (ROI) ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Результат для бизнеса</h2>
            <p className={s.sectionSubtitle}>Внедрение ERP — это инвестиция в операционную эффективность и измеримый рост прибыли.</p>
          </div>
          <div className={s.resultsGrid}>
            {ROI_METRICS.map((item, i) => (
              <motion.div 
                key={i} 
                className={s.resultCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon size={40} className={s.resultIcon} />
                <h3 className={s.resultTitle}>{item.title}</h3>
                <p className={s.resultDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TRANSFORMATION ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeader} style={{ textAlign: "center", margin: "0 auto 80px" }}>
            <h2 className={s.sectionTitle}>Результат внедрения: от хаоса к контролю</h2>
          </div>
          <div className={s.transformGrid}>
            <motion.div 
              className={s.transformState}
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className={s.stateLabel}>До ERP: Хаос в процессах</span>
              <div className={s.chaosVisual}>
                {Array.from({ length: 12 }).map((_, i) => <motion.div key={i} className={s.chaosNode} animate={{ x: [0, 8, -8, 0], y: [0, -8, 8, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }} />)}
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)" }}>Разрозненные таблицы, ошибки в данных, потеря времени на ручную сверку.</p>
            </motion.div>
            <div className={s.transformArrow}>
              <div className={s.arrowLine} />
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Zap color="#4633ff" size={40} />
              </motion.div>
              <div className={s.arrowLine} style={{ background: "linear-gradient(transparent, #4633ff)" }} />
            </div>
            <motion.div 
              className={s.transformState} 
              style={{ border: "1px solid rgba(70, 51, 255, 0.3)", boxShadow: "0 0 30px rgba(70, 51, 255, 0.1)" }}
              initial={{ opacity: 0.5, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className={s.stateLabel} style={{ color: "#4633ff" }}>После ERP: Полный контроль</span>
              <div className={s.controlVisual}>
                {Array.from({ length: 12 }).map((_, i) => <motion.div key={i} className={s.controlNode} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.05 }} />)}
              </div>
              <p>Централизованное управление, мгновенная аналитика и полная прозрачность операций.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. COMPARISON ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>SaaS vs Custom ERP Kibex</h2>
          </div>
          <div className={s.comparisonTable}>
            <div className={s.tableHeader}>
              <div className={s.tableCell}>Параметр</div>
              <div className={s.tableCell}>Типовые SaaS решения</div>
              <div className={`${s.tableCell} ${s.kibexCol}`}>Custom ERP Kibex</div>
            </div>
            {[
              { p: "Гибкость процессов", s: "Бизнес подстраивается под программу", k: "Система строится вокруг вашего бизнеса" },
              { p: "Владение данными", s: "На серверах провайдера", k: "Полное владение на ваших серверах" },
              { p: "Интеграции", s: "Ограничены готовыми модулями", k: "Любые кастомные API и сервисы" },
              { p: "Развитие", s: "В рамках дорожной карты вендора", k: "Полная свобода доработок" },
            ].map((row, i) => (
              <motion.div 
                key={i} 
                className={s.tableRow}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={s.tableCell}>{row.p}</div>
                <div className={s.tableCell} style={{ color: "rgba(255,255,255,0.4)" }}>{row.s}</div>
                <div className={`${s.tableCell} ${s.kibexCol}`}>{row.k}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ARCHITECTURE ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Технологическая архитектура</h2>
          </div>
          <div className={s.archStack}>
            {ARCH_LAYERS.map((layer, i) => (
              <motion.div 
                key={i} 
                className={s.archLayer}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className={s.layerInfo}>
                  <h4>{layer.title}</h4>
                  <span>{layer.desc}</span>
                </div>
                <layer.icon size={24} color="rgba(255,255,255,0.2)" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className={s.finalCta}>
        <div className={s.ctaGlow} />
        <div className={s.container}>
          <div className={s.ctaContent}>
            <h2 className={s.ctaH2}>ERP должна упрощать управление,<br /> а не усложнять его</h2>
            <p className={s.ctaSubtitleLarge}>Получите план цифровой трансформации и архитектурную оценку ERP системы для вашей компании.</p>
            <div className={s.ctaActions}>
              <motion.button whileHover={{ scale: 1.05 }} className={s.ctaMainBtn} onClick={() => setIsPopupOpen(true)}>
                Обсудить ERP систему
              </motion.button>
              <div className={s.ctaTrustItems}>
                <span>Конфиденциально</span>
                <span>Ответ в течение 24 часов</span>
                <span>Без обязательств</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ERPDiagnosticPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
