"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ZapOff,
  Unplug,
  TrendingUp,
  History,
  ShieldAlert,
  Expand
} from "lucide-react";

const problems = [
  {
    icon: ZapOff,
    title: "Медленная работа платформы",
    description: "Низкая скорость загрузки при росте каталога или трафика снижает конверсию и позиции в поиске."
  },
  {
    icon: Unplug,
    title: "Ошибки интеграций",
    description: "Проблемы синхронизации с 1С, ERP и внешними сервисами ведут к потере данных и заказам на отсутствующий товар."
  },
  {
    icon: TrendingUp,
    title: "Рост стоимости поддержки",
    description: "Устаревший код и накопленные плагины делают любое изменение в системе дорогим и рискованным."
  },
  {
    icon: History,
    title: "Технический долг",
    description: "CMS, которые не обновлялись годами, становятся узким местом для внедрения новых функций."
  },
  {
    icon: ShieldAlert,
    title: "Проблемы безопасности",
    description: "Стандартные уязвимости популярных платформ ставят под угрозу персональные данные клиентов."
  },
  {
    icon: Expand,
    title: "Невозможность масштабирования",
    description: "Архитектура, которая «ломается» при попытке выхода на новые рынки или увеличении нагрузки."
  }
];

export default function BusinessProblemsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const moduleConfigs = [
    { ref: "INFRA-01-A", label: "Latency Layer" },
    { ref: "ERP-04-B", label: "Integration Node" },
    { ref: "COST-09-C", label: "Ops Overhead" },
    { ref: "DEBT-15-D", label: "Legacy Debt" },
    { ref: "SEC-21-E", label: "Security Perimeter" },
    { ref: "SCALE-03-F", label: "Core Capacity" },
  ];

  return (
    <section className="relative bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      {/* LAYER 1: Minimal Architectural Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subconscious Topology Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px]">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 border border-[#4633FF]/[0.02] rounded-full"
              style={{ padding: `${i * 200}px` }}
            />
          ))}
          {/* Faint Topology Pulse */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#4633FF" strokeWidth="0.5" strokeDasharray="2 12" />
          </svg>
        </div>

        {/* Faint Engineering Mesh */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 md:px-12">
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="font-geist text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
            >
              Когда платформа начинает <br />
              ограничивать рост
            </motion.h2>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="font-geist text-xl md:text-2xl text-white/40 leading-relaxed max-w-2xl mx-auto"
            >
              Большинство проблем бизнеса появляются не из-за продаж, а из-за архитектурных ограничений системы.
            </motion.p>
          </motion.div>
        </div>

        {/* Symmetrical 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              className="group relative"
            >
              {/* Premium Infrastructure Card */}
              <div className="relative h-full p-12 md:p-14 rounded-2xl border border-white/[0.03] bg-[#0B0B0F] transition-all duration-500 group-hover:border-[#4633FF]/20 group-hover:bg-[#0D0D12]">
                {/* Internal Illumination */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4633FF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  {/* Minimal Icon Indicator */}
                  <div className="mb-12 flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.05] text-[#4633FF]/60 group-hover:text-[#4633FF] transition-colors duration-500">
                    <item.icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-geist text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight leading-tight group-hover:text-[#4633FF]/90 transition-colors duration-500">
                    {item.title}
                  </h3>
                  
                  <p className="font-geist text-lg md:text-[19px] text-white/40 leading-[1.7] mb-12">
                    {item.description}
                  </p>

                  {/* Single Infrastructure Accent Line */}
                  <div className="pt-8 border-t border-white/[0.03]">
                    <div className="flex items-center justify-between">
                      <div className="h-[1px] w-12 bg-[#4633FF]/30" />
                      
                      {/* Tiny Topology Pulse (Hover Only) */}
                      <AnimatePresence>
                        {hoveredIdx === i && (
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 0.4 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            className="h-[1px] w-full bg-[#4633FF] origin-right ml-4"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
