"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: "01",
    title: "Модернизация платформ",
    description: "Бесшовный переход с WordPress, Bitrix и legacy-систем на современную API-first архитектуру без потери данных и SEO.",
    useCase: "Для компаний с растущим трафиком"
  },
  {
    id: "02",
    title: "Разработка ERP систем",
    description: "Проектирование единого цифрового ядра для управления складами, логистикой, финансами и продажами в реальном времени.",
    useCase: "Для автоматизации бизнес-процессов"
  },
  {
    id: "03",
    title: "Highload архитектура",
    description: "Создание отказоустойчивых систем, рассчитанных на миллионы SKU и тысячи одновременных заказов.",
    useCase: "Для масштабируемых e-commerce систем"
  },
  {
    id: "04",
    title: "Разработка e-commerce платформ",
    description: "Кастомные интернет-платформы на базе Kibex Core с гибкой бизнес-логикой и глубокими интеграциями.",
    useCase: "Для крупных ритейл-проектов"
  },
  {
    id: "05",
    title: "Кибербезопасность",
    description: "Встроенная защита на уровне архитектуры: аудит кода, защита от атак и соответствие стандартам безопасности.",
    useCase: "Для защиты корпоративных данных"
  }
];

export default function SolutionsSection() {
  return (
    <section className="bg-[#0A0A0B] py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF]"
          >
            Инженерные решения Kibex
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-geist text-xl text-[#FFFFFF]/60 leading-relaxed"
          >
            Каждая система проектируется под нагрузку, бизнес-логику и долгосрочное развитие.
          </motion.p>
        </div>

        <div className="flex flex-col gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {solutions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 bg-[#0A0A0B] hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="flex items-start gap-8 max-w-2xl">
                <span className="font-geist text-sm font-bold text-[#4633FF]/40 mt-1">
                  {item.id}
                </span>
                <div>
                  <h3 className="font-geist text-2xl md:text-3xl font-bold text-[#FFFFFF] group-hover:text-[#4633FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-geist text-lg text-[#FFFFFF]/50 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4633FF]/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4633FF]" />
                    {item.useCase}
                  </div>
                </div>
              </div>
              
              <Link 
                href={`/solutions/${item.id}`} 
                className="mt-8 md:mt-0 flex items-center gap-2 text-sm font-bold text-[#FFFFFF]/30 group-hover:text-[#FFFFFF] transition-all"
              >
                Подробнее 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              {/* Engineering Grid Reaction */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: `linear-gradient(#4633FF 1px, transparent 1px), linear-gradient(90deg, #4633FF 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
