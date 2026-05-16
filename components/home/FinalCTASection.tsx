"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Settings } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="bg-[#0A0A0B] py-32 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4633FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-geist text-4xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1]">
            Инфраструктура не должна ограничивать рост бизнеса
          </h2>
          <p className="mt-8 font-geist text-xl text-[#FFFFFF]/60 max-w-2xl mx-auto leading-relaxed">
            Получите архитектурную оценку текущей платформы или план разработки новой цифровой системы.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link 
              href="/kontakty"
              className="group relative flex items-center justify-center gap-3 bg-[#4633FF] hover:bg-[#3d2ce0] text-white px-10 py-5 rounded-2xl font-geist font-bold transition-all shadow-[0_0_40px_rgba(70,51,255,0.2)] hover:shadow-[0_0_50px_rgba(70,51,255,0.4)]"
            >
              Обсудить архитектуру
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/audit"
              className="group flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-geist font-bold transition-all"
            >
              Запросить технический аудит
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6">
            {[
              { icon: ShieldCheck, text: "Конфиденциально" },
              { icon: Settings, text: "Архитектурный подход" },
              { icon: Clock, text: "Ответ в течение 24 часов" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/30">
                <item.icon className="w-4 h-4 text-[#4633FF]" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
