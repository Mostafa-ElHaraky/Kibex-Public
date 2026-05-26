"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Shield, AlertTriangle, Lock, Check, ArrowRight, Database, Cpu, Globe, Network, ShieldCheck } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SecurityAssessmentPopup from "./SecurityAssessmentPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Schema from "../../../components/Schema";
import s from "./security.module.css";

const necessitySteps = [
  { title: "Работа с персональными данными", desc: "Система хранит данные клиентов, телефоны, адреса и платёжную информацию." },
  { title: "Высокий оборот продаж", desc: "Даже кратковременный инцидент может привести к значительным финансовым потерям." },
  { title: "Подозрительная активность", desc: "Необычные входы, ошибки или нестабильная работа платформы." },
  { title: "После изменений в системе", desc: "Интеграции, новые функции или обновление инфраструктуры." },
];

const threats = [
  { id: "api", name: "API Exposure", label: "Защита API эндпоинтов", desc: "Обнаружение недокументированных маршрутов, отсутствия авторизации и утечек чувствительных метаданных.", cx: 120, cy: 230 },
  { id: "auth", name: "Broken Auth", label: "Механизмы авторизации", desc: "Проверка управления сессиями, JWT-токенов, прав доступа (RBAC/ABAC) и уязвимостей перебора.", cx: 480, cy: 230 },
  { id: "sql", name: "SQL Injection", label: "Безопасность БД", desc: "Анализ SQL-инъекций, инъекций команд и фильтрации пользовательского ввода.", cx: 160, cy: 100 },
  { id: "config", name: "Misconfiguration", label: "Конфигурация серверов", desc: "Поиск открытых портов, небезопасных SSL/TLS шифров и ошибок в правах доступа к файлам.", cx: 440, cy: 100 },
  { id: "deps", name: "Dependency Risks", label: "Цепочки поставок", desc: "Сканирование сторонних пакетов, библиотек и Docker-контейнеров на известные уязвимости (CVE).", cx: 300, cy: 350 }
];

const pipelineSteps = [
  {
    id: "01",
    title: "Анализ",
    desc: "Изучение системы и моделирование угроз",
    methodology: "Анализ архитектуры, определение точек входа, составление вектора угроз.",
    tools: "Draw.io, Threat Dragon, OWASP Threat Dragon",
    scope: [
      "Анализ архитектуры API и интеграций",
      "Определение внешнего периметра атаки",
      "Моделирование сценариев компрометации",
      "Оценка защищенности каналов передачи данных"
    ]
  },
  {
    id: "02",
    title: "Сканирование",
    desc: "Автоматический поиск уязвимостей",
    methodology: "Сигнатурный поиск известных CVE, сканирование портов и конфигураций.",
    tools: "Nmap, Nessus, Acunetix, Burp Suite Pro, OWASP ZAP",
    scope: [
      "Поиск открытых небезопасных портов",
      "Определение версий сервисов и известных CVE",
      "Автоматизированный поиск XSS и инъекций",
      "Анализ SSL/TLS конфигураций"
    ]
  },
  {
    id: "03",
    title: "Тестирование",
    desc: "Ручной аудит и симуляция атак",
    methodology: "Ручной пентест веб-приложения и API по методологиям OWASP Top 10.",
    tools: "Burp Suite, Postman, custom Python scripts",
    scope: [
      "Обход проверок авторизации и аутентификации",
      "Валидация сессий и JWT токенов",
      "Поиск инъекций и внедрения сущностей (XXE)",
      "Проверка ограничений ролевой модели (RBAC)"
    ]
  },
  {
    id: "04",
    title: "Проверка логики",
    desc: "Анализ цепочек бизнес-логики",
    methodology: "Поиск нестандартных логических ошибок, специфичных для e-commerce и ERP.",
    tools: "Manual interaction, API manipulation",
    scope: [
      "Подмена стоимости и количества товаров",
      "Манипуляции со статусами заказов",
      "Анализ механизмов применения промокодов",
      "Escalation уязвимостей в цепочки атак"
    ]
  },
  {
    id: "05",
    title: "Отчёт",
    desc: "Документирование результатов",
    methodology: "Формирование технического отчета и плана remediation с приоритетами.",
    tools: "CVSS v3 calculator, PDF report generation",
    scope: [
      "Классификация уязвимостей по CVSS v3",
      "Описание шагов для воспроизведения (PoC)",
      "Конкретные рекомендации по исправлению",
      "Оценка влияния рисков на бизнес-процессы"
    ]
  },
  {
    id: "06",
    title: "Повторная проверка",
    desc: "Верификация исправлений",
    methodology: "Контрольное тестирование устраненных уязвимостей.",
    tools: "Burp Suite, custom scripts",
    scope: [
      "Проверка закрытия ранее найденных дыр",
      "Регрессионное тестирование безопасности",
      "Выдача финального заключения о защищенности",
      "Консультация инженеров заказчика"
    ]
  }
];

const ecosystemSystems = [
  { id: "ecom", title: "E-commerce платформы", nodeLabel: "E-COM", cx: 120, cy: 110, desc: "Проверка платежных потоков, корзины, личных кабинетов и защищённости каталогов товаров." },
  { id: "erp", title: "ERP-системы", nodeLabel: "ERP", cx: 300, cy: 70, desc: "Контроль интеграции с 1С, управления остатками и целостности логистических процессов." },
  { id: "crm", title: "CRM-системы", nodeLabel: "CRM", cx: 480, cy: 110, desc: "Защита персональных данных клиентов, истории сделок и механизмов автоматизации коммуникаций." },
  { id: "api", title: "API-инфраструктура", nodeLabel: "API", cx: 120, cy: 290, desc: "Аудит внешних и внутренних API, механизмов OAuth2/JWT и ограничений частоты запросов." },
  { id: "portals", title: "Корпоративные порталы", nodeLabel: "ПОРТАЛЫ", cx: 300, cy: 330, desc: "Анализ разграничения прав доступа сотрудников и защиты внутренней информации компании." },
  { id: "mobile", title: "Мобильные приложения", nodeLabel: "MOBILE", cx: 480, cy: 290, desc: "Проверка безопасности мобильного API, хранения сессий и локальных пользовательских данных." }
];

const matrixItems = [
  { id: "auth", title: "Авторизация", check: "Проверка механизмов входа, авторизации и сессий.", risk: "Обход входа, кража сессионных cookie." },
  { id: "api", title: "API эндпоинты", check: "Аудит всех публичных и внутренних API маршрутов.", risk: "Утечка конфиденциальных данных клиентов." },
  { id: "infra", title: "Инфраструктура", check: "Поиск открытых портов, небезопасных SSL шифров.", risk: "Несанкционированный доступ на уровне OS." },
  { id: "db", title: "Базы данных", check: "Анализ фильтрации ввода, уязвимости SQL инъекций.", risk: "Чтение, подмена или удаление базы данных." },
  { id: "front", title: "Frontend", check: "Проверка защищенности клиентского JS, XSS уязвимостей.", risk: "Внедрение вредоносных скриптов, фишинг." },
  { id: "cicd", title: "CI/CD пайплайны", check: "Аудит прав доступа к сборкам, утечки секретов.", risk: "Внедрение вредного кода в прод-версию." },
  { id: "rbac", title: "RBAC доступ", check: "Контроль ролевой модели (админ/менеджер/клиент).", risk: "Повышение привилегий обычного пользователя." },
  { id: "integrations", title: "Интеграции", check: "Анализ безопасности внешних шин, CRM, ERP, 1С.", risk: "Несанкционированное проведение платежей." },
  { id: "logs", title: "Логирование", check: "Проверка полноты записи событий безопасности.", risk: "Скрытие следов действий хакера." },
  { id: "containers", title: "Контейнеры", check: "Аудит Docker-контейнеров, K8s и лимитов памяти.", risk: "Побег из контейнера, DDoS хост-системы." }
];

const faqs = [
  { q: "Что входит в аудит безопасности?", a: "Комплексная проверка: анализ кода, API, инфраструктуры и имитация реальных атак по методологии OWASP." },
  { q: "Проводится ли ручное тестирование?", a: "Да. Автоматика находит 60% проблем. Остальные 40% — ошибки логики и сложные цепочки, которые находят только эксперты вручную." },
  { q: "Нужно ли останавливать работу системы?", a: "Нет. Тесты проводятся в щадящем режиме или на staging-копии, без влияния на ваших пользователей." },
  { q: "Сколько занимает проверка?", a: "От 5 до 15 рабочих дней в зависимости от сложности архитектуры." },
];



export default function SecurityAuditPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeNecessityIndex, setActiveNecessityIndex] = useState(0);
  const [activeThreat, setActiveThreat] = useState<string | null>(null);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [activeReportTab, setActiveReportTab] = useState("summary");
  const [activeEcosystemNode, setActiveEcosystemNode] = useState<string | null>(null);
  const [activeEcosystemPathIndex, setActiveEcosystemPathIndex] = useState(0);

  const [formData, setFormData] = useState({ name: "", contact: "", platform: "", task: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const timelineRef = useRef(null);

  // Sync scroll percentage to draw vertical line in necessity timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"]
  });

  // Smooth scroll progression line
  const timelineScaleY = useSpring(scrollYProgress, { stiffness: 45, damping: 18 });

  // 1. Automatic timeline node cycle
  useEffect(() => {
    const t = setInterval(() => {
      setActiveNecessityIndex(prev => (prev + 1) % necessitySteps.length);
    }, 4500); // Slower visual rhythm
    return () => clearInterval(t);
  }, []);

  // 2. Automatic ecosystem connection path crawl trigger
  useEffect(() => {
    const t = setInterval(() => {
      setActiveEcosystemPathIndex(prev => (prev + 1) % ecosystemSystems.length);
    }, 4000); // Slow synchronization
    return () => clearInterval(t);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSent(true);
    }, 1800); // Quiet confidence progress animation duration
  };

  const reportTabs = [
    {
      id: "summary",
      title: "Сводка рисков",
      header: "ИНФРАСТРУКТУРНЫЙ ОТЧЁТ ПО РИСКАМ БЕЗОПАСНОСТИ",
      docRef: "REF-SEC-2026-08A",
      content: (
        <div className={s.reportPage}>
          <div className={s.reportMeta}>
            <span>ЦЕЛЕВАЯ СРЕДА: kibex-production-cluster</span>
            <span>CVSS v3.1 BASE: 8.9 (HIGH)</span>
          </div>
          <h4 className={s.reportTitle}>Сводный отчет по уязвимостям</h4>
          <p className={s.reportText}>
            В ходе аудита было идентифицировано 9 уязвимостей, из которых 2 имеют критический приоритет устранения.
          </p>
          <table className={s.reportTable}>
            <thead>
              <tr>
                <th>ID / CVE</th>
                <th>Категория</th>
                <th>Критичность</th>
                <th>Приоритет</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>KIB-2026-01</td>
                <td>Нарушение контроля доступа</td>
                <td style={{ color: "#ef4444", fontWeight: "bold" }}>Критическая</td>
                <td>P0 (Немедленно)</td>
              </tr>
              <tr>
                <td>CVE-2025-4521</td>
                <td>Устаревшая зависимость Docker</td>
                <td style={{ color: "#f97316", fontWeight: "bold" }}>Высокая</td>
                <td>P1 (Следующий релиз)</td>
              </tr>
              <tr>
                <td>KIB-2026-02</td>
                <td>Ошибка конфигурации CORS</td>
                <td style={{ color: "#eab308", fontWeight: "bold" }}>Средняя</td>
                <td>P2 (Планово)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: "api",
      title: "Аудит API",
      header: "ОТЧЁТ ПО БЕЗОПАСНОСТИ API ЭНДПОИНТОВ",
      docRef: "REF-API-2026-02B",
      content: (
        <div className={s.reportPage}>
          <div className={s.reportMeta}>
            <span>МЕТОДОЛОГИЯ: OWASP API Security Top 10</span>
            <span>АКТИВНЫЕ ЭНДПОИНТЫ: 142</span>
          </div>
          <h4 className={s.reportTitle}>Тестирование защищённости API</h4>
          <p className={s.reportText}>
            Обнаружен обход авторизации на чувствительных маршрутах управления заказами.
          </p>
          <div className={s.codeBlock}>
            <div className={s.codeHeader}>HTTP Request Exploit Sample</div>
            <code>
              {`GET /api/v1/orders/89274/invoice HTTP/1.1\nHost: api.kibex.ru\nAuthorization: Bearer [low_privilege_user_token]\n\nResponse: 200 OK (Exposes invoices of other clients)`}
            </code>
          </div>
          <p className={s.reportWarningText}>
            Рекомендация: Внедрить проверку владения ресурсом (resource owner validation) на уровне middleware.
          </p>
        </div>
      )
    },
    {
      id: "infra",
      title: "Инфраструктура",
      header: "АНАЛИЗ ПОРТОВ И БЕЗОПАСНОСТИ КОНТЕЙНЕРОВ",
      docRef: "REF-INF-2026-04C",
      content: (
        <div className={s.reportPage}>
          <div className={s.reportMeta}>
            <span>ЦЕЛЬ: Пространства имен Kubernetes</span>
            <span>ДАТА СКАНИРОВАНИЯ: 2026-05-26</span>
          </div>
          <h4 className={s.reportTitle}>Безопасность среды окружения</h4>
          <p className={s.reportText}>
            Проверка конфигурации оркестратора и изоляции контейнеров.
          </p>
          <table className={s.reportTable}>
            <thead>
              <tr>
                <th>Компонент</th>
                <th>Конфигурация</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ingress Controller</td>
                <td>Только TLS v1.3</td>
                <td style={{ color: "#4ade80", fontWeight: "bold" }}>СООТВЕТСТВУЕТ</td>
              </tr>
              <tr>
                <td>Docker Daemon</td>
                <td>Запуск без root</td>
                <td style={{ color: "#ef4444", fontWeight: "bold" }}>НЕ СООТВЕТСТВУЕТ</td>
              </tr>
              <tr>
                <td>Kube-API Server</td>
                <td>Публичный доступ</td>
                <td style={{ color: "#f97316", fontWeight: "bold" }}>ПРЕДУПРЕЖДЕНИЕ</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: "auth",
      title: "Анализ авторизации",
      header: "ОТЧЁТ ПО АУТЕНТИФИКАЦИИ И УТЕЧКЕ СЕССИЙ",
      docRef: "REF-ATH-2026-05D",
      content: (
        <div className={s.reportPage}>
          <div className={s.reportMeta}>
            <span>МОДУЛЬ: Шлюз авторизации OAuth2 / OIDC</span>
            <span>ВРЕМЯ ЖИЗНИ СЕССИИ: 24ч</span>
          </div>
          <h4 className={s.reportTitle}>Анализ управления сессиями</h4>
          <p className={s.reportText}>
            Токены авторизации сохраняются в LocalStorage без флагов защиты, что повышает риски кражи через XSS.
          </p>
          <div className={s.codeBlock}>
            <div className={s.codeHeader}>Vulnerable Session Token Storage</div>
            <code>
              {`// Current Implementation:\nlocalStorage.setItem('auth_token', jwt_token);\n\n// Hardened Implementation:\ndocument.cookie = "auth_token=jwt_token; Secure; HttpOnly; SameSite=Strict";`}
            </code>
          </div>
        </div>
      )
    },
    {
      id: "recs",
      title: "Рекомендации",
      header: "ПЛАН УСТРАНЕНИЯ УЯЗВИМОСТЕЙ И УКРЕПЛЕНИЯ",
      docRef: "REF-REC-2026-09E",
      content: (
        <div className={s.reportPage}>
          <div className={s.reportMeta}>
            <span>ДЛЯ КОГО: Команда разработки и эксплуатации</span>
            <span>СТАНДАРТ: CIS Benchmarks</span>
          </div>
          <h4 className={s.reportTitle}>План устранения уязвимостей</h4>
          <p className={s.reportText}>
            Пошаговый план по повышению устойчивости платформы.
          </p>
          <div className={s.stepList}>
            <div className={s.stepListItem}>
              <strong>1. Исправление ролевой модели (API)</strong>
              <span>Внедрение middleware авторизации с валидацией resource-id. (Срок: 1 день, Приоритет: P0)</span>
            </div>
            <div className={s.stepListItem}>
              <strong>2. Изоляция контейнеров</strong>
              <span>Запуск контейнеров от пользователя non-root в манифестах K8s. (Срок: 3 дня, Приоритет: P1)</span>
            </div>
            <div className={s.stepListItem}>
              <strong>3. Обновление CORS-политик</strong>
              <span>Ограничение Access-Control-Allow-Origin только доверенными доменами. (Срок: 1 день, Приоритет: P2)</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const breadcrumbItems = [
    { name: "Решения", item: "/solutions" },
    { name: "Аудит безопасности", item: "/solutions/security" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://kibex.ru" },
      { "@type": "ListItem", "position": 2, "name": "Решения", "item": "https://kibex.ru/solutions" },
      { "@type": "ListItem", "position": 3, "name": "Аудит безопасности", "item": "https://kibex.ru/solutions/security" }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Аудит информационной безопасности",
    "serviceType": "Security Audit / Penetration Testing",
    "provider": { "@type": "Organization", "name": "Kibex" },
    "description": "Комплексный анализ защищенности цифровых платформ: поиск уязвимостей, API-пентест и аудит инфраструктуры по стандартам OWASP.",
    "areaServed": "RU"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <div className={s.page}>
      <Schema data={breadcrumbSchema} />
      <Schema data={serviceSchema} />
      <Schema data={faqSchema} />
      <Header />

      {/* ── HERO ── */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden>
          <div className={s.heroGrid} />
          <div className={s.heroAtmosphere} />
        </div>
        <div className={s.heroInner}>
          <div className={s.heroBreadcrumbs}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <h1 className={s.heroH1}>Аудит безопасности сайтов и веб-приложений</h1>
            <p className={s.heroSubtitle}>
              Находим уязвимости, ошибки конфигурации и риски безопасности до того, как они становятся причиной инцидентов и потери данных.
            </p>
            <p className={s.heroBusiness}>
              Безопасность платформы напрямую влияет на доверие клиентов, стабильность продаж и защиту данных компании.
            </p>
            <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>Запросить аудит</button>
          </motion.div>
        </div>
      </section>

      {/* ── 01. Когда аудит становится необходимым (Risk Timeline) ── */}
      <motion.section
        className={s.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Когда аудит становится необходимым?</h2>
          <div className={s.necessityTimeline} ref={timelineRef}>
            {/* Background line */}
            <div className={s.necessityLine} />

            {/* Progress-driven line drawing */}
            <motion.div
              className={s.necessityActiveLine}
              style={{ scaleY: timelineScaleY, transformOrigin: "top" }}
            />

            {/* Faint monitoring packet traveling slowly down the active line */}
            <motion.div
              className={s.necessitySignalDot}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            />

            {necessitySteps.map((card, i) => {
              const isActive = activeNecessityIndex === i;
              return (
                <motion.div
                  key={i}
                  className={`${s.necessityRow} ${isActive ? s.necessityActive : ""}`}
                  onMouseEnter={() => setActiveNecessityIndex(i)}
                  whileHover="hovered"
                >
                  <div className={s.necessityNodeWrapper}>
                    <motion.div
                      className={s.necessityNode}
                      variants={{
                        hovered: { scale: 1.15 }
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className={s.necessityPulse} />
                    </motion.div>
                  </div>
                  <div className={s.necessityContent}>
                    <h3 className={s.necessityTitle}>{card.title}</h3>
                    <p className={s.necessityDesc}>{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ── 02. Поверхность угроз (Threat Surface Map) ── */}
      <motion.section
        className={s.section}
        style={{ background: "rgba(255,255,255,0.01)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Поверхность угроз</h2>
          <p className={s.sectionSubtitle}>
            Архитектурный анализ уязвимых зон цифровой платформы, требующих постоянного контроля защищённости.
          </p>
          <div className={s.threatsContent}>
            {/* Faint almost invisible background grid animation */}
            <div className={s.threatsGridBg} />

            <div className={s.threatsList}>
              {threats.map((threat) => (
                <div key={threat.id}
                  className={`${s.threatItem} ${activeThreat === threat.id ? s.threatActive : ""}`}
                  onMouseEnter={() => setActiveThreat(threat.id)}
                  onMouseLeave={() => setActiveThreat(null)}>
                  <div className={s.threatHeader}>
                    <span className={s.threatBullet} />
                    <span className={s.threatName}>{threat.name}</span>
                  </div>
                  <p className={s.threatLabel}>{threat.label}</p>
                  <AnimatePresence>
                    {activeThreat === threat.id && (
                      <motion.p className={s.threatDesc}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 0.7 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}>
                        {threat.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className={s.threatVisual}>
              <svg viewBox="0 0 600 450" className={s.threatSvg}>
                {threats.map((t) => {
                  const isActive = activeThreat === t.id;
                  return (
                    <g key={t.id}>
                      <line x1="300" y1="210" x2={t.cx} y2={t.cy}
                        className={isActive ? s.ecoActiveLine : s.ecoLine}
                        stroke={isActive ? "rgba(129, 140, 248, 0.4)" : "rgba(255,255,255,0.04)"}
                        strokeWidth={isActive ? 2 : 1.5}
                        strokeDasharray={isActive ? "none" : "4 4"} />
                      {/* Tiny data packets moving occasionally */}
                      <motion.circle
                        r="2"
                        fill="#818cf8"
                        animate={{
                          cx: [300, t.cx],
                          cy: [210, t.cy],
                          opacity: [0, 0.6, 0]
                        }}
                        transition={{
                          duration: 3.5,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 5.5
                        }}
                      />
                    </g>
                  );
                })}

                <g className={s.coreNode}>
                  <circle cx="300" cy="210" r="45" className={s.coreOuter} />
                  <circle cx="300" cy="210" r="35" className={s.coreInner} />
                  <text x="300" y="206" className={s.coreText} textAnchor="middle">INFRA</text>
                  <text x="300" y="220" className={s.coreSubtext} textAnchor="middle">CORE</text>
                </g>

                {threats.map((t) => {
                  const isActive = activeThreat === t.id;
                  return (
                    <g key={t.id} className={`${s.threatNode} ${isActive ? s.nodeActive : ""}`}
                      onMouseEnter={() => setActiveThreat(t.id)}
                      onMouseLeave={() => setActiveThreat(null)}>
                      <circle cx={t.cx} cy={t.cy} r="25" className={s.nodeBg} />
                      <circle cx={t.cx} cy={t.cy} r="25" className={s.nodeBorder} />

                      {/* Thin vertical scan line sweeping down the threat node on hover */}
                      {isActive && (
                        <motion.line
                          x1={t.cx - 20}
                          y1={t.cy - 20}
                          x2={t.cx + 20}
                          y2={t.cy - 20}
                          stroke="rgba(129, 140, 248, 0.35)"
                          strokeWidth="1"
                          animate={{
                            y1: [t.cy - 20, t.cy + 20],
                            y2: [t.cy - 20, t.cy + 20],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2.2,
                            ease: "easeInOut",
                            repeat: Infinity
                          }}
                        />
                      )}

                      <text x={t.cx} y={t.cy + 4} className={s.nodeText} textAnchor="middle">
                        {t.name.split(" ")[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 03. Как проходит аудит (Security Audit Pipeline) ── */}
      <motion.section
        className={s.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Как проходит аудит безопасности?</h2>
          <p className={s.sectionSubtitle}>Последовательный процесс инженерного анализа защищенности инфраструктуры и кода.</p>

          <div className={s.pipelineContainer}>
            <div className={s.pipelineFlow}>
              <div className={s.pipelineFlowLine} />
              <div className={s.pipelineActiveLine} style={{ width: `${(activePipelineStep / (pipelineSteps.length - 1)) * 100}%` }} />

              {/* Very slow signal packet validation line sweep */}
              <motion.div
                className={s.pipelineSignalPacket}
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 16, ease: "linear", repeat: Infinity }}
              />

              {pipelineSteps.map((step, i) => {
                const isActive = activePipelineStep === i;
                return (
                  <motion.div
                    key={i}
                    className={`${s.pipelineStepNode} ${isActive ? s.pipelineStepNodeActive : ""}`}
                    onMouseEnter={() => setActivePipelineStep(i)}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`${s.pipelineCircle} ${isActive ? s.pipelineCircleActive : ""}`}>
                      {step.id}
                      <div className={s.pipelinePulse} />
                      {isActive && (
                        <svg className={s.pipelineScanRing} viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="46" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeDasharray="15 30" />
                        </svg>
                      )}
                    </div>
                    <span className={s.pipelineNodeTitle}>{step.title}</span>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePipelineStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={s.pipelinePanel}
              >
                <div className={s.pipelineTextSide}>
                  <div className={s.pipelineMetaLine}>
                    <span className={s.pipelineMetaBadge}>Stage {pipelineSteps[activePipelineStep].id}</span>
                  </div>
                  <h3 className={s.pipelinePanelTitle}>{pipelineSteps[activePipelineStep].title}</h3>
                  <p className={s.pipelinePanelDesc}>{pipelineSteps[activePipelineStep].methodology}</p>

                  <div className={s.pipelineTools}>
                    <h5 className={s.pipelineToolsLabel}>Инструментарий</h5>
                    <p className={s.pipelineToolsValue}>{pipelineSteps[activePipelineStep].tools}</p>
                  </div>
                </div>

                <div className={s.pipelineScopeSide}>
                  <h5 className={s.pipelineScopeTitle}>Область проверки</h5>
                  <motion.div
                    className={s.pipelineScopeList}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {pipelineSteps[activePipelineStep].scope.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className={s.pipelineScopeItem}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        <Check size={14} />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ── 04. Что получает компания (Deliverables Interface) ── */}
      <motion.section
        className={s.section}
        style={{ background: "rgba(255,255,255,0.01)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Что получает компания?</h2>
          <p className={s.sectionSubtitle}>Артефакты и подробная техническая отчетность по результатам тестирования.</p>

          <div className={s.deliverContainer}>
            <div className={s.deliverDashboard}>
              <div className={s.deliverTabsList}>
                {reportTabs.map(tab => {
                  const isActive = activeReportTab === tab.id;
                  return (
                    <button key={tab.id}
                      className={`${s.deliverTabButton} ${isActive ? s.deliverTabActive : ""}`}
                      onClick={() => setActiveReportTab(tab.id)}>
                      <span>{tab.title}</span>
                      {isActive && <div className={s.deliverTabIndicator} />}
                    </button>
                  );
                })}
              </div>

              <div className={s.reportDoc}>
                <div className={s.reportHeaderBar}>
                  <span className={s.reportHeaderText}>{reportTabs.find(t => t.id === activeReportTab)?.header}</span>
                  <span className={s.reportHeaderText}>{reportTabs.find(t => t.id === activeReportTab)?.docRef}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={activeReportTab}
                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}>
                    {reportTabs.find(t => t.id === activeReportTab)?.content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 05. Какие системы мы проверяем (Ecosystem Map) ── */}
      <motion.section
        className={s.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Какие системы мы проверяем?</h2>
          <p className={s.sectionSubtitle}>Полный аудит информационной безопасности для всех сегментов инфраструктуры.</p>

          <div className={s.ecosystemContent}>
            <div className={s.ecosystemList}>
              {ecosystemSystems.map(sys => (
                <div key={sys.id} className={s.ecosystemItem}
                  onMouseEnter={() => setActiveEcosystemNode(sys.id)}
                  onMouseLeave={() => setActiveEcosystemNode(null)}>
                  <h4 className={s.ecosystemTitle}>{sys.title}</h4>
                  <p className={s.ecosystemDesc}>{sys.desc}</p>
                </div>
              ))}
            </div>

            <div className={s.ecosystemVisual}>
              <svg viewBox="0 0 600 400" className={s.ecosystemSvg}>
                {ecosystemSystems.map((sys, idx) => {
                  const isPathActive = activeEcosystemPathIndex === idx || activeEcosystemNode === sys.id;
                  return (
                    <g key={sys.id}>
                      <line x1="300" y1="200" x2={sys.cx} y2={sys.cy} className={isPathActive ? s.ecoActiveLine : s.ecoLine} />
                      {isPathActive && (
                        <circle cx={sys.cx} cy={sys.cy} r="4" fill="#818cf8" />
                      )}
                    </g>
                  );
                })}

                <g className={s.gatewayNode}>
                  <circle cx="300" cy="200" r="50" className={s.gatewayOuter} />

                  {/* Subtle rotational perimeter sweep */}
                  <circle cx="300" cy="200" r="50" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" strokeDasharray="10 30" className={s.gatewaySweepRing} />

                  <circle cx="300" cy="200" r="38" className={s.gatewayInner} />
                  <text x="300" y="196" className={s.gatewayText} textAnchor="middle">SECURITY</text>
                  <text x="300" y="209" className={s.gatewayText} textAnchor="middle">GATEWAY</text>
                </g>

                {ecosystemSystems.map(sys => {
                  const isActive = activeEcosystemNode === sys.id;
                  return (
                    <g key={sys.id} className={s.ecoNode}
                      onMouseEnter={() => setActiveEcosystemNode(sys.id)}
                      onMouseLeave={() => setActiveEcosystemNode(null)}>
                      <circle cx={sys.cx} cy={sys.cy} r="25" className={s.nodeBg} />
                      <circle cx={sys.cx} cy={sys.cy} r="25" className={s.ecoNodeBg} />
                      <text x={sys.cx} y={sys.cy + 4} className={s.ecoNodeText} textAnchor="middle">
                        {sys.nodeLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 06. Что входит в аудит (Audit Coverage Matrix) ── */}
      <motion.section
        className={s.section}
        style={{ background: "rgba(255,255,255,0.01)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Что входит в аудит?</h2>
          <p className={s.sectionSubtitle}>Матрица покрытия анализа безопасности — от клиентского JS до CI/CD контейнеров.</p>

          <div className={s.matrixGrid}>
            {matrixItems.map((item, i) => (
              <motion.div key={item.id} className={s.matrixSquare}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover="hovered"
              >
                {/* Scan line sweeping vertically on hover */}
                <div className={s.matrixSquareScanLine} />

                <div className={s.matrixSquareHeader}>
                  <span className={s.matrixSquareId}>[ 0{i + 1} ]</span>
                  <h4 className={s.matrixSquareTitle}>{item.title}</h4>
                </div>

                <div className={s.matrixContentDefault}>
                  <p>{item.check}</p>
                </div>

                <motion.div
                  className={s.matrixContentHover}
                  variants={{
                    hovered: { opacity: 1, y: 0 }
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <span className={s.matrixCheckLabel}>Область</span>
                    <span className={s.matrixCheckText}>{item.check}</span>
                  </div>
                  <div>
                    <span className={s.matrixRiskLabel}>Риски</span>
                    <span className={s.matrixRiskText}>{item.risk}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* ── 08. FAQ ── */}
      <motion.section
        className={`${s.section} ${s.faqSection}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Частые вопросы</h2>
          <div className={s.faqGrid}>
            {faqs.map((faq, i) => {
              const [open, setOpen] = useState(false);
              return (
                <div key={i} className={s.faqItem}>
                  <button className={s.faqButton} onClick={() => setOpen(!open)}>
                    <span className={s.faqQuestion}>{faq.q}</span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} style={{ fontSize: "22px" }}>+</motion.span>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={s.faqAnswer}>{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ── 09. CTA (Confidential Assessment) ── */}
      <motion.section
        className={s.ctaSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <svg className={s.ctaBgSvg} viewBox="0 0 1000 600" aria-hidden>
          <path d="M -100 100 L 400 300 L 800 150 L 1100 400" fill="none" stroke="rgba(129, 140, 248, 0.015)" strokeWidth="1" />
          <path d="M 200 -50 L 500 200 L 900 450" fill="none" stroke="rgba(129, 140, 248, 0.008)" strokeWidth="1" />
          <circle cx="400" cy="300" r="2.5" fill="rgba(129, 140, 248, 0.08)" />
          <circle cx="800" cy="150" r="2.5" fill="rgba(129, 140, 248, 0.08)" />
        </svg>

        <div className={s.container}>
          <div className={s.ctaGrid}>
            <div className={s.ctaCopySide}>
              <span className={s.ctaMiniLabel}>Confidential Request</span>
              <h2 className={s.ctaSectionTitle}>Конфиденциальный аудит безопасности</h2>
              <p className={s.ctaSectionDesc}>
                Безопасность инфраструктуры нельзя оценивать поверхностно.
                Получите конфиденциальный аудит архитектуры, API и интеграций вашей платформы.
              </p>
              <div className={s.ctaFeatures}>
                <div className={s.ctaFeatureItem}><Check size={16} /> NDA и полная конфиденциальность</div>
                <div className={s.ctaFeatureItem}><Check size={16} /> Разбор архитектурных узких мест</div>
                <div className={s.ctaFeatureItem}><Check size={16} /> Рекомендации уровня senior-инженеров</div>
              </div>
            </div>

            <div className={s.ctaFormSide}>
              {formSent ? (
                <motion.div
                  className={s.formSuccessState}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <ShieldCheck size={48} className={s.successIcon} />
                  <h4>Запрос принят</h4>
                  <p>Мы свяжемся с вами в течение рабочего дня для согласования параметров аудита.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className={s.secureForm}>
                  <div className={s.formGroup}>
                    <label className={s.formLabel}>Ваше имя</label>
                    <input type="text" className={s.formInput} placeholder="Алексей" required
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel}>Контактные данные (Email / Telegram)</label>
                    <input type="text" className={s.formInput} placeholder="@username или email@domain.ru" required
                      value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel}>Текущая e-commerce платформа</label>
                    <input type="text" className={s.formInput} placeholder="Самописная / 1С-Битрикс / Magento"
                      value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })} />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel}>Ключевые задачи аудита</label>
                    <textarea className={s.formTextarea} placeholder="Поиск уязвимостей API, проверка ролевого доступа, интеграция с 1С..." rows={3}
                      value={formData.task} onChange={e => setFormData({ ...formData, task: e.target.value })} />
                  </div>

                  {isSubmitting ? (
                    <div className={s.formProgressBarContainer}>
                      <motion.div
                        className={s.formProgressBar}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                      />
                    </div>
                  ) : (
                    <button type="submit" className={s.formSubmitBtn}>Запросить аудит</button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
      {popupOpen && <SecurityAssessmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />}
    </div>
  );
}
