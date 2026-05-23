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
    <section className="bg-[#0A0A0B] py-32 border-t border-white/5">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-geist text-sm font-bold uppercase tracking-[0.2em] text-[#4633FF] mb-6"
          >
            Технологический стек
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF]"
          >
            Технологическая архитектура
          </motion.h2>
        </div>

        <div className="space-y-4">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-[#4633FF]/30 transition-all duration-500"
            >
              <div className="md:col-span-3">
                <div className="text-[10px] font-bold text-[#4633FF] uppercase tracking-widest mb-2">{layer.role}</div>
                <h3 className="font-geist text-xl font-bold text-white">{layer.title}</h3>
              </div>

              <div className="md:col-span-5 flex items-center">
                <p className="font-geist text-sm text-white/50 leading-relaxed italic border-l border-white/10 pl-6">
                  &quot;{layer.impact}&quot;
                </p>
              </div>

              <div className="md:col-span-4 flex flex-wrap gap-2 items-center justify-end">
                {layer.tech.map((t, ti) => (
                  <span key={ti} className="px-3 py-1 rounded-md bg-white/5 text-[10px] font-bold text-white/40 border border-white/5">
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
