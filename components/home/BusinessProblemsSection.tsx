"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const problems = [
  {
    image: "/speed.png",
    title: "Медленная работа платформы",
    description: "Низкая скорость загрузки при росте каталога или трафика снижает конверсию и позиции в поиске."
  },
  {
    image: "/intigrate.png",
    title: "Ошибки интеграций",
    description: "Проблемы синхронизации с 1С, ERP и внешними сервисами ведут к потере данных и заказам на отсутствующий товар."
  },
  {
    image: "/rost.png",
    title: "Рост стоимости поддержки",
    description: "Устаревший код и накопленные плагины делают любое изменение в системе дорогим и рискованным."
  },
  {
    image: "/tech.png",
    title: "Технический долг",
    description: "CMS, которые не обновлялись годами, становятся узким местом для внедрения новых функций."
  },
  {
    image: "/security.png",
    title: "Проблемы безопасности",
    description: "Стандартные уязвимости популярных платформ ставят под угрозу персональные данные клиентов."
  },
  {
    image: "/net.png",
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
    <section
      className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, rgba(91, 60, 255, 0.03), transparent 60%),
          radial-gradient(circle at top center, rgba(91, 60, 255, 0.08), transparent 45%),
          linear-gradient(180deg, #0A0A0D 0%, #0D0D12 40%, #09090C 100%)
        `
      }}
    >
      {/* LAYER 1: Minimal Architectural Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Engineering Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120, 90, 255, 0.06) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(120, 90, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 95%)'
          }}
        />

        {/* Ultra Subtle Topology Lines & Soft Radial Geometry */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] pointer-events-none opacity-[0.025]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute inset-0 border border-[#5B3CFF]/[0.08] rounded-full"
              style={{ padding: `${i * 180}px` }}
            />
          ))}
          {/* Faint Topology Pulse */}
          <svg className="absolute inset-0 w-full h-full">
            <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#5B3CFF" strokeWidth="0.75" strokeDasharray="3 15" />
            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#5B3CFF" strokeWidth="0.75" strokeDasharray="2 20" />
          </svg>
        </div>

        {/* Minimal Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
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
              className="font-geist text-5xl md:text-4xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
            >
              Когда платформа начинает
              ограничивать рост
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="font-geist text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mx-auto"
            >
              Большинство проблем бизнеса появляются не из-за продаж, а из-за архитектурных ограничений системы.
            </motion.p>
          </motion.div>
        </div>

        {/* Premium Sticky Stacked Cards Layout */}
        <div className="flex flex-col gap-0 max-w-4xl mx-auto relative z-10 pb-16">
          {problems.map((item, i) => (
            <div
              key={i}
              className="md:sticky w-full"
              style={{
                top: `calc(120px + ${i * 24}px)`
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="group relative w-full h-auto md:h-[320px] rounded-3xl border transition-all duration-500 backdrop-blur-[14px] overflow-hidden mb-8 md:mb-12"
                style={{
                  backgroundColor: hoveredIdx === i ? 'rgba(24, 24, 35, 0.95)' : 'rgba(18, 18, 24, 0.90)',
                  borderColor: hoveredIdx === i ? 'rgba(120, 90, 255, 0.3)' : 'rgba(120, 90, 255, 0.1)',
                  boxShadow: hoveredIdx === i
                    ? '0 30px 60px -15px rgba(91, 60, 255, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.20)'
                    : '0 20px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Background Image Covering the Entire Card */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  />
                </div>

                {/* Subtle Left-to-Right Gradient Overlay for Text Readability */}
                <div
                  className="absolute inset-0 transition-colors duration-500 z-5 pointer-events-none bg-gradient-to-r from-[#0c0c10]/95 via-[#0c0c10]/55 to-transparent"
                />

                {/* Internal Illumination */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(120,90,255,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl z-10" />

                <div className="relative z-20 flex h-full p-8 md:p-10">
                  {/* Item Number on the left */}
                  <div className="font-geist text-3xl md:text-4xl font-extrabold text-[#8C76FF]/40 group-hover:text-[#B4A6FF]/70 transition-colors duration-500 mr-6 md:mr-8 pt-0.5 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Text Content in the middle */}
                  <div className="flex flex-col justify-between h-full flex-grow md:max-w-[50%]">
                    <div>
                      <h3 className="font-geist text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-[#B4A6FF] transition-colors duration-500">
                        {item.title}
                      </h3>

                      <p className="font-geist text-base md:text-lg text-white/80 leading-[1.6] mb-6 group-hover:text-white transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Single Infrastructure Accent Line */}
                    <div className="pt-6 border-t border-[rgba(120,90,255,0.08)] group-hover:border-[rgba(120,90,255,0.18)] transition-colors duration-500">
                      <div className="flex items-center justify-between">
                        <div className="h-[1px] w-12 bg-[#8C76FF]/40" />

                        {/* Tiny Topology Pulse (Hover Only) */}
                        <AnimatePresence>
                          {hoveredIdx === i && (
                            <motion.div
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 0.4 }}
                              exit={{ scaleX: 0, opacity: 0 }}
                              className="h-[1px] w-full bg-[#8C76FF] origin-right ml-4"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
