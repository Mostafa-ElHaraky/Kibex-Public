"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { label: "Масштабирование", cms: "Ограничено архитектурой плагинов", kibex: "Горизонтальное масштабирование ядра" },
  { label: "Безопасность", cms: "Зависимость от обновлений сторонних авторов", kibex: "Security-by-design, закрытое ядро" },
  { label: "Интеграции", cms: "Сложные, нестабильные через плагины", kibex: "Нативные API-интеграции (1С / ERP)" },
  { label: "Производительность", cms: "Падает при росте каталога (>10k SKU)", kibex: "Стабильна при 100k+ SKU" },
  { label: "Контроль данных", cms: "Ограничен структурой CMS", kibex: "Полный контроль над схемой данных" },
  { label: "Развитие", cms: "Высокая стоимость каждого изменения", kibex: "API-first подход для быстрой итерации" }
];

export default function ComparisonSection() {
  return (
    <section className="bg-[#0A0A0B] py-32 lg:py-48 overflow-hidden border-t border-white/5 relative">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.02)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 relative z-10">
        <div className="text-center mb-24 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.15]"
          >
            Типовая CMS vs системная архитектура
          </motion.h2>
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.015] hover:shadow-2xl hover:shadow-[#4633FF]/5 transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white/5 border-b border-white/5">
            <div className="p-8 md:p-10 lg:p-12 font-geist text-xs md:text-sm lg:text-base font-extrabold uppercase tracking-[0.2em] text-white/40 flex items-center">
              Параметр
            </div>
            <div className="p-8 md:p-10 lg:p-12 font-geist text-xs md:text-sm lg:text-base font-extrabold uppercase tracking-[0.2em] text-white/40 text-center border-t md:border-t-0 md:border-l border-white/5 flex items-center justify-center">
              WordPress / Bitrix / Drupal
            </div>
            <div className="p-8 md:p-10 lg:p-12 font-geist text-xs md:text-sm lg:text-base font-extrabold uppercase tracking-[0.2em] text-[#4633FF] text-center border-t md:border-t-0 md:border-l border-white/5 bg-[#4633FF]/5 flex items-center justify-center">
              Kibex архитектура
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="p-8 md:p-10 lg:p-12 font-geist text-base md:text-lg lg:text-xl font-bold text-white flex items-center">
                {row.label}
              </div>
              <div className="p-8 md:p-10 lg:p-12 flex items-center justify-center gap-3.5 md:gap-4 border-t md:border-t-0 md:border-l border-white/5 bg-white/[0.01]">
                <X className="w-5 h-5 text-red-500/40 shrink-0" />
                <span className="font-geist text-sm md:text-base lg:text-lg text-white/50 text-center leading-relaxed">
                  {row.cms}
                </span>
              </div>
              <div className="p-8 md:p-10 lg:p-12 flex items-center justify-center gap-3.5 md:gap-4 border-t md:border-t-0 md:border-l border-white/5 bg-[#4633FF]/5">
                <Check className="w-5 h-5 text-[#4633FF] shrink-0" />
                <span className="font-geist text-sm md:text-base lg:text-lg font-bold text-white text-center leading-relaxed">
                  {row.kibex}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
