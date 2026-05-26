"use client";

import { useState, useRef, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView as useFramerInView
} from "framer-motion";
import { 
  Database, 
  ShoppingBag, 
  Box, 
  DollarSign, 
  Users, 
  Truck, 
  BarChart3, 
  UserCheck, 
  Network, 
  Check, 
  ArrowRight, 
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Settings,
  Briefcase,
  FileText,
  Warehouse,
  AlertCircle,
  TrendingUp,
  Clock,
  Lock,
  Cpu,
  Server,
  Cloud,
  X,
  Target,
  Maximize2,
  Shield,
  Fingerprint,
  FileLock,
  Key
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArchitecturePopup from "./ArchitecturePopup";
import s from "./approach.module.css";

// ── DATA DEFINITIONS ──

const PRINCIPLES = [
  { id: "01", title: "Архитектура важнее шаблонов", desc: "Система проектируется под бизнес-модель компании, а не под ограничения CMS." },
  { id: "02", title: "Масштабирование закладывается заранее", desc: "Рост нагрузки не должен приводить к полной переработке платформы." },
  { id: "03", title: "Безопасность — часть архитектуры", desc: "Защита проектируется на уровне системы, а не подключается после запуска." },
  { id: "04", title: "API-first подход", desc: "Все компоненты платформы должны быть готовы к интеграциям и развитию." },
  { id: "05", title: "Наблюдаемость системы", desc: "Мониторинг, логирование и контроль должны быть встроены в платформу изначально." },
  { id: "06", title: "Контроль над инфраструктурой", desc: "Бизнес должен владеть системой, кодом и данными без зависимости от вендоров." },
];

const TIMELINE_STEPS = [
  { id: "01", title: "Исследование бизнеса", analyze: "бизнес-процессы, ограничения, операционные риски", outcome: "архитектурная карта и прогноз масштабирования" },
  { id: "02", title: "Архитектурное проектирование", analyze: "структуры данных, интеграционные потоки, требования к нагрузке", outcome: "технический фундамент и выбор технологического стека" },
  { id: "03", title: "UX и логика процессов", analyze: "сценарии использования, роли сотрудников, интерфейсы управления", outcome: "прототип системы с учетом операционной эффективности" },
  { id: "04", title: "Разработка ядра", analyze: "бизнес-логика, модули системы, управление данными", outcome: "стабильное ядро платформы, готовое к расширению" },
  { id: "05", title: "Интеграции и безопасность", analyze: "внешние сервисы (1С, CRM, логистика), шифрование, доступ", outcome: "бесшовная экосистема с защищенным контуром" },
  { id: "06", title: "Нагрузочное тестирование", analyze: "предельные нагрузки, отказоустойчивость, скорость отклика", outcome: "оптимизированная система, готовая к росту трафика" },
  { id: "07", title: "Контролируемый запуск", analyze: "миграция данных, обучение персонала, стратегия деплоя", outcome: "безопасный переход на новую платформу без простоя" },
  { id: "08", title: "Масштабирование", analyze: "новые модули, расширение географии, доработка под рост", outcome: "эволюционное развитие платформы вместе с бизнесом" },
];

const DONT_DO = [
  "Не используем шаблонные CMS как основу enterprise-систем",
  "Не строим критическую инфраструктуру на плагинах",
  "Не создаём зависимость бизнеса от подрядчика",
  "Не проектируем архитектуру «на сейчас»",
];

const TECH_BLOCKS = [
  { title: "Frontend", stack: "Next.js · React", desc: "Быстрые интерфейсы, высокая конверсия и стабильная SEO-производительность даже при росте каталога." },
  { title: "Backend", stack: "Node.js · Go", desc: "Обработка сложной бизнес-логики, заказов и интеграций без потери стабильности под нагрузкой." },
  { title: "Infrastructure", stack: "Docker · Kubernetes", desc: "Инфраструктура, способная выдерживать рост трафика, интеграций и внутренних процессов без простоев." },
  { title: "Data", stack: "PostgreSQL · Redis", desc: "Мгновенная работа с большими объёмами данных и real-time аналитикой." },
];

const SECURITY_GRID = [
  { label: "ACCESS CONTROL", items: ["RBAC (Role Based Access Control)", "Session isolation", "MFA-ready architecture"], icon: Fingerprint },
  { label: "DATA SECURITY", items: ["End-to-end encryption", "Secrets management", "Full audit logging"], icon: FileLock },
  { label: "INFRASTRUCTURE", items: ["Network isolation", "Firewall policies", "VPC segmentation"], icon: Key },
];

// ── COMPONENTS ──




function MonitoringVisual() {
  const [metrics, setMetrics] = useState([
    { label: "Response Time", value: 42, unit: "ms", status: "Optimal" },
    { label: "Queue Load", value: 12, unit: "%", status: "Stable" },
    { label: "Integrations", value: 100, unit: "%", status: "Active" },
    { label: "Uptime", value: 99.99, unit: "%", status: "Live" },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        value: m.label === "Response Time" 
          ? Math.max(38, Math.min(46, m.value + (Math.random() * 4 - 2))) 
          : m.label === "Queue Load" 
          ? Math.max(8, Math.min(18, m.value + (Math.random() * 2 - 1)))
          : m.value
      })));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={s.monitoring}>
      {metrics.map((m, i) => (
        <div key={i} className={s.monCard}>
          <span className={s.monLabel}>{m.label}</span>
          <span className={s.monValue}>
            {m.label === "Uptime" ? m.value.toFixed(2) : Math.floor(m.value)}{m.unit}
          </span>
          <div className={s.monBarContainer}>
            <motion.div 
              className={s.monBarFill} 
              animate={{ width: m.label === "Queue Load" ? `${m.value}%` : "100%" }}
            />
          </div>
          <div className={s.monStatus}>
            <div className={s.monDot} style={{ opacity: [0.4, 1, 0.4] as any }} />
            {m.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ApproachPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textTranslate = useTransform(heroScroll, [0, 1], [0, -100]);
  const textOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const { scrollYProgress: timelineScroll } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const timelineSpring = useSpring(timelineScroll, { stiffness: 100, damping: 30 });

  return (
    <div className={s.page}>
      <div className={s.grid} />
      <Header />

      {/* ── 1. HERO ── */}
      <section className={s.hero} ref={heroRef}>
        {/* Background Image & Gradient overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img
            src="/handled_Security Support_1080_1920_80.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/90 via-[#050508]/50 to-[#050508]/90" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[radial-gradient(circle_at_center,rgba(70,51,255,0.06)_0%,transparent_60%)] blur-3xl opacity-70" />
        </div>

        <div className={s.container}>
          <div className={s.heroInner}>
            <motion.div className={s.heroLeft} style={{ y: textTranslate, opacity: textOpacity }}>
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={s.heroLabel}>ИНЖЕНЕРНАЯ ИНФРАСТРУКТУРА</motion.span>
              <h1 className={s.heroH1}>
                {["Мы проектируем системы,", "а не набор страниц"].map((line, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }} style={{ display: "block" }}>{line}</motion.span>
                ))}
              </h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className={s.heroSubtitle}>
                Kibex создаёт цифровые платформы, рассчитанные на рост, высокую нагрузку и долгосрочное развитие бизнеса без архитектурных ограничений.
              </motion.p>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className={s.emotionalLine}>
                Большинство проблем бизнеса появляются не из-за интерфейсов — а из-за системных ограничений архитектуры.
              </motion.p>
              <div className={s.heroActions}>
                <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} className={s.primaryBtn} onClick={() => setIsPopupOpen(true)}>Получить архитектурную оценку</motion.button>
                <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }} className={s.secondaryBtn}>Обсудить инфраструктуру</motion.button>
              </div>
              <div className={s.execMicro}>
                <span className={s.execLine1}>Ответ архитектора Kibex — в течение 24 часов</span>
                <span className={s.execLine2}>Конфиденциально • Без обязательств</span>
              </div>
            </motion.div>
        </div>
        </div>
      </section>

      {/* ── 2. COMPARISON ── */}
      <ComparisonSection />

      {/* ── 3. DONT DO ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Что мы не делаем</h2>
          </div>
          <div className={s.dontDoGrid}>
            {DONT_DO.map((t, i) => (
              <motion.div 
                key={i} 
                className={s.dontDoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <X className={s.dontDoIcon} size={24} />
                <span>{t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PRINCIPLES ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Принципы, на которых строится Kibex</h2>
          </div>
          <div className={s.principlesGrid}>
            {PRINCIPLES.map((p, i) => (
              <motion.div 
                key={i} 
                className={s.principleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className={s.principleNum}>{p.id}</span>
                <h3 className={s.principleTitle}>{p.title}</h3>
                <p className={s.principleDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TIMELINE ── */}
      <section className={s.section} ref={timelineRef}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Как создаётся цифровая платформа Kibex</h2>
          </div>
          <div className={s.timeline}>
            <div className={s.timelineLine} />
            <motion.div className={s.timelineProgress} style={{ height: useTransform(timelineSpring, [0, 1], ["0%", "100%"]) }} />
            {TIMELINE_STEPS.map((step, i) => (
              <div key={i} className={s.timelineStep}>
                <div className={s.stepNum}>{step.id}</div>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <div className={s.stepDetails}>
                  <div className={s.detailBlock}>
                    <span className={s.detailLabel}>Что анализируем</span>
                    <span className={s.detailText}>{step.analyze}</span>
                  </div>
                  <div className={s.detailBlock}>
                    <span className={s.detailLabel}>Что получает бизнес</span>
                    <span className={s.detailText}>{step.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MINDSET ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.mindsetBox}>
            <div className={s.mindsetLeft}>
              <h3>Почему архитектура важнее разработки</h3>
            </div>
            <div className={s.mindsetRight}>
              <p>Большинство digital-проектов терпят проблемы не из-за интерфейсов, а из-за системных ограничений архитектуры.</p>
              <div className={s.mindsetBullet}>• интеграции становятся нестабильными</div>
              <div className={s.mindsetBullet}>• стоимость изменений растёт</div>
              <div className={s.mindsetBullet}>• бизнес начинает зависеть от технических компромиссов</div>
              <p style={{ marginTop: 32, fontSize: 18, color: "#fff", fontWeight: 700 }}>Kibex проектирует платформы как долгосрочную инфраструктуру бизнеса.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TECHNOLOGY ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Технологии — это инструмент, а не продукт</h2>
          </div>
          <div className={s.techGrid}>
            {TECH_BLOCKS.map((t, i) => (
              <motion.div 
                key={i} 
                className={s.techBlock}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={s.techHeader}>
                  <h3 className={s.techName}>{t.title}</h3>
                  <span className={s.techStack}>{t.stack}</span>
                </div>
                <p className={s.techDesc}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. OBSERVABILITY ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Система должна быть наблюдаемой</h2>
            <p className={s.sectionSubtitle}>Мы внедряем мониторинг, логирование, метрики и контроль ошибок ещё до запуска платформы.</p>
          </div>
          <MonitoringVisual />
        </div>
      </section>

      {/* ── 9. SECURITY ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Безопасность проектируется заранее</h2>
          </div>
          <div className={s.shieldGrid}>
            {SECURITY_GRID.map((item, i) => (
              <motion.div 
                key={i} 
                className={s.shieldCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={s.shieldHeader}>
                  <item.icon size={32} color="#4633ff" />
                  <span className={s.shieldLabel}>{item.label}</span>
                </div>
                <div className={s.shieldList}>
                  {item.items.map((it, idx) => (
                    <div key={idx} className={s.shieldItem}>
                      <div style={{ width: 4, height: 4, background: "#4633ff", borderRadius: "50%" }} />
                      {it}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className={s.finalCta}>
        <div className={s.container}>
          <h2 className={s.ctaTitle}>Архитектура платформы определяет, сможет ли бизнес расти дальше</h2>
          <p className={s.ctaSubtitle}>Получите инженерную оценку текущей системы или архитектуру новой цифровой платформы.</p>
          <div className={s.heroActions} style={{ justifyContent: "center" }}>
            <button className={s.primaryBtn} onClick={() => setIsPopupOpen(true)}>Получить архитектурную оценку</button>
            <button className={s.secondaryBtn}>Обсудить инфраструктуру</button>
          </div>
          <div className={s.execMicro}>
            <span className={s.execLine1}>Ответ архитектора Kibex — в течение 24 часов</span>
            <span className={s.execLine2}>Конфиденциально • Без обязательств</span>
          </div>
        </div>
      </section>

      <Footer />
      <ArchitecturePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}

function ComparisonSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shake = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  return (
    <section className={s.section} ref={ref}>
      <div className={s.container}>
        <div className={s.sectionHeader} style={{ textAlign: "center", margin: "0 auto 80px" }}>
          <h2 className={s.sectionTitle}>Почему большинство платформ начинают тормозить развитие бизнеса</h2>
        </div>
        <div className={s.compGrid}>
          <motion.div className={s.compCol + " " + s.compColLeft} style={{ x: shake }}>
            <h3 className={s.compTitle}>❌ Типовой подход</h3>
            <div className={s.compList}>
              {["Запуск ради быстрого старта", "Плагины вместо архитектуры", "Хаотичные интеграции", "Технический долг", "Зависимость от CMS"].map((t, i) => (
                <div key={i} className={s.compItem} style={{ opacity: 0.5 }}>
                  <X size={20} className={s.iconBad} /> {t}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className={s.compCol + " " + s.compColRight}>
            <h3 className={s.compTitle}>✔ Инженерный подход Kibex</h3>
            <div className={s.compList}>
              {["Архитектура до разработки", "Масштабирование как часть системы", "Контроль данных и интеграций", "Прогнозируемое развитие", "Независимость от вендоров"].map((t, i) => (
                <motion.div 
                  key={i} 
                  className={s.compItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Check size={20} className={s.iconGood} /> {t}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
