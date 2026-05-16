"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    category: "Architecture",
    title: "Почему WordPress тормозит при росте каталога?",
    summary: "Глубокий анализ архитектурных ограничений CMS и того, как они влияют на производительность бизнеса при масштабировании.",
    readTime: "8 min",
    href: "/research/pochemu-wordpress-tormozit-pri-roste-kataloga"
  },
  {
    category: "ERP Infrastructure",
    title: "ERP Chaos: Как навести порядок в данных",
    summary: "Почему разрозненные системы учета убивают эффективность и как спроектировать единое цифровое ядро компании.",
    readTime: "12 min",
    href: "/research/erp-chaos"
  },
  {
    category: "Highload",
    title: "API-first подход: Будущее enterprise систем",
    summary: "Как разделение логики и представления позволяет строить системы, готовые к любым изменениям рынка.",
    readTime: "10 min",
    href: "/research/api-first"
  }
];

export default function ResearchHubSection() {
  return (
    <section className="bg-[#0A0A0B] py-32 border-t border-white/5">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-geist text-sm font-bold uppercase tracking-[0.2em] text-[#4633FF] mb-6"
            >
              Kibex Research Lab
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF]"
            >
              Инженерная экспертиза
            </motion.h2>
          </div>
          <Link 
            href="/research" 
            className="group flex items-center gap-2 font-geist text-sm font-bold text-white/40 hover:text-white transition-colors"
          >
            Перейти в лабораторию <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={article.href} className="group block relative p-1 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-[#4633FF]/30 transition-all duration-500">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold text-[#4633FF] uppercase tracking-widest">{article.category}</span>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{article.readTime}</span>
                  </div>
                  <h3 className="font-geist text-xl font-bold text-white mb-4 group-hover:text-[#4633FF] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="font-geist text-sm text-white/40 leading-relaxed mb-8">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">
                    Читать исследование <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Subtle directional light effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700 bg-gradient-to-br from-[#4633FF] to-transparent" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
