"use client";

import { motion } from "framer-motion";

// ─── CENTRAL OPERATING INFRASTRUCTURE MODULES ───────────────────────────────

const MODULE_BENEFITS = [
  {
    title: "Автоматизация процессов",
    desc: "Устранение ручных операций и дублирования данных.",
  },
  {
    title: "Управление складами",
    desc: "Синхронизация остатков и логистики в реальном времени.",
  },
  {
    title: "Финансовый контроль",
    desc: "Централизованное управление платежами и отчётностью.",
  },
  {
    title: "Интеграция 1С и API",
    desc: "Единая инфраструктура обмена данными между системами.",
  },
];

export default function ERPInfrastructureSection() {
  return (
    <section className="relative bg-[#0A0A0B] py-24 sm:py-32 lg:py-52 border-t border-white/5 overflow-hidden">
      
      {/* Background Image & Gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/handled_MVP_1080_1920_80.jpg" 
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
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.25em] text-[#8C76FF] uppercase mb-4 block"
          >
            ЦЕНТРАЛИЗОВАННАЯ ИНФРАСТРУКТУРА
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight font-sans"
          >
            ERP как цифровое ядро современного бизнеса
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base text-white/50 leading-relaxed font-sans"
          >
            Современная компания не может масштабироваться через разрозненные таблицы, ручные процессы и хаотичные интеграции. Kibex проектирует ERP-системы, которые становятся единым центром управления продажами, складами, логистикой, финансами и внутренними операциями бизнеса.
          </motion.p>
        </div>

        {/* Benefits Grid - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {MODULE_BENEFITS.map((benefit, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 bg-white/[0.01] border border-white/[0.03] rounded-xl flex flex-col gap-3 hover:border-white/10 transition-colors duration-300"
              >
                <div className="text-[11px] font-mono font-bold text-[#8C76FF]">
                  0{i + 1} /
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{benefit.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
