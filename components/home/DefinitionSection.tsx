"use client";

import { motion } from "framer-motion";

const definitions = [
  {
    title: "Что такое цифровая инфраструктура?",
    text: "Это комплексный фундамент из серверов, баз данных, API-интерфейсов и бизнес-логики, который обеспечивает бесперебойную работу предприятия. В отличие от простых сайтов, цифровая инфраструктура Kibex проектируется как отказоустойчивая инженерная система, способная масштабироваться вместе с ростом бизнеса."
  },
  {
    title: "Что такое ERP система нового поколения?",
    text: "ERP (Enterprise Resource Planning) — это не просто программа, а ядро управления ресурсами. Мы разрабатываем Unified ERP Core — системы с API-first архитектурой, которые объединяют склад (WMS), логистику (TMS), финансы и B2B-продажи в единый поток данных без рассинхронизации."
  },
  {
    title: "Что такое highload в e-commerce?",
    text: "Highload (высокая нагрузка) в электронной коммерции — это способность платформы обрабатывать 100k+ SKU и тысячи транзакций в секунду. Наши решения используют Go, микросервисы и распределенные базы данных, что исключает падение сайта в периоды пиковых распродаж и маркетинговых акций."
  },
  {
    title: "Зачем нужна модернизация платформы?",
    text: "Модернизация (Legacy Transformation) необходима, когда старый стек (например, Bitrix или WordPress) становится узким местом для бизнеса. Мы переводим системы на современные архитектурные паттерны, сохраняя накопленные данные и обеспечивая технологический суверенитет компании."
  }
];

export default function DefinitionSection() {
  return (
    <section className="bg-[#0A0A0B] py-32 lg:py-48 overflow-hidden border-t border-white/5 relative">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.02)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 lg:gap-y-24">
          {definitions.map((def, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6"
            >
              <h2 className="font-geist text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#FFFFFF] border-l-4 border-[#4633FF] pl-6 tracking-tight leading-[1.25]">
                {def.title}
              </h2>
              <p className="font-geist text-base md:text-lg lg:text-[20px] text-white/55 leading-relaxed font-normal pl-7">
                {def.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
