"use client";

import { motion } from "framer-motion";

// ─── HIGHLOAD INFRASTRUCTURE MODULES ──────────────────────────────────────────

const MODULES = [
  {
    title: "Распределённые системы",
    desc: "Исключение единой точки отказа и независимая работа сервисов.",
  },
  {
    title: "Observability",
    desc: "Мониторинг инфраструктуры, логирование и анализ производительности в реальном времени.",
  },
  {
    title: "Многоуровневое кеширование",
    desc: "Redis, CDN и application cache для минимизации задержек.",
  },
  {
    title: "Горизонтальное масштабирование",
    desc: "Автоматическое расширение инфраструктуры при росте нагрузки.",
  },
];

export default function HighloadSection() {
  return (
    <section className="bg-[#0A0A0B] py-20 sm:py-24 lg:py-32 overflow-hidden border-t border-white/5 relative">
      
      {/* Background Image & Gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/highloadgpt.png" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.55] select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/90 via-[#0A0A0B]/50 to-[#0A0A0B]/90" />
        
        {/* Subtle Indigo Glow and Grid Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.06)_0%,transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(rgba(140, 118, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140, 118, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
        
        {/* CENTERED HEADER */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-4 block"
          >
            РАСПРЕДЕЛЁННАЯ ИНФРАСТРУКТУРА
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight font-sans"
          >
            Highload архитектура для экстремальных нагрузок
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base text-white/50 leading-relaxed font-sans"
          >
            Система должна сохранять стабильность независимо от количества пользователей, объема данных и пиковых нагрузок. Kibex проектирует распределённую инфраструктуру, которая масштабируется вместе с ростом бизнеса.
          </motion.p>
        </div>

        {/* Live Metrics Block (Minimal, Premium, Integrated 4-Column Panel) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/[0.05] py-8 mb-16 max-w-5xl mx-auto w-full text-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/35 mb-1.5">Запросов / сек</span>
            <span className="text-3xl font-extrabold text-white tracking-tight">50k+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/35 mb-1.5">Пропускная способность</span>
            <span className="text-3xl font-extrabold text-white tracking-tight">4.2 GB/s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/35 mb-1.5">Uptime</span>
            <span className="text-3xl font-extrabold text-[#8C76FF] tracking-tight">99.99%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/35 mb-1.5">Активные узлы</span>
            <span className="text-3xl font-extrabold text-white tracking-tight">128</span>
          </div>
        </div>

        {/* Engineering Modules List (4-Column Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
          {MODULES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i }}
              className="p-6 bg-white/[0.01] border border-white/[0.03] rounded-xl flex flex-col gap-3 hover:border-white/10 transition-colors duration-300"
            >
              <span className="text-xs font-mono text-[#8C76FF] select-none">0{i + 1} /</span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1.5 font-sans">
                  {m.title}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed font-sans">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
