"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Search,
  Code2,
  ShieldAlert,
  Rocket,
  Database,
  Cpu,
  Workflow,
  Network,
  BarChart3,
  RefreshCcw
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolutionPopup from "../../components/SolutionPopup";

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}
      initial={false}
    >
      <button 
        className={styles.faqHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.faqQuestion}>{q}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={styles.faqPlus}
        >+</motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.faqBody}
          >
            <div className={styles.faqContent}>
              <p>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const ERPVisual = () => (
  <div className={styles.erpVisual}>
    <div className={styles.visualNodes}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.visualNode}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
        />
      ))}
    </div>
    <svg className={styles.visualLines} viewBox="0 0 400 400">
      <motion.path
        d="M 50 100 Q 200 50 350 100"
        stroke="rgba(70, 51, 255, 0.2)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 50 200 Q 200 250 350 200"
        stroke="rgba(70, 51, 255, 0.2)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
      <motion.path
        d="M 100 50 Q 50 200 100 350"
        stroke="rgba(70, 51, 255, 0.2)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </svg>
  </div>
);

const HighloadVisual = () => (
  <div className={styles.highloadVisual}>
    <div className={styles.serverRack}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={styles.serverBlade}>
          <motion.div 
            className={styles.serverLed}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.1 }}
          />
        </div>
      ))}
    </div>
    <div className={styles.dataFlow}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.dataPacket}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 200, opacity: [0, 1, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  </div>
);

const SecurityVisual = () => (
  <div className={styles.securityVisual}>
    <motion.div 
      className={styles.scannerLine}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <div className={styles.shieldGrid}>
      {[...Array(9)].map((_, i) => (
        <div key={i} className={styles.gridHex} />
      ))}
    </div>
  </div>
);

const PlatformVisual = () => (
  <div className={styles.platformVisual}>
    <div className={styles.cubeContainer}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.wireCube}
          animate={{ rotateY: 360, rotateX: 360 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  </div>
);

const ModernizationVisual = () => (
  <div className={styles.modVisual}>
    <div className={styles.evolutionWrapper}>
      <motion.div 
        className={styles.oldSystem}
        animate={{ opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className={styles.newSystem}
        animate={{ opacity: [0.1, 0.8, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className={styles.arrowFlow}>
        <ArrowRight className={styles.flowIcon} />
      </div>
    </div>
  </div>
);

import styles from "./solutions.module.css";

export default function SolutionsPage() {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kibex",
    "description": "Проектируем и разрабатываем e-commerce платформы, ERP системы и корпоративную цифровую инфраструктуру для бизнеса: модернизация CMS, высоконагруженные архитектуры и интеграции.",
    "url": "https://kibex.io/solutions",
    "serviceType": [
      "E-commerce Platforms",
      "ERP Systems",
      "B2B Platforms",
      "Highload Infrastructure",
      "Corporate Systems Modernization",
      "Cybersecurity"
    ]
  };

  // Motion config
  const precisionEasing = [0.4, 0, 0.2, 1] as any;
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: precisionEasing }
    }
  };

  const architecturalCycle = [
    { title: "Погружение в бизнес", desc: "Изучаем текущую платформу, бизнес-процессы и задачи роста." },
    { title: "Технический аудит", desc: "Анализируем ограничения системы, риски безопасности и точки роста затрат." },
    { title: "Проектирование", desc: "Создаём архитектуру платформы, рассчитанную на стабильность и долгосрочное развитие." },
    { title: "Разработка", desc: "Строим систему с проверкой безопасности и качества на каждом этапе." },
    { title: "Запуск", desc: "Контролируемый запуск с мониторингом и проверкой всех бизнес-процессов." },
    { title: "Развитие", desc: "Поддержка, обновления и масштабирование платформы вместе с ростом бизнеса." },
  ];

  const mainSolutions = [
    {
      title: "Модернизация платформ",
      subtitle: "Реконструкция и переход на современный стек",
      desc: "Полная перестройка архитектуры без потери данных и SEO. Устраняем ограничения WordPress и Bitrix, возвращая бизнесу скорость развития и технологическую независимость.",
      suitable: "Устаревший стек, медленная работа, невозможность масштабирования.",
      period: "3–6 месяцев",
      investment: "от 1 500 000 ₽",
      cta: "Подробнее",
      href: "/solutions/modernizaciya",
      type: "modernization"
    },
    {
      title: "Разработка экосистем",
      subtitle: "Custom-платформы для технологической независимости",
      desc: "Разработка B2B платформ и независимых цифровых продуктов с нуля. Полный контроль над кодом, отсутствие лицензионных ограничений и готовность к любым функциональным расширениям.",
      suitable: "Уникальные бизнес-модели, потребность в полном владении кодом.",
      period: "4–9 месяцев",
      investment: "от 2 500 000 ₽",
      cta: "Запросить оценку",
      href: "/solutions/razrabotka-platformy",
      type: "platform"
    },
    {
      title: "Высоконагруженные платформы",
      subtitle: "Системы для миллионов SKU и запросов",
      desc: "Инженерные решения для e-commerce гигантов. Распределенная архитектура, микросервисы и мгновенный отклик при экстремальных нагрузках и больших объемах данных.",
      suitable: "Миллионы товаров, пиковые нагрузки, сложная логика цен и остатков.",
      period: "индивидуально",
      investment: "по результатам оценки",
      cta: "Обсудить Highload",
      href: "/solutions/highload",
      type: "highload"
    },
    {
      title: "Корпоративные ERP системы",
      subtitle: "Цифровая инфраструктура для управления бизнес-процессами",
      desc: "Проектируем и разрабатываем кастомные ERP платформы для компаний, которым необходим полный контроль над операциями, данными и внутренними процессами. Автоматизация бизнес-процессов: продажи, склады, логистика, финансы, аналитика и глубокие интеграции.",
      suitable: "Excel, ручные процессы, несвязанные системы, операционные ошибки.",
      period: "4–9 месяцев",
      investment: "от 3 500 000 ₽",
      cta: "Обсудить ERP систему",
      href: "/solutions/erp",
      type: "erp"
    },
    {
      title: "Кибербезопасность",
      subtitle: "Hardening и защита бизнес-активов",
      desc: "Глубокий аудит и внедрение протоколов защиты. Исключаем риск утечек, взломов и остановки бизнес-процессов на уровне архитектуры и серверного окружения.",
      suitable: "Высокие обороты, персональные данные, защита репутации.",
      period: "2–4 недели",
      investment: "от 150 000 ₽",
      cta: "Подробнее",
      href: "/solutions/security",
      type: "security"
    }
  ];

  const pricingRows = [
    { name: "Модернизация платформ", time: "3–6 мес", cost: "1.5–8 млн ₽" },
    { name: "Разработка экосистем", time: "4–9 мес", cost: "2.5–12 млн ₽" },
    { name: "Высоконагруженные платформы", time: "индивидуально", cost: "от 3 млн ₽" },
    { name: "Корпоративные ERP системы", time: "4–9 мес", cost: "от 3.5 млн ₽" },
    { name: "Кибербезопасность", time: "2–6 нед", cost: "от 150к ₽" }
  ];

  return (
    <div className={styles.solutionsPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.systemGrid} />
      <Header />
      
      {/* 1. HERO */}
      <section className={styles.hero}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/solution.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.backgroundImage} />
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <motion.h1 
            initial="hidden"
            animate="show"
            variants={revealVariants}
            className={styles.title}
          >
            <span className={styles.titleTop}>ЦИФРОВЫЕ ПЛАТФОРМЫ</span>
            {" "}
            <span className={styles.titleBottom}>ДЛЯ РОСТА БИЗНЕСА</span>
          </motion.h1>

          <div className={styles.bottomArea}>
            <div className={styles.heroActions}>
              <button 
                onClick={() => setIsAuditOpen(true)}
                className={styles.primaryButton}
              >
                Обсудить проект
              </button>
              <Link href="/portfolio" className={styles.secondaryButton}>
                Изучить проекты
              </Link>
            </div>
            <motion.p 
              initial="hidden"
              animate="show"
              variants={revealVariants}
              className={styles.subtitle}
            >
              Проектируем цифровые платформы, которые выдерживают рост бизнеса, высокие нагрузки и сложные интеграции без технических ограничений.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className={styles.trustLine}
            >
              <span>ERP</span>
              <span className={styles.trustDivider}>•</span>
              <span>E-commerce</span>
              <span className={styles.trustDivider}>•</span>
              <span>Highload</span>
              <span className={styles.trustDivider}>•</span>
              <span>Security</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SYSTEM EVALUATION PROTOCOL */}
      <section className={styles.diagBlock}>
        <div className={styles.section}>
          <div className={styles.diagGrid}>
            <div className={styles.diagLeft}>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealVariants}>
                <span className={styles.systemProtocol}>Диагностика платформы</span>
                <h2 className={styles.diagTitle}>Когда платформа начинает ограничивать рост</h2>
                <p className={styles.diagSubtitle}>
                  Если цифровая платформа демонстрирует следующие признаки — пришло время переходить на современную архитектуру.
                </p>
              </motion.div>
            </div>

            <div className={styles.diagRight}>
              <div className={styles.signalStack}>
                <div className={styles.signalLine} />
                {[
                  { title: "Платформа тормозит при росте каталога", desc: "Скорость работы снижается по мере увеличения количества товаров и пользовательской активности." },
                  { title: "Интеграции работают нестабильно", desc: "Обмен данными с 1С, ERP или CRM сопровождается задержками и ошибками." },
                  { title: "Платформа ограничивает развитие", desc: "Новые бизнес-задачи требуют компромиссов, сложных доработок или временных решений." },
                  { title: "Риски безопасности растут", desc: "Устаревшие зависимости увеличивают вероятность инцидентов и потери данных." },
                  { title: "Поддержка становится всё дороже", desc: "Даже небольшие изменения требуют значительных временных и финансовых затрат." },
                  { title: "Масштабирование обходится дорого", desc: "Рост нагрузки резко увеличивает сложность системы и операционные издержки." }
                ].map((signal, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: "-50px" }} 
                    transition={{ delay: i * 0.15, duration: 0.6 }} 
                    className={styles.signalCard}
                  >
                    <div className={styles.signalIndicator}>
                      <div className={styles.pulseDot} />
                    </div>
                    <div className={styles.signalContent}>
                      <h3 className={styles.signalTitle}>{signal.title}</h3>
                      <p className={styles.signalDesc}>{signal.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL CYCLE */}
      <section className={styles.cycleSection}>
        <div className={styles.section}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={revealVariants}
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Как строится проект</span>
            <h2 className={styles.panelTitle}>Пять шагов от аудита до запуска</h2>
          </motion.div>

          <div className={styles.timeline}>
            {architecturalCycle.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.timelineStep}
              >
                <div className={styles.stepLine} />
                <span className={styles.stepNumber}>0{idx + 1}</span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.1 SYSTEMS PORTFOLIO (SEO BLOCK) */}
      <section className={styles.systemsSection}>
        <div className={styles.section}>
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={revealVariants} 
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Архитектурный профиль</span>
            <h2 className={styles.diagTitle}>Какие системы разрабатывает Kibex</h2>
            <p className={styles.diagSubtitle}>
              Проектируем и внедряем отказоустойчивые решения для управления бизнесом и масштабирования цифровых активов.
            </p>
          </motion.div>

          <div className={styles.systemsGrid}>
            {[
              { title: "E-commerce платформы", desc: "Масштабируемые решения для ритейла с высокой конверсией и стабильностью под нагрузкой." },
              { title: "ERP системы", desc: "Автоматизация внутренних процессов, финансового контроля, логистики и складского учета." },
              { title: "B2B платформы", desc: "Сложные порталы для оптовых продаж, личных кабинетов дилеров и автоматизации заказов." },
              { title: "Высоконагруженные системы", desc: "Архитектура, рассчитанная на миллионы запросов и обработку больших объемов данных в реальном времени." },
              { title: "Корпоративные порталы", desc: "Единая цифровая среда для управления знаниями, коммуникациями и внутренними процессами компании." },
              { title: "Интеграционные платформы", desc: "Бесшовное объединение разрозненных сервисов и систем в единую управляемую экосистему." }
            ].map((system, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={styles.systemCard}
              >
                <h3 className={styles.systemCardTitle}>{system.title}</h3>
                <p className={styles.systemCardDesc}>{system.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOLUTIONS STACKED PANELS */}
      <section className={styles.solutionsStackSection}>
        <div className={styles.section}>
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={revealVariants} 
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Решения Kibex</span>
            <h2 className={styles.diagTitle}>Выберите формат работы</h2>
            <p className={styles.diagSubtitle}>
              Каждое решение проектируется индивидуально под задачи бизнеса и нагрузочный профиль платформы.
            </p>
          </motion.div>

          <div className={styles.panelStack}>
            {mainSolutions.map((item, idx) => {
              const Visual = {
                modernization: ModernizationVisual,
                platform: PlatformVisual,
                highload: HighloadVisual,
                erp: ERPVisual,
                security: SecurityVisual
              }[item.type as string] || (() => null);

              const Icon = {
                modernization: RefreshCcw,
                platform: Workflow,
                highload: Cpu,
                erp: Database,
                security: ShieldCheck
              }[item.type as string] || Layers;

              return (
                <motion.div 
                  key={idx}
                  className={`${styles.stackedPanel} ${styles[item.type as string]}`}
                  style={{ top: `${100 + idx * 40}px` }}
                >
                  <div className={styles.panelAccentLine} />
                  <div className={styles.panelGlow} />
                  
                  <div className={styles.cardVisualContainer}>
                    <Visual />
                  </div>

                  <div className={styles.panelInner}>
                    <div className={styles.panelColLeft}>
                      <div className={styles.panelProgress}>
                        <span className={styles.progressNum}>0{idx + 1}</span>
                        <div className={styles.progressLine} />
                      </div>
                      <div className={styles.suitableCompact}>
                        <div className={styles.suitableLabelRow}>
                          <CheckCircle2 size={14} className={styles.checkIcon} />
                          <span className={styles.suitableLabel}>Подходит, если:</span>
                        </div>
                        <p className={styles.suitableText}>{item.suitable}</p>
                      </div>
                    </div>

                    <div className={styles.panelColCenter}>
                      <div className={styles.titleWithIcon}>
                        <Icon className={styles.serviceTypeIcon} size={24} />
                        <h3 className={styles.panelTitleLarge}>{item.title}</h3>
                      </div>
                      <p className={styles.panelSubtitleSmall}>{item.subtitle}</p>
                      <p className={styles.panelDescMain}>{item.desc}</p>
                    </div>

                    <div className={styles.panelColRight}>
                      <div className={styles.panelMetrics}>
                        <div className={styles.metricItem}>
                          <span className={styles.metricLabel}>Срок реализации</span>
                          <span className={styles.metricValue}>{item.period}</span>
                        </div>
                        <div className={styles.metricItem}>
                          <span className={styles.metricLabel}>Инвестиции</span>
                          <span className={styles.metricValue}>{item.investment}</span>
                        </div>
                      </div>
                      {(item as any).href ? (
                        <Link href={(item as any).href} className={styles.panelCTA}>
                          <span>{item.cta}</span>
                          <ArrowRight className={styles.ctaArrow} size={18} />
                        </Link>
                      ) : (
                        <button 
                          onClick={() => setIsAuditOpen(true)}
                          className={styles.panelCTA}
                        >
                          <span>{item.cta}</span>
                          <ArrowRight className={styles.ctaArrow} size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURAL COMPARISON */}
      <section className={styles.comparisonSection}>
        <div className={styles.section}>
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={revealVariants} 
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Почему бизнес переходит на Kibex</span>
            <h2 className={styles.diagTitle}>Разница между ограниченной CMS и платформой без потолка</h2>
            <p className={styles.diagSubtitle}>
              Разница между системой, которая тормозит рост, и платформой, рассчитанной на долгосрочное развитие.
            </p>
          </motion.div>

          <div className={styles.splitComparison}>
            <div className={styles.compareCol}>
              <div className={styles.compareHeader}>
                <span className={styles.statusLabel} style={{ color: '#ef4444' }}>Ограничения типовых CMS</span>
                <h3 className={styles.compareColTitle}>WordPress, Bitrix, OpenCart</h3>
              </div>
              <div className={styles.compareList}>
                {[
                  { title: "Система требует постоянных доработок", desc: "Каждое изменение усложняет поддержку и увеличивает стоимость развития." },
                  { title: "Риски безопасности растут", desc: "Сторонние плагины создают дополнительные точки уязвимости." },
                  { title: "Интеграции работают нестабильно", desc: "Обмен данными с 1С и CRM сопровождается ошибками и задержками." },
                  { title: "Платформа тормозит при росте", desc: "Увеличение каталога и трафика напрямую влияет на производительность." },
                  { title: "Стоимость поддержки растёт", desc: "Чем больше бизнес, тем дороже обходится сопровождение." }
                ].map((item, i) => (
                  <div key={i} className={styles.compareItemLegacy}>
                    <div className={styles.legacyIndicator} />
                    <div className={styles.itemContent}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <p className={styles.itemDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.compareDivider} />

            <div className={styles.compareCol}>
              <div className={styles.compareHeader}>
                <span className={styles.statusLabel} style={{ color: '#4633ff' }}>Платформа Kibex</span>
                <h3 className={styles.compareColTitle}>Рассчитана на рост</h3>
              </div>
              <div className={styles.compareList}>
                {[
                  { title: "Система развивается вместе с бизнесом", desc: "Новая функциональность внедряется без архитектурных ограничений." },
                  { title: "Безопасность на уровне системы", desc: "Защита проектируется изначально, а не добавляется после запуска." },
                  { title: "Стабильные интеграции", desc: "Прямое подключение к 1С, ERP и CRM с контролируемым обменом данными." },
                  { title: "Высокая производительность", desc: "Платформа сохраняет скорость даже при росте каталога и трафика." },
                  { title: "Прогнозируемая стоимость развития", desc: "Архитектура позволяет развивать систему без переработки основ." }
                ].map((item, i) => (
                  <div key={i} className={styles.compareItemKibex}>
                    <div className={styles.kibexIndicator}><CheckCircle2 size={18} /></div>
                    <div className={styles.itemContent}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <p className={styles.itemDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.comparisonFooter}>
            <p className={styles.footerQuote}>
              Если система требует постоянных компромиссов, проблема не в доработках — <span style={{ color: '#4633ff' }}>проблема в платформе</span>.
            </p>
          </div>
        </div>
      </section>



      {/* 7. PRACTICAL CASES */}
      <section className={styles.casesSection}>
        <div className={styles.section}>
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={revealVariants} 
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Результаты проектов</span>
            <h2 className={styles.diagTitle}>Что получили клиенты Kibex</h2>
            <p className={styles.diagSubtitle}>
              Каждый проект строится вокруг бизнес-задачи: роста, стабильности и долгосрочного развития платформы.
            </p>
          </motion.div>

          <div className={styles.casePanelsStack}>
            {[
              {
                category: "Премиальный fashion-ритейлер",
                metric: "320%",
                metricLabel: "Рост онлайн-конверсии",
                title: "Миграция и архитектурная реконструкция",
                desc: "Полная миграция с устаревшей платформы на новую архитектуру с сохранением SEO, каталога и бизнес-процессов.",
                solution: "Устранены ограничения коробочной CMS, внедрен высокопроизводительный фронтенд и оптимизирована работа с базой данных.",
                stack: ["Рост конверсии", "Скорость загрузки", "Миграция без потерь"]
              },
              {
                category: "Крупный B2B-дистрибьютор",
                metric: "40",
                metricSuffix: " мс",
                metricLabel: "Синхронизация каталога",
                title: "Инфраструктура для 500 000+ SKU",
                desc: "Разработана система обмена данными для высоконагруженного каталога с интеграцией 1С и складской инфраструктуры.",
                solution: "Реализована микросервисная архитектура и распределенная система кэширования для мгновенного обновления остатков.",
                stack: ["Стабильность под нагрузкой", "Быстрая синхронизация", "Высокая производительность"]
              },
              {
                category: "Национальная e-commerce сеть",
                metric: "68%",
                metricLabel: "Снижение времени обработки",
                title: "Оптимизация интеграционного контура",
                desc: "Реконструкция системы взаимодействия между платформой, CRM и логистическими сервисами для ускорения потока заказов.",
                solution: "Централизация управления заказами и автоматизация сквозных бизнес-процессов через надежный API-слой.",
                stack: ["Ускорение процессов", "Надёжные интеграции", "Масштабирование"]
              }
            ].map((caseItem, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={styles.casePanel}
              >
                <div className={styles.casePanelInner}>
                  <div className={styles.caseColLeft}>
                    <span className={styles.caseCategory}>{caseItem.category}</span>
                  </div>

                  <div className={styles.caseColCenter}>
                    <div className={styles.caseMetricWrap}>
                      <span className={styles.caseMetricValue}>
                        {caseItem.metric}
                        {caseItem.metricSuffix}
                      </span>
                      <span className={styles.caseMetricLabel}>{caseItem.metricLabel}</span>
                    </div>
                    <h3 className={styles.caseTitle}>{caseItem.title}</h3>
                    <p className={styles.caseDesc}>{caseItem.desc}</p>
                    
                    <div className={styles.caseSolutionDetail}>
                      <span className={styles.solutionTag}>Что было решено:</span>
                      <p className={styles.solutionText}>{caseItem.solution}</p>
                    </div>
                  </div>

                  <div className={styles.caseColRight}>
                    <div className={styles.caseStack}>
                      <span className={styles.stackLabel}>Технологии проекта</span>
                      <div className={styles.stackTags}>
                        {caseItem.stack.map((tag, j) => (
                          <span key={j} className={styles.caseStackTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <button className={styles.caseCTA}>Подробнее</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ENGINEERING BASE (ARCHITECTURAL LAYERS) */}
      <section className={styles.techBaseSection}>
        <div className={styles.section}>
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={revealVariants} 
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Технологическая база Kibex</span>
            <h2 className={styles.diagTitle}>Модерные технологии для стабильных платформ</h2>
            <p className={styles.diagSubtitle}>
              Мы не используем шаблоны. Мы проектируем системы, рассчитанные на высокую нагрузку, безопасность и долгосрочное развитие.
            </p>
          </motion.div>
          <div className={styles.architectureVisual}>
            {[
              {
                id: "interface",
                color: "#3b82f6",
                label: "Пользовательский интерфейс",
                title: "Интерфейс и скорость",
                tech: "Next.js · React · TypeScript",
                purpose: "Создание высокопроизводительных интерфейсов для e-commerce платформ.",
                benefits: [
                  "Мгновенная загрузка страниц",
                  "SEO-оптимизация на уровне рендеринга",
                  "Стабильная работа при высокой нагрузке",
                  "Сложные интерфейсы без потери скорости"
                ]
              },
              {
                id: "logic",
                color: "#10b981",
                label: "Бизнес-логика системы",
                title: "Обработка заказов и интеграции",
                tech: "Node.js · Go",
                purpose: "Обработка заказов, каталога и интеграций с внешними системами.",
                benefits: [
                  "Обработка тысяч операций в секунду",
                  "Стабильная работа каталога и заказов",
                  "Интеграции с 1С, ERP и CRM без задержек",
                  "Предсказуемое поведение системы под нагрузкой"
                ]
              },
              {
                id: "infra",
                color: "#f59e0b",
                label: "Инфраструктура платформы",
                title: "Отказоустойчивая инфраструктура",
                tech: "Очереди сообщений · распределённые сервисы · API-first",
                purpose: "Масштабируемость и надёжность платформы при любой нагрузке.",
                benefits: [
                  "Работа без простоев при росте трафика",
                  "Синхронизация данных в реальном времени",
                  "Устойчивость к пиковым нагрузкам",
                  "Отсутствие единых точек отказа"
                ]
              },
              {
                id: "security",
                color: "#ef4444",
                label: "Архитектура безопасности",
                title: "Безопасность платформы",
                tech: "OWASP · security-by-design",
                purpose: "Защита системы и данных на уровне архитектуры, а не дополнений.",
                benefits: [
                  "Снижение риска взломов и утечек данных",
                  "Защита пользовательских данных",
                  "Проверка безопасности на этапе разработки",
                  "Соответствие современным стандартам защиты"
                ]
              }
            ].map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className={styles.archLayer}
                style={{ zIndex: 10 - i }}
              >
                <div className={styles.layerContent}>
                  <div className={styles.layerHeader}>
                    <div className={styles.layerColorTag} style={{ background: layer.color }} />
                    <span className={styles.layerLabel}>{layer.label}</span>
                  </div>
                  <h3 className={styles.layerTitle}>{layer.title}</h3>
                  <div className={styles.layerTech}>{layer.tech}</div>
                  <div className={styles.layerBody}>
                    <div className={styles.layerPurpose}>
                      <span className={styles.metaLabel}>Назначение:</span>
                      <p>{layer.purpose}</p>
                    </div>
                    <div className={styles.layerBenefits}>
                      <span className={styles.metaLabel}>Для бизнеса:</span>
                      <ul className={styles.benefitList}>
                        {layer.benefits.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.architectureLogic}>
            <div className={styles.logicGrid}>
              <div className={styles.logicBox}>
                <h4 className={styles.logicHeader}>Почему это важно</h4>
                <div className={styles.logicCompare}>
                  <div className={styles.compareItem}>
                    <span className={styles.compareX}>❌</span>
                    <p>Шаблонные решения, плагины и накопление технического долга.</p>
                  </div>
                  <div className={styles.compareItem}>
                    <span className={styles.compareCheck}>✔</span>
                    <p>Разделённые уровни, независимые компоненты и полный контроль.</p>
                  </div>
                </div>
              </div>
              <div className={styles.logicBox}>
                <h4 className={styles.logicHeader}>Результат для бизнеса</h4>
                <ul className={styles.resultList}>
                  <li>Стабильная работа при росте нагрузки</li>
                  <li>Предсказуемая стоимость развития</li>
                  <li>Отсутствие технических блокеров</li>
                  <li>Масштабирование без миграций</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INVESTMENT IN ARCHITECTURE (CARD-BASED PRICING) */}
      <section className={styles.investmentSection}>
        <div className={styles.section}>
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={revealVariants} 
            className={styles.sectionHeader}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <span className={styles.panelLabel}>Стоимость и подход</span>
            <h2 className={styles.diagTitle}>Цены на разработку платформ</h2>
            <p className={styles.diagSubtitle} style={{ margin: '16px auto', maxWidth: '800px' }}>
              Каждый проект оценивается индивидуально после технического анализа. Мы оцениваем не объём работы, а сложность системы.
            </p>
          </motion.div>

          <div className={styles.pricingGrid}>
            {[
              {
                id: "mod",
                title: "Модернизация платформ",
                systems: "WordPress · Bitrix · Legacy",
                complexity: "Высокий",
                complexityValue: 75,
                features: ["Архитектурная реконструкция", "Миграция без потери SEO", "Устранение техдолга"],
                period: "3–6 месяцев",
                investment: "от 1.5 млн ₽"
              },
              {
                id: "custom",
                title: "Разработка экосистем",
                systems: "Digital products · B2B platforms",
                complexity: "Энтерпрайз",
                complexityValue: 95,
                features: ["Проектирование с нуля", "Масштабируемая система", "Полная независимость"],
                period: "4–9 месяцев",
                investment: "от 2.5 млн ₽"
              },
              {
                id: "highload",
                title: "Высоконагруженные платформы",
                systems: "Million+ SKU · 10k+ RPS",
                complexity: "Экстремальный",
                complexityValue: 100,
                features: ["Микросервисы", "Распределенные БД", "Оптимизация отклика"],
                period: "индивидуально",
                investment: "от 3 млн ₽"
              },
              {
                id: "security",
                title: "Кибербезопасность",
                systems: "Critical assets",
                complexity: "Высокий",
                complexityValue: 85,
                features: ["Security hardening", "Аудит уязвимостей", "Защита данных"],
                period: "2–6 недель",
                investment: "от 150к ₽"
              },
              {
                id: "erp",
                title: "Корпоративные ERP",
                systems: "Internal infrastructure",
                complexity: "Энтерпрайз",
                complexityValue: 90,
                features: ["Автоматизация процессов", "Финансовый контроль", "Логистика и склад"],
                period: "4–9 месяцев",
                investment: "от 3.5 млн ₽"
              }
            ].map((card, i) => (
              <motion.div 
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={styles.pricingCard}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <span className={styles.cardSystems}>{card.systems}</span>
                </div>
                
                <div className={styles.complexityWrap}>
                  <div className={styles.complexityMeta}>
                    <span className={styles.complexityLabel}>Уровень сложности</span>
                    <span className={styles.complexityValueName}>{card.complexity}</span>
                  </div>
                  <div className={styles.complexityBar}>
                    <motion.div 
                      className={styles.complexityFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.complexityValue}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className={styles.cardDetails}>
                  <ul className={styles.cardFeatureList}>
                    {card.features.map((feat, j) => (
                      <li key={j}>{feat}</li>
                    ))}
                  </ul>
                  
                  <div className={styles.cardFooterReveal}>
                    <div className={styles.footerMetric}>
                      <span className={styles.footerLabel}>Срок:</span>
                      <span className={styles.footerValue}>{card.period}</span>
                    </div>
                    <div className={styles.footerMetric}>
                      <span className={styles.footerLabel}>Инвестиции:</span>
                      <span className={styles.footerValue}>{card.investment}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div 
              className={styles.pricingCTA}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.ctaContent}>
                <h3>Обсудить проект</h3>
                <p>Получите точную оценку стоимости и сроков вашего решения.</p>
                <button onClick={() => setIsAuditOpen(true)} className={styles.ctaPulseBtn}>Получить оценку</button>
              </div>
            </motion.div>
          </div>

          <div className={styles.pricingLogic}>
            <div className={styles.logicGrid}>
              <div className={styles.logicBox}>
                <h4 className={styles.logicHeader}>Почему нет фиксированных тарифов</h4>
                <div className={styles.logicCompare}>
                  <div className={styles.compareItem}>
                    <span className={styles.compareX}>❌</span>
                    <p>Фикс-прайс искажает реальную сложность и создает скрытые компромиссы в архитектуре.</p>
                  </div>
                  <div className={styles.compareItem}>
                    <span className={styles.compareCheck}>✔</span>
                    <p>Цена — это отражение сложности системы (нагрузка, интеграции, критичность данных).</p>
                  </div>
                </div>
              </div>
              <div className={styles.logicBox}>
                <h4 className={styles.logicHeader}>Что получает бизнес</h4>
                <ul className={styles.resultList}>
                  <li>Точная инженерная оценка системы</li>
                  <li>Прогнозируемая стоимость развития</li>
                  <li>Отсутствие архитектурных блокеров</li>
                  <li>Система, рассчитанная на рост</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. KNOWLEDGE BASE (FAQ) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
          <span className={styles.panelLabel}>Частые вопросы</span>
          <h2 className={styles.diagTitle}>Отвечаем на главные вопросы</h2>
          <p className={styles.diagSubtitle} style={{ margin: '16px auto', maxWidth: '700px' }}>
            Всё, что важно знать перед началом работы с Kibex.
          </p>
        </div>

        <div className={styles.faqWrap}>
          {[
            {
              q: "Почему вы не работаете по фиксированной цене?",
              a: "Каждая платформа уникальна по сложности, нагрузке и интеграциям. Фиксированная цена приводит к скрытым компромиссам: упрощению системы, снижению надёжности и проблемам при росте. Мы оцениваем проект только после технического анализа — это даёт вам точный бюджет без неприятных сюрпризов."
            },
            {
              q: "Почему технический аудит оплачивается отдельно?",
              a: "Аудит — это полноценный этап работы. Мы анализируем текущую платформу, выявляем узкие места, оцениваем риски и проектируем будущую архитектуру. На выходе вы получаете чёткую техническую основу для принятия решений и точного расчёта стоимости."
            },
            {
              q: "Что входит в технический аудит?",
              a: "Анализ текущей платформы и её ограничений, проверка интеграций с 1С, ERP и CRM, оценка производительности под нагрузкой, анализ рисков безопасности и рекомендации по развитию системы."
            },
            {
              q: "Можно ли улучшить платформу без полной переработки?",
              a: "Зависит от текущего состояния системы. Если платформа модульная и без критических проблем — возможна поэтапная модернизация. Если система устарела (WordPress, Bitrix, legacy) — требуется полная реконструкция."
            },
            {
              q: "Сколько времени занимает разработка корпоративных систем?",
              a: "Модернизация CMS — 3–6 месяцев. Разработка ERP систем с нуля — 4–9 месяцев. Технический аудит — 2–4 недели. Точные сроки определяются после анализа вашей архитектуры."
            },
            {
              q: "Чем Kibex отличается от обычной веб-студии?",
              a: "Мы не делаем сайты. Мы проектируем цифровые платформы и корпоративную инфраструктуру, рассчитанную на развитие, высокие нагрузки и операционную стабильность. Наш фокус — на инженерной надежности системы."
            },
            {
              q: "Как обеспечивается кибербезопасность платформы?",
              a: "Безопасность проектируется на уровне архитектуры (security-by-design). Мы внедряем протоколы защиты данных, проводим аудит уязвимостей и обеспечиваем соответствие современным стандартам безопасности."
            }
          ].map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Почему вы не работаете по фиксированной цене?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Сложные цифровые платформы невозможно корректно оценить без анализа архитектуры и интеграционного контура. Фиксированная цена приводит к скрытым компромиссам в архитектуре и снижению масштабируемости системы."
                }
              },
              {
                "@type": "Question",
                "name": "Почему архитектурный аудит оплачивается отдельно?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Discovery-фаза — это инженерный этап, включающий анализ архитектуры, выявление узких мест, оценку рисков и формирование будущей архитектурной схемы системы."
                }
              },
              {
                "@type": "Question",
                "name": "Что входит в архитектурный аудит системы?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Аудит включает анализ backend и frontend архитектуры, интеграций, нагрузочного профиля, безопасности (OWASP) и рекомендации по масштабированию."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли модернизировать сайт без полной переработки?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, если архитектура позволяет. При наличии модульной системы возможна поэтапная модернизация, иначе требуется полная реконструкция."
                }
              },
              {
                "@type": "Question",
                "name": "Сколько времени занимает разработка платформы?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Модернизация занимает 3–6 месяцев, разработка с нуля 4–9 месяцев, аудит 2–4 недели. Точные сроки определяются после анализа архитектуры."
                }
              },
              {
                "@type": "Question",
                "name": "Чем Kibex отличается от обычной веб-разработки?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kibex разрабатывает не сайты, а цифровые архитектуры, ERP системы и распределённые высоконагруженные платформы с фокусом на масштабируемость, безопасность и отказоустойчивость."
                }
              },
              {
                "@type": "Question",
                "name": "Как обеспечивается безопасность системы?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Безопасность встроена в архитектуру: используется OWASP, DevSecOps, моделирование угроз и предварительная security-валидация перед запуском."
                }
              }
            ]
          })
        }}
      />

      {/* NEW: ЧТО ПОЛУЧАЕТ БИЗНЕС */}
      <section className={styles.cycleSection}>
        <div className={styles.section}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={revealVariants}
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Результат для бизнеса</span>
            <h2 className={styles.panelTitle}>Что получает бизнес после запуска</h2>
          </motion.div>
          <div className={styles.timeline}>
            {[
              { title: "Цифровую инфраструктуру без техдолга", desc: "Система развивается вместе с бизнесом — без переработок и миграций при увеличении нагрузки." },
              { title: "Операционную стабильность", desc: "Платформа сохраняет скорость и надёжность даже при пиковом трафике и огромном каталоге." },
              { title: "Технологическую независимость", desc: "Полный контроль над платформой без привязки к ограниченным CMS и сторонним вендорам." },
              { title: "Безопасную среду управления", desc: "Вы владеете архитектурой, кодом и данными — с гарантированным уровнем защиты." },
              { title: "Предсказуемое развитие", desc: "Новые функции и ERP-модули внедряются без риска нарушения текущих бизнес-процессов." },
              { title: "Устойчивость бизнес-процессов", desc: "Платформа готова к любым вызовам — вы развиваете компанию, опираясь на надежный фундамент." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.timelineStep}
              >
                <div className={styles.stepLine} />
                <span className={styles.stepNumber}>0{idx + 1}</span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: TRUST SECTION */}
      <section className={styles.comparisonSection}>
        <div className={styles.section}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={revealVariants}
            className={styles.sectionHeader}
          >
            <span className={styles.panelLabel}>Почему компании работают с Kibex</span>
            <h2 className={styles.diagTitle}>Не технологии. Надёжность.</h2>
            <p className={styles.diagSubtitle}>
              Мы не продаём стек технологий. Мы берём на себя ответственность за стабильность вашего бизнеса при росте.
            </p>
          </motion.div>
          <div className={styles.splitComparison} style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: "Ответственность", desc: "Мы несём ответственность за результат, а не только за выполнение задач. Если система работает — значит, мы справились." },
              { title: "Системный подход", desc: "Каждое решение принимается с учётом долгосрочного развития платформы, а не только текущей задачи." },
              { title: "Прозрачность", desc: "Вы всегда знаете, что происходит с проектом, какие решения принимаются и почему." },
              { title: "Долгосрочное партнёрство", desc: "Мы работаем не на запуск — мы работаем на то, чтобы платформа развивалась вместе с вашим бизнесом годами." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={styles.compareItemKibex}
                style={{ padding: '32px', borderRadius: '12px', background: 'rgba(70,51,255,0.05)', border: '1px solid rgba(70,51,255,0.15)' }}
              >
                <div className={styles.itemContent}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles.comparisonFooter}>
            <p className={styles.footerQuote}>
              Kibex — это <span style={{ color: '#4633ff' }}>спокойствие бизнеса при росте</span>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <SolutionPopup isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
    </div>
  );
}
