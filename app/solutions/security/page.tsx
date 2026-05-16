"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, Search, Lock, Check, ArrowRight, Activity, Database, Cpu, Globe, Network, ShieldCheck } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SolutionPopup from "../../../components/SolutionPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Schema from "../../../components/Schema";
import s from "./security.module.css";

const risks = [
  { id: "sql", name: "SQL-инъекции", nodes: ["db", "api"] },
  { id: "auth", name: "Уязвимости авторизации", nodes: ["auth"] },
  { id: "api", name: "Небезопасные API", nodes: ["api"] },
  { id: "config", name: "Ошибки конфигурации", nodes: ["infra"] },
  { id: "leak", name: "Утечка данных", nodes: ["db"] },
  { id: "deps", name: "Устаревшие зависимости", nodes: ["core"] },
];

const processSteps = [
  { id: "01", title: "Изучение системы", desc: "Анализ архитектуры, стека технологий, точек входа и модели угроз." },
  { id: "02", title: "Автоматическое сканирование", desc: "Поиск известных уязвимостей, ошибок конфигурации и открытых точек доступа." },
  { id: "03", title: "Ручное тестирование", desc: "Проверка бизнес-логики, авторизации, API и нетипичных пользовательских сценариев." },
  { id: "04", title: "Проверка бизнес-логики", desc: "Имитация реальных атак: обход авторизации, манипуляции с данными, цепочки уязвимостей." },
  { id: "05", title: "Подготовка отчёта", desc: "Приоритизированный список рисков с уровнем критичности и конкретными рекомендациями." },
  { id: "06", title: "Повторная проверка", desc: "Подтверждение устранения всех обнаруженных проблем после внесения исправлений." },
];

const deliverables = [
  { title: "Подробный отчёт", desc: "Полный список рисков с уровнем критичности и потенциальным влиянием на бизнес." },
  { title: "Приоритет исправлений", desc: "Понимание, какие проблемы требуют немедленного устранения." },
  { title: "Технические рекомендации", desc: "Конкретные действия и фрагменты кода для усиления защиты." },
  { title: "Повторная проверка", desc: "Подтверждение успешного устранения всех обнаруженных проблем." },
];

const systems = [
  { title: "Интернет-магазины", desc: "Проверка платёжных потоков, авторизации и защиты заказов." },
  { title: "B2B платформы", desc: "Аудит ролевого доступа, API-интеграций и корпоративных данных." },
  { title: "Личные кабинеты", desc: "Анализ механизмов аутентификации и управления сессиями." },
  { title: "API инфраструктура", desc: "Penetration testing всех открытых endpoints и схем авторизации." },
  { title: "CRM / ERP системы", desc: "Проверка безопасности данных клиентов и бизнес-процессов." },
  { title: "Корпоративные порталы", desc: "Анализ защищённости внутренних систем и прав доступа." },
];

const auditScope = [
  "Авторизация и права доступа",
  "API endpoints",
  "Формы и пользовательский ввод",
  "Файловая система",
  "Интеграции с внешними сервисами",
  "Настройки сервера и инфраструктуры",
  "Безопасность базы данных",
  "Логика бизнес-процессов",
];

const severityLevels = [
  { label: "Critical", color: "#ef4444", desc: "Немедленная угроза: утечка данных или полный захват системы." },
  { label: "High", color: "#f97316", desc: "Серьёзный риск, требует устранения до следующего релиза." },
  { label: "Medium", color: "#eab308", desc: "Уязвимость с ограниченным влиянием, устраняется планово." },
  { label: "Low", color: "#4ade80", desc: "Незначительные риски и рекомендации по усилению защиты." },
];

const faqs = [
  { q: "Что входит в аудит безопасности?", a: "Комплексная проверка: анализ кода, API, инфраструктуры и имитация реальных атак по методологии OWASP." },
  { q: "Проводится ли ручное тестирование?", a: "Да. Автоматика находит 60% проблем. Остальные 40% — ошибки логики и сложные цепочки, которые находят только эксперты вручную." },
  { q: "Нужно ли останавливать работу системы?", a: "Нет. Тесты проводятся в щадящем режиме или на staging-копии, без влияния на ваших пользователей." },
  { q: "Сколько занимает проверка?", a: "От 5 до 15 рабочих дней в зависимости от сложности архитектуры." },
];

const NODES = [
  { id: "core", label: "SYSTEM CORE", Icon: Cpu,      cx: 300, cy: 200, size: 80, primary: true },
  { id: "api",  label: "API",         Icon: Network,  cx: 140, cy: 110, size: 60 },
  { id: "db",   label: "DATABASE",    Icon: Database, cx: 460, cy: 110, size: 60 },
  { id: "auth", label: "AUTH",        Icon: Lock,     cx: 140, cy: 290, size: 60 },
  { id: "pay",  label: "PAYMENTS",    Icon: Globe,    cx: 460, cy: 290, size: 60 },
  { id: "infra",label: "INFRA",       Icon: Activity, cx: 300, cy: 370, size: 60 },
];

const SCAN_SEQUENCE = ["api", "auth", "db", "pay", "infra"];

function SystemVisual({ highlightIds }: { highlightIds?: string[] }) {
  const [scanIdx, setScanIdx] = useState(0);
  const [nodeStates, setNodeStates] = useState<Record<string, "idle"|"scanning"|"secure"|"warning">>({});

  useEffect(() => {
    const t = setInterval(() => {
      setScanIdx(i => {
        const next = (i + 1) % SCAN_SEQUENCE.length;
        const nodeId = SCAN_SEQUENCE[next];
        setNodeStates(prev => ({
          ...prev,
          [nodeId]: Math.random() > 0.4 ? "warning" : "secure",
        }));
        return next;
      });
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const currentScan = SCAN_SEQUENCE[scanIdx];

  return (
    <div className={s.sceneContainer}>
      <svg className={s.sceneSvg} viewBox="0 0 600 450">
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {NODES.filter(n => !n.primary).map((n, i) => (
          <line key={i} x1="300" y1="200" x2={n.cx} y2={n.cy}
            stroke={highlightIds?.includes(n.id) ? "rgba(70,51,255,0.4)" : "rgba(255,255,255,0.04)"}
            strokeWidth={highlightIds?.includes(n.id) ? 2 : 1}/>
        ))}
        {/* scan beam line from core to current node */}
        {(() => {
          const tgt = NODES.find(n => n.id === currentScan);
          if (!tgt) return null;
          return <motion.line x1="300" y1="200" x2={tgt.cx} y2={tgt.cy}
            stroke="#4633ff" strokeWidth="1" opacity={0.5} filter="url(#glow2)"
            key={currentScan} initial={{opacity:0}} animate={{opacity:[0,0.6,0]}} transition={{duration:1.2}}/>;
        })()}
        {NODES.map((n) => {
          const isHighlighted = highlightIds?.includes(n.id);
          const st = nodeStates[n.id];
          const isScanning = n.id === currentScan;
          const borderColor = isHighlighted ? "#4633ff"
            : isScanning ? "rgba(70,51,255,0.7)"
            : n.primary ? "#4633ff"
            : st === "warning" ? "rgba(251,146,60,0.5)"
            : st === "secure" ? "rgba(74,222,128,0.4)"
            : "rgba(255,255,255,0.06)";
          const statusLabel = st === "warning" ? "WARNING" : st === "secure" ? "SECURE" : null;
          return (
            <motion.g key={n.id} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.6}}>
              <circle cx={n.cx} cy={n.cy} r={n.size/2}
                fill={n.primary ? "rgba(70,51,255,0.1)" : "rgba(15,14,26,0.96)"}
                stroke={borderColor} strokeWidth={isHighlighted || isScanning ? 2 : 1}/>
              {isScanning && (
                <motion.circle cx={n.cx} cy={n.cy} r={n.size/2+8}
                  stroke="rgba(70,51,255,0.3)" strokeWidth="1" fill="none"
                  initial={{scale:1,opacity:0.5}} animate={{scale:1.3,opacity:0}} transition={{duration:1}}/>
              )}
              <foreignObject x={n.cx-13} y={n.cy-13} width="26" height="26">
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",
                  color: n.primary ? "#4633ff" : isHighlighted ? "#fff" : isScanning ? "#fff" : "rgba(255,255,255,0.2)"}}>
                  <n.Icon size={18}/>
                </div>
              </foreignObject>
              <text x={n.cx} y={n.cy+n.size/2+18} textAnchor="middle"
                fill={isHighlighted || isScanning ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)"}
                fontSize="8" fontWeight="900" letterSpacing="0.06em">{n.label}</text>
              {statusLabel && !n.primary && (
                <motion.text x={n.cx} y={n.cy-n.size/2-10} textAnchor="middle"
                  fill={st==="warning" ? "#fb923c" : "#4ade80"} fontSize="7" fontWeight="900"
                  initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                  {statusLabel}
                </motion.text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

function SecurityScore({ target, label, riskLabel, start = 0, color }: { target: number; label: string; riskLabel: string; start?: number; color: string }) {
  const [score, setScore] = useState(start);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let cur = start;
    const iv = setInterval(() => {
      cur += 1;
      if (cur >= target) { setScore(target); clearInterval(iv); }
      else setScore(cur);
    }, 18);
    return () => clearInterval(iv);
  }, [inView, target, start]);

  const circ = 2 * Math.PI * 110;
  const offset = circ - (score / 100) * circ;

  return (
    <div className={s.scoreCircle} ref={ref}>
      <svg className={s.scoreSvg} width="260" height="260" viewBox="0 0 260 260">
        <circle cx="130" cy="130" r="110" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none"/>
        <motion.circle cx="130" cy="130" r="110" stroke={color} strokeWidth="10" fill="none"
          strokeLinecap="round" strokeDasharray={circ}
          animate={{ strokeDashoffset: offset }} transition={{ duration: 1.8, ease: "easeOut" }}/>
      </svg>
      <div className={s.scoreValue}>
        <span className={s.scoreRiskLabel} style={{ color }}>{riskLabel}</span>
        <span className={s.scoreNum}>{score}%</span>
        <span className={s.scoreLabel}>{label}</span>
      </div>
    </div>
  );
}

function LiveIncidentFeed() {
  const events = [
    { text: "Blocked suspicious request", color: "#4ade80" },
    { text: "Rate limit triggered", color: "#fb923c" },
    { text: "Auth anomaly detected", color: "#fb923c" },
    { text: "Dependency vulnerability flagged", color: "#fb923c" },
    { text: "Scan cycle completed", color: "#4ade80" },
    { text: "Config issue detected", color: "#fb923c" },
  ];
  const uidRef = useRef(0);
  const [visible, setVisible] = useState<{ uid: number; eventIdx: number }[]>(() => [
    { uid: 0, eventIdx: 0 },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(v => {
        uidRef.current += 1;
        const nextEventIdx = (v[v.length - 1].eventIdx + 1) % events.length;
        return [...v.slice(-3), { uid: uidRef.current, eventIdx: nextEventIdx }];
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={s.incidentPanel}>
      <div className={s.incidentHeader}>
        <span className={s.incidentDot}/>
        <span className={s.incidentTitle}>Security Events</span>
      </div>
      <div className={s.incidentFeed}>
        <AnimatePresence mode="popLayout">
          {visible.map(({ uid, eventIdx }) => (
            <motion.div key={uid} className={s.incidentRow}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}>
              <span className={s.incidentBullet} style={{ background: events[eventIdx].color }}/>
              <span className={s.incidentText}>{events[eventIdx].text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SecurityAuditPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeRisk, setActiveRisk] = useState<string | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const highlightNodes = activeRisk
    ? (risks.find(r => r.id === activeRisk)?.nodes ?? [])
    : undefined;

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

      {/* ── 1. HERO ── */}
      <section className={s.hero}>
        <div className={s.heroGrid}/>
        <div className={s.heroInner}>
          <div className="w-full mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <span className={s.heroLabel}>Security Assessment</span>
            <h1 className={s.heroH1}>Аудит безопасности сайтов и веб-приложений</h1>
            <p className={s.heroSubtitle}>
              Находим уязвимости, ошибки конфигурации и риски безопасности до того, как они становятся причиной инцидентов и потери данных.
            </p>
            <p className={s.heroBusiness}>
              Безопасность платформы напрямую влияет на доверие клиентов, стабильность продаж и защиту данных компании.
            </p>
            <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>Запросить аудит</button>

            <div className={s.trustBar}>
              <span className={s.trustItem}>OWASP Methodology</span>
              <span className={s.trustDivider}/>
              <span className={s.trustItem}>API Security</span>
              <span className={s.trustDivider}/>
              <span className={s.trustItem}>Infrastructure Audit</span>
              <span className={s.trustDivider}/>
              <span className={s.trustItem}>Manual Pentest</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }} className={s.heroRight}>
            <SystemVisual />
            <LiveIncidentFeed />
          </motion.div>
        </div>
      </section>

      {/* ── 2. NECESSITY ── */}
      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Когда аудит становится необходимым</h2>
          <div className={s.necessityGrid}>
            {[
              { title: "Работа с персональными данными", desc: "Система хранит данные клиентов, телефоны, адреса и платёжную информацию." },
              { title: "Высокий оборот продаж", desc: "Даже кратковременный инцидент может привести к значительным финансовым потерям." },
              { title: "Подозрительная активность", desc: "Необычные входы, ошибки или нестабильная работа платформы." },
              { title: "После изменений в системе", desc: "Интеграции, новые функции или обновление инфраструктуры." },
            ].map((card, i) => (
              <motion.div key={i} className={s.necessityCard}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h3 className={s.necessityTitle}>{card.title}</h3>
                <p className={s.necessityDesc}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. RISKS ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Что может остаться незаметным</h2>
          <div className={s.risksContent}>
            <div className={s.riskList}>
              {risks.map((risk) => (
                <div key={risk.id}
                  className={`${s.riskItem} ${activeRisk === risk.id ? s.riskActive : ""}`}
                  onMouseEnter={() => setActiveRisk(risk.id)}
                  onMouseLeave={() => setActiveRisk(null)}>
                  <span className={s.riskBullet}/>
                  {risk.name}
                </div>
              ))}
            </div>
            <div className={s.heroVisual}>
              <SystemVisual highlightIds={highlightNodes} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PROCESS ── */}
      <section className={s.section} ref={timelineRef}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Как проходит аудит безопасности</h2>
          <div className={s.timeline}>
            <div className={s.timelineLine}/>
            <motion.div className={s.timelineProgress} style={{ scaleY: timelineProgress, transformOrigin: "top" }}/>
            {processSteps.map((step, i) => (
              <div key={i} className={s.timelineStep}>
                <div className={s.stepNum}>{step.id}</div>
                <div className={s.stepText}>
                  <h3 className={s.stepTitle}>{step.title}</h3>
                  <p className={s.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. DELIVERABLES ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Что получает компания</h2>
          <div className={s.deliverGrid}>
            {deliverables.map((item, i) => (
              <motion.div key={i} className={s.deliverCard}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h3 className={s.deliverTitle}>{item.title}</h3>
                <p className={s.deliverDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SYSTEMS ── */}
      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Какие системы мы проверяем</h2>
          <p className={s.sectionSubtitle}>Аудит информационной безопасности для любых типов цифровых платформ и инфраструктуры.</p>
          <div className={s.systemsGrid}>
            {systems.map((sys, i) => (
              <motion.div key={i} className={s.systemCard}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <h3 className={s.systemTitle}>{sys.title}</h3>
                <p className={s.systemDesc}>{sys.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. AUDIT SCOPE ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Что входит в аудит</h2>
          <p className={s.sectionSubtitle}>Полный анализ защищённости сайта — от пользовательского ввода до настроек инфраструктуры.</p>
          <div className={s.scopeGrid}>
            {auditScope.map((item, i) => (
              <motion.div key={i} className={s.scopeItem}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <span className={s.scopeCheck}><Check size={14}/></span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CASE STUDY ── */}
      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Реальный кейс</h2>
          <div className={s.caseCard}>
            <div className={s.caseSide}>
              <span className={s.caseLabel}>E-commerce проект · 120k+ пользователей</span>
              <span className={s.caseRiskBadge} style={{ color: "#ef4444" }}>Уровень риска: Критический</span>
              <p className={s.caseDesc}>Уязвимость авторизации позволяла получить доступ к данным заказов других пользователей без аутентификации.</p>
              <div className={s.caseStatusList}>
                {["Уязвимые API endpoints", "Ошибки авторизации", "Устаревшие зависимости"].map(t => (
                  <div key={t} className={s.caseStatusItem} style={{ color: "#ef4444" }}>
                    <AlertTriangle size={15}/>{t}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.caseArrow}><ArrowRight size={40} strokeWidth={1}/></div>
            <div className={s.caseSide}>
              <span className={s.caseLabel}>После проверки · до запуска кампании</span>
              <span className={s.caseRiskBadge} style={{ color: "#4ade80" }}>Уровень риска: Контролируемый</span>
              <p className={s.caseDesc}>Проблема устранена до запуска новой рекламной кампании. Платформа защищена и готова к нагрузке.</p>
              <div className={s.caseStatusList}>
                {["Исправлены критические риски", "Усилена защита платформы", "Снижены операционные риски"].map(t => (
                  <div key={t} className={s.caseStatusItem} style={{ color: "#4ade80" }}>
                    <ShieldCheck size={15}/>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. SEVERITY ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Уровни критичности</h2>
          <p className={s.sectionSubtitle}>Каждая найденная уязвимость получает уровень риска по стандарту CVSS / OWASP.</p>
          <div className={s.severityGrid}>
            {severityLevels.map((lvl, i) => (
              <motion.div key={i} className={s.severityCard}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <span className={s.severityDot} style={{ background: lvl.color }}/>
                <span className={s.severityLabel} style={{ color: lvl.color }}>{lvl.label}</span>
                <p className={s.severityDesc}>{lvl.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SCORE ── */}
      <section className={s.section} style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Общий уровень защищённости</h2>
          <div className={s.scoreWrap}>
            <SecurityScore target={48} label="До проверки" riskLabel="Высокий риск" color="#ef4444"/>
            <div className={s.caseArrow}><ArrowRight size={44} strokeWidth={1}/></div>
            <SecurityScore target={92} label="После исправлений" riskLabel="Система усилена" color="#4ade80"/>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className={`${s.section} ${s.faqSection}`}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Частые вопросы</h2>
          <div className={s.faqGrid}>
            {faqs.map((faq, i) => {
              const [open, setOpen] = useState(false);
              return (
                <div key={i} className={s.faqItem}>
                  <button className={s.faqButton} onClick={() => setOpen(!open)}>
                    <span className={s.faqQuestion}>{faq.q}</span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ fontSize: "22px" }}>+</motion.span>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className={s.faqAnswer}>{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.ctaBox}>
            <div>
              <h2 className={s.ctaTitle}>Получите оценку защищённости платформы</h2>
              <div className={s.ctaChecklist}>
                {["проверку API", "анализ инфраструктуры", "ручное тестирование", "поиск критических уязвимостей", "рекомендации по устранению"].map(item => (
                  <div key={item} className={s.ctaCheckItem}><Check size={16}/>{item}</div>
                ))}
              </div>
              <button className={s.ctaButtonLight} onClick={() => setPopupOpen(true)}>Запросить аудит</button>
            </div>
            <div className={s.ctaList}>
              <div className={s.ctaItem}><Shield size={20}/> анализ уязвимостей</div>
              <div className={s.ctaItem}><Lock size={20}/> проверка API</div>
              <div className={s.ctaItem}><Globe size={20}/> аудит инфраструктуры</div>
              <div className={s.ctaItem}><Search size={20}/> рекомендации по исправлению</div>
              <div className={s.ctaItem}><Check size={20}/> повторная проверка</div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
      {popupOpen && <SolutionPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)}/>}
    </div>
  );
}
