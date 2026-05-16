"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  Database, 
  ShoppingBag, 
  Box, 
  Truck, 
  DollarSign, 
  Users, 
  BarChart3,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  FileText,
  Cpu,
  Calendar,
  Clock,
  User,
  LayoutList
} from "lucide-react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Schema from "../../../components/Schema";
import MigrationPopup from "../MigrationPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import s from "../[slug]/article.module.css";

// ── INFRA VISUAL COMPONENTS ──

function OrbitNode({ label, Icon, angle, radius, delay = 0 }: { label: string, Icon: any, angle: number, radius: number, delay?: number }) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className={s.orbitNode}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: [1, 1.03, 1],
        boxShadow: ["0 0 20px rgba(70,51,255,0.05)", "0 0 40px rgba(70,51,255,0.15)", "0 0 20px rgba(70,51,255,0.05)"]
      }}
      transition={{ 
        opacity: { delay, duration: 0.8 },
        scale: { duration: 4, repeat: Infinity, delay: Math.random() * 2 }
      }}
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }}
    >
      <Icon size={20} />
      <span className={s.orbitLabel}>{label}</span>
    </motion.div>
  );
}

function InfraHeroVisual() {
  const [metrics, setMetrics] = useState({ orders: 1248, sync: 99.6, latency: 12 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        orders: prev.orders + Math.floor(Math.random() * 3),
        sync: 99.4 + Math.random() * 0.4,
        latency: 10 + Math.floor(Math.random() * 5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { label: "Sales", Icon: ShoppingBag, angle: (0 * Math.PI) / 4, radius: 220 },
    { label: "Warehouse", Icon: Box, angle: (1 * Math.PI) / 4, radius: 220 },
    { label: "Finance", Icon: DollarSign, angle: (2 * Math.PI) / 4, radius: 220 },
    { label: "Logistics", Icon: Truck, angle: (3 * Math.PI) / 4, radius: 220 },
    { label: "HR", Icon: Users, angle: (4 * Math.PI) / 4, radius: 220 },
    { label: "Analytics", Icon: BarChart3, angle: (5 * Math.PI) / 4, radius: 220 },
    { label: "Procurement", Icon: FileText, angle: (6 * Math.PI) / 4, radius: 220 },
    { label: "API", Icon: Cpu, angle: (7 * Math.PI) / 4, radius: 220 },
  ];

  return (
    <div className={s.infraVisualWrap}>
      <div className={s.coreNode}>
        <Database size={40} color="#4633ff" />
        <span>Unified<br />ERP Core</span>
      </div>

      <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
        {nodes.map((node, i) => {
          const x = Math.cos(node.angle) * node.radius;
          const y = Math.sin(node.angle) * node.radius;
          return (
            <motion.line
              key={i}
              x1="50%" y1="50%"
              x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
              stroke="rgba(70, 51, 255, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}
      </svg>

      {nodes.map((n, i) => (
        <OrbitNode key={i} {...n} delay={0.8 + i * 0.1} />
      ))}

      <div className={s.liveMetricsPanel}>
        <div className={s.metricItem}>
          <span className={s.metricLabel}>Orders Processed</span>
          <span className={s.metricValue}>{metrics.orders}</span>
        </div>
        <div className={s.metricItem}>
          <span className={s.metricLabel}>Warehouse Sync</span>
          <span className={s.metricValue}>{metrics.sync.toFixed(1)}%</span>
        </div>
        <div className={s.metricItem}>
          <span className={s.metricLabel}>API Latency</span>
          <span className={s.metricValue}>{metrics.latency}ms</span>
        </div>
      </div>
    </div>
  );
}

// ── INTERACTIVE SECTIONS ──

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={s.faqItem}>
      <div className={s.faqHeader} onClick={() => setIsOpen(!isOpen)}>
        <h4>{question}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={24} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={s.faqBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── PAGE COMPONENT ──

export default function ExcelResearchPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [activeToc, setActiveToc] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -40]);
  const infraScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);

  const stages = [
    { count: "10", status: "STABLE", sync: 99, errors: 0, desc: "Excel ещё работает стабильно. Команда управляет процессами вручную без значимых потерь." },
    { count: "30", status: "DEGRADING", sync: 82, errors: 4, desc: "Появляются первые рассинхронизации. Склад и продажи начинают видеть разные остатки." },
    { count: "70", status: "CRITICAL", sync: 64, errors: 12, desc: "Отделы дублируют данные. Время на ручную сверку таблиц превышает время на основную работу." },
    { count: "150", status: "CHAOS", sync: 41, errors: 28, desc: "Компания теряет прозрачность. Менеджеры не могут гарантировать сроки и наличие товара." },
    { count: "300+", status: "FAILING", sync: 18, errors: 54, desc: "Без ERP управление становится хаотичным. Высокий риск необратимых финансовых потерь." },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveToc(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const breadcrumbItems = [
    { name: "Исследования", item: "/research" },
    { name: "Excel и рост бизнеса", item: "/research/pochemu-excel-razrushaet-biznes" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://kibex.ru" },
      { "@type": "ListItem", "position": 2, "name": "Исследования", "item": "https://kibex.ru/research" },
      { "@type": "ListItem", "position": 3, "name": "Excel и рост бизнеса", "item": "https://kibex.ru/research/pochemu-excel-razrushaet-biznes" }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Почему Excel и ручные процессы начинают разрушать бизнес при росте компании",
    "description": "Разбор операционного хаоса, возникающего при росте бизнеса без централизованной ERP системы. Анализ ограничений Excel, сравнение с SaaS и преимущества Unified ERP Core.",
    "image": "https://kibex.ru/og-excel-research.png",
    "author": { "@type": "Organization", "name": "Kibex Research Team" },
    "publisher": { "@type": "Organization", "name": "Kibex", "logo": { "@type": "ImageObject", "url": "https://kibex.ru/logo.png" } },
    "datePublished": "2026-05-16",
    "dateModified": "2026-05-16",
    "articleSection": "ERP Infrastructure",
    "proficiencyLevel": "Expert",
    "keywords": "ERP система, автоматизация бизнеса, Excel хаос, цифровая инфраструктура, SaaS vs Custom ERP",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Когда Excel перестаёт справляться?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Критическая точка наступает при росте команды свыше 15-20 человек. В этот момент количество связей между отделами становится слишком сложным для ручного контроля."
        }
      },
      {
        "@type": "Question",
        "name": "Что даёт ERP система бизнесу?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ERP объединяет продажи, склад, финансы и аналитику в единую инфраструктуру, исключая дублирование данных и ускоряя процессы."
        }
      }
    ]
  };

  return (
    <div className={s.page}>
      <Schema data={breadcrumbSchema} />
      <Schema data={articleSchema} />
      <Schema data={faqSchema} />
      <motion.div className={s.progressBar} style={{ scaleX }} />
      <Header />

      {/* ── 1. HERO ── */}
      <section className={s.cinematicHero}>
        <div className={s.container} style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <motion.div className={s.heroLeft} style={{ y: heroY }}>
            <Breadcrumbs items={breadcrumbItems} />

            <div className={s.articleMeta}>
              <motion.span className={`${s.metaChip} ${s.metaChipActive}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>ERP Infrastructure</motion.span>
              <motion.span className={s.metaChip} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}><Clock size={12} className="inline mr-1" /> 16 min read</motion.span>
              <motion.span className={s.metaChip} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}><Calendar size={12} className="inline mr-1" /> Updated May 2026</motion.span>
            </div>

            <h1 className={s.title}>
              {["Почему Excel и ручные", "процессы начинают", "разрушать бизнес", "при росте компании"].map((line, i) => (
                <motion.span 
                  key={i} 
                  style={{ display: "block" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p 
              className={s.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Когда продажи, склады, логистика и финансы работают в разных таблицах — бизнес постепенно теряет управляемость, прозрачность и скорость принятия решений.
            </motion.p>

            <motion.div 
              className={s.heroCta} 
              style={{ display: "flex", gap: 20 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <button className={s.ctaMainBtn} onClick={() => setIsPopupOpen(true)}>Обсудить ERP архитектуру</button>
              <Link href="/approach" className={s.ctaSecondaryBtn} style={{ padding: "18px 30px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, textDecoration: "none", color: "#fff", fontSize: 16, fontWeight: 700 }}>Изучить подход Kibex</Link>
            </motion.div>
          </motion.div>

          <motion.div className={s.heroRight} style={{ scale: infraScale }}>
            <InfraHeroVisual />
          </motion.div>
        </div>
      </section>

      {/* ── 2. AUDIENCE & TOC ── */}
      <section className="bg-white/[0.02] py-12 border-y border-white/5">
        <div className={s.container}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={s.audience}>
              <h3 className="flex items-center gap-2 text-white font-bold mb-6"><User size={18} /> Кому будет полезно</h3>
              <ul className="space-y-3 text-[#FFFFFF]/50 text-sm">
                <li>— CEO и владельцам бизнеса</li>
                <li>— Операционным директорам (COO)</li>
                <li>— Руководителям отделов логистики и продаж</li>
                <li>— Компаниям на этапе активного масштабирования</li>
              </ul>
            </div>
            <div className={s.takeaways}>
              <h3 className="flex items-center gap-2 text-[#4633FF] font-bold mb-6">Главные выводы</h3>
              <ul className="space-y-3 text-[#FFFFFF]/70 text-sm">
                <li className="flex items-start gap-2"><span className="text-[#4633FF]">•</span> Excel не обеспечивает транзакционную целостность данных.</li>
                <li className="flex items-start gap-2"><span className="text-[#4633FF]">•</span> Ручное управление ведет к скрытым потерям до 30% прибыли.</li>
                <li className="flex items-start gap-2"><span className="text-[#4633FF]">•</span> Custom ERP — единственный способ сохранить уникальную бизнес-логику.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MAIN CONTENT WITH STICKY TOC ── */}
      <div className={s.container}>
        <div className={s.layoutWithToc}>
          <aside className={s.stickyToc}>
            <span className={s.tocLabel}><LayoutList size={14} className="inline mr-2" /> Содержание</span>
            <div className={s.tocList}>
              <a href="#why-excel-fails" className={`${s.tocItem} ${activeToc === "why-excel-fails" ? s.tocItemActive : ""}`}>
                <div className={s.tocDot} /> 1. Предел Excel
              </a>
              <a href="#growth-stages" className={`${s.tocItem} ${activeToc === "growth-stages" ? s.tocItemActive : ""}`}>
                <div className={s.tocDot} /> 2. Деградация
              </a>
              <a href="#hidden-losses" className={`${s.tocItem} ${activeToc === "hidden-losses" ? s.tocItemActive : ""}`}>
                <div className={s.tocDot} /> 3. Скрытые потери
              </a>
              <a href="#saas-vs-custom" className={`${s.tocItem} ${activeToc === "saas-vs-custom" ? s.tocItemActive : ""}`}>
                <div className={s.tocDot} /> 4. SaaS vs Custom
              </a>
              <a href="#transformation" className={`${s.tocItem} ${activeToc === "transformation" ? s.tocItemActive : ""}`}>
                <div className={s.tocDot} /> 5. Трансформация
              </a>
              <a href="#infrastructure" className={`${s.tocItem} ${activeToc === "infrastructure" ? s.tocItemActive : ""}`}>
                <div className={s.tocDot} /> 6. Инфраструктура
              </a>
              <a href="#faq" className={`${s.tocItem} ${activeToc === "faq" ? s.tocItemActive : ""}`}>
                <div className={s.tocDot} /> 7. FAQ
              </a>
            </div>
          </aside>

          <div className={s.engReport}>
            {/* SECTION 1 */}
            <section id="why-excel-fails" className={s.section}>
              <span className={s.sectionLabel}>DIAGNOSTIC</span>
              <h2 className={s.sectionTitle}>Почему Excel перестаёт справляться?</h2>
              <p>
                Excel — это инструмент для персональных вычислений, а не для совместной операционной работы. Главная проблема — отсутствие централизованной модели данных (Single Source of Truth).
              </p>
              <div className={s.engNote}>
                <span className={s.noteLabel}>Engineering Certainty</span>
                <p className={s.noteText}>
                  В Excel отсутствует жесткая транзакционная целостность. Каждый отдел создает локальную копию данных, что неизбежно ведет к рассинхронизации при росте частоты операций.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DEGRADATION */}
            <section id="growth-stages" className={s.section}>
              <span className={s.sectionLabel}>PROCESS DEGRADATION</span>
              <h2 className={s.sectionTitle}>Что происходит при росте компании?</h2>
              <div className={s.diagnosticGrid}>
                <div className={s.growthTimeline}>
                  {stages.map((stage, i) => (
                    <div 
                      key={i} 
                      className={`${s.timelineCard} ${activeStage === i ? s.timelineCardActive : ""}`}
                      onClick={() => setActiveStage(i)}
                    >
                      <div className={s.cardHead}>
                        <strong>{stage.count} сотрудников</strong>
                        <span className={`${s.cardStatus} ${i > 1 ? s.cardStatusWarning : ""}`}>{stage.status}</span>
                      </div>
                      <p>{stage.desc}</p>
                    </div>
                  ))}
                </div>
                <div className={s.degradationVisual}>
                  <div className={s.degradationStats}>
                    <div className={s.statRow}>
                      <span className={s.statLabel}>Data Sync Status</span>
                      <span className={s.statValue} style={{ color: activeStage > 2 ? "#ef4444" : "#4ade80" }}>
                        {stages[activeStage].sync}%
                      </span>
                    </div>
                    <div className={s.statRow}>
                      <span className={s.statLabel}>Operational Errors</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {activeStage > 1 && <motion.div className={s.warningPulse} animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} />}
                        <span className={s.statValue}>{stages[activeStage].errors}</span>
                      </div>
                    </div>
                    <div className={s.statRow}>
                      <span className={s.statLabel}>Control Efficiency</span>
                      <span className={s.statValue}>{100 - stages[activeStage].errors}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: HIDDEN LOSSES */}
            <section id="hidden-losses" className={s.section}>
              <span className={s.sectionLabel}>FINANCIAL IMPACT</span>
              <h2 className={s.sectionTitle}>Скрытые операционные потери</h2>
              <div className={s.financialGrid}>
                <div className={s.financialCard}>
                  <div className={s.cardIcon}><ShoppingBag size={24} /></div>
                  <h4>Потерянные продажи</h4>
                  <p>Клиенты уходят к конкурентам, пока менеджеры вручную уточняют наличие товара в разных таблицах.</p>
                </div>
                <div className={s.financialCard}>
                  <div className={s.cardIcon}><Box size={24} /></div>
                  <h4>Ошибки склада</h4>
                  <p>Неверные отгрузки и пересортица из-за рассинхронизации остатков между магазином и складом.</p>
                </div>
                <div className={s.financialCard}>
                  <div className={s.cardIcon}><Users size={24} /></div>
                  <h4>Потери времени</h4>
                  <p>Сотрудники тратят до 40% рабочего времени на ручную сверку и перекладывание данных из файла в файл.</p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SAAS VS CUSTOM */}
            <section id="saas-vs-custom" className={s.section}>
              <span className={s.sectionLabel}>STRATEGY</span>
              <h2 className={s.sectionTitle}>Почему SaaS ERP начинает ограничивать бизнес?</h2>
              <div className={s.comparisonMatrix}>
                <div className={s.matrixHead}>Сравнение архитектурных подходов</div>
                <div className={s.matrixRow}>
                  <div className={s.matrixFeature}>Кастомизация процессов</div>
                  <div className={s.matrixVal}>Ограничена шаблонами</div>
                  <div className={s.matrixValHighlight}>Полная адаптация</div>
                </div>
                <div className={s.matrixRow}>
                  <div className={s.matrixFeature}>Глубина интеграций</div>
                  <div className={s.matrixVal}>Только стандартные API</div>
                  <div className={s.matrixValHighlight}>Любые enterprise-слои</div>
                </div>
                <div className={s.matrixRow}>
                  <div className={s.matrixFeature}>Владение данными</div>
                  <div className={s.matrixVal}>Зависимость от вендора</div>
                  <div className={s.matrixValHighlight}>Собственная инфра</div>
                </div>
                <div className={s.matrixRow}>
                  <div className={s.matrixFeature}>Масштабируемость</div>
                  <div className={s.matrixVal}>По тарифным планам</div>
                  <div className={s.matrixValHighlight}>Неограниченная</div>
                </div>
              </div>
            </section>

            {/* SECTION 5: TRANSFORMATION */}
            <section id="transformation" className={s.section}>
              <span className={s.sectionLabel}>OUTCOMES</span>
              <h2 className={s.sectionTitle}>Что меняется после внедрения ERP?</h2>
              <div className={s.transformationGrid}>
                <div className={s.transCard}>
                  <span className={s.transLabel}>Согласование заказов</span>
                  <div className={s.transValue}>
                    <span className={s.beforeVal}>2 часа</span>
                    <ArrowRight size={16} />
                    <span className={s.afterVal}>3 мин</span>
                  </div>
                </div>
                <div className={s.transCard}>
                  <span className={s.transLabel}>Обновление остатков</span>
                  <div className={s.transValue}>
                    <span className={s.beforeVal}>ручное</span>
                    <ArrowRight size={16} />
                    <span className={s.afterVal}>Real-time</span>
                  </div>
                </div>
                <div className={s.transCard}>
                  <span className={s.transLabel}>Подготовка отчетности</span>
                  <div className={s.transValue}>
                    <span className={s.beforeVal}>2 дня</span>
                    <ArrowRight size={16} />
                    <span className={s.afterVal}>15 сек</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: INFRASTRUCTURE */}
            <section id="infrastructure" className={s.section}>
              <span className={s.sectionLabel}>ARCHITECTURE</span>
              <h2 className={s.sectionTitle}>ERP как инфраструктурный фундамент</h2>
              <p>
                Мы проектируем ERP не как изолированное приложение, а как центральную шину данных (Unified ERP Core), объединяющую все контуры бизнеса в единую систему.
              </p>
            </section>

            {/* SECTION 7: FAQ */}
            <section id="faq" className={s.faqSection}>
              <span className={s.sectionLabel}>KNOWLEDGE BASE</span>
              <h2 className={s.sectionTitle}>Частые вопросы об ERP</h2>
              <div className={s.faqGrid}>
                <FAQItem 
                  question="Когда Excel перестаёт справляться?" 
                  answer="Критическая точка наступает при росте команды свыше 15-20 человек. В этот момент количество связей между отделами становится слишком сложным для ручного контроля."
                />
                <FAQItem 
                  question="Что даёт ERP система бизнесу?" 
                  answer="ERP объединяет продажи, склад, финансы и аналитику в единую инфраструктуру. Это исключает дублирование данных и дает прозрачную картину бизнеса."
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ── 10. FINAL CTA ── */}
      <section className={s.finalCta}>
        <div className={s.ctaContent}>
          <motion.h3 
            className={s.ctaTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Бизнес не должен<br />управляться через таблицы
          </motion.h3>
          <motion.p 
            className={s.ctaSub}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Получите архитектурную оценку и план построения ERP инфраструктуры.
          </motion.p>
          <motion.div 
            className={s.ctaButtons} 
            style={{ display: "flex", gap: 24, justifyContent: "center" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button className={s.ctaMainBtn} onClick={() => setIsPopupOpen(true)}>Обсудить ERP систему</button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <MigrationPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        defaultCms="Manual Processes / Excel"
      />
    </div>
  );
}
