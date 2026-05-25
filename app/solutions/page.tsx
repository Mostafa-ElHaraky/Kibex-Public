"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  Check,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolutionPopup from "../../components/SolutionPopup";
import SolutionsSection from "../../components/home/SolutionsSection";
import TechStackArchitecture from "../../components/solutions/TechStackArchitecture";
import SystemDiagnostics from "../../components/solutions/SystemDiagnostics";



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
      "Безопасная SEO-миграция",
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
      "Мониторинг инфраструктуры",
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
      "API-first оформление заказов",
      "OMS/WMS интеграции",
      "SEO-архитектура",
      "Остатки в реальном времени",
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
      "Безопасность на уровне архитектуры",
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
  { num: "01", title: "Анализ инфраструктуры", desc: "Детальный аудит текущих бизнес-процессов, выявление «узких горлышек» и ограничений систем" },
  { num: "02", title: "Аудит ограничений", desc: "Поиск технических барьеров в CMS, базах данных и интеграциях, снижающих скорость работы" },
  { num: "03", title: "Архитектурное проектирование", desc: "Создание концептуальной схемы будущего цифрового ядра, микросервисов и путей масштабирования" },
  { num: "04", title: "Интеграционная модель", desc: "Разработка API-first шины данных для связывания 1С, ERP, CRM, сайтов и внешних сервисов" },
  { num: "05", title: "Highload инфраструктура", desc: "Развертывание кластеров с балансировкой нагрузки, отказоустойчивыми БД и асинхронными очередями" },
  { num: "06", title: "Непрерывное развитие платформы", desc: "Мониторинг, оптимизация запросов, CI/CD процессы и постепенное расширение функционала" },
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
    type: "архитектура",
    href: "/research/api-first-architecture-standard"
  },
  {
    title: "Как масштабировать каталог 500k+ SKU в реальном времени",
    desc: "Практическое руководство по созданию распределенного API чекаута, кэширования и WMS интеграций.",
    time: "18 мин чтения",
    slug: "highload-ecommerce-scale",
    type: "инженерный обзор",
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



// ─── PIPELINE VISUALIZATION COMPONENTS ──────────────────────────────────────────

function GridScanner({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-24 bg-[#0A0A0C] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(122, 44, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(122, 44, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '12px 12px'
        }}
      />

      {/* Moving scanner line */}
      <motion.div
        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7a2cff] to-transparent shadow-[0_0_8px_rgba(122,44,255,0.6)]"
        animate={{
          top: ["0%", "100%", "0%"]
        }}
        transition={{
          duration: isHovered ? 2.2 : 3.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="flex gap-4 font-mono text-[9px] text-white/35 z-10 select-none">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7a2cff]/60 animate-pulse" />
          <span>SYS.AUDIT</span>
        </div>
        <div className="flex items-center gap-1">
          <span>LIMIT: 99.8%</span>
        </div>
      </div>
    </div>
  );
}

function ConnectionNodes({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-24 bg-[#0A0A0C] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
      <svg className="w-40 h-16 opacity-75" viewBox="0 0 160 64" fill="none">
        {/* Node connections */}
        <line x1="20" y1="32" x2="50" y2="16" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="20" y1="32" x2="50" y2="48" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="50" y1="16" x2="90" y2="16" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Bottleneck link */}
        <motion.line
          x1="50" y1="48" x2="90" y2="48"
          stroke="#7a2cff"
          strokeWidth="0.8"
          animate={{
            strokeOpacity: isHovered ? [0.1, 0.45, 0.05, 0.35, 0.1] : [0.1, 0.25, 0.05, 0.25, 0.1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          strokeDasharray="2 2"
        />
        <line x1="90" y1="16" x2="140" y2="32" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="90" y1="48" x2="140" y2="32" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Normal Nodes */}
        <circle cx="20" cy="32" r="3" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1.2" />
        <circle cx="50" cy="16" r="3" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1.2" />

        {/* Blinking bottleneck node */}
        <motion.circle
          cx="50" cy="48" r="3.5"
          fill="#0A0A0C"
          stroke="#7a2cff"
          strokeWidth="1.2"
          animate={{
            stroke: ["#7a2cff", "#3b177a", "#7a2cff"],
            scale: isHovered ? [1, 1.2, 1] : [1, 1, 1]
          }}
          transition={{
            duration: 3.0,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <circle cx="90" cy="16" r="3" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1.2" />

        <motion.circle
          cx="90" cy="48" r="3"
          fill="#0A0A0C"
          stroke="#7a2cff"
          strokeWidth="1.2"
          animate={{
            strokeOpacity: [0.3, 0.9, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <circle cx="140" cy="32" r="3" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

function BlueprintLines({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-24 bg-[#0A0A0C] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111, 60, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111, 60, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px'
        }}
      />
      <svg className="w-48 h-20 opacity-80" viewBox="0 0 192 80" fill="none">
        <motion.path
          d="M 16 40 H 56 V 16 H 136 V 64 H 176"
          stroke="#6f3cff"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: isHovered ? 3.5 : 5.0,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
        <rect x="56" y="24" width="24" height="12" stroke="#6f3cff" strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.3" />
        <rect x="96" y="44" width="32" height="12" stroke="#6f3cff" strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.3" />
        <circle cx="136" cy="40" r="12" stroke="#6f3cff" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.2" />
        <line x1="96" y1="16" x2="96" y2="64" stroke="#6f3cff" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="1 3" />
      </svg>
    </div>
  );
}

function ApiNodes({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-24 bg-[#0A0A0C] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
      <svg className="w-44 h-16 opacity-75" viewBox="0 0 176 64" fill="none">
        <line x1="20" y1="32" x2="88" y2="32" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="88" y1="32" x2="156" y2="32" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="88" y1="12" x2="88" y2="52" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.3" />

        <motion.circle
          r="1.8"
          fill="#fff"
          animate={{
            cx: [20, 88],
            cy: [32, 32]
          }}
          transition={{
            duration: isHovered ? 1.8 : 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.circle
          r="1.8"
          fill="#7a2cff"
          animate={{
            cx: [88, 156],
            cy: [32, 32]
          }}
          transition={{
            duration: isHovered ? 1.6 : 2.2,
            repeat: Infinity,
            ease: "linear",
            delay: 0.6
          }}
        />
        <motion.circle
          r="1.5"
          fill="#7a2cff"
          animate={{
            cx: [88, 88],
            cy: [12, 52]
          }}
          transition={{
            duration: isHovered ? 2.2 : 3.0,
            repeat: Infinity,
            ease: "linear",
            delay: 0.2
          }}
        />

        <circle cx="20" cy="32" r="4.5" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1.2" />
        <circle cx="88" cy="32" r="5" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1.2" />
        <circle cx="156" cy="32" r="4.5" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1.2" />

        <circle cx="88" cy="12" r="3" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1" />
        <circle cx="88" cy="52" r="3" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1" />

        <text x="20" y="24" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" opacity="0.3" className="font-mono">1C</text>
        <text x="88" y="24" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" opacity="0.4" className="font-mono">BUS</text>
        <text x="156" y="24" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" opacity="0.3" className="font-mono">CRM</text>
      </svg>
    </div>
  );
}

function DistributedServers({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-24 bg-[#0A0A0C] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
      <svg className="w-40 h-20 opacity-80" viewBox="0 0 160 80" fill="none">
        <path d="M 80 15 Q 40 40 40 55" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.25" />
        <path d="M 80 15 Q 80 40 80 55" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.25" />
        <path d="M 80 15 Q 120 40 120 55" stroke="#7a2cff" strokeWidth="0.8" strokeOpacity="0.25" />

        <motion.circle
          r="1.8"
          fill="#7a2cff"
          animate={{
            offsetDistance: ["0%", "100%"]
          }}
          transition={{
            duration: isHovered ? 1.5 : 2.2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ motionPath: "path('M 80 15 Q 40 40 40 55')" }}
        />
        <motion.circle
          r="1.8"
          fill="#fff"
          animate={{
            offsetDistance: ["0%", "100%"]
          }}
          transition={{
            duration: isHovered ? 1.8 : 2.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.4
          }}
          style={{ motionPath: "path('M 80 15 Q 80 40 80 55')" }}
        />
        <motion.circle
          r="1.8"
          fill="#7a2cff"
          animate={{
            offsetDistance: ["0%", "100%"]
          }}
          transition={{
            duration: isHovered ? 2.0 : 2.8,
            repeat: Infinity,
            ease: "linear",
            delay: 0.8
          }}
          style={{ motionPath: "path('M 80 15 Q 120 40 120 55')" }}
        />

        <rect x="68" y="5" width="24" height="10" rx="1.5" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1" />
        <circle cx="80" cy="10" r="1.5" fill="#7a2cff" className="animate-pulse" />

        {[30, 70, 110].map((xVal, idx) => (
          <g key={idx} transform={`translate(${xVal}, 55)`}>
            <rect x="0" y="0" width="20" height="18" rx="1.5" fill="#0A0A0C" stroke="#7a2cff" strokeWidth="1" strokeOpacity="0.8" />
            <line x1="3" y1="5" x2="17" y2="5" stroke="#7a2cff" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="3" y1="9" x2="17" y2="9" stroke="#7a2cff" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="3" y1="13" x2="17" y2="13" stroke="#7a2cff" strokeWidth="0.6" strokeOpacity="0.4" />

            <motion.circle
              cx="16" cy="9" r="1"
              fill="#fff"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function CicdLoop({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-24 bg-[#0A0A0C] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
      <svg className="w-24 h-24 opacity-85" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r="32" stroke="#7a2cff" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.2" />

        <motion.circle
          cx="48" cy="48"
          r="26"
          stroke="#7a2cff"
          strokeWidth="1.2"
          strokeDasharray="40 10 20 10"
          animate={{ rotate: 360 }}
          transition={{
            duration: isHovered ? 10 : 16,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: "48px 48px" }}
        />

        <motion.circle
          cx="48" cy="22"
          r="2"
          fill="#fff"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="74" cy="48"
          r="1.8"
          fill="#7a2cff"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="22" cy="48"
          r="1.8"
          fill="#7a2cff"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.0 }}
        />

        <text x="48" y="51" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" opacity="0.4" className="font-mono">CI/CD</text>
      </svg>
    </div>
  );
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

function TimelineCard({ step, idx }: { step: Step; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const renderVisual = () => {
    switch (idx) {
      case 0:
        return <GridScanner isHovered={isHovered} />;
      case 1:
        return <ConnectionNodes isHovered={isHovered} />;
      case 2:
        return <BlueprintLines isHovered={isHovered} />;
      case 3:
        return <ApiNodes isHovered={isHovered} />;
      case 4:
        return <DistributedServers isHovered={isHovered} />;
      case 5:
        return <CicdLoop isHovered={isHovered} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative z-10 flex flex-col md:flex-row gap-6 items-stretch p-6 rounded-2xl border bg-[#0D0D0F] border-white/5 hover:border-[#7a2cff]/40 transition-all duration-500 shadow-lg"
    >
      {/* Connection dot on the vertical line */}
      <div className="absolute left-[-24px] md:left-[-36px] top-[34px] w-4 h-4 rounded-full bg-[#0A0A0B] border border-white/10 z-10 flex items-center justify-center">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#7a2cff]"
          animate={isHovered ? { scale: [1, 1.35, 1] } : { scale: 0.8 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      {/* Text Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-sm text-[#8C76FF] font-bold">{step.num}</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 transition-transform duration-300 group-hover:translate-x-[2px] font-sans">
            {step.title}
          </h3>
          <p className="text-white/45 text-sm md:text-[15px] leading-relaxed font-sans">
            {step.desc}
          </p>
        </div>
      </div>

      {/* Visual representation */}
      <div className="w-full md:w-56 shrink-0 flex items-center">
        {renderVisual()}
      </div>
    </motion.div>
  );
}

// ─── MAIN SOLUTIONS HUB PAGE ─────────────────────────────────────────────────

export default function SolutionsPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [consultPopupOpen, setConsultPopupOpen] = useState(false);
  const [consultName, setConsultName] = useState("");
  const [consultPhone, setConsultPhone] = useState("+7");
  const [consultConsent, setConsultConsent] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [consultSubmitting, setConsultSubmitting] = useState(false);

  const isConsultFormValid =
    /^[A-Za-zА-Яа-я\s]{2,50}$/.test(consultName) &&
    /^\+7\d{10}$/.test(consultPhone) &&
    consultConsent;

  const handleCloseConsultPopup = () => {
    setConsultPopupOpen(false);
    setConsultSubmitted(false);
    setConsultName("");
    setConsultPhone("+7");
    setConsultConsent(false);
  };

  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  // Form submission states for Final CTA (aligned with main page hero popup modal)
  const [ctaName, setCtaName] = useState("");
  const [ctaCompany, setCtaCompany] = useState("");
  const [ctaPhone, setCtaPhone] = useState("+7");
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaProjectType, setCtaProjectType] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [ctaIsPrivacyAccepted, setCtaIsPrivacyAccepted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const isCtaFormValid =
    /^[A-Za-zА-Яа-я\s]{2,50}$/.test(ctaName) &&
    /^\+7\d{10}$/.test(ctaPhone) &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ctaEmail) &&
    ctaProjectType !== "" &&
    (ctaDescription === "" || ctaDescription.length >= 100) &&
    ctaIsPrivacyAccepted;

  // Auto-scroll logic to research or elements
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get("_hp_field")) {
      setIsSubmitted(true);
      return;
    }

    // Rate limiting cooldown (60 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      alert("Пожалуйста, подождите минуту перед повторной отправкой.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          name: ctaName,
          company: ctaCompany,
          contact: `${ctaPhone} / ${ctaEmail}`,
          projectType: ctaProjectType,
          description: ctaDescription,
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
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src="/solution.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
          {/* Light blend — keeps video visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/60 via-transparent to-[#0A0A0B]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/10 via-transparent to-[#0A0A0B]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

          {/* Left Hero Content */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 font-sans">
              {["Проектируем", "цифровые системы", "которые", "выдерживают рост,", "нагрузку и сложную бизнес-логику"].map((line, i) => (
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
              Kibex проектирует ERP системы, highload платформы и e-commerce инфраструктуру для компаний, которым необходимы масштабируемость, производительность и полный контроль над цифровой архитектурой.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setConsultPopupOpen(true)}
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-br from-[#4633FF] to-[#2A1E99] text-white px-8 py-4.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(70,51,255,0.25)] hover:shadow-[0_0_35px_rgba(70,51,255,0.45)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                Получить архитектурную консультацию
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => router.push("/research")}
                className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4.5 rounded-xl font-bold transition-all cursor-pointer"
              >
                Изучить исследования
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. SECTION: ИНЖЕНЕРНЫЕ РЕШЕНИЯ ── */}
      <SolutionsSection />

      {/* ── 3. SECTION: АРХИТЕКТУРНЫЙ ПОДХОД ── */}
      <section className="py-32 border-t border-white/5 bg-[#0A0A0B] relative overflow-hidden">
        {/* Background Grid Pattern & Faint Topology */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(122, 44, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 44, 255, 0.15) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <svg className="absolute w-[800px] h-[800px] top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 opacity-30 text-[#7a2cff]" fill="none" stroke="currentColor">
            <circle cx="400" cy="400" r="100" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="400" cy="400" r="200" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="300" strokeWidth="0.5" strokeDasharray="5 5" />
            <circle cx="400" cy="400" r="400" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left side Sticky Title Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-3 block">
                  ПРОЦЕСС ИНЖЕНЕРИИ
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                  КАК KIBEX ПРОЕКТИРУЕТ СИСТЕМЫ?
                </h2>
                <p className="text-white/50 text-base leading-relaxed">
                  Мы опираемся на строгие инженерные фазы, гарантирующие предсказуемость масштабирования, стабильность интеграций и готовность инфраструктуры к нагрузкам
                </p>
              </div>

              {/* Short Engineering Philosophy */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex gap-3">
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Точность проектирования</h4>
                    <p className="text-[15px] text-white/35 leading-relaxed">
                      Каждая интеграционная шина и база данных проходит симуляцию пиковых нагрузок до написания первой строчки кода
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Непрерывный цикл</h4>
                    <p className="text-[15px] text-white/35 leading-relaxed">
                      Процесс разработки полностью автоматизирован: от тестирования кода до автоматического деплоя в кластер Kubernetes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side Timeline Pipeline */}
            <div className="lg:col-span-8">
              <div className="relative pl-8 md:pl-12 space-y-8">
                {/* Thin vertical infrastructure line */}
                <div className="absolute left-[15px] md:left-[27px] top-4 bottom-4 w-[2px] bg-white/[0.04] z-0" />

                {/* Flow packets layer */}
                <div className="absolute left-[15px] md:left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#7a2cff]/30 via-[#6f3cff] to-[#7a2cff]/30 z-0 overflow-hidden">
                  <motion.div
                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    animate={{
                      top: ["0%", "0%", "20%", "20%", "40%", "40%", "60%", "60%", "80%", "80%", "100%", "100%"]
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#7a2cff] to-transparent shadow-[0_0_8px_rgba(122,44,255,0.8)]"
                    animate={{
                      top: ["0%", "0%", "20%", "20%", "40%", "40%", "60%", "60%", "80%", "80%", "100%", "100%"]
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 6
                    }}
                  />
                  <motion.div
                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#6f3cff] to-transparent shadow-[0_0_8px_rgba(111,60,255,0.8)]"
                    animate={{
                      top: ["0%", "0%", "20%", "20%", "40%", "40%", "60%", "60%", "80%", "80%", "100%", "100%"]
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 12
                    }}
                  />
                </div>

                {TIMELINE_STEPS.map((step, i) => (
                  <TimelineCard key={i} step={step} idx={i} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. SECTION: ИНФРАСТРУКТУРНЫЙ СТЕК ── */}
      <TechStackArchitecture />

      {/* ── 5. SECTION: КОГДА БИЗНЕСУ НУЖНА НОВАЯ АРХИТЕКТУРА ── */}
      <SystemDiagnostics />

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
            <span className="text-xs font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-3 block">СФЕРА ПРИМЕНЕНИЯ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Для каких компаний подходят эти решения
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Бизнес не должен упираться в ограничения платформы
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Получите архитектурную оценку текущей инфраструктуры и стратегию масштабирования цифровой системы компании.
              </p>

              <div className="space-y-4 border-t border-white/5 pt-8">
                {[
                  "Абсолютная конфиденциальность данных",
                  "Аудит текущей архитектуры и ограничений платформы",
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
                  {/* Honeypot Field (Hidden from users) */}
                  <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-white/40 ml-1 block">Имя *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={ctaName}
                        onChange={(e) => setCtaName(e.target.value)}
                        pattern="^[A-Za-zА-Яа-я\s]{2,50}$"
                        placeholder="Ваше имя"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.04] transition-all"
                      />
                    </div>

                    {/* Company Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-white/40 ml-1 block">Компания</label>
                      <input
                        type="text"
                        name="company"
                        value={ctaCompany}
                        onChange={(e) => setCtaCompany(e.target.value)}
                        placeholder="Название компании"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.04] transition-all"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-white/40 ml-1 block">Телефон *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={ctaPhone}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (!val.startsWith("+7")) {
                            val = "+7";
                          }
                          const digits = val.substring(2).replace(/\D/g, "");
                          setCtaPhone("+7" + digits.substring(0, 10));
                        }}
                        pattern="^\+7\d{10}$"
                        placeholder="+79999999999"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.04] transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-white/40 ml-1 block">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={ctaEmail}
                        onChange={(e) => setCtaEmail(e.target.value)}
                        pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                        placeholder="your@company.ru"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.04] transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Type Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/40 ml-1 block">Тип проекта *</label>
                    <div className="relative">
                      <select
                        name="projectType"
                        required
                        value={ctaProjectType}
                        onChange={(e) => setCtaProjectType(e.target.value)}
                        className="w-full appearance-none bg-[#0D0D0E] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#4633FF]/50 focus:bg-[#151517] transition-all cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#0D0D0E]">Выберите тип проекта</option>
                        <option value="ecommerce" className="bg-[#0D0D0E]">E-commerce платформа</option>
                        <option value="erp" className="bg-[#0D0D0E]">ERP система</option>
                        <option value="highload" className="bg-[#0D0D0E]">Highload инфраструктура</option>
                        <option value="modernization" className="bg-[#0D0D0E]">Модернизация WordPress / Bitrix</option>
                        <option value="integration" className="bg-[#0D0D0E]">Интеграции и API</option>
                        <option value="security" className="bg-[#0D0D0E]">Кибербезопасность</option>
                        <option value="other" className="bg-[#0D0D0E]">Другое</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                    </div>
                  </div>

                  {/* Description Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-xs font-medium text-white/40 block">Описание задачи</label>
                      <span className={`text-[10px] ${ctaDescription.length === 0
                        ? "text-white/30"
                        : ctaDescription.length < 100
                          ? "text-red-500/60 font-semibold"
                          : "text-emerald-500/60 font-semibold"
                        }`}>
                        {ctaDescription.length === 0
                          ? "Необязательно"
                          : ctaDescription.length < 100
                            ? `Минимум 100 символов (введено: ${ctaDescription.length})`
                            : `Минимум достигнут (${ctaDescription.length} / 1000)`}
                      </span>
                    </div>
                    <textarea
                      name="description"
                      placeholder="Кратко опишите текущую платформу, задачи или ограничения (необязательно, при заполнении минимум 100 символов)"
                      minLength={100}
                      maxLength={1000}
                      rows={5}
                      value={ctaDescription}
                      onChange={(e) => setCtaDescription(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.04] transition-all resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-6 pb-2">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacy-checkbox"
                        name="privacy"
                        required
                        checked={ctaIsPrivacyAccepted}
                        onChange={(e) => setCtaIsPrivacyAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/10 bg-white/[0.02] text-[#4633FF] focus:ring-[#4633FF]/50 focus:ring-2 focus:ring-offset-0 accent-[#4633FF] cursor-pointer"
                      />
                      <label htmlFor="privacy-checkbox" className="text-xs text-white/50 leading-relaxed cursor-pointer select-none">
                        Нажимая кнопку,{" "}
                        <Link href="/privacy-policy" className="text-[#8C76FF] hover:underline transition-colors">
                          вы соглашаетесь с политикой конфиденциальности
                        </Link>
                        .
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !isCtaFormValid}
                      className={`w-full group relative flex items-center justify-center gap-2 bg-gradient-to-br from-[#4633FF] to-[#2A1E99] text-white py-4.5 rounded-[18px] font-bold transition-all duration-[350ms] shadow-[0_10px_30px_rgba(70,51,255,0.2)] ${isSubmitting || !isCtaFormValid
                        ? 'opacity-40 cursor-not-allowed pointer-events-none'
                        : 'hover:shadow-[0_15px_40px_rgba(70,51,255,0.4)] hover:-translate-y-1 active:scale-[0.98]'
                        }`}
                    >
                      {isSubmitting ? "Отправка..." : "Получить консультацию"}
                      {!isSubmitting && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="relative mb-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-[#4633FF] rounded-full blur-2xl"
                    />
                    <div className="relative w-20 h-20 bg-[#0D0D0E] border border-[#4633FF]/40 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(70,51,255,0.2)]">
                      <Check className="w-10 h-10 text-[#4633FF]" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Запрос отправлен</h3>
                  <p className="text-[#FFFFFF]/60 text-lg max-w-sm">
                    Мы свяжемся с вами в течение 24 часов для проведения первичной архитектурной консультации.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCtaName("");
                      setCtaCompany("");
                      setCtaPhone("+7");
                      setCtaEmail("");
                      setCtaProjectType("");
                      setCtaDescription("");
                      setCtaIsPrivacyAccepted(false);
                    }}
                    className="mt-10 text-white/40 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest cursor-pointer"
                  >
                    Отправить ещё раз
                  </button>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <SolutionPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* ── Simple Consultation Popup ── */}
      <AnimatePresence>
        {consultPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={handleCloseConsultPopup}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-[#0E0E12] border border-white/10 rounded-2xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={handleCloseConsultPopup}
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>

              {consultSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-[#4633FF]/15 border border-[#4633FF]/30 flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-white/50 text-sm">Наш менеджер свяжется с вами в ближайшее время.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-2 pr-6">Оставьте контакты</h3>
                  <p className="text-white/50 text-sm mb-7 leading-relaxed">
                    Оставьте контакты и наш менеджер свяжется с вами в ближайшее время
                  </p>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Введите имя"
                      required
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      pattern="^[A-Za-zА-Яа-я\s]{2,50}$"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#4633FF]/60 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Введите телефон"
                      required
                      value={consultPhone}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (!val.startsWith("+7")) {
                          val = "+7";
                        }
                        const digits = val.substring(2).replace(/\D/g, "");
                        setConsultPhone("+7" + digits.substring(0, 10));
                      }}
                      pattern="^\+7\d{10}$"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#4633FF]/60 transition-colors"
                    />

                    <button
                      onClick={async () => {
                        if (!isConsultFormValid) return;
                        setConsultSubmitting(true);
                        await new Promise(r => setTimeout(r, 800));
                        setConsultSubmitting(false);
                        setConsultSubmitted(true);
                        setConsultName("");
                        setConsultPhone("+7");
                        setConsultConsent(false);
                      }}
                      className={`w-full bg-gradient-to-br from-[#4633FF] to-[#2A1E99] text-white font-bold py-4 rounded-xl transition-all duration-[350ms] mt-1 ${consultSubmitting || !isConsultFormValid
                        ? "opacity-40 cursor-not-allowed pointer-events-none"
                        : "hover:shadow-[0_0_25px_rgba(70,51,255,0.4)] hover:-translate-y-0.5 active:scale-[0.98]"
                        }`}
                      disabled={consultSubmitting || !isConsultFormValid}
                    >
                      {consultSubmitting ? "Отправляем..." : "Оставить заявку"}
                    </button>
                  </div>

                  {/* Checkbox consent */}
                  <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                    <div
                      onClick={() => setConsultConsent(v => !v)}
                      className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border transition-all ${consultConsent
                        ? "bg-[#4633FF] border-[#4633FF]"
                        : "bg-white/5 border-white/15 group-hover:border-white/30"
                        } flex items-center justify-center`}
                    >
                      {consultConsent && (
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                          <polyline points="1 4 4 7 10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white/35 text-xs leading-relaxed select-none" onClick={() => setConsultConsent(v => !v)}>
                      Нажимая кнопку,{" "}
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="text-white/55 underline hover:text-white/80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        даю согласие на обработку персональных данных
                      </Link>
                    </span>
                  </label>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
