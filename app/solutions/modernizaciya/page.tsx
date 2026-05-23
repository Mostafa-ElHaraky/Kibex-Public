"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Zap, AlertTriangle, DollarSign, Lock,
  CheckCircle, X, Check, TrendingUp, Shield,
  Clock, BarChart3, Settings, ArrowRight,
  Database, Server, Globe, Cpu, Layers, Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SolutionPopup from "../../../components/SolutionPopup";
import s from "./modernizaciya.module.css";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (!isInView) return;

    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseFloat(numMatch[0]);
    const suffix = value.replace(numMatch[0], "");
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * easedProgress;
      const formatted = value.includes(".") ? current.toFixed(2) : Math.floor(current).toString();
      setDisplayValue(formatted + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue || "0"}</span>;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${s.faqItem} ${open ? s.faqOpen : ""}`} itemScope itemType="https://schema.org/Question">
      <button className={s.faqButton} onClick={() => setOpen(!open)} itemProp="name">
        <span className={s.faqQuestion}>{q}</span>
        <motion.span className={s.faqIcon} animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer"
          >
            <div className={s.faqAnswer} itemProp="text">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as any } }
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const painPoints = [
  {
    image: "/load_kibex.png",
    title: "Деградация скорости",
    desc: "Сайт тормозит при росте каталога и трафика. Медленная загрузка страниц напрямую снижает конверсию и позиции в поиске.",
  },
  {
    image: "/intigration_error.png",
    title: "Ошибки интеграций",
    desc: "Сложные и нестабильные интеграции с 1С, ERP и CRM работают с задержками, вызывая ошибки в складских остатках и заказах.",
  },
  {
    image: "/expensive.png",
    title: "Дорогая поддержка",
    desc: "Любые доработки устаревшей CMS занимают всё больше времени и увеличивают бюджет. Развитие системы становится невыгодным.",
  },
  {
    image: "/monolith.png",
    title: "Технический предел",
    desc: "Монолитная архитектура и накопленный технический долг ограничивают развитие платформы и внедрение новых e-commerce функций.",
  },
];

const lifecycle = [
  { stage: "Запуск", desc: "Коробочная CMS", status: "stable" },
  { stage: "Рост", desc: "Плагины и модули", status: "growth" },
  { stage: "Предел", desc: "Технический долг", status: "warning" },
  { stage: "Предел масштабирования", desc: "Рост стоимости изменений", status: "critical" },
];

const steps = [
  { n: "01", title: "Технический аудит", desc: "Глубокий анализ архитектуры, выявление узких мест производительности и рисков безопасности." },
  { n: "02", title: "Проектирование", desc: "Создание архитектуры, рассчитанной на рост нагрузки, каталога и количества интеграций." },
  { n: "03", title: "Безопасная миграция", desc: "Перенос данных, истории заказов и пользователей. Главный приоритет — миграция без потери SEO-трафика." },
  { n: "04", title: "API-интеграции", desc: "Синхронизация с 1С, складскими системами и маркетплейсами через надежный и быстрый API-слой." },
  { n: "05", title: "Стабильный запуск", desc: "Плавное переключение на новую систему без остановки продаж и операционных процессов." },
];

const results = [
  { metric: "< 1.2с", title: "Скорость загрузки", desc: "Даже при экстремальных нагрузках и больших каталогах." },
  { metric: "99.99%", title: "Uptime системы", desc: "Гарантированная стабильность работы всей инфраструктуры." },
  { metric: "500k+ SKU", title: "Поддержка крупных каталогов", desc: "Поддержка крупных каталогов без деградации производительности." },
];

const cases = [
  {
    industry: "Промышленный сектор",
    metric: "1.2 сек",
    problem: "Сайт на Bitrix не выдерживал 180 000 товаров и зависал при синхронизации с 1С в пиковые часы.",
    solution: "Архитектурная модернизация с переходом на Kibex и оптимизацией API-обмена.",
    result: "Стабильная работа под нагрузкой и мгновенный поиск по всему каталогу.",
  },
  {
    industry: "Fashion-ритейл",
    metric: "+28%",
    problem: "Медленная работа WordPress и ошибки в корзине приводили к потере до 40% потенциальных заказов.",
    solution: "Перенос интернет-магазина на современный стек с сохранением всех SEO-позиций.",
    result: "Стабильная работа платформы под нагрузкой и рост конверсии после модернизации.",
  },
];

const faqs = [
  {
    q: "Как перенести интернет-магазин с Bitrix без потери данных?",
    a: "Мы выполняем полную миграцию базы данных, включая историю заказов, клиентов, мета-данные и складские остатки. Процесс проходит в фоновом режиме, продажи не останавливаются. Мы гарантируем 100% сохранность информации.",
  },
  {
    q: "Можно ли сохранить SEO-позиции при смене платформы?",
    a: "Да. Это наш приоритет №1. Мы сохраняем структуру URL, настраиваем систему 301-редиректов и переносим все мета-теги. После модернизации сайты обычно растут в поиске благодаря улучшению Core Web Vitals.",
  },
  {
    q: "Почему интернет-магазин начинает терять производительность при росте каталога?",
    a: "Коробочные CMS (такие как WordPress с WooCommerce или базовый Bitrix) имеют архитектурные ограничения в структуре базы данных. При росте каталога свыше 10-20 тысяч SKU количество запросов к БД растет экспоненциально. Мы решаем это переходом на специализированную e-commerce платформу Kibex с оптимизированной схемой хранения и кэшированием.",
  },
  {
    q: "Как модернизировать интернет-магазин без остановки продаж?",
    a: "Новая платформа разрабатывается параллельно с работой текущего сайта. Мы настраиваем синхронизацию данных в реальном времени. В момент запуска происходит мгновенное переключение DNS, которое пользователи не замечают.",
  },
  {
    q: "Почему интеграции с 1С начинают создавать ошибки при росте нагрузки?",
    a: "При увеличении количества заказов и обновлений остатков синхронный обмен данными перегружает базу данных CMS и саму 1С. Мы решаем эту проблему внедрением асинхронной шины данных и оптимизированного API-слоя, гарантирующего стабильный обмен при любых пиковых нагрузках.",
  },
];

const platforms = [
  { name: "Bitrix", desc: "Замена монолитной архитектуры на масштабируемый стек.", image: "/1c-bitrix.png" },
  { name: "WordPress", desc: "Переход с WooCommerce на профессиональное e-commerce решение.", image: "/wordpress.png" },
  { name: "OpenCart", desc: "Устранение ограничений производительности и безопасности.", image: "/opencart.png" },
  { name: "Magento", desc: "Оптимизация сложной enterprise-инфраструктуры и снижение стоимости сопровождения.", image: "/magento.png" },
  { name: "Drupal", desc: "Модернизация устаревших самописных систем.", image: "/drupal.png" },
];

const preserved = [
  "SEO-позиции и трафик", "Структура URL и редиректы",
  "История заказов и клиенты", "Интеграции с 1С и ERP",
  "Мета-теги и контент", "Аналитика и e-commerce события"
];

// ─── PAGE COMPONENT ────────────────────────────────────────────────  ───────────

export default function ModernizaciyaPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  const lifecycleRef = useRef(null);
  const { scrollYProgress: lifeProgress } = useScroll({
    target: lifecycleRef,
    offset: ["start center", "end center"]
  });

  const processRef = useRef(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ["start center", "end center"]
  });

  const scaleLine = useSpring(useTransform(processProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Schema.org Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Модернизация интернет-магазинов",
    "serviceType": "E-commerce Modernization",
    "description": "Модернизация интернет-магазинов и перенос с Bitrix/WordPress на высоконагруженную платформу Kibex без потери SEO и данных.",
    "provider": {
      "@type": "Organization",
      "name": "Kibex"
    },
    "areaServed": "Russia"
  };

  return (
    <div className={s.page}>
      <Header />

      {/* SEO Head implementation (handled via metadata if this was SSR, but here we add scripts) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className={s.hero}>
        {/* Background Image & Gradient overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
          <img
            src="/modernizationgpt.png"
            alt=""
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/90 via-[#0A0A0B]/50 to-[#0A0A0B]/90" />

          {/* Subtle Indigo Glow and Grid Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.06)_0%,transparent_60%)] blur-3xl opacity-70" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(140, 118, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140, 118, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className={s.heroInner}>
          <motion.div
            className={s.heroContent}
            initial="hidden"
            animate="show"
            variants={stagger}
          >

            <motion.h1 className={s.heroTitle} variants={fadeUp}>
              Модернизация интернет-магазинов{" "}
              <span className={s.heroTitleAccent}>
                без риска для бизнеса
              </span>
            </motion.h1>

            <motion.p className={s.heroSubtitle} variants={fadeUp}>
              Перенос интернет-магазина с Bitrix, WordPress и legacy-систем на современную инфраструктуру без потери SEO, данных и стабильности продаж.
            </motion.p>

            <motion.div className={s.heroActions} variants={fadeUp}>
              <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>
                Обсудить модернизацию платформы
              </button>
            </motion.div>

            <motion.div className={s.heroTrustLine} variants={fadeUp}>
              <span className={s.trustBadge}>✓ Сохранение SEO</span>
              <span className={s.trustBadge}>✓ Без потери данных</span>
              <span className={s.trustBadge}>✓ Перенос с Bitrix/WP</span>
            </motion.div>
          </motion.div>

          <motion.div
            className={s.heroVisual}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <div className={s.sceneContainer}>
              <div className={s.sceneNodeOld}>
                <div className={s.nodeLabel}>WORDPRESS</div>
                <motion.div
                  className={s.nodePulseBad}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className={s.sceneFlow}><motion.div className={s.flowParticles} animate={{ x: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} /></div>
              <div className={s.sceneNodeNew}>
                <div className={s.nodeLabel}>KIBEX</div>
                <motion.div className={s.nodePulseGood} animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 4, repeat: Infinity }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className={s.visualPause} />

      {/* ── 2. DIAGNOSIS ───────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <motion.div
            className={s.sectionHeader}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className={s.sectionTag}>Диагностика</span>
            <h2 className={s.sectionTitle}>Когда платформа начинает ограничивать бизнес</h2>
          </motion.div>

          <motion.div className={s.painGrid} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            {painPoints.map((p, i) => (
              <motion.div key={i} className={`group ${s.painCard} ${s[`painCard-${i}`]}`} variants={fadeUp} whileHover={{ y: -4 }}>
                {/* Background Image Covering the Entire Card */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  />
                </div>

                {/* Subtle gradient overlay to ensure high text contrast on the left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/90 via-[#07070a]/50 to-transparent z-5 pointer-events-none" />

                <div className="relative z-10 md:max-w-[65%] flex flex-col justify-center h-full">
                  <h3 className={s.painCardTitle}>{p.title}</h3>
                  <p className={s.painCardDesc}>{p.desc}</p>
                </div>
                <div className={s.painCardBg} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. PLATFORMS (SEO Depth) ────────────────────────────────────────── */}
      <section className={s.section} style={{ background: '#050508' }}>
        <div className={s.sectionInner}>
          <motion.div
            className={s.sectionHeaderCenter}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className={s.sectionTag}>Экспертиза</span>
            <h2 className={s.sectionTitle}>Какие системы мы модернизируем</h2>
            <p className={s.sectionSubtitleCenter}>
              Мы специализируемся на переносе интернет-магазинов с платформ, которые перестали справляться с нагрузкой и требованиями бизнеса.
            </p>
          </motion.div>

          <div className={s.platformGrid}>
            {platforms.map((pl, i) => (
              <motion.div
                key={i}
                className={`group ${s.platformCard}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-[60px] h-[60px] mb-6 flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-2xl p-2.5 overflow-hidden group-hover:border-[#4633ff]/30 transition-all duration-300">
                  <img
                    src={pl.image}
                    alt={pl.name}
                    className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <h3 className={s.platformName}>{pl.name}</h3>
                <p className={s.platformDesc}>{pl.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LIFECYCLE ────────────────────────────────────────────────────── */}
      <section className={s.section} ref={lifecycleRef} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <motion.div className={s.sectionHeaderCenter} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className={s.sectionTag}>Эволюция</span>
            <h2 className={s.sectionTitle}>Жизненный цикл e-commerce систем</h2>
          </motion.div>
          <div className={s.lifecycleContainer}>
            <div className={s.lifecycleLine} />
            <motion.div className={s.lifecycleGrid} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              {lifecycle.map((item, i) => (
                <motion.div key={i} className={`${s.lifecycleStep} ${s[`step-${item.status}`]}`} variants={{ hidden: { opacity: 0.1, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
                  <div className={s.stepCircle} />
                  <h3 className={s.stepName}>{item.stage}</h3>
                  <p className={s.stepDesc}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className={s.lifecycleModernization} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}>
              <div className={s.modBadge}>Переход на Kibex</div>
              <div className={s.modLine} />
              <div className={s.modText}>Стабилизация и новый этап роста бизнеса</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ──────────────────────────────────────────────────────── */}
      <section className={s.section} ref={processRef}>
        <div className={s.sectionInner}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className={s.sectionTag}>Процесс</span>
            <h2 className={s.sectionTitle}>Как проходит перенос интернет-магазина</h2>
          </motion.div>
          <div className={s.processLayout}>
            <div className={s.processLineArea}><div className={s.pLineBase} /><motion.div className={s.pLineActive} style={{ scaleY: scaleLine, originY: 0 }} /></div>
            <div className={s.processSteps}>
              {steps.map((step, i) => (
                <motion.div key={i} className={s.processStep} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}>
                  <div className={s.pStepNum}>{step.n}</div>
                  <div className={s.pStepContent}><h3 className={s.pStepTitle}>{step.title}</h3><p className={s.pStepDesc}>{step.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. RESULTS ──────────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <motion.div className={s.resultsGrid} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            {results.map((r, i) => (
              <motion.div key={i} className={s.resultCard} variants={fadeUp}>
                <span className={s.resultMetric}><Counter value={r.metric} /></span>
                <h3 className={s.resultTitle}>{r.title}</h3>
                <p className={s.resultDesc}>{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className={s.visualPause} />

      {/* ── 7. CASES ────────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className={s.sectionTag}>Опыт</span>
            <h2 className={s.sectionTitle}>Реальный бизнес-эффект</h2>
          </motion.div>
          <div className={s.caseStack}>
            {cases.map((c, i) => (
              <motion.div key={i} className={s.caseCard} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                <div className={s.caseHeader}><span className={s.caseIndustry}>{c.industry}</span><div className={s.caseMainMetric}><Counter value={c.metric} /></div></div>
                <div className={s.caseComparison}>
                  <motion.div className={s.caseCompBlock} whileHover={{ opacity: 0.5 }}><div className={s.compLabel}>До модернизации</div><div className={s.compText}>{c.problem}</div></motion.div>
                  <motion.div className={s.caseCompBlock} initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}><div className={s.compLabel}>После модернизации</div><div className={s.compText}>{c.solution} — {c.result}</div></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SEO SAFETY ───────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <motion.div className={s.sectionHeaderCenter} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className={s.sectionTag}>Безопасность</span>
            <h2 className={s.sectionTitle}>Контролируемая миграция без потери SEO</h2>
            <p className={s.sectionSubtitleCenter}>
              Во время перехода бизнес продолжает работать в штатном режиме. Мы сохраняем все критические данные и позиции в поиске.
            </p>
          </motion.div>
          <motion.div className={s.safetyGrid} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <div className={s.safetyColumn}>
              {preserved.slice(0, 3).map((p, i) => (
                <motion.div key={i} className={s.safetyItem} variants={fadeUp}><Check size={16} /> {p}</motion.div>
              ))}
            </div>
            <div className={s.safetyColumn}>
              {preserved.slice(3).map((p, i) => (
                <motion.div key={i} className={s.safetyItem} variants={fadeUp}><Check size={16} /> {p}</motion.div>
              ))}
            </div>
          </motion.div>
          <div className={s.internalLinks}>
            <Link href="/solutions/security" className={s.seoLink}>Аудит безопасности платформы <LinkIcon size={14} /></Link>
            <Link href="/solutions/integrations" className={s.seoLink}>Интеграции с 1С и ERP <LinkIcon size={14} /></Link>
            <Link href="/solutions/highload" className={s.seoLink}>Высоконагруженные интернет-магазины <LinkIcon size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── 9. TECHNOLOGY ───────────────────────────────────────────────────── */}
      <section className={s.techSection}>
        <div className={s.sectionInner}>
          <motion.div className={s.techIntro} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className={s.techTitle}>Технологическая основа Kibex</h2>
            <p className={s.techSubtitle}>Инфраструктура для бизнеса, который растет без ограничений Bitrix и WordPress.</p>
          </motion.div>
        </div>
        <div className={s.techMarquee}>
          <motion.div className={s.marqueeTrack} animate={{ x: ["0%", "-50%"] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            {["Next.js", "TypeScript", "Go", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "RabbitMQ", "GraphQL", "Elasticsearch", "S3", "gRPC", "NestJS"].map((t, i) => (
              <div key={i} className={s.marqueeItem}>{t}</div>
            ))}
            {["Next.js", "TypeScript", "Go", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "RabbitMQ", "GraphQL", "Elasticsearch", "S3", "gRPC", "NestJS"].map((t, i) => (
              <div key={`dup-${i}`} className={s.marqueeItem}>{t}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 10. FAQ ─────────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <motion.div className={s.sectionHeaderCenter} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} itemScope itemType="https://schema.org/FAQPage">
            <span className={s.sectionTag}>Вопросы</span>
            <h2 className={s.sectionTitle}>Ответы экспертов по модернизации</h2>
          </motion.div>
          <div className={s.faqList}>
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ───────────────────────────────────────────────────── */}
      <section className={s.finalCta}>
        <div className={s.sectionInner}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 className={s.ctaLargeTitle} variants={fadeUp}>Платформа не должна ограничивать рост бизнеса</motion.h2>
            <motion.p className={s.ctaLargeSubtitle} variants={fadeUp}>Получите бесплатную экспертную оценку вашей текущей платформы и план безопасного переноса.</motion.p>
            <motion.button className={s.ctaButton} onClick={() => setPopupOpen(true)} variants={fadeUp}>Получить архитектурную оценку</motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <SolutionPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
