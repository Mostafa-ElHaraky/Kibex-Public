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
    <section className="bg-[#0A0A0B] py-32 border-t border-white/5">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF]"
          >
            Типовая CMS vs системная архитектура
          </motion.h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white/5 border-b border-white/5">
            <div className="p-8 font-geist text-xs font-bold uppercase tracking-widest text-white/30">Параметр</div>
            <div className="p-8 font-geist text-xs font-bold uppercase tracking-widest text-white/30 text-center border-l border-white/5">WordPress / Bitrix / Drupal</div>
            <div className="p-8 font-geist text-xs font-bold uppercase tracking-widest text-[#4633FF] text-center border-l border-white/5 bg-[#4633FF]/5">Kibex архитектура</div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="p-8 font-geist text-sm font-bold text-white flex items-center">{row.label}</div>
              <div className="p-8 flex items-center justify-center gap-3 border-l border-white/5 bg-white/[0.01]">
                <X className="w-4 h-4 text-red-500/30" />
                <span className="text-sm text-white/40 text-center">{row.cms}</span>
              </div>
              <div className="p-8 flex items-center justify-center gap-3 border-l border-white/5 bg-[#4633FF]/5">
                <Check className="w-4 h-4 text-[#4633FF]" />
                <span className="text-sm font-bold text-white text-center">{row.kibex}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
