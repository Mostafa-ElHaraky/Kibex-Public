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
    <section className="bg-[#0A0A0B] py-20 lg:py-28 overflow-hidden border-t border-white/5 relative">
      
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

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 relative z-10">
        
        {/* CENTERED HEADER */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-[#8C76FF] uppercase mb-4 block"
          >
            РАСПРЕДЕЛЁННАЯ ИНФРАСТРУКТУРА
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1] font-sans"
          >
            Highload архитектура для экстремальных нагрузок
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base lg:text-lg text-white/50 leading-relaxed font-sans max-w-3xl"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full mt-4">
          {MODULES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i }}
              className="p-5 lg:p-6 bg-black/60 backdrop-blur-md border border-white/[0.04] rounded-2xl flex flex-col gap-3 lg:gap-4 hover:border-[#8C76FF]/30 hover:bg-black/80 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] min-h-[160px] lg:min-h-[180px] justify-between"
            >
              <span className="text-[11px] lg:text-xs font-mono font-bold text-[#8C76FF] select-none">0{i + 1} /</span>
              <div>
                <h4 className="text-sm lg:text-lg font-bold text-white mb-2 lg:mb-3 font-sans">
                  {m.title}
                </h4>
                <p className="text-xs lg:text-sm text-white/40 leading-relaxed font-sans">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
