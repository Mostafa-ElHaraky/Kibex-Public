"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Что такое ERP система?",
    a: "ERP (Enterprise Resource Planning) — это единая цифровая инфраструктура для управления всеми ресурсами и процессами компании. Мы разрабатываем кастомные ERP, которые объединяют склад, логистику, финансы и продажи в реальном времени, обеспечивая полный контроль над бизнесом без ограничений коробочных решений."
  },
  {
    q: "Когда WordPress перестает справляться?",
    a: "WordPress и WooCommerce достигают предела при росте каталога свыше 30 000 SKU или при нагрузке более 1500 одновременных сессий. Монолитная архитектура и синхронные процессы начинают замедлять сайт. В таких случаях мы переводим проект на масштабируемый стек с API-first архитектурой."
  },
  {
    q: "Что такое highload архитектура?",
    a: "Highload — это проектирование систем, способных стабильно работать под экстремальными нагрузками. Мы строим архитектуры на Go и Python с использованием микросервисов, распределенных БД и очередей сообщений, что гарантирует отклик менее 50мс и доступность 99.99% даже в пиковые распродажи."
  },
  {
    q: "Можно ли интегрировать 1С?",
    a: "Да, бесшовная интеграция с 1С (УТ, ERP, УНФ) — наш стандарт. Мы настраиваем двусторонний обмен данными о товарах, ценах, остатках и заказах через RabbitMQ или напрямую через API, обеспечивая актуальность информации в режиме реального времени."
  },
  {
    q: "Кто владеет кодом?",
    a: "Полный доступ к исходному коду и исключительные права интеллектуальной собственности передаются заказчику. Мы обеспечиваем технологический суверенитет вашего бизнеса: система работает автономно на ваших серверах, без привязки к подпискам или сторонним сервисам."
  },
  {
    q: "Можно ли модернизировать Bitrix?",
    a: "Да. Если Bitrix стал «узким местом» и перестал выдерживать нагрузку, мы проводим декомпозицию системы. Мы можем вынести тяжелые процессы (поиск, каталог, корзину) в отдельные высокопроизводительные сервисы, сохранив привычный бэк-офис."
  },
  {
    q: "Что такое API-first архитектура?",
    a: "Это современный стандарт разработки, где бизнес-логика полностью отделена от интерфейса. Это позволяет подключать к единому ядру системы любые фронтенды: сайт, мобильное приложение, POS-терминалы или партнерские маркетплейсы через стабильный API."
  },
  {
    q: "Как обеспечивается безопасность платформы?",
    a: "Мы реализуем концепцию Security-by-Design. Безопасность закладывается на уровне архитектуры: изоляция сервисов, аудит кода на уязвимости OWASP Top 10, шифрование данных и защита от DDoS-атак на сетевом уровне. Платформа проходит стресс-тестирование перед запуском."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0A0A0B] py-32 border-t border-white/5">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-geist text-sm font-bold uppercase tracking-[0.2em] text-[#4633FF] mb-6"
          >
            Вопросы и ответы
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF]"
          >
            Экспертиза в деталях
          </motion.h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/5 last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`font-geist text-lg md:text-xl font-bold transition-colors ${openIndex === i ? "text-[#4633FF]" : "text-white/80 group-hover:text-white"}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 ml-4 p-2 rounded-full border border-white/10 transition-all ${openIndex === i ? "bg-[#4633FF] border-[#4633FF] rotate-180" : "bg-white/5 group-hover:bg-white/10"}`}>
                  {openIndex === i ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white/40" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 font-geist text-base md:text-lg text-white/50 leading-relaxed max-w-3xl">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
