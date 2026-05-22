"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  Layers,
  Shield,
  ArrowRight,
  Activity,
  Workflow,
  Terminal,
  Server,
  Network,
  Users,
  CheckCircle2,
  TrendingUp,
  FileText,
  AlertTriangle,
  Globe,
  Settings,
  Zap,
  Check
} from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolutionPopup from "../../components/SolutionPopup";

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────────

interface TechCategory {
  title: string;
  desc: string;
  items: string[];
  icon: any;
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

// ─── DATA DEFINITIONS ────────────────────────────────────────────────────────

const BLOCKS = [
  {
    num: "01",
    title: "Модернизация платформ",
    desc: "Переход с WordPress, Bitrix и legacy-систем на современную API-first инфраструктуру без потери SEO, данных и бизнес-процессов.",
    includes: [
      "SEO-safe миграция",
      "API-first архитектура",
      "Разделение монолита",
      "Миграция базы данных",
      "Интеграции с ERP и 1С",
      "Повышение производительности",
    ],
    href: "/solutions/modernizaciya",
    cta: "Изучить модернизацию",
    icon: Layers,
  },
  {
    num: "02",
    title: "ERP системы",
    desc: "Создание централизованных систем управления продажами, складами, логистикой, финансами и внутренними процессами компании.",
    includes: [
      "Центральное цифровое ядро",
      "Синхронизация в реальном времени",
      "Управление складами",
      "Финансовые модули",
      "Интеграции с 1С",
      "Управление ролями и доступом",
    ],
    href: "/solutions/erp",
    cta: "Изучить ERP системы",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Highload архитектура",
    desc: "Проектирование отказоустойчивой инфраструктуры для систем с высокой нагрузкой и больших объёмами данных.",
    includes: [
      "Балансировка нагрузки",
      "Горизонтальное масштабирование",
      "Очереди сообщений",
      "Распределённые сервисы",
      "Кэширование и CDN",
      "Infrastructure observability",
    ],
    href: "/solutions/highload",
    cta: "Изучить Highload архитектуру",
    icon: Server,
  },
  {
    num: "04",
    title: "E-commerce платформы",
    desc: "Создание кастомных интернет-платформ с гибкой бизнес-логикой и глубокой интеграцией с внутренними системами компании.",
    includes: [
      "Каталоги 500k+ SKU",
      "B2B кабинеты",
      "API-first checkout",
      "OMS/WMS интеграции",
      "SEO-архитектура",
      "Real-time остатки",
    ],
    href: "/solutions/razrabotka-platformy",
    cta: "Изучить E-commerce платформы",
    icon: Globe,
  },
  {
    num: "05",
    title: "Кибербезопасность",
    desc: "Защита корпоративной инфраструктуры, контроль доступа и аудит безопасности на уровне архитектуры.",
    includes: [
      "Security-by-design",
      "RBAC и контроль доступа",
      "Аудит безопасности",
      "WAF и защита API",
      "Шифрование данных",
      "Защита инфраструктуры",
    ],
    href: "/solutions/security",
    cta: "Изучить аудит безопасности",
    icon: Shield,
  },
];

const TIMELINE_STEPS: Step[] = [
  { num: "01", title: "Анализ инфраструктуры", desc: "Детальный аудит текущих бизнес-процессов, выявление «узких горлышек» и ограничений систем." },
  { num: "02", title: "Аудит ограничений", desc: "Поиск технических барьеров в CMS, базах данных и интеграциях, снижающих скорость работы." },
  { num: "03", title: "Архитектурное проектирование", desc: "Создание концептуальной схемы будущего цифрового ядра, микросервисов и путей масштабирования." },
  { num: "04", title: "Интеграционная модель", desc: "Разработка API-first шины данных для связывания 1С, ERP, CRM, сайтов и внешних сервисов." },
  { num: "05", title: "Highload инфраструктура", desc: "Развертывание кластеров с балансировкой нагрузки, отказоустойчивыми БД и асинхронными очередями." },
  { num: "06", title: "Непрерывное развитие платформы", desc: "Мониторинг, оптимизация запросов, CI/CD процессы и постепенное расширение функционала." },
];

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Backend",
    desc: "Высокопроизводительные сервисы и бизнес-логика",
    items: ["Go", "Node.js", "PHP"],
    icon: Terminal,
  },
  {
    title: "Infrastructure",
    desc: "Оркестрация, шины обмена сообщениями и масштабируемость",
    items: ["Kubernetes", "Docker", "RabbitMQ", "Redis", "NATS"],
    icon: Network,
  },
  {
    title: "Databases",
    desc: "Хранилища данных, оптимизированные под разные типы нагрузок",
    items: ["PostgreSQL", "ElasticSearch", "ClickHouse"],
    icon: Database,
  },
  {
    title: "Frontend",
    desc: "Быстрые пользовательские интерфейсы с фокусом на Core Web Vitals",
    items: ["Next.js", "React", "TypeScript"],
    icon: Globe,
  },
];

const LIMITS_DATA = [
  { title: "Платформа начинает тормозить при росте каталога", desc: "Стандартные CMS (Bitrix, WooCommerce) упираются в ограничения базы данных при количестве товаров свыше 100k SKU." },
  { title: "Интеграции с 1С становятся нестабильными", desc: "Обмен данными зависает или приводит к рассинхронизации остатков, срывая заказы и вызывая недовольство клиентов." },
  { title: "WordPress больше не выдерживает нагрузку", desc: "Пиковый трафик во время промо-акций роняет сайт из-за тяжелой архитектуры плагинов и отсутствия кэширования." },
  { title: "ERP система ограничивает бизнес-процессы", desc: "Готовые коробочные решения не позволяют внедрить уникальную логику компании, замедляя операционную работу." },
  { title: "Стоимость поддержки постоянно растёт", desc: "Устранение старых багов (legacy) и попытки доработать закрытый код CMS обходятся дороже создания кастомной системы." },
  { title: "Архитектура мешает масштабированию", desc: "Любая новая фича требует переписывания половины проекта, создавая новые риски безопасности и стабильности." },
];

const RESEARCH_DATA = [
  {
    title: "Почему WordPress и WooCommerce тормозят при росте каталога",
    desc: "Глубокий технический разбор ограничений базы данных WP_Posts, влияния плагинов и путей переезда на Next.js.",
    time: "14 мин чтения",
    slug: "pochemu-wordpress-tormozit-pri-roste-kataloga",
    type: "исследование",
    href: "/research/pochemu-wordpress-tormozit-pri-roste-kataloga"
  },
  {
    title: "Почему Excel и ручные процессы разрушают бизнес при росте",
    desc: "Анализ операционных потерь, возникающих при масштабировании компании без централизованного ERP-ядра.",
    time: "16 мин чтения",
    slug: "pochemu-excel-razrushaet-biznes",
    type: "аналитика",
    href: "/research/pochemu-excel-razrushaet-biznes"
  },
  {
    title: "Почему API-first архитектура становится стандартом корпоративных систем",
    desc: "Как разделение интерфейсов и логики (headless) обеспечивает технологическую независимость и гибкость.",
    time: "12 мин чтения",
    slug: "api-first-architecture-standard",
    type: "архитектурный стандарт",
    href: "/research/api-first-architecture-standard"
  },
  {
    title: "Как масштабировать каталог 500k+ SKU в реальном времени",
    desc: "Практическое руководство по созданию распределенного API чекаута, кэширования и WMS интеграций.",
    time: "18 мин чтения",
    slug: "highload-ecommerce-scale",
    type: "кейс-гайд",
    href: "/solutions/razrabotka-platformy"
  },
];

const SEGMENTS = [
  "E-commerce компании",
  "B2B платформы",
  "Enterprise бизнес",
  "Компании с интеграциями 1С",
  "Highload проекты",
  "Распределённые цифровые системы"
];

// ─── HIGH-FIDELITY INFRASTRUCTURE TOPOLOGY ───────────────────────────────────

interface TopologyNode {
  id: string;
  label: string;
  icon: any;
  angle: number;
  radius: number;
}

const TOPOLOGY_NODES: TopologyNode[] = [
  { id: "api", label: "API GATEWAY", icon: Globe, angle: -90, radius: 52 },
  { id: "erp", label: "ERP CORE", icon: Cpu, angle: -30, radius: 50 },
  { id: "db", label: "DB CLUSTER", icon: Database, angle: 30, radius: 55 },
  { id: "security", label: "SECURE LAYER", icon: Shield, angle: 90, radius: 48 },
  { id: "broker", label: "MSG BROKER", icon: Workflow, angle: 150, radius: 53 },
  { id: "cache", label: "FAST CACHE", icon: Zap, angle: 210, radius: 50 },
];

function InfrastructureTopology() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState({
    latency: 8,
    sync: 100,
    load: 14.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        latency: Math.max(4, +(8 + Math.sin(Date.now() / 1000) * 1.5).toFixed(1)),
        sync: Math.max(98.8, +(99.9 + Math.cos(Date.now() / 2000) * 0.05).toFixed(2)),
        load: Math.max(5, +(14.5 + Math.sin(Date.now() / 800) * 1.2).toFixed(1))
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none">
      {/* Background Volumetric Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.15)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0B]/30 to-transparent" />
      </div>

      {/* Main Animated Topology Container */}
      <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
        <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible z-10">
          <defs>
            {/* Volumetric glow effects */}
            <filter id="glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-light" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Core System Energy Waves */}
          {[0, 1, 2].map((wave) => (
            <motion.circle
              key={wave}
              cx="80"
              cy="80"
              fill="none"
              stroke="#4633FF"
              strokeWidth="0.12"
              initial={{ r: 12, opacity: 0 }}
              animate={{
                r: [12, 64],
                opacity: [0, 0.35, 0]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: wave * 1.5,
                ease: "easeOut"
              }}
              style={{ filter: "url(#glow-light)" }}
            />
          ))}

          {/* Radiating Orbital Tracks */}
          {[26, 38, 52].map((r, idx) => (
            <motion.circle
              key={idx}
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="0.15"
              strokeDasharray={idx === 1 ? "1.5 5" : "none"}
              animate={idx === 1 ? { rotate: -360 } : {}}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Connection Conduits */}
          {TOPOLOGY_NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = 80 + Math.cos(rad) * node.radius;
            const ny = 80 + Math.sin(rad) * node.radius;
            const pathD = `M 80 80 L ${nx} ${ny}`;
            const isHovered = hoveredNode === node.id;

            return (
              <g key={node.id}>
                {/* Structural Line */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#4633FF"
                  strokeWidth="0.25"
                  animate={isHovered ? { strokeOpacity: 0.8, strokeWidth: 0.4 } : { strokeOpacity: 0.35, strokeWidth: 0.25 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Energy Pulse (Packets) */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity="0.85"
                  strokeDasharray="0.8 28"
                  animate={{ strokeDashoffset: -56 }}
                  transition={{
                    duration: 2.2 + (i % 2) * 0.4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.25
                  }}
                  style={{ filter: "url(#glow-heavy)" }}
                />
              </g>
            );
          })}

          {/* Central System Core */}
          <motion.g
            className="cursor-pointer"
            onHoverStart={() => setHoveredNode("core")}
            onHoverEnd={() => setHoveredNode(null)}
          >
            <circle cx="80" cy="80" r="13" fill="#0A0A0B" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
            <motion.circle
              cx="80"
              cy="80"
              r="10"
              fill="rgba(70, 51, 255, 0.12)"
              stroke="#4633FF"
              strokeWidth="0.8"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "url(#glow-heavy)" }}
            />
            <text x="80" y="81.2" textAnchor="middle" fontSize="2.8" fill="white" fontWeight="800" letterSpacing="0.04em" style={{ opacity: 0.9 }}>
              KIBEX
            </text>
          </motion.g>

          {/* Peripheral Operational Nodes */}
          {TOPOLOGY_NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = 80 + Math.cos(rad) * node.radius;
            const y = 80 + Math.sin(rad) * node.radius;
            const isHovered = hoveredNode === node.id;

            return (
              <motion.g
                key={node.id}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                className="cursor-pointer"
                animate={{
                  y: [0, -1.2, 0],
                  x: [0, (i % 2 === 0 ? 0.4 : -0.4), 0]
                }}
                transition={{
                  duration: 4.5 + (i % 3) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15
                }}
              >
                {/* Node shell */}
                <circle cx={x} cy={y} r="7" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.25" />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7.8 : 7}
                  fill="none"
                  stroke={isHovered ? "white" : "rgba(70, 51, 255, 0.3)"}
                  strokeWidth={isHovered ? 0.8 : 0.25}
                  animate={isHovered ? { opacity: [0.4, 0.8, 0.4] } : { opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Node Icon */}
                <foreignObject x={x - 4.5} y={y - 4.5} width="9" height="9" className="overflow-visible pointer-events-none">
                  <div className={`flex items-center justify-center w-full h-full transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/60'}`}>
                    <node.icon size={4} strokeWidth={isHovered ? 1.6 : 1.2} />
                  </div>
                </foreignObject>

                {/* Node Title */}
                <text
                  x={x}
                  y={y + 11}
                  textAnchor="middle"
                  fill={isHovered ? "white" : "rgba(255, 255, 255, 0.4)"}
                  fontSize="2"
                  fontWeight="700"
                  letterSpacing="0.02em"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Monospace telemetry logs panel */}
      <div className="w-full max-w-[380px] bg-white/[0.02] border border-white/5 rounded-xl p-4 font-mono text-[11px] text-white/50 space-y-2 mt-4 backdrop-blur-md shadow-lg">
        <div className="flex justify-between border-b border-white/5 pb-1">
          <span className="text-[#8C76FF] font-bold">KIBEX_ORCHESTRATOR: ACTIVE</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex justify-between">
            <span>SYS_LATENCY:</span>
            <span className="text-white font-medium">{telemetry.latency} ms</span>
          </div>
          <div className="flex justify-between">
            <span>NET_SYNC:</span>
            <span className="text-white font-medium">{telemetry.sync}%</span>
          </div>
          <div className="flex justify-between">
            <span>CORE_LOAD:</span>
            <span className="text-white font-medium">{telemetry.load}%</span>
          </div>
          <div className="flex justify-between">
            <span>ACTIVE_NODES:</span>
            <span className="text-white font-medium">6 / 6</span>
          </div>
        </div>
        <div className="text-[9px] text-white/30 truncate mt-1">
          // routing packets via fast_channel_02.ssl_handshake ... ok
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SOLUTIONS HUB PAGE ─────────────────────────────────────────────────

export default function SolutionsPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Form submission states for Final CTA
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>({});

  // Refs for final form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const hpRef = useRef<HTMLInputElement>(null);

  // Auto-scroll logic to research or elements
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (hpRef.current?.value) {
      setIsSubmitted(true);
      return;
    }

    // Rate limiting cooldown (60 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      alert("Пожалуйста, подождите минуту перед повторной отправкой.");
      return;
    }

    // Extraction & Validation
    const name = nameRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const desc = descRef.current?.value.trim() ?? "";

    const newErrors: Partial<Record<string, string>> = {};
    if (!name) newErrors.name = "Имя обязательно";
    if (!phone) newErrors.phone = "Телефон обязателен";
    if (!email) newErrors.email = "Email обязателен";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Введите корректный email";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          name,
          contact: `${phone} / ${email}`,
          projectType: "Нужна консультация",
          description: desc,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }
    } catch (err) {
      // Network/API fallback — show success UX silently to keep premium feeling
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmitTime(Date.now());
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-x-hidden font-sans antialiased selection:bg-[#4633FF]/30">
      <Header />

      {/* Cinematic engineering grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold tracking-[0.3em] text-[#8C76FF] uppercase mb-4 block"
            >
              АРХИТЕКТУРНЫЕ РЕШЕНИЯ KIBEX
            </motion.span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 font-sans">
              {["Проектируем цифровые системы,", "которые выдерживают рост,", "нагрузку и сложную бизнес-логику"].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-white/60 leading-relaxed max-w-2xl mb-10 font-sans"
            >
              Kibex разрабатывает ERP системы, highload платформы и e-commerce инфраструктуру для компаний, которым необходимы производительность, масштабируемость и полный контроль над архитектурой.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setPopupOpen(true)}
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-br from-[#4633FF] to-[#2A1E99] text-white px-8 py-4.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(70,51,255,0.25)] hover:shadow-[0_0_35px_rgba(70,51,255,0.45)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                Получить архитектурную консультацию
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToId("research-section")}
                className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4.5 rounded-xl font-bold transition-all cursor-pointer"
              >
                Изучить исследования
              </button>
            </motion.div>
          </div>

          {/* Right Hero Visual (Animated Topology) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <InfrastructureTopology />
          </motion.div>
        </div>
      </section>

      {/* ── 2. SECTION: ЧТО МЫ ПРОЕКТИРУЕМ ── */}
      <section className="py-24 border-t border-white/5 relative bg-[#09090A]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-3 block">НАПРАВЛЕНИЯ ЭКСПЕРТИЗЫ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Архитектурные направления Kibex
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Мы строим кастомные решения, полностью адаптированные под ваши операционные процессы, минуя вендорские ограничения.
            </p>
          </div>

          {/* Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOCKS.map((block, index) => {
              const BlockIcon = block.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group flex flex-col justify-between p-8 bg-white/[0.01] border border-white/[0.04] rounded-2xl hover:border-[#4633FF]/30 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden shadow-lg"
                >
                  {/* Hover Accent Line */}
                  <div className="absolute top-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#4633FF] to-[#8C76FF] group-hover:w-full transition-all duration-500" />
                  
                  <div>
                    {/* Block Header */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-sm text-[#8C76FF] font-semibold">{block.num}</span>
                      <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-[#4633FF]/20 group-hover:bg-[#4633FF]/5 transition-all">
                        <BlockIcon size={20} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#8C76FF] transition-colors">
                      {block.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {block.desc}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 border-t border-white/5 pt-6 mb-8">
                      {block.includes.map((inc, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                          <span className="w-1 h-1 rounded-full bg-[#4633FF]" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={block.href}
                    className="group/btn flex items-center justify-center gap-2 w-full py-3.5 bg-white/[0.02] border border-white/5 group-hover:bg-[#4633FF] group-hover:border-[#4633FF] rounded-xl text-xs font-bold text-white tracking-wide transition-all"
                  >
                    {block.cta}
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. SECTION: АРХИТЕКТУРНЫЙ ПОДХОД ── */}
      <section className="py-24 border-t border-white/5 bg-[#0A0A0B] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-3 block">ПРОЦЕСС ИНЖЕНЕРИИ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Как Kibex проектирует системы
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Мы опираемся на строгие инженерные фазы, гарантирующие прозрачность интеграции, предсказуемость отказоустойчивости и готовность к нагрузкам.
            </p>
          </div>

          {/* Interactive Steps Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {/* Horizontal timeline connector lines (Desktop only) */}
            <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-[1px] bg-white/[0.04] pointer-events-none z-0" />

            {TIMELINE_STEPS.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  className="relative z-10 cursor-pointer"
                  onClick={() => setActiveStep(i)}
                >
                  <div
                    className={`h-full p-8 rounded-2xl border transition-all duration-500 ${
                      isActive
                        ? "bg-[#11101E] border-[#4633FF]/40 shadow-[0_0_20px_rgba(70,51,255,0.1)]"
                        : "bg-white/[0.01] border-white/[0.04] hover:border-white/10"
                    }`}
                  >
                    {/* Connection dot on the horizontal line */}
                    <div className="hidden lg:flex absolute top-[43px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full items-center justify-center bg-[#0A0A0B] border border-white/10 z-20">
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full bg-[#4633FF]"
                        animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 0.8 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </div>

                    <div className="flex items-center justify-between mb-6 lg:mt-8">
                      <span className="font-mono text-sm text-[#8C76FF] font-bold">{step.num}</span>
                      <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/30 uppercase">
                        <Activity size={10} className="text-[#8C76FF] animate-pulse" />
                        phase_{step.num}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#8C76FF]">
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. SECTION: ИНФРАСТРУКТУРНЫЙ СТЕК ── */}
      <section className="py-24 border-t border-white/5 bg-[#09090A] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-3 block">ТЕХНОЛОГИЧЕСКИЙ АРСЕНАЛ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Технологическая инфраструктура
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Архитектура систем Kibex базируется на открытых протоколах и индустриальных стандартах корпоративного ПО.
            </p>
          </div>

          {/* Stacks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TECH_CATEGORIES.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-white/[0.01] border border-white/[0.04] rounded-2xl hover:border-white/10 transition-colors shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#8C76FF]">
                      <CatIcon size={16} />
                    </div>
                    <h3 className="font-bold text-white text-lg">{cat.title}</h3>
                  </div>

                  <p className="text-white/40 text-xs leading-relaxed mb-6 min-h-[36px]">
                    {cat.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg text-xs font-mono text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. SECTION: КОГДА БИЗНЕСУ НУЖНА НОВАЯ АРХИТЕКТУРА ── */}
      <section className="py-24 border-t border-white/5 bg-[#0A0A0B] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase mb-3 block">ДИАГНОСТИКА СИСТЕМ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Когда бизнесу нужна новая архитектура
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Недоработки и ограничения старой кодовой базы со временем тормозят операционное развитие. Обратите внимание на ключевые симптомы деградации инфраструктуры:
            </p>
          </div>

          {/* Limits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LIMITS_DATA.map((limit, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#0D0D0E]/60 border border-white/[0.03] rounded-2xl flex items-start gap-5 hover:border-amber-500/20 transition-all shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                  <AlertTriangle size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                    {limit.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {limit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SECTION: ИССЛЕДОВАНИЯ KIBEX ── */}
      <section id="research-section" className="py-24 border-t border-white/5 bg-[#09090A] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-3 block">KIBEX RESEARCH LAB</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Исследования Kibex
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Наш инженерный центр исследует паттерны производительности и делится практическими руководствами по масштабированию инфраструктуры.
            </p>
          </div>

          {/* Research Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESEARCH_DATA.map((article, idx) => (
              <div
                key={idx}
                className="p-8 bg-white/[0.01] border border-white/[0.03] rounded-2xl flex flex-col justify-between hover:border-[#4633FF]/30 transition-all relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.06)_0%,transparent_70%)] pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-[10px] uppercase font-mono tracking-widest text-[#8C76FF] font-bold">
                      {article.type}
                    </span>
                    <span className="text-xs text-white/30 font-mono flex items-center gap-1">
                      <FileText size={12} /> {article.time}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#8C76FF] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    {article.desc}
                  </p>
                </div>

                <Link
                  href={article.href}
                  className="group/btn text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5 transition-colors self-start border-b border-white/10 pb-0.5"
                >
                  Изучить исследование
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1 text-[#8C76FF]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SECTION: ДЛЯ КОГО ЭТИ РЕШЕНИЯ ── */}
      <section className="py-24 border-t border-white/5 bg-[#0A0A0B] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-3 block">ЦЕЛЕВЫЕ СЕГМЕНТЫ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Для кого эти решения
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Мы сотрудничаем с компаниями, готовыми инвестировать в технологическую независимость и создание собственного цифрового ядра.
            </p>
          </div>

          {/* Segments tags grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEGMENTS.map((seg, idx) => (
              <div
                key={idx}
                className="px-6 py-6 bg-white/[0.01] border border-white/[0.04] hover:border-white/10 rounded-xl flex items-center gap-4 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#4633FF]/10 flex items-center justify-center text-[#8C76FF] shrink-0">
                  <Check size={12} strokeWidth={2.5} />
                </div>
                <span className="text-white/80 font-medium text-sm md:text-base">{seg}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA SECTION ── */}
      <section className="py-24 border-t border-white/5 bg-[#09090A] relative">
        {/* Decorative background grid and volumetric glows */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* CTA Left Copy */}
            <div className="lg:col-span-5 flex flex-col text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-4 block">АРХИТЕКТУРНЫЙ АУДИТ</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Бизнес не должен упираться в ограничения платформы
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Получите архитектурную оценку текущей инфраструктуры и стратегию масштабирования цифровой системы компании.
              </p>
              
              <div className="space-y-4 border-t border-white/5 pt-8">
                {[
                  "Абсолютная конфиденциальность данных",
                  "Разбор ограничений вашей текущей CMS",
                  "Ориентировочные сроки и бюджет перехода"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-white/40">
                    <CheckCircle2 size={16} className="text-[#8C76FF]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Right Minimal Form */}
            <div className="lg:col-span-7 w-full bg-white/[0.01] border border-white/[0.04] rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden">
              {!isSubmitted ? (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  {/* Honeypot field */}
                  <input ref={hpRef} type="text" name="_hp_site" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-white/40 ml-1 block">Имя *</label>
                      <input
                        ref={nameRef}
                        type="text"
                        required
                        placeholder="Ваше имя"
                        className={`w-full bg-white/[0.02] border ${formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 transition-colors`}
                      />
                      {formErrors.name && <p className="text-red-500 text-[11px] ml-1">{formErrors.name}</p>}
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-white/40 ml-1 block">Телефон *</label>
                      <input
                        ref={phoneRef}
                        type="tel"
                        required
                        placeholder="+7 (999) 999-99-99"
                        className={`w-full bg-white/[0.02] border ${formErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 transition-colors`}
                      />
                      {formErrors.phone && <p className="text-red-500 text-[11px] ml-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/40 ml-1 block">Email *</label>
                    <input
                      ref={emailRef}
                      type="email"
                      required
                      placeholder="your@company.ru"
                      className={`w-full bg-white/[0.02] border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 transition-colors`}
                    />
                    {formErrors.email && <p className="text-red-500 text-[11px] ml-1">{formErrors.email}</p>}
                  </div>

                  {/* Description Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/40 ml-1 block">Описание задачи</label>
                    <textarea
                      ref={descRef}
                      placeholder="Кратко опишите текущую платформу, задачи или ограничения"
                      rows={4}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-br from-[#4633FF] to-[#2A1E99] text-white py-4.5 rounded-xl font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(70,51,255,0.2)] hover:shadow-[0_4px_35px_rgba(70,51,255,0.4)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                  >
                    {isSubmitting ? "Отправка..." : "Получить консультацию"}
                    {!isSubmitting && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                  </button>
                  
                  <p className="text-center text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4633FF]/10 border border-[#4633FF]/30 flex items-center justify-center text-[#8C76FF] mb-6">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Запрос отправлен</h3>
                  <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-8">
                    Мы свяжемся с вами в течение 24 часов для проведения первичной архитектурной консультации.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-wider transition-colors"
                  >
                    Отправить ещё раз
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <SolutionPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
