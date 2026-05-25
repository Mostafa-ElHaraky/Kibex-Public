"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Zap, ArrowRight, Shield, Database, 
  Cpu, Layers, Globe, Server, Check, X,
  Rocket, TrendingUp, BarChart3, Settings,
  Code2, Users, Layout, Smartphone, Lock, 
  Activity, Terminal, Network, Link as LinkIcon,
  AlertCircle, DollarSign, TrendingDown, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PlatformDiagnosticPopup from "./PlatformDiagnosticPopup";
import s from "./platformy.module.css";

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
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer"
          >
            <div className={s.faqAnswer} itemProp="text">
              {a}
              <div className={s.engNote}>// Примечание инженера: архитектурное решение проектируется индивидуально под бизнес-логику проекта.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const InfraScene = () => {
  const nodes = useMemo(() => [
    { icon: Database, angle: 0, dist: 220, label: "DATA" },
    { icon: Cpu, angle: 72, dist: 240, label: "LOGIC" },
    { icon: Globe, angle: 144, dist: 200, label: "API" },
    { icon: Shield, angle: 216, dist: 250, label: "SECURITY" },
    { icon: Layers, angle: 288, dist: 230, label: "INFRA" },
  ], []);

  return (
    <div className={s.sceneContainer}>
      <motion.div className={s.infraCore} animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
        <div className={s.coreLabel}>KIBEX<br/>INFRA</div>
        <div className={s.coreRing} />
        <div className={s.coreRing} style={{ animationDelay: "2s" }} />
      </motion.div>
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle * Math.PI / 180) * node.dist;
        const y = Math.sin(node.angle * Math.PI / 180) * node.dist;
        return (
          <motion.div key={i} className={s.infraNode} initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: 1, x, y, rotate: [0, 360] }} transition={{ opacity: { duration: 1, delay: i * 0.2 }, x: { duration: 2, delay: i * 0.2, type: "spring" }, y: { duration: 2, delay: i * 0.2, type: "spring" }, rotate: { duration: 100, repeat: Infinity, ease: "linear" } }}>
            <node.icon size={24} />
            <motion.div className={s.infraRoute} style={{ width: node.dist, left: "50%", top: "50%", rotate: `${node.angle + 180}deg` }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1 + i * 0.1, duration: 1.5 }} />
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const businessPains = [
  { icon: TrendingDown, title: "Упущенные продажи", desc: "Сайт тормозит при пиковых нагрузках, клиенты уходят к конкурентам из-за медленной загрузки каталога." },
  { icon: AlertCircle, title: "Ошибки интеграций", desc: "Нестабильный обмен данными с 1С и ERP приводит к неверным остаткам и сорванным заказам." },
  { icon: DollarSign, title: "Дорогая эксплуатация", desc: "Технические ограничения WordPress и Bitrix требуют всё больших бюджетов на доработки и поддержку." },
  { icon: ShieldCheck, title: "Риски безопасности", desc: "Устаревшие CMS становятся уязвимыми для атак, угрожая потерей данных клиентов и репутации." },
];

const whatWeBuild = [
  { icon: Smartphone, title: "Интернет-магазины", desc: "Разработка e-commerce платформ для крупных брендов с высокими требованиями к скорости." },
  { icon: Layout, title: "B2B платформы", desc: "Создание систем автоматизации оптовых продаж и дистрибуции с интеграцией ERP." },
  { icon: Globe, title: "Маркетплейсы", desc: "Масштабируемые площадки для тысяч продавцов и миллионов товаров (SKU)." },
  { icon: Database, title: "Нагруженные каталоги", desc: "Архитектура для мгновенного поиска и фильтрации товаров в реальном времени." },
  { icon: Users, title: "Личные кабинеты", desc: "Персонализированные порталы для клиентов с интеграцией программ лояльности." },
  { icon: Layers, title: "Инфраструктурные ядра", desc: "Центральные шины данных (ESB) для управления всей экосистемой бизнеса." },
];

const archLayers = [
  { n: "01", label: "Frontend Layer", title: "Next.js · React · TypeScript", metric: "LCP < 1.0c" },
  { n: "02", label: "Logic Layer", title: "Node.js · Go · Microservices", metric: "5k+ ops/sec" },
  { n: "03", label: "Integration Layer", title: "API-first · 1C · ERP · CRM", metric: "Real-time sync" },
  { n: "04", label: "Security Layer", title: "OWASP · Hardening · Encryption", metric: "Tier-4 Protection" },
];

const timelineSteps = [
  { n: "01", title: "Бизнес-аналитика", dur: "2–3 недели", out: "Архитектурная карта", desc: "Изучение бизнес-процессов, выявление проблем масштабирования и проектирование логики." },
  { n: "02", title: "Проектирование ядра", dur: "3–4 недели", out: "Техническое задание", desc: "Создание фундамента платформы, готовой к десятикратному росту нагрузок и каталога." },
  { n: "03", title: "Системная разработка", dur: "12–20 недель", out: "Рабочая платформа", desc: "Итеративная реализация компонентов e-commerce платформы с проверкой качества." },
  { n: "04", title: "Интеграции и API", dur: "4–6 недель", out: "Связанная среда", desc: "Синхронизация с 1С, ERP и CRM через надежный и быстрый интеграционный слой." },
  { n: "05", title: "Тестирование и Запуск", dur: "2 недели", out: "Защищенная система", desc: "Аудит безопасности, нагрузочные тесты и контролируемый старт платформы." },
];

const outcomes = [
  { val: "< 1.2с", title: "Мгновенная работа", desc: "Стабильная скорость загрузки каталога даже при 500k+ товаров.", size: "cardLarge" },
  { val: "99.99%", title: "Надёжность", desc: "Uptime инфраструктуры корпоративного уровня для крупных ритейлеров.", size: "cardMedium" },
  { val: "500k+", title: "Масштабируемость", desc: "Готовность к нелинейному росту SKU без потери производительности.", size: "cardMetric" },
  { val: "API-first", title: "Гибкая логика", desc: "Легкое подключение маркетплейсов и внешних сервисов через API.", size: "cardMedium" },
  { val: "100%", title: "Владение", desc: "Полный контроль над кодом, данными и инфраструктурой без вендоров.", size: "cardMedium" },
];

const faqs = [
  { q: "Сколько стоит разработка e-commerce платформы?", a: "Стоимость разработки кастомной платформы начинается от 2.5 млн рублей. Точная оценка формируется после аудита бизнес-процессов и проектирования архитектуры. Мы оцениваем не часы, а сложность системы и интеграций." },
  { q: "Чем кастомная платформа отличается от типовой CMS?", a: "CMS (Bitrix, WordPress) ограничены своей архитектурой. При росте каталога и нагрузки они тормозят. Кастомная платформа Kibex проектируется специально под ваш бизнес, обеспечивая мгновенную скорость и безграничное масштабирование." },
  { q: "Можно ли сохранить SEO при переезде на новую платформу?", a: "Да. Мы сохраняем структуру URL, настраиваем 301-редиректы и переносим все мета-данные. Благодаря улучшению Core Web Vitals сайты обычно растут в поиске после модернизации." },
  { q: "Как масштабировать интернет-магазин до 1 млн товаров?", a: "Для таких нагрузок мы используем микросервисную архитектуру и распределенные базы данных. Это позволяет системе работать стабильно независимо от объёма каталога." },
  { q: "Кто владеет кодом и системой после запуска?", a: "Все права на интеллектуальную собственность, код и данные полностью передаются вам. Вы не зависите от нас и можете развивать систему самостоятельно." },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as any } } };

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function RazrabotkaPlatformyPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const timelineRef = useRef(null);
  const { scrollYProgress: timeScroll } = useScroll({ target: timelineRef, offset: ["start center", "end end"] });
  const timeProgress = useSpring(timeScroll, { stiffness: 100, damping: 30 });
  const blueprintRef = useRef(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Разработка e-commerce платформ",
    "serviceType": "E-commerce Platform Development",
    "description": "Профессиональная разработка интернет-магазинов и масштабируемых e-commerce платформ на заказ. Высоконагруженные системы, интеграция с 1С и архитектура без ограничений.",
    "provider": { "@type": "Organization", "name": "Kibex" },
    "areaServed": "Russia"
  };

  return (
    <div className={s.page}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── 1. HERO (SEO H1) ────────────────────────────────────────────────── */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden><div className={s.heroGrid} /><div className={s.heroAtmosphere} /></div>
        <div className={s.heroInner}>
          <motion.div className={s.heroContent} initial="hidden" animate="show" variants={stagger}>
            <motion.span className={s.heroLabel} variants={fadeUp}>E-commerce Инфраструктура</motion.span>
            <motion.h1 className={s.heroTitle} variants={fadeUp}>
              Разработка e-commerce платформ,{" "}
              <span className={s.heroTitleAccent}>спроектированных</span> для роста
            </motion.h1>
            <motion.p className={s.heroSubtitle} variants={fadeUp}>
              Создаем интернет-магазины и B2B платформы с высокой производительностью, устойчивой архитектурой и полной независимостью от ограничений Bitrix и WordPress.
            </motion.p>
            <motion.div className={s.heroActions} variants={fadeUp}>
              <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>Начать проект</button>
            </motion.div>
            <motion.div className={s.heroTrustLine} variants={fadeUp}>
              <span className={s.trustBadge}><Network size={16} /> Разработка интернет-магазинов</span>
              <span className={s.trustBadge}><Database size={16} /> B2B Платформы</span>
              <span className={s.trustBadge}><Lock size={16} /> Highload системы</span>
            </motion.div>
          </motion.div>
          <motion.div className={s.heroVisual} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}><InfraScene /></motion.div>
        </div>
      </section>

      {/* ── 1.5 PROOF TICKER ────────────────────────────────────────────────── */}
      <div className={s.proofBar}>
        <div className={s.sectionInner}><div className={s.proofTrack}>
          <div className={s.proofItem}><span className={s.proofVal}>500k+</span><span className={s.proofLabel}>SKU в каталоге</span></div>
          <div className={s.proofItem}><span className={s.proofVal}>99.99%</span><span className={s.proofLabel}>Uptime систем</span></div>
          <div className={s.proofItem}><span className={s.proofVal}>&lt; 1.2c</span><span className={s.proofLabel}>LCP производительность</span></div>
          <div className={s.proofItem}><span className={s.proofVal}>API-first</span><span className={s.proofLabel}>Архитектурный контроль</span></div>
        </div></div>
      </div>

      <div className={s.visualPause} />

      {/* ── 2. BUSINESS PROBLEMS (Long-tail SEO) ─────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Проблематика</span>
            <h2 className={s.sectionTitle}>Бизнес-задачи, которые решает платформа Kibex</h2>
            <p className={s.sectionSubtitleCenter}>
              Мы устраняем технические барьеры, которые мешают интернет-магазинам расти и масштабироваться.
            </p>
          </div>
          <div className={s.painGrid}>
            {businessPains.map((p, i) => (
              <motion.div key={i} className={s.painCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className={s.painIcon}><p.icon size={28} /></div>
                <h3 className={s.painCardTitle}>{p.title}</h3>
                <p className={s.painCardDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPARISON ───────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Диагностика</span>
            <h2 className={s.sectionTitle}>Разница между CMS и платформой для роста</h2>
          </div>
          <div className={s.compGrid}>
            <motion.div className={`${s.compCol} ${s.compLegacy}`} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className={s.compTitle}>Ограничения Bitrix / WP</h3>
              <div className={s.compItem}><X className={s.compIcon} color="#ef4444" size={20} /><div className={s.compText}>Медленная работа интернет-магазина при росте</div></div>
              <div className={s.compItem}><X className={s.compIcon} color="#ef4444" size={20} /><div className={s.compText}>Нестабильные интеграции с 1С и ERP</div></div>
              <div className={s.compItem}><X className={s.compIcon} color="#ef4444" size={20} /><div className={s.compText}>Высокая стоимость любой доработки</div></div>
            </motion.div>
            <motion.div className={`${s.compCol} ${s.compPlatform}`} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className={s.compTitle}>Платформа Kibex</h3>
              <div className={s.compItem}><Check className={s.compIcon} color="#4633ff" size={20} /><div className={s.compText}>Мгновенный поиск по 500 000+ товарам</div></div>
              <div className={s.compItem}><Check className={s.compIcon} color="#4633ff" size={20} /><div className={s.compText}>Надежный API-слой для всех интеграций</div></div>
              <div className={s.compItem}><Check className={s.compIcon} color="#4633ff" size={20} /><div className={s.compText}>Масштабирование без остановки продаж</div></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE BUILD ────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionTag}>Экспертиза</span>
            <h2 className={s.sectionTitle}>Какие e-commerce системы мы разрабатываем</h2>
          </div>
          <div className={s.whatGrid}>
            {whatWeBuild.map((w, i) => (
              <motion.div key={i} className={s.whatCard} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                <div className={s.whatMicroVisual}><Activity size={40} strokeWidth={1} opacity={0.3} /></div>
                <h3 className={s.whatTitle}>{w.title}</h3>
                <p className={s.whatDesc}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className={s.internalLinks}>
            <Link href="/solutions/modernizaciya" className={s.seoLink}>Модернизация интернет-магазина <LinkIcon size={14} /></Link>
            <Link href="/solutions/security" className={s.seoLink}>Аудит безопасности платформы <LinkIcon size={14} /></Link>
            <Link href="/solutions/highload" className={s.seoLink}>Высоконагруженные e-commerce системы <LinkIcon size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── 5. BLUEPRINT (Architecture) ─────────────────────────────────────── */}
      <section className={s.blueprint}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Инженерия</span>
            <h2 className={s.sectionTitle}>Архитектура e-commerce платформы</h2>
          </div>
          <div className={s.blueprintVisual}>
            <motion.div className={s.blueprintCore} animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}><Cpu size={64} /></motion.div>
            {archLayers.map((layer, i) => {
              const angles = [45, 135, 225, 315];
              const dist = 320;
              const x = Math.cos(angles[i] * Math.PI / 180) * dist;
              const y = Math.sin(angles[i] * Math.PI / 180) * dist;
              return (
                <motion.div key={i} className={s.blueprintLayer} style={{ x: `calc(-50% + ${x}px)`, y: `calc(-50% + ${y}px)`, top: "50%", left: "50%" }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }}>
                  <span className={s.layerNum}>{layer.n}</span>
                  <div className={s.layerLabel}>{layer.label}</div>
                  <h4 className={s.layerTitle}>{layer.title}</h4>
                  <div className={s.layerMetric}>{layer.metric}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. TIMELINE ─────────────────────────────────────────────────────── */}
      <section className={s.section} ref={timelineRef} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionTag}>Цикл</span>
            <h2 className={s.sectionTitle}>Как создается цифровая инфраструктура</h2>
          </div>
          <div className={s.timeline}>
            <div className={s.timelineLine} />
            <motion.div className={s.timelineProgress} style={{ height: "100%", scaleY: timeProgress, originY: 0 }} />
            {timelineSteps.map((step, i) => (
              <motion.div key={i} className={s.timelineStep} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <div className={s.stepNode}>{step.n}</div>
                <div className={s.stepContent}>
                  <div className={s.stepMeta}><span className={s.stepDuration}>{step.dur}</span><span className={s.stepOutput}>Результат: {step.out}</span></div>
                  <h3 className={s.stepTitle}>{step.title}</h3>
                  <p className={s.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. OUTCOMES ─────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Результаты</span>
            <h2 className={s.sectionTitle}>Что получает бизнес после разработки платформы</h2>
          </div>
          <div className={s.outcomeGrid}>
            {outcomes.map((o, i) => (
              <motion.div key={i} className={`${s.outcomeCard} ${s[o.size]}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <span className={s.outcomeVal}>{o.val}</span>
                <h3 className={s.outcomeTitle}>{o.title}</h3>
                <p className={s.outcomeDesc}>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CASES ────────────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: '#08080c' }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionTag}>Трансформация</span>
            <h2 className={s.sectionTitle}>Реальные показатели масштабирования</h2>
          </div>
          <div className={s.caseStack}>
            <motion.div className={s.caseCard} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
              <div className={s.caseInfo}>
                <span className={s.caseLabel}>Проблема: 180 000 SKU</span>
                <div className={s.caseBefore}>Зависания при импорте остатков и 10с ожидание в каталоге.</div>
              </div>
              <div className={s.caseVisual}><Activity size={100} strokeWidth={0.5} opacity={0.1} /></div>
              <div className={s.caseInfo}>
                <span className={s.caseLabel}>Решение: Распределенный API</span>
                <div className={s.caseAfter}>1.2с загрузка и стабильная синхронизация с 1С без ошибок.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Вопросы</span>
            <h2 className={s.sectionTitle}>FAQ: разработка e-commerce систем</h2>
          </div>
          <div className={s.faqList}>{faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* ── 10. SEO CONTENT BLOCK ───────────────────────────────────────────── */}
      <section className={s.seoDepth}>
        <div className={s.sectionInner}>
          <h2 className={s.seoTitle}>Разработка e-commerce платформ в России: комплексный подход Kibex</h2>
          <div className={s.seoText}>
            <p>Создание современных интернет-магазинов сегодня требует выхода за рамки коробочных CMS. Разработка e-commerce платформ от Kibex — это процесс проектирования высоконагруженной инфраструктуры, готовой к масштабированию каталога до 1 млн SKU и выше. Мы специализируемся на разработке B2B платформ и маркетплейсов, где критически важна стабильность интеграций с 1С, ERP и CRM системами.</p>
            <p>В отличие от стандартной разработки интернет-магазина, мы фокусируемся на архитектуре API-first, что позволяет вашему бизнесу быть гибким. Модернизация текущих систем, замена Bitrix на кастомные решения и аудит безопасности — ключевые этапы создания устойчивого цифрового актива. С Kibex вы получаете полное владение кодом и инфраструктуру, которая не тормозит рост ваших продаж.</p>
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className={s.finalCta}>
        <div className={s.ctaBg} />
        <div className={s.ctaVisual} />
        <div className={s.sectionInner}>
          <motion.div className={s.ctaInner} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h2 className={s.ctaTitle}>Платформа должна помогать расти</h2>
            <p className={s.ctaSubtitle}>Закажите аудит и проектирование вашей будущей e-commerce инфраструктуры.</p>
            <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>Начать проектирование</button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <PlatformDiagnosticPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
