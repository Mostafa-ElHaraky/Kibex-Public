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
    <section className="bg-[#0A0A0B] py-24 border-t border-white/5">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {definitions.map((def, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              <h2 className="font-geist text-xl font-bold text-[#FFFFFF] border-l-2 border-[#4633FF] pl-4">
                {def.title}
              </h2>
              <p className="font-geist text-sm text-[#FFFFFF]/50 leading-relaxed">
                {def.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
