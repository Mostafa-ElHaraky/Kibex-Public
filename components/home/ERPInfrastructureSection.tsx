"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Package, 
  Users, 
  BarChart3, 
  Truck, 
  Wallet,
  Cpu
} from "lucide-react";

const modules = [
  { icon: Package, label: "Склады", x: 20, y: 30 },
  { icon: Wallet, label: "Финансы", x: 80, y: 30 },
  { icon: Users, label: "HR", x: 15, y: 65 },
  { icon: Truck, label: "Логистика", x: 85, y: 65 },
  { icon: BarChart3, label: "Аналитика", x: 50, y: 85 },
];

export default function ERPInfrastructureSection() {
  return (
    <section className="bg-[#0A0A0B] py-32 border-t border-white/5 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-geist text-sm font-bold uppercase tracking-[0.2em] text-[#4633FF] mb-6"
          >
            Единая операционная система
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight"
          >
            ERP как фундамент цифрового бизнеса
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-6 font-geist text-lg text-[#FFFFFF]/60 leading-relaxed"
          >
            <p>
              Современный enterprise-бизнес не может зависеть от разрозненных таблиц и хаотичных интеграций. Мы проектируем кастомные ERP-системы, которые становятся единым источником правды для всей компании.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Автоматизация процессов",
                "Управление складами",
                "Финансовый контроль",
                "Интеграция 1С и внешних API"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-[#FFFFFF]/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4633FF]" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Visual: ERP Core Animation */}
        <div className="relative aspect-square bg-white/[0.02] rounded-3xl border border-white/5 p-12 flex items-center justify-center overflow-hidden">
          {/* Engineering Grid Reaction */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `radial-gradient(#4633FF 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            {/* Center Core */}
            <motion.g
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="50" cy="50" r="12" fill="#0A0A0B" stroke="#4633FF" strokeWidth="0.5" />
              <Cpu className="w-6 h-6 text-[#4633FF] x-[50%] y-[50%]" x="44" y="44" />
              <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="3" className="font-geist font-bold tracking-widest uppercase">ERP CORE</text>
            </motion.g>

            {/* Modules & Connections */}
            {modules.map((mod, i) => (
              <g key={i}>
                <motion.path
                  d={`M 50 50 L ${mod.x} ${mod.y}`}
                  stroke="rgba(70, 51, 255, 0.2)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
                <motion.circle
                  r="0.6"
                  fill="#4633FF"
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                  style={{ offsetPath: `path('M 50 50 L ${mod.x} ${mod.y}')` }}
                />
                <motion.circle
                  r="0.6"
                  fill="#4633FF"
                  animate={{ offsetDistance: ["100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.7 }}
                  style={{ offsetPath: `path('M 50 50 L ${mod.x} ${mod.y}')` }}
                />
                
                <motion.g 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <circle cx={mod.x} cy={mod.y} r="5" fill="#0A0A0B" stroke="white" strokeOpacity="0.1" strokeWidth="0.3" />
                  <mod.icon className="w-3 h-3 text-white/40" x={mod.x - 1.5} y={mod.y - 1.5} />
                  <text x={mod.x} y={mod.y + 8} textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="2.5" className="font-geist tracking-wide">{mod.label}</text>
                </motion.g>
              </g>
            ))}
          </svg>

          {/* Live Metrics Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between gap-4">
            {[
              { label: "Orders Sync", value: "Real-time" },
              { label: "API Latency", value: "< 40ms" },
              { label: "Nodes Active", value: "12/12" }
            ].map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{metric.label}</span>
                <span className="text-xs font-geist font-bold text-[#4633FF]">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
