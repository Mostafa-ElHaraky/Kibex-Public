"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import s from "./HighloadDiagnosticPopup.module.css";

interface HighloadDiagnosticPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLATFORM_TYPES = [
  "Интернет-магазин",
  "ERP система",
  "Marketplace",
  "B2B платформа",
  "SaaS система",
  "Медиа / контент",
  "Мобильный backend",
  "Другое"
];

const TRAFFIC_OPTIONS = [
  "до 10 000 пользователей",
  "10k – 100k",
  "100k – 1 млн",
  "1 млн+"
];

const PROBLEMS = [
  "Падения под нагрузкой",
  "Медленная работа",
  "Проблемы с базой данных",
  "Долгие API-ответы",
  "Нестабильный кеш",
  "Проблемы масштабирования",
  "Ошибки при пиковом трафике",
  "Нестабильные очереди",
  "Высокая стоимость серверов"
];

const CRITICAL_PRIORITIES = [
  "Высокий uptime",
  "Скорость API",
  "Стабильность checkout",
  "Масштабирование",
  "Real-time синхронизация",
  "Безопасность данных",
  "Снижение стоимости инфраструктуры"
];

// Topology satellite coordinates around center (90, 65)
const SATELLITE_NODES = [
  { id: "CDN", label: "CDN", cx: 90, cy: 20 },
  { id: "BALANCER", label: "LB", cx: 56, cy: 32 },
  { id: "API", label: "API", cx: 50, cy: 75 },
  { id: "QUEUE", label: "QUEUE", cx: 85, cy: 110 },
  { id: "WORKERS", label: "WORKER", cx: 124, cy: 102 },
  { id: "DB", label: "DB", cx: 132, cy: 65 },
  { id: "CACHE", label: "CACHE", cx: 124, cy: 28 }
];

export default function HighloadDiagnosticPopup({ isOpen, onClose }: HighloadDiagnosticPopupProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [platformType, setPlatformType] = useState("");
  const [traffic, setTraffic] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [techStack, setTechStack] = useState("");
  const [peakLoad, setPeakLoad] = useState("");
  const [selectedCritical, setSelectedCritical] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Touched states for error tracking
  const [touched, setTouched] = useState({
    name: false,
    company: false,
    contact: false,
    description: false
  });

  // Validations
  const cleanName = name.trim().replace(/<[^>]*>/g, "");
  const isNameValid = cleanName.length >= 2 && cleanName.length <= 50 && /^[A-Za-zА-Яа-яЁё\s]+$/.test(cleanName);

  const cleanCompany = company.trim().replace(/<[^>]*>/g, "");
  const isCompanyValid = cleanCompany.length >= 2 && cleanCompany.length <= 100;

  const cleanContact = contact.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
  const isTelegram = /^@?[a-zA-Z0-9_]{5,32}$/.test(cleanContact);
  const isPhone = /^\+?[0-9\s\-()]{10,20}$/.test(cleanContact);
  const isContactValid = isEmail || isTelegram || isPhone;

  const isPlatformValid = platformType !== "";

  const cleanDescription = description.trim().replace(/<[^>]*>/g, "");
  const isDescriptionValid = cleanDescription.length >= 1 && cleanDescription.length <= 1000;

  const isFormValid =
    isNameValid &&
    isCompanyValid &&
    isContactValid &&
    isPlatformValid &&
    isDescriptionValid &&
    isPrivacyAccepted;

  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Reset inputs
    setName("");
    setCompany("");
    setContact("");
    setPlatformType("");
    setTraffic("");
    setSelectedProblems([]);
    setTechStack("");
    setPeakLoad("");
    setSelectedCritical([]);
    setDescription("");
    setWebsite("");
    setIsPrivacyAccepted(false);
    setTurnstileToken("");
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMsg("");
    setTouched({
      name: false,
      company: false,
      contact: false,
      description: false
    });

    // 1. Lock scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Autofocus first input
    const focusTimeout = setTimeout(() => {
      const firstInput = document.getElementById("hl-name-input");
      if (firstInput) firstInput.focus();
    }, 150);

    // 3. ESC key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // 4. Cloudflare Turnstile loader
    let widgetId: string | null = null;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

    const loadTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        try {
          widgetId = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: siteKey,
            size: "invisible",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
          });
        } catch (e) {
          console.error("Turnstile render failed: ", e);
        }
      }
    };

    if (!window.turnstile) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallbackHL";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      (window as any).onloadTurnstileCallbackHL = () => {
        loadTurnstile();
      };
    } else {
      loadTurnstile();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (window.turnstile && widgetId !== null) {
        try {
          window.turnstile.remove(widgetId);
        } catch (e) {}
      }
      clearTimeout(focusTimeout);
    };
  }, [isOpen, onClose]);

  const toggleProblem = (p: string) => {
    setSelectedProblems(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const toggleCritical = (c: string) => {
    setSelectedCritical(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/highload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          company: cleanCompany,
          contact: cleanContact,
          platformType,
          traffic,
          problems: selectedProblems,
          techStack,
          peakLoad,
          criticalItems: selectedCritical,
          description: cleanDescription,
          website, // Honeypot
          turnstileToken
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Не удалось отправить запрос. Попробуйте ещё раз позже.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Не удалось отправить запрос. Попробуйте ещё раз позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={s.overlay} onClick={onClose}>
        <motion.div
          className={s.modal}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <button className={s.closeButton} onClick={onClose} aria-label="Закрыть">
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <div className={s.content}>
              {/* Header topology visual and details */}
              <div className={s.header}>
                <div className={s.headerLeft}>
                  <h2 className={s.title}>Получить архитектурную оценку highload инфраструктуры</h2>
                  <p className={s.subtitle}>
                    Мы проанализируем текущую архитектуру, определим ограничения производительности и предложим масштабируемую highload инфраструктуру под реальные нагрузки бизнеса.
                  </p>
                </div>
                <div className={s.headerRight}>
                  {/* Highload Cluster Diagram */}
                  <svg className={s.topologySvg} width="170" height="130" viewBox="0 0 180 130">
                    {/* Connecting lines with packet animations */}
                    {SATELLITE_NODES.map((node) => (
                      <g key={node.id}>
                        {/* Static connecting line */}
                        <line
                          x1={node.cx}
                          y1={node.cy}
                          x2={90}
                          y2={65}
                          stroke="rgba(129, 140, 248, 0.12)"
                          strokeWidth="1"
                        />
                        
                        {/* Flowing packet dot */}
                        <motion.circle
                          cx={node.cx}
                          cy={node.cy}
                          r="1.5"
                          fill="#818cf8"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 0.6, 0.6, 0],
                            cx: [node.cx, (node.cx + 90) / 2, 90],
                            cy: [node.cy, (node.cy + 65) / 2, 65]
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: Math.random() * 1.5,
                            ease: "linear"
                          }}
                        />

                        {/* Satellite outer pulse */}
                        <motion.circle
                          cx={node.cx}
                          cy={node.cy}
                          r="6"
                          stroke="rgba(129, 140, 248, 0.2)"
                          strokeWidth="0.5"
                          fill="none"
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Satellite inner dot */}
                        <circle cx={node.cx} cy={node.cy} r="3" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                        
                        {/* Mini text label above satellite */}
                        <text
                          x={node.cx}
                          y={node.cy > 65 ? node.cy + 9 : node.cy - 7}
                          textAnchor="middle"
                          fill="rgba(255, 255, 255, 0.35)"
                          fontSize="6.5"
                          fontWeight="700"
                        >
                          {node.label}
                        </text>
                      </g>
                    ))}

                    {/* Center Core Node */}
                    <circle cx="90" cy="65" r="14" fill="rgba(129, 140, 248, 0.08)" stroke="rgba(129, 140, 248, 0.35)" strokeWidth="1" />
                    <motion.circle
                      cx="90"
                      cy="65"
                      r="14"
                      stroke="rgba(129, 140, 248, 0.5)"
                      strokeWidth="1.2"
                      fill="none"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <text x="90" y="68" textAnchor="middle" fill="#818cf8" fontSize="6.5" fontWeight="900" letterSpacing="0.05em">KIBEX</text>
                  </svg>
                </div>
              </div>

              {/* Form fields grid */}
              <form className={s.form} onSubmit={handleSubmit} noValidate>
                {/* Honeypot hidden input */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {/* Invisible Cloudflare widget */}
                <div ref={turnstileContainerRef} id="hl-turnstile-container" style={{ display: "none" }} />

                <div className={s.formRow}>
                  {/* Name field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="hl-name-input">Имя *</label>
                    <input
                      id="hl-name-input"
                      type="text"
                      className={`${s.input} ${touched.name && !isNameValid ? s.inputInvalid : ""}`}
                      placeholder="Иван"
                      value={name}
                      maxLength={50}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur("name")}
                      required
                    />
                    {touched.name && !isNameValid && (
                      <span className={s.errorText}>Введите имя (2-50 символов, только буквы)</span>
                    )}
                  </div>

                  {/* Company field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="hl-company-input">Компания *</label>
                    <input
                      id="hl-company-input"
                      type="text"
                      className={`${s.input} ${touched.company && !isCompanyValid ? s.inputInvalid : ""}`}
                      placeholder="Название компании"
                      value={company}
                      maxLength={100}
                      onChange={(e) => setCompany(e.target.value)}
                      onBlur={() => handleBlur("company")}
                      required
                    />
                    {touched.company && !isCompanyValid && (
                      <span className={s.errorText}>Введите название компании (2-100 символов)</span>
                    )}
                  </div>
                </div>

                <div className={s.formRow}>
                  {/* Contact field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="hl-contact-input">Контакт для связи *</label>
                    <input
                      id="hl-contact-input"
                      type="text"
                      className={`${s.input} ${touched.contact && !isContactValid ? s.inputInvalid : ""}`}
                      placeholder="Telegram / Email / Телефон"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      onBlur={() => handleBlur("contact")}
                      required
                    />
                    {touched.contact && !isContactValid && (
                      <span className={s.errorText}>Укажите корректный Telegram, Email или телефон</span>
                    )}
                  </div>

                  {/* Platform Type select */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="hl-platform-select">Тип платформы *</label>
                    <select
                      id="hl-platform-select"
                      className={s.select}
                      value={platformType}
                      onChange={(e) => setPlatformType(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>Выберите тип платформы</option>
                      {PLATFORM_TYPES.map(pt => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Smart contextual advisory warning cards */}
                {platformType === "Интернет-магазин" && (
                  <div className={s.infoCard}>
                    <span className={s.infoCardTitle}>Типичные highload проблемы:</span>
                    <ul className={s.infoCardList}>
                      <li>• деградация скорости каталога при росте товаров</li>
                      <li>• медленный checkout и блокировки остатков</li>
                      <li>• перегрузка базы данных транзакционными запросами</li>
                    </ul>
                  </div>
                )}

                {platformType === "ERP система" && (
                  <div className={s.infoCard}>
                    <span className={s.infoCardTitle}>Типичные highload проблемы:</span>
                    <ul className={s.infoCardList}>
                      <li>• блокировки распределенных транзакций</li>
                      <li>• рассинхронизация данных между узлами</li>
                      <li>• перегрузка внешних шин интеграций</li>
                    </ul>
                  </div>
                )}

                {platformType === "Marketplace" && (
                  <div className={s.infoCard}>
                    <span className={s.infoCardTitle}>Типичные highload проблемы:</span>
                    <ul className={s.infoCardList}>
                      <li>• критические пиковые нагрузки при распродажах</li>
                      <li>• задержки real-time обновлений каталогов</li>
                      <li>• сложности масштабирования очередей сообщений</li>
                    </ul>
                  </div>
                )}

                <div className={s.formRow}>
                  {/* Traffic Select */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="hl-traffic-select">Текущая посещаемость</label>
                    <select
                      id="hl-traffic-select"
                      className={s.select}
                      value={traffic}
                      onChange={(e) => setTraffic(e.target.value)}
                    >
                      <option value="" disabled hidden>Выберите посещаемость</option>
                      {TRAFFIC_OPTIONS.map(to => (
                        <option key={to} value={to}>{to}</option>
                      ))}
                    </select>
                  </div>

                  {/* Peak Load field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="hl-peak-input">Пиковая нагрузка</label>
                    <input
                      id="hl-peak-input"
                      type="text"
                      className={s.input}
                      placeholder="Например: 15 000 запросов/сек или 500 000 SKU"
                      value={peakLoad}
                      onChange={(e) => setPeakLoad(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tech Stack field */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="hl-tech-input">Используемые технологии</label>
                  <input
                    id="hl-tech-input"
                    type="text"
                    className={s.input}
                    placeholder="Node.js, PHP, PostgreSQL, Redis, Kubernetes..."
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                  />
                </div>

                {/* Problems multiselect chips */}
                <div className={s.field}>
                  <label className={s.label}>Основные проблемы инфраструктуры</label>
                  <div className={s.multiSelect}>
                    {PROBLEMS.map(p => {
                      const isActive = selectedProblems.includes(p);
                      return (
                        <div
                          key={p}
                          className={`${s.chip} ${isActive ? s.chipActive : ""}`}
                          onClick={() => toggleProblem(p)}
                        >
                          {p}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Business Critical checkbox chips */}
                <div className={s.field}>
                  <label className={s.label}>Что критично для бизнеса?</label>
                  <div className={s.multiSelect}>
                    {CRITICAL_PRIORITIES.map(c => {
                      const isActive = selectedCritical.includes(c);
                      return (
                        <div
                          key={c}
                          className={`${s.criticalChip} ${isActive ? s.criticalChipActive : ""}`}
                          onClick={() => toggleCritical(c)}
                        >
                          <input
                            type="checkbox"
                            className={s.criticalCheckbox}
                            checked={isActive}
                            readOnly
                          />
                          <span>{c}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Description textarea */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="hl-desc-textarea">Описание текущих ограничений *</label>
                  <textarea
                    id="hl-desc-textarea"
                    className={`${s.textarea} ${touched.description && !isDescriptionValid ? s.inputInvalid : ""}`}
                    rows={3}
                    placeholder="Опишите текущие проблемы производительности, ограничения архитектуры или причины перехода на highload инфраструктуру."
                    value={description}
                    maxLength={1000}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => handleBlur("description")}
                    required
                  />
                  {touched.description && !isDescriptionValid && (
                    <span className={s.errorText}>Опишите ограничения (до 1000 символов)</span>
                  )}
                </div>

                {/* Privacy policy checkbox */}
                <div className={s.privacyField}>
                  <label className={s.privacyLabel}>
                    <input
                      type="checkbox"
                      className={s.checkbox}
                      checked={isPrivacyAccepted}
                      onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
                      required
                    />
                    <span className={s.privacyText}>
                      Я соглашаюсь с обработкой персональных данных и{" "}
                      <a href="/privacy" className={s.privacyLink} target="_blank" rel="noopener noreferrer">
                        политикой конфиденциальности
                      </a>
                      .
                    </span>
                  </label>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className={s.errorBanner}>
                    {errorMsg}
                  </div>
                )}

                {/* Submit button */}
                <button
                  className={`${s.submitBtn} ${isFormValid ? s.submitBtnEnabled : s.submitBtnDisabled}`}
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className={s.spinnerLayout}>
                      <svg className={s.spinner} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="#fff" />
                      </svg>
                      Обработка...
                    </span>
                  ) : (
                    "Получить архитектурную оценку"
                  )}
                </button>

                {/* Trust indications */}
                <div className={s.trustBadges}>
                  <span>✓ Конфиденциально</span>
                  <span>✓ Без обязательств</span>
                  <span>✓ Ответ в течение 24 часов</span>
                </div>
              </form>
            </div>
          ) : (
            /* Success screen state */
            <div className={s.success}>
              <div className={s.successNodeContainer}>
                {/* Animated infrastructure pulse circle */}
                <motion.div
                  className={s.successPulse}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className={s.successInnerCircle}>
                  <Check size={32} color="#818cf8" strokeWidth={3} />
                </div>
              </div>

              <h2 className={s.successTitle}>Запрос успешно отправлен</h2>
              <p className={s.successText}>
                Инженерная команда Kibex изучит инфраструктуру и подготовит рекомендации по масштабированию.
              </p>
              <p className={s.successSubtext}>
                Специалист свяжется с вами в течение 24 часов.
              </p>

              <div className={s.successActions}>
                <button className={s.successBtnClose} onClick={onClose}>
                  Закрыть
                </button>
                <button className={s.successBtnBack} onClick={onClose}>
                  Вернуться к сайту
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
