"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Server, Share2, Activity, Zap, ShieldCheck, Search } from "lucide-react";

const features = [
  { icon: Share2, title: "Distributed systems", desc: "Распределенная архитектура для исключения единой точки отказа." },
  { icon: Activity, title: "Observability", desc: "Полный мониторинг производительности и логирование в реальном времени." },
  { icon: Zap, title: "Caching strategies", desc: "Многоуровневое кеширование (Redis, CDN, App) для мгновенного отклика." },
  { icon: Server, title: "Horizontal scaling", desc: "Автоматическое масштабирование ресурсов при пиковых нагрузках." },
];

export default function HighloadSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const graphWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <section ref={ref} className="bg-[#0A0A0B] py-32 overflow-hidden border-t border-white/5">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Load Scaling Visual */}
          <div className="relative p-12 bg-white/[0.02] rounded-3xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-geist text-2xl font-bold text-white">Load Scaling Analysis</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#4633FF]/20 text-[#4633FF] text-[10px] font-bold uppercase tracking-widest">
                Live Simulation
              </div>
            </div>

            {/* Graph Visualization */}
            <div className="relative h-64 flex items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 100, 85, 120, 100, 140, 120, 160].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(height / 160) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-[#4633FF]/20 to-[#4633FF] rounded-t-sm"
                />
              ))}
              
              {/* Animated Progress Line */}
              <motion.div 
                style={{ width: graphWidth }}
                className="absolute bottom-0 left-0 h-px bg-[#4633FF] shadow-[0_0_15px_#4633FF] z-10"
              />
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { label: "Request/sec", value: "50k+" },
                { label: "Throughput", value: "4.2 GB/s" },
                { label: "Uptime", value: "99.99%" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{stat.label}</div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-xl font-geist font-bold text-white"
                  >
                    {stat.value}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="pt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-geist text-sm font-bold uppercase tracking-[0.2em] text-[#4633FF] mb-6"
            >
              Highload Архитектура
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight"
            >
              Архитектура для экстремальных нагрузок
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-8 font-geist text-lg text-[#FFFFFF]/60 leading-relaxed"
            >
              Система должна сохранять стабильность независимо от количества пользователей и объема данных. Мы проектируем решения, которые горизонтально масштабируются при росте вашего бизнеса.
            </motion.p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-white/5 text-[#4633FF]">
                      <f.icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-geist text-sm font-bold text-white uppercase tracking-wider">{f.title}</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
