"use client";

import { motion } from "framer-motion";

const layers = [
  {
    title: "Frontend слой",
    role: "Пользовательский интерфейс",
    impact: "Высокая скорость отклика и SEO-оптимизация",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend слой",
    role: "Бизнес логика",
    impact: "Отказоустойчивость и сложные интеграции",
    tech: ["Node.js", "Go", "PostgreSQL", "Redis"]
  },
  {
    title: "Инфраструктуры слой",
    role: "Стабильность",
    impact: "Горизонтальное масштабирование и Docker/K8s",
    tech: ["Docker", "Kubernetes", "AWS/Cloud", "CI/CD"]
  },
  {
    title: "Наблюдаемость слой",
    role: "Мониторинг",
    impact: "Проактивное обнаружение ошибок и логов",
    tech: ["Prometheus", "Grafana", "ELK Stack", "Sentry"]
  }
];

export default function TechArchitectureSection() {
  return (
    <section className="bg-[#0A0A0B] py-32 lg:py-48 overflow-hidden border-t border-white/5 relative">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 relative z-10">
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-geist text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] text-[#4633FF] mb-6"
          >
            Технологический стек
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.15]"
          >
            Технологическая архитектура
          </motion.h2>
        </div>

        <div className="space-y-6 md:space-y-8">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:border-[#4633FF]/30 hover:bg-white/[0.02] hover:shadow-2xl hover:shadow-[#4633FF]/5 transition-all duration-500"
            >
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="text-[11px] md:text-xs font-bold text-[#4633FF] uppercase tracking-[0.2em] mb-3">{layer.role}</div>
                <h3 className="font-geist text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">{layer.title}</h3>
              </div>

              <div className="lg:col-span-4 flex items-center py-4 lg:py-0">
                <p className="font-geist text-lg md:text-xl lg:text-[22px] text-white/55 font-medium leading-relaxed italic border-l-2 border-[#4633FF]/30 pl-6 lg:pl-8">
                  &quot;{layer.impact}&quot;
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-2.5 md:gap-3 items-center justify-start lg:justify-end">
                {layer.tech.map((t, ti) => (
                  <span 
                    key={ti} 
                    className="px-5 py-2.5 rounded-xl bg-white/5 text-xs md:text-[14px] font-bold text-white/60 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white/90 transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover highlight line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-[#4633FF]/50 to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
