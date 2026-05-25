"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Layers,
  Network,
  Cpu,
  Workflow,
  RefreshCw,
  Zap
} from "lucide-react";

interface DiagnosticItem {
  id: string;
  code: string;
  title: string;
  desc: string;
  impact: string;
  nodeKey: string;
  bgImage: string;
}

const DIAGNOSTICS_DATA: DiagnosticItem[] = [
  {
    id: "01",
    code: "DIAG_CATALOG_SATURATION",
    title: "Платформа начинает тормозить при росте каталога",
    desc: "Стандартные CMS (Bitrix, WooCommerce) упираются в ограничения базы данных при количестве товаров свыше 100k SKU.",
    impact: "Потеря производительности",
    nodeKey: "db",
    bgImage: "/load_data.png"
  },
  {
    id: "02",
    code: "DIAG_SYNC_DESYNCHRONIZATION",
    title: "Интеграции с 1С становятся нестабильными",
    desc: "Обмен данными зависает или приводит к рассинхронизации остатков, срывая заказы и вызывая недовольство клиентов.",
    impact: "Операционная нестабильность",
    nodeKey: "sync",
    bgImage: "/sync_data.png"
  },
  {
    id: "03",
    code: "DIAG_LOAD_EXHAUSTION",
    title: "Текущая архитектура перестаёт справляться с пиковыми нагрузками",
    desc: "Пиковый трафик во время промо-акций роняет сайт из-за тяжелой архитектуры плагинов и отсутствия кэширования.",
    impact: "Инфраструктурный риск",
    nodeKey: "gateway",
    bgImage: "/reloaded_traffic.png"
  },
  {
    id: "04",
    code: "DIAG_ERP_CONSTRAINTS",
    title: "ERP система ограничивает бизнес-процессы",
    desc: "Готовые коробочные решения не позволяют внедрить уникальную логику компании, замедляя операционную работу.",
    impact: "Архитектурное ограничение",
    nodeKey: "core",
    bgImage: "/erp_small.png"
  },
  {
    id: "05",
    code: "DIAG_LEGACY_DEBT",
    title: "Стоимость поддержки постоянно растёт",
    desc: "Устранение старых багов (legacy) и попытки доработать закрытый код CMS обходятся дороже создания кастомной системы.",
    impact: "Операционная нестабильность",
    nodeKey: "legacy",
    bgImage: "/cyber_panel.png"
  },
  {
    id: "06",
    code: "DIAG_SCALING_BARRIER",
    title: "Архитектура мешает масштабированию",
    desc: "Любая новая фича требует переписывания половины проекта, создавая новые риски безопасности и стабильности.",
    impact: "Предел масштабирования",
    nodeKey: "scaling",
    bgImage: "/block_scale.png"
  }
];

export default function SystemDiagnostics() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [probValue, setProbValue] = useState(84);

  // Generate mock operational logs inside console
  useEffect(() => {
    const errorCodes = [
      "DB_INDEX_LOCKUP: Deadlock on catalog_skus table",
      "SYNC_TIMEOUT: 1C ERP sync delayed > 15000ms",
      "GATEWAY_OVERLOAD: 502 Bad Gateway under peak loads",
      "THREAD_EXHAUSTION: Thread pool saturated in core module",
      "LEGACY_DEBT: Unhandled exception in outdated CMS routing",
      "SCALING_LIMIT: Circular reference in dependency tree"
    ];

    const interval = setInterval(() => {
      const code = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const timestamp = new Date().toLocaleTimeString();
      setConsoleLogs((prev) => [`[${timestamp}] ${code}`, ...prev.slice(0, 4)]);
      setProbValue((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(78, Math.min(94, prev + delta));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 border-t border-white/5 bg-[#0A0A0B] relative overflow-hidden">
      {/* Volumetric glow background */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(140,118,255,0.035)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.015)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />

      {/* Subtle topology lines in background */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* TOP ZONE: Left title + diagnostics console | Right live system map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-24">
          {/* Left copy and diagnostic readout */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <span className="text-sm font-semibold tracking-[0.25em] text-[#8C76FF] uppercase mb-4 block">
              ДИАГНОСТИКА СИСТЕМ
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 font-sans leading-tight">
              Когда бизнесу нужна новая архитектура
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-sans">
              Недоработки и ограничения старой кодовой базы со временем тормозят операционное развитие. Обратите внимание на ключевые симптомы деградации инфраструктуры:
            </p>

            {/* Diagnostic Command Console (Datadog style) */}
            <div className="p-6 bg-[#0D0D0F]/90 border border-white/[0.04] rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8C76FF] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white/50 tracking-wider">DIAGNOSTIC UNIT v2.1 // ACTIVE</span>
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase">
                  State: Analyzing
                </div>
              </div>

              {/* Console Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4 font-mono">
                <div className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                  <div className="text-[10px] text-white/40 mb-1">CONSTRAINTS DETECTED</div>
                  <div className="text-lg font-bold text-[#8C76FF]">06 / ACTIVE</div>
                </div>
                <div className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                  <div className="text-[10px] text-white/40 mb-1">DEGRADATION RATIO</div>
                  <div className="text-lg font-bold text-white/90">{probValue}%</div>
                </div>
              </div>

              {/* Scrolling Log Output */}
              <div className="space-y-1.5 font-mono text-[10px] text-white/40 leading-normal min-h-[92px]">
                {consoleLogs.length === 0 ? (
                  <div className="text-white/20 italic">Awaiting connection to topology agents...</div>
                ) : (
                  consoleLogs.map((log, index) => (
                    <div key={index} className="flex gap-2 truncate">
                      <span className="text-[#8C76FF] shrink-0">&gt;&gt;</span>
                      <span className={log.includes("ERR") ? "text-[#8C76FF]/90 font-medium" : ""}>{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Live Infrastructure Map Visualization */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-[#0B0B0C] border border-white/[0.04] rounded-2xl relative min-h-[520px]">
            {/* System grid details */}
            <div className="absolute top-5 left-5 flex gap-2 font-mono text-[10px] text-white/20 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C76FF]/30" />
              <span>LIVE INFRASTRUCTURE DIAGNOSTIC MAP</span>
            </div>

            <div className="absolute top-5 right-5 font-mono text-[10px] text-white/20 select-none">
              AGENT STATE: {activeCard ? "INTERCEPTING ALERT" : "MONITORING CONSTRAINTS"}
            </div>

            <svg
              className="w-full max-w-[580px] h-auto aspect-[3/2] select-none"
              viewBox="0 0 600 400"
              fill="none"
            >
              {/* --- 1. NETWORK CONNECTION LINES --- */}
              <motion.path
                d="M 300 50 L 300 95"
                stroke={activeCard === "03" ? "#8C76FF" : "rgba(255, 255, 255, 0.08)"}
                strokeWidth={activeCard === "03" ? 2.5 : 1.5}
                strokeDasharray={activeCard === "03" ? "4 6" : "none"}
                animate={activeCard === "03" ? { strokeDashoffset: [0, -20] } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />

              <motion.path
                d="M 300 135 L 300 175"
                stroke={activeCard === "04" || activeCard === "05" ? "#8C76FF" : "rgba(255, 255, 255, 0.08)"}
                strokeWidth={activeCard === "04" || activeCard === "05" ? 2.5 : 1.5}
                strokeDasharray={activeCard === "05" ? "4 8" : "none"}
                animate={activeCard === "05" ? { strokeDashoffset: [0, -20] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />

              <motion.path
                d="M 300 215 V 235 H 170 V 265"
                stroke={activeCard === "01" ? "#8C76FF" : "rgba(255, 255, 255, 0.08)"}
                strokeWidth={activeCard === "01" ? 2.5 : 1.5}
                strokeDasharray={activeCard === "01" ? "4 6" : "none"}
                animate={activeCard === "01" ? { strokeDashoffset: [0, -20] } : {}}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              />

              <motion.path
                d="M 300 215 V 265"
                stroke={activeCard === "03" ? "#8C76FF" : "rgba(255, 255, 255, 0.08)"}
                strokeWidth={activeCard === "03" ? 2.5 : 1.5}
              />

              <motion.path
                d="M 300 215 V 235 H 430 V 265"
                stroke={activeCard === "02" ? "#8C76FF" : "rgba(255, 255, 255, 0.08)"}
                strokeWidth={activeCard === "02" ? 2.5 : 1.5}
                strokeDasharray={activeCard === "02" ? "2 8" : "6 6"}
                animate={activeCard === "02" ? { strokeDashoffset: [0, 20] } : {}}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />

              <path d="M 300 305 V 340" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />
              <path d="M 170 305 V 320 H 300 V 340" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />
              <path d="M 430 305 V 320 H 300 V 340" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />

              <motion.path
                d="M 300 305 V 340"
                stroke={activeCard === "06" ? "#8C76FF" : "rgba(255, 255, 255, 0.08)"}
                strokeWidth={activeCard === "06" ? 2.5 : 0}
                strokeDasharray="4 8"
                animate={activeCard === "06" ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />

              {/* --- 2. TRAFFIC PULSES --- */}
              <motion.circle
                r="2"
                fill="#8C76FF"
                animate={{
                  cx: [300, 300],
                  cy: [50, 95]
                }}
                transition={{
                  duration: activeCard === "03" ? 0.8 : 2.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* --- 3. TOPOLOGY NODES --- */}
              <foreignObject x="230" y="15" width="140" height="35">
                <div className="w-full h-full flex items-center justify-center gap-2 rounded bg-[#09090A] border border-white/[0.04] text-[10px] font-mono text-white/40 tracking-widest select-none">
                  USER TRAFFIC
                </div>
              </foreignObject>

              <foreignObject x="230" y="95" width="140" height="40">
                <motion.div
                  animate={activeCard === "03" ? { scale: [1, 1.03, 1], borderColor: "#8C76FF" } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeCard === "03"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.25)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Cpu size={12} className={activeCard === "03" ? "text-[#8C76FF]" : "text-white/30"} />
                  API GATEWAY
                </motion.div>
              </foreignObject>

              <foreignObject x="230" y="175" width="140" height="40">
                <motion.div
                  animate={
                    activeCard === "04" || activeCard === "05"
                      ? { scale: [1, 1.02, 1], borderColor: "#8C76FF" }
                      : { opacity: [0.9, 0.95, 0.9] }
                  }
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeCard === "04" || activeCard === "05"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.25)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Layers size={12} className={activeCard === "04" || activeCard === "05" ? "text-[#8C76FF]" : "text-white/30"} />
                  CMS ENGINE
                </motion.div>
              </foreignObject>

              <foreignObject x="100" y="265" width="140" height="40">
                <motion.div
                  animate={
                    activeCard === "01"
                      ? { scale: [1, 1.03, 1], borderColor: "#8C76FF" }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeCard === "01"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.25)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Database size={12} className={activeCard === "01" ? "text-[#8C76FF]" : "text-white/30"} />
                  DATABASE CLUSTER
                </motion.div>
              </foreignObject>

              <foreignObject x="250" y="265" width="100" height="40">
                <div className="w-full h-full flex items-center justify-center gap-2 rounded-lg bg-[#09090A] border border-white/[0.05] text-[11px] font-mono text-white/50 font-bold select-none">
                  CACHE
                </div>
              </foreignObject>

              <foreignObject x="360" y="265" width="140" height="40">
                <motion.div
                  animate={activeCard === "02" ? { opacity: [0.4, 1, 0.4], borderColor: "#8C76FF" } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeCard === "02"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.25)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <RefreshCw size={12} className={activeCard === "02" ? "text-[#8C76FF] animate-spin" : "text-white/30"} />
                  1C SYNC AGENT
                </motion.div>
              </foreignObject>

              <foreignObject x="210" y="340" width="180" height="40">
                <motion.div
                  animate={activeCard === "06" ? { scale: [1, 1.02, 1], borderColor: "#8C76FF" } : {}}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeCard === "06"
                      ? "border-[#8C76FF] text-white shadow-[0_0_18px_rgba(140,118,255,0.35)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Network size={12} className={activeCard === "06" ? "text-[#8C76FF]" : "text-white/30"} />
                  SCALING BARRIER
                </motion.div>
              </foreignObject>
            </svg>
          </div>
        </div>

        {/* BOTTOM ZONE: Diagnostic findings cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {DIAGNOSTICS_DATA.map((item) => {
            const isHovered = activeCard === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`p-9 bg-[#0D0D0E]/80 border rounded-2xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[310px] ${
                  isHovered
                    ? "border-[#8C76FF]/40 shadow-[0_4px_24px_rgba(140,118,255,0.08)]"
                    : "border-white/[0.03] hover:border-white/10"
                }`}
              >
                {/* Background image texture */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.16] group-hover:opacity-[0.32] transition-opacity duration-500">
                  <img
                    src={item.bgImage}
                    alt=""
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-[#0D0D0E]/50 to-transparent" />
                </div>

                {/* Subtle top scanner line on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8C76FF]/30 to-transparent transition-opacity duration-300 z-10 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Card Header & Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[9px] text-[#8C76FF]/70 select-none bg-[#8C76FF]/5 px-2.5 py-0.5 rounded border border-[#8C76FF]/10">
                      {item.code}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg tracking-tight mb-4 font-sans leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 font-sans">
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer: Animation canvas + Diagnostic impact details */}
                <div className="relative z-10">
                  {/* Subtle technical animation line */}
                  <div className="w-full h-8 border-t border-b border-white/[0.03] bg-white/[0.005] relative overflow-hidden mb-4 flex items-center">
                    {item.id === "01" && (
                      <div className="w-full h-1 relative">
                        {/* Catalog slowdown animation */}
                        <motion.div
                          animate={{
                            x: isHovered ? ["0%", "40%", "45%", "50%", "100%"] : ["0%", "100%"]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: isHovered ? 3.5 : 1.8,
                            ease: isHovered ? "easeInOut" : "linear"
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-[#8C76FF] absolute top-1/2 -translate-y-1/2"
                        />
                        <motion.div
                          animate={{
                            x: isHovered ? ["-20%", "20%", "28%", "35%", "100%"] : ["-20%", "100%"]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: isHovered ? 3.5 : 1.8,
                            ease: isHovered ? "easeInOut" : "linear",
                            delay: 0.4
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-[#8C76FF]/70 absolute top-1/2 -translate-y-1/2"
                        />
                      </div>
                    )}

                    {item.id === "02" && (
                      <div className="w-full h-full flex items-center justify-between px-6 relative">
                        {/* 1C desynchronization pulse */}
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="h-[1px] flex-grow bg-dashed border-t border-dashed border-white/10 mx-2 relative">
                          <motion.div
                            animate={isHovered ? {
                              opacity: [0, 1, 0, 1, 0],
                              scale: [1, 1.2, 0.8, 1, 1],
                              x: ["0%", "40%", "42%", "80%", "100%"]
                            } : {
                              x: ["0%", "100%"]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1.5 h-1.5 rounded-full bg-[#8C76FF] absolute -top-[3px]"
                          />
                        </div>
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                    )}

                    {item.id === "03" && (
                      <div className="w-full h-2 px-6 flex items-center gap-1">
                        {/* Load pressure bars */}
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={isHovered ? {
                              backgroundColor: i > 8 ? ["#ffffff0d", "#8C76FF", "#ffffff0d"] : "#8C76FF",
                              opacity: [0.6, 1, 0.6]
                            } : {
                              backgroundColor: i > 9 ? "#ffffff0d" : "#8C76FF",
                              opacity: 0.3
                            }}
                            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
                            className="h-full w-full rounded-[1px]"
                          />
                        ))}
                      </div>
                    )}

                    {item.id === "04" && (
                      <div className="w-full h-full relative flex items-center justify-center">
                        {/* ERP Bottleneck workflow */}
                        <div className="w-3/4 h-[2px] bg-white/5 relative flex items-center">
                          {/* Left channel */}
                          <motion.div
                            animate={isHovered ? { x: ["0%", "40%", "42%", "45%"] } : { x: ["0%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-1.5 h-1.5 rounded-full bg-[#8C76FF] absolute -top-[2px]"
                          />
                          {/* Bottleneck point */}
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20 absolute left-[45%] flex items-center justify-center">
                            <span className="w-1 h-1 rounded-full bg-[#8C76FF] animate-ping" />
                          </div>
                          {/* Delayed output */}
                          {isHovered && (
                            <motion.div
                              animate={{ x: ["48%", "100%"] }}
                              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                              className="w-1.5 h-1.5 rounded-full bg-[#8C76FF]/40 absolute -top-[2px]"
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {item.id === "05" && (
                      <div className="w-full h-full flex items-center justify-center gap-1.5 relative">
                        {/* Legacy fragmentation floating blocks */}
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={isHovered ? {
                              y: [0, i % 2 === 0 ? -4 : 4, 0],
                              opacity: [0.4, 0.8, 0.4]
                            } : {}}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                            className="w-3 h-3 rounded-[2px] bg-white/[0.04] border border-white/10"
                          />
                        ))}
                      </div>
                    )}

                    {item.id === "06" && (
                      <div className="w-full h-full flex items-center justify-center relative">
                        {/* Scaling limits expansion and retraction */}
                        <div className="w-20 h-2.5 border border-dashed border-white/10 rounded relative flex items-center">
                          <motion.div
                            animate={isHovered ? {
                              width: ["0%", "95%", "95%", "0%"]
                            } : {
                              width: ["0%", "100%"]
                            }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="h-full bg-[#8C76FF]/20 border-r border-[#8C76FF] relative"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Impact category tags */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-white/30 tracking-wider">IMPACT TYPE</span>
                    <span className="text-xs font-mono text-[#8C76FF] font-medium">{item.impact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
