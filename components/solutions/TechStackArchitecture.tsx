"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  Network,
  Globe,
  Terminal,
  Shuffle,
  Zap,
  Workflow
} from "lucide-react";

// Types & Interfaces
interface TechItem {
  name: string;
  nodeKey: string;
}

interface TechCategory {
  title: string;
  desc: string;
  items: TechItem[];
  icon: any;
  nodeKey: string;
}

// Data definition mapping technologies to architectural nodes
const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Backend",
    desc: "Высокопроизводительные сервисы и бизнес-логика",
    items: [
      { name: "Go", nodeKey: "backend" },
      { name: "Node.js", nodeKey: "backend" },
      { name: "PHP", nodeKey: "backend" }
    ],
    icon: Terminal,
    nodeKey: "backend",
  },
  {
    title: "Infrastructure",
    desc: "Оркестрация, шины обмена сообщениями и масштабируемость",
    items: [
      { name: "Kubernetes", nodeKey: "k8s" },
      { name: "Docker", nodeKey: "k8s" },
      { name: "RabbitMQ", nodeKey: "rabbitmq" },
      { name: "Redis", nodeKey: "redis" },
      { name: "NATS", nodeKey: "rabbitmq" }
    ],
    icon: Network,
    nodeKey: "k8s",
  },
  {
    title: "Databases",
    desc: "Хранилища данных, оптимизированные под разные типы нагрузок",
    items: [
      { name: "PostgreSQL", nodeKey: "postgres" },
      { name: "ElasticSearch", nodeKey: "postgres" },
      { name: "ClickHouse", nodeKey: "postgres" }
    ],
    icon: Database,
    nodeKey: "postgres",
  },
  {
    title: "Frontend",
    desc: "Быстрые пользовательские интерфейсы с фокусом на Core Web Vitals",
    items: [
      { name: "Next.js", nodeKey: "frontend" },
      { name: "React", nodeKey: "frontend" },
      { name: "TypeScript", nodeKey: "frontend" }
    ],
    icon: Globe,
    nodeKey: "frontend",
  },
];

const METRICS = [
  { value: "99.99%", label: "Доступность SLA", desc: "Гарантированный аптайм систем" },
  { value: "< 50ms", label: "Задержка API", desc: "Время отклика ядра платформы" },
  { value: "10M+", label: "Запросов / сутки", desc: "Текущая пиковая нагрузка" },
  { value: "Zero-Trust", label: "Архитектура защиты", desc: "Изолированные контуры данных" }
];

export default function TechStackArchitecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Checks if a specific connection path is active based on activeNode
  const isPathActive = (pathKey: string) => {
    if (!activeNode) return false;
    
    switch (activeNode) {
      case "frontend":
        return pathKey === "frontend-gateway" || pathKey === "gateway-backend";
      case "backend":
        return (
          pathKey === "gateway-backend" ||
          pathKey === "backend-postgres" ||
          pathKey === "backend-redis" ||
          pathKey === "backend-rabbitmq"
        );
      case "postgres":
        return pathKey === "backend-postgres" || pathKey === "postgres-k8s";
      case "redis":
        return pathKey === "backend-redis" || pathKey === "redis-k8s";
      case "rabbitmq":
        return pathKey === "backend-rabbitmq" || pathKey === "rabbitmq-k8s";
      case "k8s":
        return (
          pathKey === "postgres-k8s" ||
          pathKey === "redis-k8s" ||
          pathKey === "rabbitmq-k8s"
        );
      default:
        return false;
    }
  };

  // Node breathing pulse definition
  const nodePulse = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as any
    }
  };

  return (
    <section className="py-32 border-t border-white/5 bg-[#09090A] relative overflow-hidden">
      {/* Background infrastructure grid pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(140, 118, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(140, 118, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* TOP ZONE: Left Intro + Right Infrastructure Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-24">
          {/* Left Intro */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <span className="text-sm font-semibold tracking-[0.25em] text-[#8C76FF] uppercase mb-4 block">
              ТЕХНОЛОГИЧЕСКИЙ СТЕК
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 font-sans leading-tight">
              Технологическая инфраструктура
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-xl font-sans">
              Архитектура систем Kibex базируется на открытых протоколах и индустриальных стандартах корпоративного ПО. 
              Каждая технология интегрирована в единый, отказоустойчивый контур для обеспечения максимальной производительности.
            </p>

            {/* Engineering Metrics */}
            <div className="grid grid-cols-2 gap-5">
              {METRICS.map((metric, i) => (
                <div
                  key={i}
                  className="p-6 bg-[#0D0D0E]/60 border border-white/[0.03] rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-2xl md:text-4xl font-bold text-[#8C76FF] mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-bold text-white mb-1.5">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-xs text-white/40 leading-normal">
                    {metric.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Infrastructure Visualization */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-[#0B0B0C] border border-white/[0.04] rounded-2xl relative min-h-[520px]">
            {/* Minimal background details */}
            <div className="absolute top-5 left-5 flex gap-2 font-mono text-[10px] text-white/20 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C76FF]/40 animate-pulse" />
              <span>INFRASTRUCTURE TOPOLOGY // ACTIVE</span>
            </div>

            <div className="absolute top-5 right-5 font-mono text-[10px] text-white/20 select-none">
              ZONE: US-EAST-1
            </div>

            <svg
              className="w-full max-w-[580px] h-auto aspect-[3/2] select-none"
              viewBox="0 0 600 400"
              fill="none"
            >
              {/* --- 1. CONNECTION LINES (BASE) --- */}
              {/* Frontend -> Gateway */}
              <path d="M 300 65 L 300 95" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />
              {/* Gateway -> Backend */}
              <path d="M 300 135 L 300 165" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />
              
              {/* Backend -> DB Cluster */}
              <path d="M 300 205 V 225 H 160 V 250" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />
              <path d="M 300 205 V 250" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />
              <path d="M 300 205 V 225 H 440 V 250" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />

              {/* DB Cluster -> K8s */}
              <path d="M 160 290 V 310 H 300 V 335" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />
              <path d="M 300 290 V 335" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />
              <path d="M 440 290 V 310 H 300 V 335" stroke="rgba(140, 118, 255, 0.1)" strokeWidth="1.8" />

              {/* --- 2. ACTIVE HIGHLIGHTED PATHS --- */}
              {/* Frontend -> Gateway */}
              <motion.path
                d="M 300 65 L 300 95"
                stroke={isPathActive("frontend-gateway") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("frontend-gateway") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("frontend-gateway") ? "5 10" : "none"}
                animate={isPathActive("frontend-gateway") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />

              {/* Gateway -> Backend */}
              <motion.path
                d="M 300 135 L 300 165"
                stroke={isPathActive("gateway-backend") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("gateway-backend") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("gateway-backend") ? "5 10" : "none"}
                animate={isPathActive("gateway-backend") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />

              {/* Backend -> Postgres */}
              <motion.path
                d="M 300 205 V 225 H 160 V 250"
                stroke={isPathActive("backend-postgres") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("backend-postgres") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("backend-postgres") ? "5 10" : "none"}
                animate={isPathActive("backend-postgres") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />

              {/* Backend -> Redis */}
              <motion.path
                d="M 300 205 V 250"
                stroke={isPathActive("backend-redis") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("backend-redis") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("backend-redis") ? "5 10" : "none"}
                animate={isPathActive("backend-redis") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />

              {/* Backend -> RabbitMQ */}
              <motion.path
                d="M 300 205 V 225 H 440 V 250"
                stroke={isPathActive("backend-rabbitmq") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("backend-rabbitmq") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("backend-rabbitmq") ? "5 10" : "none"}
                animate={isPathActive("backend-rabbitmq") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />

              {/* Postgres -> K8s */}
              <motion.path
                d="M 160 290 V 310 H 300 V 335"
                stroke={isPathActive("postgres-k8s") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("postgres-k8s") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("postgres-k8s") ? "5 10" : "none"}
                animate={isPathActive("postgres-k8s") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />

              {/* Redis -> K8s */}
              <motion.path
                d="M 300 290 V 335"
                stroke={isPathActive("redis-k8s") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("redis-k8s") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("redis-k8s") ? "5 10" : "none"}
                animate={isPathActive("redis-k8s") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />

              {/* RabbitMQ -> K8s */}
              <motion.path
                d="M 440 290 V 310 H 300 V 335"
                stroke={isPathActive("rabbitmq-k8s") ? "#8C76FF" : "rgba(140, 118, 255, 0.15)"}
                strokeWidth={isPathActive("rabbitmq-k8s") ? "2.5" : "1.8"}
                strokeDasharray={isPathActive("rabbitmq-k8s") ? "5 10" : "none"}
                animate={isPathActive("rabbitmq-k8s") ? { strokeDashoffset: [0, -30] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />

              {/* --- 3. SUBTLE PULSES (ELECTRICITY PACKETS) --- */}
              {/* Frontend -> Gateway */}
              <motion.circle
                r="2.5"
                fill="#fff"
                className="shadow-[0_0_8px_#fff]"
                animate={{
                  cx: [300, 300],
                  cy: [65, 95]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              {/* Gateway -> Backend */}
              <motion.circle
                r="2.5"
                fill="#fff"
                className="shadow-[0_0_8px_#fff]"
                animate={{
                  cx: [300, 300],
                  cy: [135, 165]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.6
                }}
              />

              {/* Backend -> Redis */}
              <motion.circle
                r="2.5"
                fill="#8C76FF"
                animate={{
                  cx: [300, 300],
                  cy: [205, 250]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.2
                }}
              />

              {/* --- 4. ORCHESTRATION RINGS (KUBERNETES CORE) --- */}
              <motion.ellipse
                cx="300"
                cy="355"
                rx="130"
                ry="40"
                stroke="#8C76FF"
                strokeWidth="1"
                strokeDasharray="5 18"
                fill="none"
                opacity={activeNode === "k8s" ? "0.3" : "0.1"}
                animate={{ rotate: 360 }}
                transition={{
                  duration: activeNode === "k8s" ? 12 : 28,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformOrigin: "300px 355px" }}
              />
              <motion.ellipse
                cx="300"
                cy="355"
                rx="155"
                ry="48"
                stroke="#8C76FF"
                strokeWidth="1"
                strokeDasharray="6 24"
                fill="none"
                opacity={activeNode === "k8s" ? "0.18" : "0.06"}
                animate={{ rotate: -360 }}
                transition={{
                  duration: activeNode === "k8s" ? 18 : 38,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformOrigin: "300px 355px" }}
              />

              {/* --- 5. TOPOLOGY NODES (as React-HTML via foreignObject) --- */}

              {/* FRONTEND NODE */}
              <foreignObject x="230" y="25" width="140" height="40">
                <motion.div
                  animate={(activeNode === "frontend" ? { scale: 1.03 } : nodePulse) as any}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeNode === "frontend"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.3)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Globe size={13} className={activeNode === "frontend" ? "text-[#8C76FF]" : "text-white/30"} />
                  FRONTEND
                </motion.div>
              </foreignObject>

              {/* API GATEWAY NODE */}
              <foreignObject x="230" y="95" width="140" height="40">
                <motion.div
                  animate={(activeNode === "gateway" ? { scale: 1.03 } : nodePulse) as any}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeNode === "gateway"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.3)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Shuffle size={13} className={activeNode === "gateway" ? "text-[#8C76FF]" : "text-white/30"} />
                  API GATEWAY
                </motion.div>
              </foreignObject>

              {/* BACKEND NODE */}
              <foreignObject x="230" y="165" width="140" height="40">
                <motion.div
                  animate={(activeNode === "backend" ? { scale: 1.03 } : nodePulse) as any}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeNode === "backend"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.35)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Cpu size={13} className={activeNode === "backend" ? "text-[#8C76FF]" : "text-white/30"} />
                  BACKEND
                </motion.div>
              </foreignObject>

              {/* POSTGRESQL NODE */}
              <foreignObject x="95" y="250" width="130" height="40">
                <motion.div
                  animate={(activeNode === "postgres" ? { scale: 1.03 } : nodePulse) as any}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeNode === "postgres"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.3)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Database size={13} className={activeNode === "postgres" ? "text-[#8C76FF]" : "text-white/30"} />
                  POSTGRESQL
                </motion.div>
              </foreignObject>

              {/* REDIS NODE */}
              <foreignObject x="235" y="250" width="130" height="40">
                <motion.div
                  animate={(activeNode === "redis" ? { scale: 1.03 } : nodePulse) as any}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeNode === "redis"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.3)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Zap size={13} className={activeNode === "redis" ? "text-[#8C76FF]" : "text-white/30"} />
                  REDIS
                </motion.div>
              </foreignObject>

              {/* RABBITMQ NODE */}
              <foreignObject x="375" y="250" width="130" height="40">
                <motion.div
                  animate={(activeNode === "rabbitmq" ? { scale: 1.03 } : nodePulse) as any}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeNode === "rabbitmq"
                      ? "border-[#8C76FF] text-white shadow-[0_0_15px_rgba(140,118,255,0.3)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Workflow size={13} className={activeNode === "rabbitmq" ? "text-[#8C76FF]" : "text-white/30"} />
                  RABBITMQ
                </motion.div>
              </foreignObject>

              {/* KUBERNETES CORE NODE */}
              <foreignObject x="200" y="335" width="200" height="40">
                <motion.div
                  animate={(activeNode === "k8s" ? { scale: 1.03 } : nodePulse) as any}
                  className={`w-full h-full flex items-center justify-center gap-2.5 rounded-lg bg-[#09090A] border text-[11px] font-mono font-bold tracking-wider select-none transition-all duration-300 ${
                    activeNode === "k8s"
                      ? "border-[#8C76FF] text-white shadow-[0_0_18px_rgba(140,118,255,0.35)]"
                      : "border-white/[0.05] text-white/50"
                  }`}
                >
                  <Network size={13} className={activeNode === "k8s" ? "text-[#8C76FF]" : "text-white/30"} />
                  KUBERNETES CLUSTER
                </motion.div>
              </foreignObject>
            </svg>
          </div>
        </div>

        {/* BOTTOM ZONE: 4 symmetric stack category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {TECH_CATEGORIES.map((cat, idx) => {
            const CatIcon = cat.icon;
            const isCardActive = activeNode === cat.nodeKey;
            
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveNode(cat.nodeKey)}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-10 bg-[#0D0D0E]/80 border rounded-2xl transition-all duration-300 relative group overflow-hidden ${
                  isCardActive 
                    ? "border-[#8C76FF]/40 shadow-[0_4px_24px_rgba(140,118,255,0.06)]" 
                    : "border-white/[0.04] hover:border-white/10"
                }`}
                style={{
                  backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 100%)"
                }}
              >
                {/* Subtle top indicator border line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8C76FF]/30 to-transparent transition-opacity duration-300 ${
                    isCardActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  }`}
                />

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-white/[0.03] border flex items-center justify-center transition-colors duration-300 ${
                    isCardActive ? "border-[#8C76FF]/35 text-[#8C76FF]" : "border-white/5 text-white/50"
                  }`}>
                    <CatIcon size={20} />
                  </div>
                  <h3 className="font-bold text-white text-2xl tracking-tight font-sans">{cat.title}</h3>
                </div>

                <p className="text-white/50 text-base leading-relaxed mb-8 font-sans">
                  {cat.desc}
                </p>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((tech, i) => {
                    const isTechHovered = hoveredTech === tech.name;
                    return (
                      <span
                        key={i}
                        onMouseEnter={() => {
                          setHoveredTech(tech.name);
                          setActiveNode(tech.nodeKey);
                        }}
                        onMouseLeave={() => {
                          setHoveredTech(null);
                          setActiveNode(null);
                        }}
                        className={`px-4 py-2 bg-white/[0.015] border rounded-lg text-sm font-mono select-none transition-all duration-300 relative cursor-default ${
                          isTechHovered
                            ? "border-[#8C76FF]/50 text-white"
                            : "border-white/5 text-white/60 group-hover:border-white/10"
                        }`}
                      >
                        {tech.name}
                        {/* Thin interactive underline */}
                        <span
                          className={`absolute bottom-[2px] left-[10px] right-[10px] h-[1px] bg-[#8C76FF] transition-transform duration-300 origin-center ${
                            isTechHovered ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
