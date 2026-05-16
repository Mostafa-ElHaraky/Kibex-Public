"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const cases = [
  {
    title: "Enterprise Retail Platform",
    desc: "Модернизация инфраструктуры для федеральной сети магазинов.",
    metrics: [
      { label: "Conversion Growth", value: 24, suffix: "%" },
      { label: "API Response", value: 45, suffix: "ms" },
      { label: "Uptime", value: 99.99, suffix: "%" }
    ]
  },
  {
    title: "Global Distribution ERP",
    desc: "Разработка ядра системы управления для дистрибьюторской компании.",
    metrics: [
      { label: "Sync Speed", value: 10, suffix: "x" },
      { label: "Inventory Error", value: 0.01, suffix: "%" },
      { label: "Nodes Connected", value: 120, suffix: "+" }
    ]
  },
  {
    title: "Highload B2B Portal",
    desc: "Проектирование и запуск портала для 100k+ SKU.",
    metrics: [
      { label: "Page Load", value: 0.8, suffix: "s" },
      { label: "Concurrent Users", value: 15, suffix: "k" },
      { label: "Security Score", value: 100, suffix: "/100" }
    ]
  }
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCurrent(value);
          clearInterval(timer);
        } else {
          setCurrent(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-geist text-3xl font-bold text-white">
      {value % 1 === 0 ? Math.floor(current) : current.toFixed(2)}
      <span className="text-[#4633FF] ml-1">{suffix}</span>
    </span>
  );
}

export default function ResultsSection() {
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
            Результаты проектов
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-[#4633FF]/30 transition-all duration-500 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="font-geist text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="font-geist text-sm text-white/40 leading-relaxed mb-12">{item.desc}</p>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/5">
                {item.metrics.map((metric, mi) => (
                  <div key={mi} className="flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{metric.label}</span>
                    <Counter value={metric.value} suffix={metric.suffix} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
