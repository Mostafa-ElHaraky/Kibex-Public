"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Исследование бизнеса", desc: "Анализ текущих процессов, точек отказа и долгосрочных целей развития." },
  { num: "02", title: "Архитектурное проектирование", desc: "Проектирование схемы данных, API и инфраструктурных слоев." },
  { num: "03", title: "UX и процессы", desc: "Проработка пользовательских путей и логики административного управления." },
  { num: "04", title: "Разработка ядра", desc: "Создание отказоустойчивой основы системы на базе Kibex Core." },
  { num: "05", title: "Интеграции", desc: "Связывание платформы с ERP, 1С, CRM и внешними сервисами." },
  { num: "06", title: "Безопасность", desc: "Внедрение механизмов защиты и проведение внутреннего аудита." },
  { num: "07", title: "Нагрузочное тестирование", desc: "Симуляция пиковых нагрузок для проверки стабильности системы." },
  { num: "08", title: "Запуск и масштабирование", desc: "Деплой в промышленную среду и мониторинг показателей." }
];

export default function EngineeringApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="bg-[#0A0A0B] py-32 border-t border-white/5">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-geist text-sm font-bold uppercase tracking-[0.2em] text-[#4633FF] mb-6"
          >
            Рабочий процесс
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF]"
          >
            КАК СОЗДАЁТСЯ ИНФРАСТРУКТУРА KIBEX?
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#4633FF] shadow-[0_0_15px_#4633FF] md:-translate-x-1/2 z-10"
          />

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Content */}
                <div className="flex-1 pl-8 md:pl-0">
                  <div className={`p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#4633FF]/30 transition-colors duration-500`}>
                    <div className="text-[10px] font-bold text-[#4633FF] uppercase tracking-widest mb-2">Step {step.num}</div>
                    <h3 className="font-geist text-xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="font-geist text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Point on line */}
                <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-auto w-2 h-2 rounded-full bg-[#0A0A0B] border border-[#4633FF] z-20 shadow-[0_0_10px_#4633FF]" />

                {/* Spacer for layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
