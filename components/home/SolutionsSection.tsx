"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------
// 1. CARDS DATA & CONFIGS (100% Russian Technical Terminology)
// ----------------------------------------------------------------------

const solutions = [
  {
    id: "01",
    title: "Модернизация платформ",
    description: "Бесшовный переход с WordPress, Bitrix и legacy-систем на современную API-first архитектуру без потери данных и SEO.",
    metadata: "WordPress → Kibex Core • Bitrix → API-first • Legacy → Современная инфраструктура",
    metricLine: "Плавная миграция",
    label: "01 / МОДЕРНИЗАЦИЯ ПЛАТФОРМ",
    bgImage: "/modernizationgpt.png",
    path: "/solutions/modernizaciya"
  },
  {
    id: "02",
    title: "Разработка ERP систем",
    description: "Проектирование единого цифрового ядра для управления складами, логистикой, финансами и продажами в реальном времени.",
    metadata: "Синхронизация в реальном времени",
    metricLine: "Единый центр данных",
    label: "02 / ЦИФРОВОЕ ЯДРО",
    bgImage: "/erpgpt.png",
    path: "/solutions/erp"
  },
  {
    id: "03",
    title: "Highload архитектура",
    description: "Создание отказоустойчивых систем, рассчитанных на миллионы SKU и тысячи одновременных заказов.",
    metadata: "Распределённая инфраструктура",
    metricLine: "Балансировка нагрузки",
    label: "03 / HIGHLOAD АРХИТЕКТУРА",
    bgImage: "/highloadgpt.png",
    path: "/solutions/highload"
  },
  {
    id: "04",
    title: "Разработка e-commerce платформ",
    description: "Кастомные интернет-платформы на базе Kibex Core с гибкой бизнес-логикой и глубокими интеграциями.",
    metadata: "API-интеграции",
    metricLine: "Потоки обработки заказов",
    label: "04 / E-COMMERCE ПЛАТФОРМЫ",
    bgImage: "/e-commercegpt.png",
    path: "/solutions/razrabotka-platformy"
  },
  {
    id: "05",
    title: "Кибербезопасность",
    description: "Встроенная защита на уровне архитектуры: аудит кода, защита от атак и соответствие стандартам безопасности.",
    metadata: "Защищённая инфраструктура",
    metricLine: "Контроль безопасности",
    label: "05 / КИБЕРБЕЗОПАСНОСТЬ",
    bgImage: "/cybersecuritygpt.png",
    path: "/solutions/security"
  }
];

// ----------------------------------------------------------------------
// 2. STRICT COLOR-RESTRICTED SVG ANIMATIONS (Black, Indigo, Purple, White)
// ----------------------------------------------------------------------

// Card 01: Migration (Desaturated outlines, slow packets)
function MigrationVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full opacity-80" fill="none">
      {/* Background glow */}
      <circle cx="210" cy="60" r="35" fill="#8C76FF" opacity="0.04" />

      {/* Legacy System (Left - desaturated gray/purple) */}
      <g transform="translate(30, 30)">
        <motion.rect
          x="0" y="10" width="14" height="14" rx="2"
          stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.3"
          animate={isHovered ? { y: [10, 8, 10] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="20" y="-4" width="12" height="12" rx="2"
          stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.25"
          animate={isHovered ? { y: [-4, -6, -4] } : {}}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.rect
          x="12" y="26" width="15" height="15" rx="2"
          stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.2"
          animate={isHovered ? { x: [12, 14, 12] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <line x1="14" y1="10" x2="20" y2="4" stroke="#8C76FF" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.2" />
        <line x1="20" y1="26" x2="14" y2="22" stroke="#8C76FF" strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity="0.15" />
      </g>

      {/* Migration Streams */}
      <g>
        <path id="mig-path-1" d="M 85 60 C 120 30, 160 30, 195 50" fill="none" stroke="#8C76FF" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.2" />
        <path id="mig-path-2" d="M 85 60 H 195" fill="none" stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.15" />
        <path id="mig-path-3" d="M 85 60 C 120 90, 160 90, 195 70" fill="none" stroke="#8C76FF" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.2" />

        {/* Slow electricity packets */}
        <motion.circle
          r="2" fill="#a78bfa"
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: isHovered ? 2.5 : 4.5, repeat: Infinity, ease: "linear" }}
          style={{ motionPath: "url(#mig-path-1)" }}
        />
        <motion.circle
          r="2" fill="#c084fc"
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: isHovered ? 2 : 3.8, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ motionPath: "url(#mig-path-2)" }}
        />
        <motion.circle
          r="2" fill="#818cf8"
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: isHovered ? 3 : 5.2, repeat: Infinity, ease: "linear", delay: 0.3 }}
          style={{ motionPath: "url(#mig-path-3)" }}
        />
      </g>

      {/* Modern Target (Right) */}
      <g transform="translate(195, 30)">
        <rect x="0" y="15" width="26" height="20" rx="3" fill="#050508" stroke="#8C76FF" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="13" y1="15" x2="13" y2="5" stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="13" y1="35" x2="13" y2="45" stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.4" />

        <circle cx="13" cy="5" r="2.5" fill="#050508" stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="13" cy="45" r="2.5" fill="#050508" stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.7" />

        {/* Sync pulse indicator */}
        <motion.circle
          cx="13" cy="25" r="5" fill="none" stroke="#a78bfa" strokeWidth="0.8"
          animate={{ scale: [0.9, 1.4, 0.9], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <circle cx="13" cy="25" r="2" fill="#a78bfa" />
      </g>
    </svg>
  );
}

// Card 02: ERP Visual (Central Core System)
function ERPVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full opacity-80" fill="none">
      {/* Central Core */}
      <g transform="translate(140, 60)">
        <circle cx="0" cy="0" r="10" fill="#050508" stroke="#8C76FF" strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="0" cy="0" r="3" fill="#8C76FF" />
      </g>

      {/* Surrounding Nodes (CRM, Логистика, Склад, Финансы) */}
      {[
        { cx: 80, cy: 30, label: "CRM" },
        { cx: 200, cy: 30, label: "ЛОГИСТИКА" },
        { cx: 80, cy: 90, label: "СКЛАД" },
        { cx: 200, cy: 90, label: "ФИНАНСЫ" }
      ].map((node, i) => {
        const pathD = `M 140 60 L ${node.cx} ${node.cy}`;
        return (
          <g key={i}>
            <path d={pathD} stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.15" />

            {/* Sync Pulses */}
            <motion.circle
              r="1.8" fill="#a78bfa"
              animate={{ cx: [140, node.cx], cy: [60, node.cy] }}
              transition={{
                duration: isHovered ? 2.5 : 4.5,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut"
              }}
            />

            {/* Sub-node dot */}
            <circle cx={node.cx} cy={node.cy} r="5" fill="#050508" stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.7" />
            <text x={node.cx} y={node.cy - 9} textAnchor="middle" fill="#8c76ff" fontSize="7" fontWeight="bold" opacity="0.6">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Card 03: Highload Visual (Load Balancer & Distribution)
function HighloadVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full opacity-80" fill="none">
      {/* Balancer */}
      <g transform="translate(140, 25)">
        <rect x="-20" y="-7" width="40" height="14" rx="2" fill="#050508" stroke="#8C76FF" strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="12" cy="0" r="1.2" fill="#8C76FF" />
      </g>

      {/* Inflow traffic */}
      <line x1="140" y1="5" x2="140" y2="18" stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.2" />
      <motion.circle
        cx="140" r="1.8" fill="#a78bfa"
        animate={{ cy: [5, 18] }}
        transition={{ duration: isHovered ? 1.2 : 2.4, repeat: Infinity, ease: "linear" }}
      />

      {/* Servers */}
      {[70, 140, 210].map((xVal, idx) => {
        const pathD = `M 140 32 Q ${xVal} 55 ${xVal} 85`;
        return (
          <g key={idx}>
            <path d={pathD} stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.15" />

            <motion.circle
              r="2" fill="#a78bfa"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{
                duration: isHovered ? 1.5 : 3,
                repeat: Infinity,
                delay: idx * 0.5,
                ease: "linear"
              }}
              style={{ motionPath: `path('${pathD}')` }}
            />

            <g transform={`translate(${xVal}, 95)`}>
              <rect x="-15" y="-6" width="30" height="12" rx="2" fill="#050508" stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.6" />
              {/* Load indicator dots */}
              <circle cx="-6" cy="0" r="1" fill="#8C76FF" opacity="0.6" />
              <circle cx="0" cy="0" r="1" fill="#8C76FF" opacity="0.6" />
              <motion.circle
                cx="6" cy="0" r="1" fill="#8C76FF"
                animate={isHovered ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.6 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

// Card 04: E-commerce Visual (Order Pipeline queues)
function EcommerceVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full opacity-80" fill="none">
      <line x1="30" y1="55" x2="250" y2="55" stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.15" />
      <line x1="30" y1="65" x2="250" y2="65" stroke="#8C76FF" strokeWidth="0.8" strokeOpacity="0.15" />

      {/* Nodes (Каталог, Заказы, Шлюз) */}
      {[
        { xPos: 60, label: "КАТАЛОГ" },
        { xPos: 140, label: "ЗАКАЗЫ" },
        { xPos: 220, label: "ШЛЮЗ" }
      ].map((stage, idx) => (
        <g key={idx} transform={`translate(${stage.xPos}, 60)`}>
          <circle cx="0" cy="0" r="8" fill="#050508" stroke="#8C76FF" strokeWidth="1" strokeOpacity="0.7" />
          <motion.circle
            cx="0" cy="0" r="11" fill="none" stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.3"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.6 }}
          />
          <text x="0" y="17" textAnchor="middle" fill="#8c76ff" fontSize="6.5" fontWeight="bold" opacity="0.6">
            {stage.label}
          </text>
        </g>
      ))}

      {/* Slow pipelines */}
      <g>
        {[0, 1].map((i) => (
          <motion.circle
            key={i}
            r="1.8" fill="#c084fc"
            animate={{ cx: [30, 250] }}
            transition={{ duration: isHovered ? 2.5 : 4.5, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
            cy="55"
          />
        ))}
        {[0, 1].map((i) => (
          <motion.circle
            key={i}
            r="1.8" fill="#818cf8"
            animate={{ cx: [250, 30] }}
            transition={{ duration: isHovered ? 3 : 5.5, repeat: Infinity, ease: "linear", delay: i * 1.8 }}
            cy="65"
          />
        ))}
      </g>
    </svg>
  );
}

// Card 05: Security Visual (Minimal scan sweeping)
function SecurityVisual({ isHovered }: { isHovered: boolean }) {
  const containerRef = useRef<SVGSVGElement>(null);
  return (
    <svg ref={containerRef} viewBox="0 0 500 120" className="w-full h-full opacity-80" fill="none">
      <circle cx="250" cy="60" r="22" fill="#8C76FF" opacity="0.02" />

      {/* Slow concentric scanners */}
      <motion.circle
        cx="250" cy="60" r="26" fill="none" stroke="#8C76FF" strokeWidth="0.8" strokeDasharray="3 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="250" cy="60" r="32" fill="none" stroke="#8C76FF" strokeWidth="0.5" strokeOpacity="0.3"
        animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shield */}
      <g transform="translate(250, 60)">
        <path
          d="M -7 -9 L 7 -9 C 7 -9 9 3 0 11 C -9 3 -7 -9 -7 -9 Z"
          fill="#050508"
          stroke="#8C76FF"
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
        <circle cx="0" cy="0" r="1.2" fill="#8C76FF" />
      </g>

      {/* Scanning Line overlay */}
      <motion.line
        x1="220" x2="280"
        stroke="#8C76FF"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        animate={{ y: [42, 78, 42] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

// ----------------------------------------------------------------------
// 3. LARGE SUBTLE LEFT CARD SYSTEM TOPOLOGY (Stripe/Apple Style)
// ----------------------------------------------------------------------
function LeftSystemTopology() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-64 mt-auto relative overflow-hidden select-none opacity-40">
      <svg className="w-full h-full" viewBox="0 0 320 240" fill="none">
        {/* Concentric paths */}
        <circle cx="160" cy="120" r="95" stroke="#8C76FF" strokeWidth="0.5" strokeDasharray="3 14" strokeOpacity="0.2" />
        <circle cx="160" cy="120" r="65" stroke="#8C76FF" strokeWidth="0.5" strokeDasharray="4 8" strokeOpacity="0.15" />
        <circle cx="160" cy="120" r="35" stroke="#8C76FF" strokeWidth="0.5" strokeOpacity="0.1" />

        {/* Quiet Radial Conduits */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 160 + Math.cos(rad) * 95;
          const y2 = 120 + Math.sin(rad) * 95;
          return (
            <g key={idx}>
              <line x1="160" y1="120" x2={x2} y2={y2} stroke="#8C76FF" strokeWidth="0.5" strokeOpacity="0.08" />
              {/* Slowly blinking node lights */}
              <motion.circle
                cx={x2} cy={y2} r="1.2" fill="#8c76ff"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 3.5 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          );
        })}

        {/* Slow electricity packet */}
        <path id="left-ring-path-fixed" d="M 65 120 A 95 95 0 1 1 255 120 A 95 95 0 1 1 65 120" fill="none" />
        <motion.circle
          r="1.8" fill="#a78bfa"
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ motionPath: "url(#left-ring-path-fixed)" }}
        />

        {/* Core Node */}
        <circle cx="160" cy="120" r="4.5" fill="#050508" stroke="#8C76FF" strokeWidth="1.2" />
        <motion.circle
          cx="160" cy="120" r="7.5" fill="none" stroke="#8C76FF" strokeWidth="0.5" strokeOpacity="0.3"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        />

        {/* Subtle grid pattern */}
        <pattern id="left-card-grid-subtle" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.4" fill="#8C76FF" opacity="0.1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#left-card-grid-subtle)" />
      </svg>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. INLINE LINK COMPONENT (Line extending, shifting arrow)
// ----------------------------------------------------------------------
function CustomLink({ href }: { href: string }) {
  return (
    <Link href={href} className="group/link flex items-center gap-2 text-[13px] font-mono text-gray-400 hover:text-white transition-colors duration-300">
      <span>Подробнее</span>
      <svg className="w-5 h-3 overflow-visible" viewBox="0 0 20 12">
        <motion.line
          x1="0" y1="6" x2="8" y2="6"
          stroke="currentColor"
          strokeWidth="1.2"
          variants={{
            initial: { x2: 6, opacity: 0.5 },
            hover: { x2: 16, opacity: 1 }
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M 4 2 L 8 6 L 4 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          variants={{
            initial: { x: 0 },
            hover: { x: 8 }
          }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </Link>
  );
}

// ----------------------------------------------------------------------
// 5. MAIN SOLUTIONS SECTION COMPONENT
// ----------------------------------------------------------------------
export default function SolutionsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 25%, rgba(47, 33, 115, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 80% 70%, rgba(91, 60, 255, 0.04) 0%, transparent 50%),
          radial-gradient(circle at 10% 90%, rgba(140, 118, 255, 0.03) 0%, transparent 40%),
          linear-gradient(180deg, #050508 0%, #0a0915 50%, #050508 100%)
        `
      }}
    >
      {/* Background Grid Pattern (5-8% opacity) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(140, 118, 255, 0.08) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(140, 118, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 95%)'
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ------------------------------------------------------------------
              LEFT COLUMN (Symmetric Vertical Identity Card)
              ------------------------------------------------------------------ */}
          <div className="group lg:col-span-4 lg:sticky lg:top-28 h-auto lg:h-[1398px] flex flex-col justify-between py-2 overflow-hidden rounded-3xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] relative">
            
            {/* Visual Image Background overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
              <img 
                src="/handled_Ui Design_1080_1920_80.jpg" 
                alt="" 
                className="w-full h-full object-cover opacity-[0.5] group-hover:opacity-[0.7] transition-all duration-700 select-none scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/65 to-[#050508]/20" />
            </div>

            <div className="relative z-10">
              <Link href="/solutions" className="group/title block cursor-pointer">
                <span className="text-[12px] font-bold tracking-[0.25em] text-[#8C76FF] group-hover/title:text-purple-300 transition-colors duration-300 uppercase mb-4 block">
                  ИНЖЕНЕРНЫЕ РЕШЕНИЯ KIBEX
                </span>
                <h2 className="font-geist text-[42px] lg:text-[46px] font-extrabold tracking-tight text-white group-hover/title:text-purple-100 transition-colors duration-300 mb-6 leading-[1.1]">
                  Инженерные решения Kibex
                </h2>
              </Link>
              <p className="font-geist text-[18px] text-gray-300 leading-relaxed">
                Каждая система проектируется под нагрузку, бизнес-логику и долгосрочное развитие.
              </p>
            </div>

            {/* Apple/Stripe-like quiet topology visual */}
            <div className="relative z-10">
              <LeftSystemTopology />
            </div>

            {/* Bottom micro metadata */}
            <div className="relative z-10 pt-6 border-t border-white/5">
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[13px] font-medium text-gray-400 font-mono">
                <span>API-first</span>
                <span className="text-purple-500/30">•</span>
                <span>Защищённая архитектура</span>
                <span className="text-purple-500/30">•</span>
                <span>Highload</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------
              RIGHT COLUMN (Symmetric Cards Layout - Row 1, Row 2, Row 3)
              ------------------------------------------------------------------ */}
          <div className="lg:col-span-8 relative">
            
            {/* Ultra-thin ecosystem lines in background */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <motion.path
                    d="M 100 100 Q 300 200 150 400 T 350 700"
                    fill="none"
                    stroke="#8c76ff"
                    strokeWidth="0.6"
                    strokeOpacity="0.25"
                    strokeDasharray="3 160"
                    animate={{ strokeDashoffset: [-350, 350] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path
                    d="M 420 50 Q 200 300 380 620"
                    fill="none"
                    stroke="#8c76ff"
                    strokeWidth="0.6"
                    strokeOpacity="0.2"
                    strokeDasharray="4 120"
                    animate={{ strokeDashoffset: [350, -350] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>
            )}

            {/* Grid structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              {/* CARD 01: Модернизация платформ (ROW 1 - LEFT) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onHoverStart={() => setHoveredIdx(0)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="group relative rounded-3xl bg-white/[0.01] border border-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 h-auto lg:h-[450px]"
                style={{
                  boxShadow: hoveredIdx === 0 
                    ? "0 20px 50px rgba(91, 60, 255, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.03)" 
                    : "inset 0 1px 1px rgba(255, 255, 255, 0.01)"
                }}
              >
                {/* Visual Image Background overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
                  <img 
                    src={solutions[0].bgImage} 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.5] group-hover:opacity-[0.75] transition-all duration-700 select-none scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/10" />
                </div>

                <div className="relative z-10">
                  {/* TOP */}
                  <span className="text-[12px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">
                    {solutions[0].label}
                  </span>
                  {/* CENTER */}
                  <Link href={solutions[0].path}>
                    <h3 className="font-geist text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      {solutions[0].title}
                    </h3>
                  </Link>
                  <p className="font-geist text-[15px] text-gray-300 leading-relaxed mb-4">
                    {solutions[0].description}
                  </p>
                </div>

                {/* LOWER AREA */}
                <div className="w-full h-32 flex items-center justify-center bg-black/20 rounded-2xl border border-white/[0.02] p-2 my-1 relative z-10">
                  <MigrationVisual isHovered={hoveredIdx === 0} />
                </div>

                {/* BOTTOM */}
                <div className="space-y-4 pt-3 border-t border-white/5 relative z-10">
                  <div className="text-[13px] font-mono text-gray-400 font-medium leading-relaxed">
                    {solutions[0].metadata}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#8C76FF] font-mono font-medium tracking-wide">
                      {solutions[0].metricLine}
                    </span>
                    
                    <motion.div animate={hoveredIdx === 0 ? "hover" : "initial"} initial="initial">
                      <CustomLink href={solutions[0].path} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 02: Разработка ERP систем (ROW 1 - RIGHT) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
                onHoverStart={() => setHoveredIdx(1)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="group relative rounded-3xl bg-white/[0.01] border border-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 h-auto lg:h-[450px]"
                style={{
                  boxShadow: hoveredIdx === 1 
                    ? "0 20px 50px rgba(91, 60, 255, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.03)" 
                    : "inset 0 1px 1px rgba(255, 255, 255, 0.01)"
                }}
              >
                {/* Visual Image Background overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
                  <img 
                    src={solutions[1].bgImage} 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.5] group-hover:opacity-[0.75] transition-all duration-700 select-none scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/10" />
                </div>

                <div className="relative z-10">
                  {/* TOP */}
                  <span className="text-[12px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">
                    {solutions[1].label}
                  </span>
                  {/* CENTER */}
                  <Link href={solutions[1].path}>
                    <h3 className="font-geist text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      {solutions[1].title}
                    </h3>
                  </Link>
                  <p className="font-geist text-[15px] text-gray-300 leading-relaxed mb-4">
                    {solutions[1].description}
                  </p>
                </div>

                {/* LOWER AREA */}
                <div className="w-full h-32 flex items-center justify-center bg-black/20 rounded-2xl border border-white/[0.02] p-2 my-1 relative z-10">
                  <ERPVisual isHovered={hoveredIdx === 1} />
                </div>

                {/* BOTTOM */}
                <div className="space-y-4 pt-3 border-t border-white/5 relative z-10">
                  <div className="text-[13px] font-mono text-gray-400 font-medium leading-relaxed">
                    {solutions[1].metadata}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#8C76FF] font-mono font-medium tracking-wide">
                      {solutions[1].metricLine}
                    </span>
                    
                    <motion.div animate={hoveredIdx === 1 ? "hover" : "initial"} initial="initial">
                      <CustomLink href={solutions[1].path} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 03: Highload архитектура (ROW 2 - LEFT) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                onHoverStart={() => setHoveredIdx(2)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="group relative rounded-3xl bg-white/[0.01] border border-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 h-auto lg:h-[450px]"
                style={{
                  boxShadow: hoveredIdx === 2 
                    ? "0 20px 50px rgba(91, 60, 255, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.03)" 
                    : "inset 0 1px 1px rgba(255, 255, 255, 0.01)"
                }}
              >
                {/* Visual Image Background overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
                  <img 
                    src={solutions[2].bgImage} 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.5] group-hover:opacity-[0.75] transition-all duration-700 select-none scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/10" />
                </div>

                <div className="relative z-10">
                  {/* TOP */}
                  <span className="text-[12px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">
                    {solutions[2].label}
                  </span>
                  {/* CENTER */}
                  <Link href={solutions[2].path}>
                    <h3 className="font-geist text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      {solutions[2].title}
                    </h3>
                  </Link>
                  <p className="font-geist text-[15px] text-gray-300 leading-relaxed mb-4">
                    {solutions[2].description}
                  </p>
                </div>

                {/* LOWER AREA */}
                <div className="w-full h-32 flex items-center justify-center bg-black/20 rounded-2xl border border-white/[0.02] p-2 my-1 relative z-10">
                  <HighloadVisual isHovered={hoveredIdx === 2} />
                </div>

                {/* BOTTOM */}
                <div className="space-y-4 pt-3 border-t border-white/5 relative z-10">
                  <div className="text-[13px] font-mono text-gray-400 font-medium leading-relaxed">
                    {solutions[2].metadata}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#8C76FF] font-mono font-medium tracking-wide">
                      {solutions[2].metricLine}
                    </span>
                    
                    <motion.div animate={hoveredIdx === 2 ? "hover" : "initial"} initial="initial">
                      <CustomLink href={solutions[2].path} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 04: Разработка e-commerce платформ (ROW 2 - RIGHT) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                onHoverStart={() => setHoveredIdx(3)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="group relative rounded-3xl bg-white/[0.01] border border-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 h-auto lg:h-[450px]"
                style={{
                  boxShadow: hoveredIdx === 3 
                    ? "0 20px 50px rgba(91, 60, 255, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.03)" 
                    : "inset 0 1px 1px rgba(255, 255, 255, 0.01)"
                }}
              >
                {/* Visual Image Background overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
                  <img 
                    src={solutions[3].bgImage} 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.5] group-hover:opacity-[0.75] transition-all duration-700 select-none scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/10" />
                </div>

                <div className="relative z-10">
                  {/* TOP */}
                  <span className="text-[12px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">
                    {solutions[3].label}
                  </span>
                  {/* CENTER */}
                  <Link href={solutions[3].path}>
                    <h3 className="font-geist text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      {solutions[3].title}
                    </h3>
                  </Link>
                  <p className="font-geist text-[15px] text-gray-300 leading-relaxed mb-4">
                    {solutions[3].description}
                  </p>
                </div>

                {/* LOWER AREA */}
                <div className="w-full h-32 flex items-center justify-center bg-black/20 rounded-2xl border border-white/[0.02] p-2 my-1 relative z-10">
                  <EcommerceVisual isHovered={hoveredIdx === 3} />
                </div>

                {/* BOTTOM */}
                <div className="space-y-4 pt-3 border-t border-white/5 relative z-10">
                  <div className="text-[13px] font-mono text-gray-400 font-medium leading-relaxed">
                    {solutions[3].metadata}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#8C76FF] font-mono font-medium tracking-wide">
                      {solutions[3].metricLine}
                    </span>
                    
                    <motion.div animate={hoveredIdx === 3 ? "hover" : "initial"} initial="initial">
                      <CustomLink href={solutions[3].path} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 05: Кибербезопасность (ROW 3 - FULL WIDTH) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                onHoverStart={() => setHoveredIdx(4)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="md:col-span-2 group relative rounded-3xl bg-white/[0.01] border border-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 h-auto lg:h-[450px]"
                style={{
                  boxShadow: hoveredIdx === 4 
                    ? "0 20px 50px rgba(91, 60, 255, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.03)" 
                    : "inset 0 1px 1px rgba(255, 255, 255, 0.01)"
                }}
              >
                {/* Visual Image Background overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
                  <img 
                    src={solutions[4].bgImage} 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.5] group-hover:opacity-[0.75] transition-all duration-700 select-none scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/10" />
                </div>

                <div className="relative z-10">
                  {/* TOP */}
                  <span className="text-[12px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">
                    {solutions[4].label}
                  </span>
                  {/* CENTER */}
                  <Link href={solutions[4].path}>
                    <h3 className="font-geist text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      {solutions[4].title}
                    </h3>
                  </Link>
                  <p className="font-geist text-[15px] text-gray-300 leading-relaxed mb-4">
                    {solutions[4].description}
                  </p>
                </div>

                {/* LOWER AREA (Horizontal wide visual) */}
                <div className="w-full h-32 flex items-center justify-center bg-black/20 rounded-2xl border border-white/[0.02] p-2 my-1 relative z-10">
                  <SecurityVisual isHovered={hoveredIdx === 4} />
                </div>

                {/* BOTTOM */}
                <div className="space-y-4 pt-3 border-t border-white/5 relative z-10">
                  <div className="text-[13px] font-mono text-gray-400 font-medium leading-relaxed">
                    {solutions[4].metadata}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#8C76FF] font-mono font-medium tracking-wide">
                      {solutions[4].metricLine}
                    </span>
                    
                    <motion.div animate={hoveredIdx === 4 ? "hover" : "initial"} initial="initial">
                      <CustomLink href={solutions[4].path} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
