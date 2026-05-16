"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, X, ChevronDown, ShieldCheck, BarChart3, Boxes, Database, Cloud, Workflow, Zap, Code2, Globe } from "lucide-react";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleVisual = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityVisual = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0B] pt-20"
    >
      {/* Main Background Image (Minimized Further) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/handled_Ui Design_1080_1920_80.jpg"
          alt="Infrastructure Background"
          className="relative right-[65px] w-full h-full object-cover opacity-[0.1] scale-69"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
      </div>

      {/* Parallax Engineering Overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </motion.div>

      {/* Floating Depth Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${(i * 7.7) % 100}%`,
              top: `${(i * 13.3) % 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 10 + (i % 10),
              repeat: Infinity,
              delay: i % 5
            }}
          />
        ))}
      </div>

      <div className="relative left-[300px] z-10 mx-auto w-full max-w-10xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Content */}
        <motion.div style={{ y: yContent }} className="flex flex-col">

          <h1 className="font-geist text-5xl md:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1]">
            {["РАЗРАБАТЫВАЕМ", "ЦИФРОВЫЕ", "ПЛАТФОРМЫ,", "КОТОРЫЕ НЕ ОГРАНИЧИВАЮТ", "РОСТ БИЗНЕСА"].map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 font-geist text-lg text-[#FFFFFF]/60 max-w-xl leading-relaxed"
          >
            КиБекс проектирует e-commerce платформы, ERP системы и highload инфраструктуру для компаний, которым важны масштабируемость, стабильность, интеграции и контроль над развитием бизнеса.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-br from-[#4633FF] to-[#2A1E99] text-white px-9 py-4.5 rounded-[18px] font-geist font-bold transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_rgba(70,51,255,0.2)] hover:shadow-[0_0_35px_rgba(70,51,255,0.45)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Получить оценку проекта
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/solutions"
              className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-geist font-bold transition-all"
            >
              Изучить решения
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ scale: scaleVisual, opacity: opacityVisual }}
          className="relative flex flex-col items-center justify-center pt-8"
        >
          <div className="relative right-[90px] top-[20px] w-full aspect-square h-[450px] md:h-[600px] lg:h-[660px] flex items-center justify-center">
            <InfrastructureMap />
          </div>

          <div className="absolute bottom-[-60px] lg:bottom-[-100px] w-full max-w-[650px] px-4 z-20">
            <LiveOpsPanel />
          </div>
        </motion.div>
      </div>

      {/* Premium Enterprise Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setTimeout(() => setIsSubmitted(false), 500);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[860px] max-h-[90vh] overflow-y-auto bg-[#0D0D0E]/95 border border-[#4633FF]/20 rounded-[28px] backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] scrollbar-hide"
            >
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTimeout(() => setIsSubmitted(false), 500);
                }}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12">
                {!isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col"
                  >
                    {/* Header */}
                    <div className="mb-10">
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#4633FF] uppercase mb-3 block">
                        АРХИТЕКТУРНАЯ КОНСУЛЬТАЦИЯ
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        Получите оценку цифровой платформы
                      </h2>
                      <p className="text-[#FFFFFF]/60 text-base md:text-lg leading-relaxed max-w-2xl">
                        Мы изучим текущую инфраструктуру, интеграции и бизнес-процессы, чтобы определить ограничения роста, архитектурные риски и возможности масштабирования.
                      </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-8 mb-12 py-6 border-y border-white/5">
                      {[
                        { text: "Конфиденциально", icon: ShieldCheck },
                        { text: "Ответ в течение 24 часов", icon: Check },
                        { text: "Без обязательств", icon: Check },
                        { text: "Архитектурный подход", icon: Check }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[13px] text-white/70">
                          <item.icon className="w-4 h-4 text-[#4633FF]" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);

                        // Honeypot check
                        if (formData.get("_hp_field")) return;

                        // Rate limiting (1 minute cooldown)
                        const now = Date.now();
                        if (now - lastSubmitTime < 60000) {
                          alert("Пожалуйста, подождите минуту перед повторной отправкой.");
                          return;
                        }

                        setIsSubmitting(true);

                        // Mocking an enterprise POST request with sanitization
                        await new Promise(resolve => setTimeout(resolve, 1500));

                        setIsSubmitting(false);
                        setIsSubmitted(true);
                        setLastSubmitTime(Date.now());
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {/* Honeypot Field (Hidden from users) */}
                      <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1">Имя</label>
                        <input
                          type="text"
                          name="name"
                          required
                          pattern="^[A-Za-zА-Яа-я\s]{2,50}$"
                          placeholder="Ваше имя"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1">Компания</label>
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="Название компании"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1">Телефон</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          pattern="^[\d\s\+\-\(\)]{10,20}$"
                          placeholder="+7 (999) 999-99-99"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="your@company.ru"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1">Тип проекта</label>
                        <div className="relative">
                          <select
                            name="projectType"
                            required
                            defaultValue=""
                            className="w-full appearance-none bg-[#0D0D0E] border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#4633FF]/50 focus:bg-[#151517] transition-all cursor-pointer"
                          >
                            <option value="" disabled className="bg-[#0D0D0E]">Выберите тип проекта</option>
                            <option value="ecommerce" className="bg-[#0D0D0E]">E-commerce платформа</option>
                            <option value="erp" className="bg-[#0D0D0E]">ERP система</option>
                            <option value="highload" className="bg-[#0D0D0E]">Highload инфраструктура</option>
                            <option value="modernization" className="bg-[#0D0D0E]">Модернизация WordPress / Bitrix</option>
                            <option value="integration" className="bg-[#0D0D0E]">Интеграции и API</option>
                            <option value="security" className="bg-[#0D0D0E]">Кибербезопасность</option>
                            <option value="other" className="bg-[#0D0D0E]">Другое</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1">Текущее состояние системы</label>
                        <textarea
                          name="description"
                          placeholder="Кратко опишите текущую платформу, задачи или ограничения"
                          maxLength={1000}
                          rows={4}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4633FF]/50 focus:bg-white/[0.05] transition-all resize-none"
                        />
                      </div>

                      <div className="md:col-span-2 mt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full group relative flex items-center justify-center gap-2 bg-gradient-to-br from-[#4633FF] to-[#2A1E99] text-white px-8 py-5 rounded-[18px] font-geist font-bold transition-all duration-[350ms] shadow-[0_10px_30px_rgba(70,51,255,0.2)] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_15px_40px_rgba(70,51,255,0.4)] hover:-translate-y-1 active:scale-[0.98]'}`}
                        >
                          {isSubmitting ? "Отправка..." : "Получить консультацию"}
                          {!isSubmitting && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                        </button>
                        <p className="text-center mt-6 text-[11px] text-white/30 uppercase tracking-widest font-medium">
                          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="relative mb-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-[#4633FF] rounded-full blur-2xl"
                      />
                      <div className="relative w-20 h-20 bg-[#0D0D0E] border border-[#4633FF]/40 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(70,51,255,0.2)]">
                        <Check className="w-10 h-10 text-[#4633FF]" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Запрос отправлен</h3>
                    <p className="text-[#FFFFFF]/60 text-lg max-w-sm">
                      Мы свяжемся с вами в течение 24 часов для первичной архитектурной консультации.
                    </p>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setTimeout(() => setIsSubmitted(false), 500);
                      }}
                      className="mt-10 text-white/40 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest"
                    >
                      Закрыть окно
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── INFRASTRUCTURE VISUALIZATION COMPONENT ────────────────────────────────


// ─── HIGH-FIDELITY INFRASTRUCTURE ASSETS ───────────────────────────────────

const INFRA_NODES = [
  { id: "analytics", label: "АНАЛИТИКА", icon: BarChart3, angle: -90, radius: 58 },
  { id: "erp", label: "ERP", icon: Boxes, angle: -50, radius: 58 },
  { id: "db", label: "БД", icon: Database, angle: -10, radius: 58 },
  { id: "security", label: "БЕЗОПАСНОСТЬ", icon: ShieldCheck, angle: 30, radius: 58 },
  { id: "cdn", label: "CDN", icon: Cloud, angle: 70, radius: 58 },
  { id: "queue", label: "ОЧЕРЕДЬ", icon: Workflow, angle: 110, radius: 58 },
  { id: "cache", label: "КЕШ", icon: Zap, angle: 150, radius: 58 },
  { id: "api", label: "API", icon: Code2, angle: 190, radius: 58 },
  { id: "site", label: "САЙТЫ", icon: Globe, angle: 230, radius: 58 },
];
function InfrastructureMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cinematic Orbital System
  const ORBITAL_SYSTEM = [18, 24, 32, 40, 48, 56];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible select-none">
      {/* Background System Architecture - Cinematic Space Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cinematic Drifting Engineering Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Deep Radial Volumetric Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(70,51,255,0.2)_0%,transparent_70%)]" />

        {/* Multi-Layered Depth Particles (Cinematic Drift) */}
        {mounted && Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: `${0.8 + (i % 3) * 0.4}px`,
              height: `${0.8 + (i % 3) * 0.4}px`,
              left: `${(i * 9.7) % 100}%`,
              top: `${(i * 17.3) % 100}%`
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0]
            }}
            transition={{
              duration: 6 + (i % 10),
              repeat: Infinity,
              delay: (i * 0.5) % 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Cinematic UI Group with Subtle Parallax Drift */}
      <motion.div
        className="relative w-full h-full bottom-[60px] right-[300px] overflow-visible"
        animate={{ y: [0, -4, 0], rotate: [0, 0.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible z-10 scale-[1.5]">
          <defs>
            {/* High-Fidelity Cinematic Bloom Filter */}
            <filter id="ultra-bloom" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feGaussianBlur stdDeviation="6" result="blur3" />
              <feColorMatrix in="blur1" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" result="glow1" />
              <feColorMatrix in="blur2" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0" result="glow2" />
              <feColorMatrix in="blur3" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0" result="glow3" />
              <feMerge>
                <feMergeNode in="glow3" />
                <feMergeNode in="glow2" />
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="energy-ripple-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* LAYER 1: Core Energy Waves (Ripples) */}
          {mounted && [0, 1, 2].map((w) => (
            <motion.circle
              key={w}
              cx="80" cy="80"
              fill="none"
              stroke="#4633FF"
              strokeWidth="0.15"
              initial={{ r: 14, opacity: 0 }}
              animate={{
                r: [14, 60],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: w * 1.3,
                ease: "easeOut"
              }}
              style={{ filter: "url(#energy-ripple-glow)" }}
            />
          ))}

          {/* LAYER 2: Radiating Orbital Tracks (Ultra Smooth) */}
          <g opacity="0.2">
            {ORBITAL_SYSTEM.map((r, i) => (
              <g key={i}>
                <motion.circle
                  cx="80" cy="80" r={r}
                  fill="none"
                  stroke={i % 2 === 0 ? "#4633FF" : "white"}
                  strokeWidth="0.1"
                  strokeDasharray={`${r * 0.2} ${r * 0.4}`}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    opacity: [0.1, 0.25, 0.1]
                  }}
                  transition={{
                    rotate: { duration: 80 + i * 30, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </g>
            ))}
          </g>

          {/* LAYER 3: Technical Conduits & Energy Pulses */}
          {INFRA_NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = 80 + Math.cos(rad) * node.radius;
            const ny = 80 + Math.sin(rad) * node.radius;
            const pathD = `M 80 80 L ${nx} ${ny}`;
            const isHovered = hoveredNode === node.id;

            return (
              <g key={node.id}>
                {/* Main Structural Line */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#4633FF"
                  strokeWidth="0.3"
                  animate={isHovered ? { strokeOpacity: 0.9, strokeWidth: 0.45 } : { strokeOpacity: 0.4, strokeWidth: 0.3 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Energy Pulse (Electric Wave) */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="white"
                  strokeWidth="0.6"
                  strokeOpacity="0.8"
                  strokeDasharray="0.5 40"
                  animate={{ strokeDashoffset: -120 }}
                  transition={{
                    duration: 1.8 + (i % 2),
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2
                  }}
                  style={{ filter: "url(#ultra-bloom)" }}
                />

                {/* Branching Power Lines (Wrapping) */}
                {mounted && [0].map(b => (
                  <motion.path
                    key={b}
                    d={pathD}
                    fill="none"
                    stroke="#4633FF"
                    strokeWidth="0.12"
                    strokeOpacity="0.3"
                    animate={{
                      pathLength: [0, 0.8, 0],
                      pathOffset: [0, 0.5, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 3 + (i % 2),
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "linear"
                    }}
                    style={{
                      transform: `translate(${Math.cos(rad + Math.PI / 2) * 0.8}, ${Math.sin(rad + Math.PI / 2) * 0.8})`,
                      filter: "url(#energy-ripple-glow)"
                    }}
                  />
                ))}
              </g>
            );
          })}

          {/* LAYER 4: SYSTEM CORE (Kinetic Nucleus) */}
          <motion.g
            className="cursor-pointer"
            onHoverStart={() => setHoveredNode("core")}
            onHoverEnd={() => setHoveredNode(null)}
          >
            {/* Atmosphere Rings */}
            {[16, 20, 24].map((r, i) => (
              <motion.circle
                key={i}
                cx="80" cy="80" r={r}
                fill="none"
                stroke={i === 1 ? "#4633FF" : "white"}
                strokeWidth="0.08"
                strokeOpacity={i === 1 ? 0.3 : 0.05}
                strokeDasharray={i === 2 ? "1 10" : "none"}
                animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 40 + i * 20, repeat: Infinity, ease: "linear" }}
              />
            ))}

            {/* Central Core Body */}
            <circle cx="80" cy="80" r="14" fill="#0A0A0B" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <motion.circle
              cx="80" cy="80" r="12"
              fill="rgba(70, 51, 255, 0.18)"
              stroke="#4633FF"
              strokeWidth="0.8"
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.7, 1, 0.7],
                filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "url(#ultra-bloom)" }}
            />
            <text x="80" y="81.5" textAnchor="middle" fontSize="3" fill="white" fontWeight="700" letterSpacing="0.05em" className="font-geist" style={{ opacity: 0.8 }}>КИБЕКС</text>
          </motion.g>

          {/* LAYER 5: OPERATIONAL NODES (Floating & Breathing) */}
          {INFRA_NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = 80 + Math.cos(rad) * node.radius;
            const y = 80 + Math.sin(rad) * node.radius;
            const isHovered = hoveredNode === node.id;

            return (
              <motion.g
                key={node.id}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                className="cursor-pointer"
                animate={{
                  y: [0, -1.5, 0],
                  x: [0, (i % 2 === 0 ? 0.5 : -0.5), 0]
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              >
                {/* Node Housing (Clean & Borderless) */}
                <circle cx={x} cy={y} r="7.5" fill="rgba(255, 255, 255, 0.05)" stroke="none" />
                <motion.circle
                  cx={x} cy={y} r={isHovered ? 8.5 : 7.5}
                  fill="none"
                  stroke={isHovered ? "white" : "none"}
                  strokeWidth={isHovered ? 1.2 : 0}
                  animate={isHovered ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] } : { opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "url(#energy-ripple-glow)" }}
                />

                {/* Infrastructure Icon */}
                <foreignObject x={x - 10} y={y - 10} width="20" height="20" className="overflow-visible">
                  <motion.div
                    className={`flex items-center justify-center w-full h-full transition-all duration-500 ${isHovered ? 'text-white' : 'text-white/70'}`}
                    animate={{ y: isHovered ? [0, -1, 0] : 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <node.icon size={6} strokeWidth={isHovered ? 1.5 : 1.2} />
                  </motion.div>
                </foreignObject>

                <text
                  x={x}
                  y={y + 16}
                  textAnchor="middle"
                  fill={isHovered ? "white" : "rgba(255, 255, 255, 0.45)"}
                  fontSize="2.4"
                  fontWeight="700"
                  className="font-geist"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

// ─── PREMIUM ENTERPRISE DASHBOARD PANEL ────────────────────────────────────

function LiveOpsPanel() {
  const [metrics, setMetrics] = useState({
    rps: 12849,
    latency: 12,
    uptime: 99.99,
    errors: 0.01,
    rpsDelta: 18.2,
    latDelta: -8.4,
    uptDelta: 0.01,
    errDelta: -0.02
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        rps: prev.rps + Math.floor((Math.sin(Date.now() / 1500) * 8) + 4),
        latency: Math.max(10, prev.latency + (Math.cos(Date.now() / 1500) * 0.15)),
        rpsDelta: prev.rpsDelta + (Math.sin(Date.now() / 2500) * 0.03),
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-[1px] rounded-[24px] overflow-hidden"
    >
    </motion.div>
  );
}
