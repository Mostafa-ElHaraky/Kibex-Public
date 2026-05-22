"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Workflow, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  Layers, 
  Zap, 
  Globe, 
  Server,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Schema from "../../components/Schema";
import s from "./contacts.module.css";

// ── INFRA VISUAL ──

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

function InfraVisual() {
  const [stats, setStats] = useState({ requests: 12, response: 24 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        requests: 10 + Math.floor(Math.random() * 5),
        response: 15 + Math.floor(Math.random() * 15)
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { label: "ERP", Icon: Database, angle: (0 * Math.PI) / 3, radius: 200 },
    { label: "Highload", Icon: Zap, angle: (1 * Math.PI) / 3, radius: 200 },
    { label: "Security", Icon: ShieldCheck, angle: (2 * Math.PI) / 3, radius: 200 },
    { label: "API", Icon: Cpu, angle: (3 * Math.PI) / 3, radius: 200 },
    { label: "E-commerce", Icon: Globe, angle: (4 * Math.PI) / 3, radius: 200 },
    { label: "Infrastructure", Icon: Server, angle: (5 * Math.PI) / 3, radius: 200 },
  ];

  return (
    <div className={s.infraWrap}>
      <div className={s.coreNode}>
        <Cpu size={40} color="#4633ff" />
        <span>KIBEX CORE</span>
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

      <div className={s.statusMetrics}>
        <div className={s.statusItem}>
          <span className={s.statusHead}>Architecture Requests</span>
          <span className={s.statusVal}>{stats.requests} Active</span>
        </div>
        <div className={s.statusItem}>
          <span className={s.statusHead}>System Response</span>
          <span className={s.statusVal}>{stats.response} min avg</span>
        </div>
        <div className={s.statusItem}>
          <span className={s.statusHead}>Security Status</span>
          <span className={s.statusVal} style={{ color: "#4ade80" }}>Operational</span>
        </div>
      </div>
    </div>
  );
}

// ── FAQ ──

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

export default function ContactsPage() {
  const [formState, setFormState] = useState({ 
    submitted: false,
    budget: "1M–3M ₽",
    projectType: "ERP система"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, submitted: true });
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Kibex",
      "description": "Enterprise engineering and architecture consultancy.",
      "url": "https://kibex.ru",
      "knowsAbout": ["ERP systems", "Highload infrastructure", "E-commerce architecture", "Security audit"]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Сколько длится архитектурная оценка?", "acceptedAnswer": { "@type": "Answer", "text": "Первичная архитектурная оценка занимает от 24 до 48 часов." } },
      { "@type": "Question", "name": "Можно ли модернизировать систему поэтапно?", "acceptedAnswer": { "@type": "Answer", "text": "Да, мы проектируем системы так, чтобы их можно было обновлять по модулям без остановки бизнеса." } }
    ]
  };

  return (
    <div className={s.page}>
      <Schema data={schemaData} />
      <Schema data={faqSchema} />
      <Header />

      {/* ── SUCCESS OVERLAY ── */}
      <AnimatePresence>
        {formState.submitted && (
          <motion.div 
            className={s.successOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={s.successContent}>
              <motion.div 
                className={s.successIcon}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h2 className={s.successTitle}>Запрос передан в архитектурный отдел Kibex</h2>
              <p className={s.successDesc}>
                Инженер Kibex свяжется с вами для первичной оценки платформы, нагрузки и интеграционной архитектуры.
              </p>
              <button 
                className={s.secondaryBtn} 
                style={{ marginTop: 40 }}
                onClick={() => setFormState({ ...formState, submitted: false })}
              >
                Вернуться на страницу
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 1. HERO ── */}
      <section className={s.hero}>
        <div className={s.container} style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <div className={s.heroLeft}>
            <motion.span 
              className={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              KIBEX CONTACT
            </motion.span>
            <h1 className={s.title}>
              {["Обсуждение архитектуры", "цифровой платформы"].map((line, i) => (
                <motion.span 
                  key={i} 
                  style={{ display: "block" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              className={s.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Обсудим архитектуру платформы, ERP системы, highload инфраструктуры или модернизацию существующего решения.
            </motion.p>

            <div className={s.trustLine}>
              <motion.div className={s.trustItem} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <span>Security</span>
                <span>Конфиденциально</span>
              </motion.div>
              <motion.div className={s.trustItem} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <span>Response</span>
                <span>Инженер в течение 24ч</span>
              </motion.div>
              <motion.div className={s.trustItem} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <span>Commitment</span>
                <span>Без обязательств</span>
              </motion.div>
            </div>

            <motion.div 
              className={s.heroCta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link href="#brief" className={s.primaryBtn} style={{ textDecoration: "none" }}>Обсудить проект</Link>
              <Link href="/approach" className={s.secondaryBtn} style={{ textDecoration: "none" }}>Изучить подход</Link>
            </motion.div>
          </div>

          <div className={s.heroRight}>
            <InfraVisual />
          </div>
        </div>
      </section>

      {/* ── 2. CONTACT METHODS ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.methodsGrid}>
            <motion.div 
              className={s.methodCard}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
            >
              <div className={s.methodIcon}><Layers size={24} /></div>
              <h3>Архитектурная консультация</h3>
              <p>Обсуждение ERP, e-commerce, highload и интеграционной архитектуры с ведущими инженерами.</p>
            </motion.div>

            <motion.div 
              className={s.methodCard}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className={s.methodIcon}><Activity size={24} /></div>
              <h3>Инженерный аудит</h3>
              <p>Анализ текущей платформы, нагрузочных способностей и выявление архитектурных рисков.</p>
            </motion.div>

            <motion.div 
              className={s.methodCard}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={s.methodIcon}><ShieldCheck size={24} /></div>
              <h3>Security Assessment</h3>
              <p>Проверка уязвимостей системы, безопасности API и устойчивости облачной инфраструктуры.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. MAIN FORM (INTAKE) ── */}
      <section className={s.intakeSection} id="brief">
        <div className={s.container}>
          <div className={s.intakeWrapper}>
            <div className={s.formHead}>
              <span className={s.formLabel}>ENGINEERING INTAKE</span>
              <h2 className={s.formTitle}>Архитектурный бриф проекта</h2>
            </div>

            <form className={s.form} onSubmit={handleSubmit}>
              {/* STEP 1 */}
              <div className={s.formStep}>
                <span className={s.stepNum}>01 / COMPANY DATA</span>
                <div className={s.inputGrid}>
                  <div className={s.inputGroup}>
                    <label>Имя</label>
                    <input type="text" className={s.input} placeholder="Имя" required />
                  </div>
                  <div className={s.inputGroup}>
                    <label>Компания</label>
                    <input type="text" className={s.input} placeholder="Название компании" required />
                  </div>
                  <div className={s.inputGroup}>
                    <label>Должность</label>
                    <input type="text" className={s.input} placeholder="CEO / CTO / COO" />
                  </div>
                  <div className={s.inputGroup}>
                    <label>Контакт (Telegram / Email)</label>
                    <input type="text" className={s.input} placeholder="@username or email" required />
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className={s.formStep}>
                <span className={s.stepNum}>02 / PROJECT SCOPE</span>
                <div className={s.inputGrid}>
                  <div className={s.inputGroup}>
                    <label>Тип проекта</label>
                    <select 
                      className={s.select} 
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    >
                      <option>ERP система</option>
                      <option>E-commerce платформа</option>
                      <option>Highload инфраструктура</option>
                      <option>Модернизация CMS</option>
                      <option>Security аудит</option>
                      <option>Интеграции</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <div className={s.inputGroup}>
                    <label>Масштаб каталога / данных</label>
                    <select className={s.select}>
                      <option>До 10k SKU</option>
                      <option>10k–100k SKU</option>
                      <option>100k+ SKU</option>
                      <option>ERP / internal operations</option>
                      <option>Multi-region infrastructure</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className={s.formStep}>
                <span className={s.stepNum}>03 / TECHNICAL REQUIREMENTS</span>
                <div className={s.inputGroup}>
                  <label>Какие ограничения или проблемы существуют в текущей системе?</label>
                  <textarea className={s.textarea} placeholder="Напишите о текущих барьерах для роста..."></textarea>
                </div>
                <div className={s.inputGroup}>
                  <label>Необходимые интеграции</label>
                  <div className={s.checkboxGrid}>
                    {["1С", "CRM", "ERP", "Logistics", "Payments", "Marketplace", "Analytics"].map((item) => (
                      <label key={item} className={s.checkboxLabel}>
                        <input type="checkbox" className={s.checkbox} />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 4 */}
              <div className={s.formStep}>
                <span className={s.stepNum}>04 / ESTIMATED BUDGET</span>
                <div className={s.budgetGrid}>
                  {["500k–1M ₽", "1M–3M ₽", "3M–10M ₽", "Enterprise"].map((opt) => (
                    <div 
                      key={opt}
                      className={`${s.budgetOption} ${formState.budget === opt ? s.budgetOptionActive : ""}`}
                      onClick={() => setFormState({ ...formState, budget: opt })}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className={s.submitBtn}>Запросить архитектурную оценку</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT HAPPENS NEXT ── */}
      <section className={s.timelineSection}>
        <div className={s.container}>
          <div className={s.timelineTitle}>
            <span className={s.label}>PROCESS</span>
            <h2 style={{ fontSize: 40, fontWeight: 900 }}>Этапы инициации проекта</h2>
          </div>

          <div className={s.timelineGrid}>
            {[
              { num: "01", title: "Первичный анализ запроса" },
              { num: "02", title: "Архитектурная оценка" },
              { num: "03", title: "Техническая консультация" },
              { num: "04", title: "Формирование roadmap" },
              { num: "05", title: "Проектирование системы" },
            ].map((step, i) => (
              <div key={i} className={`${s.timelineNode} ${i === 0 ? s.timelineNodeActive : ""}`}>
                <div className={s.nodeDot}>{step.num}</div>
                <h4 className={s.nodeTitle}>{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SERVICES CONNECTION ── */}
      <section className={s.servicesSection}>
        <div className={s.container}>
          <div className={s.sectionHead} style={{ textAlign: "center", marginBottom: 60 }}>
            <span className={s.label}>CAPABILITIES</span>
            <h2 style={{ fontSize: 40, fontWeight: 900 }}>Какие системы проектирует Kibex</h2>
          </div>
          <div className={s.servicesGrid}>
            <Link href="/solutions/erp" className={s.serviceLinkCard}>
              <h4>ERP Системы</h4>
              <p>Централизация операций, складов и финансов в единый цифровой контур.</p>
            </Link>
            <Link href="/solutions/highload" className={s.serviceLinkCard}>
              <h4>Highload платформы</h4>
              <p>Проектирование инфраструктуры для сотен тысяч заказов и миллионов сессий.</p>
            </Link>
            <Link href="/solutions/ecommerce" className={s.serviceLinkCard}>
              <h4>Enterprise E-commerce</h4>
              <p>Масштабируемые торговые платформы с глубокой интеграционной логикой.</p>
            </Link>
            <Link href="/uslugi/audit" className={s.serviceLinkCard}>
              <h4>Архитектурный аудит</h4>
              <p>Поиск узких мест и рисков в текущей цифровой архитектуре бизнеса.</p>
            </Link>
            <Link href="/uslugi/integrations" className={s.serviceLinkCard}>
              <h4>Сложные интеграции</h4>
              <p>Синхронизация 1С, CRM, логистических и финансовых систем без потерь.</p>
            </Link>
            <Link href="/uslugi/security" className={s.serviceLinkCard}>
              <h4>Security аудит</h4>
              <p>Комплексная проверка безопасности инфраструктуры и API платформы.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className={s.faqSection}>
        <div className={s.container}>
          <div className={s.sectionHead} style={{ textAlign: "center" }}>
            <span className={s.label}>KNOWLEDGE BASE</span>
            <h2 style={{ fontSize: 40, fontWeight: 900 }}>Частые вопросы</h2>
          </div>
          <div className={s.faqList}>
            <FAQItem 
              question="Сколько длится архитектурная оценка?" 
              answer="Первичный анализ вашего запроса и архитектурная оценка занимают от 24 до 48 часов в зависимости от сложности интеграций и масштаба системы."
            />
            <FAQItem 
              question="Можно ли модернизировать систему поэтапно?" 
              answer="Да, мы специализируемся на модульной модернизации. Это позволяет обновлять критические узлы (например, склад или оформление заказа) без остановки всего бизнеса."
            />
            <FAQItem 
              question="Кто владеет исходным кодом?" 
              answer="После завершения проекта и финальной оплаты, ваша компания становится полным владельцем исходного кода и архитектуры. Мы не используем закрытых проприетарных платформ."
            />
            <FAQItem 
              question="Работаете ли вы с 1С интеграциями?" 
              answer="Да, интеграция с 1С (ERP, УТ, КА) — одна из наших ключевых компетенций. Мы настраиваем надежный обмен данными без ошибок и дублей."
            />
            <FAQItem 
              question="Проводите ли вы нагрузочное тестирование?" 
              answer="Обязательно. Каждый highload проект проходит цикл нагрузочного тестирования для подтверждения стабильности при пиковых нагрузках."
            />
            <FAQItem 
              question="Можно ли начать с технического аудита?" 
              answer="Это лучший способ начать сотрудничество, если у вас уже есть работающая система с проблемами. Аудит покажет реальное состояние кода и инфраструктуры."
            />
            <FAQItem 
              question="Работаете ли вы с зарубежными рынками?" 
              answer="Да, мы проектируем мультиязычные и мультивалютные платформы с учетом локальных особенностей платежных систем и логистики."
            />
            <FAQItem 
              question="Как обеспечивается безопасность данных?" 
              answer="Мы применяем архитектурные стандарты безопасности OWASP, шифрование данных и строгий аудит доступа на всех уровнях инфраструктуры."
            />
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
      <section className={s.section} style={{ textAlign: "center", background: "#0d0d12" }}>
        <div className={s.container}>
          <motion.h2 
            style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, maxWidth: 1000, margin: "0 auto 40px", lineHeight: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
          >
            Архитектура системы определяет,<br />сможет ли бизнес масштабироваться дальше
          </motion.h2>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            <Link href="#brief" className={s.primaryBtn} style={{ textDecoration: "none" }}>Обсудить проект</Link>
            <Link href="/portfolio" className={s.secondaryBtn} style={{ textDecoration: "none" }}>Смотреть работы</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
