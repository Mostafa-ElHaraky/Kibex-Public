"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShieldCheck } from "lucide-react";
import s from "./SecurityAssessmentPopup.module.css";

interface SecurityAssessmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLATFORM_TYPES = [
  "Интернет-магазин",
  "ERP система",
  "Корпоративная платформа",
  "B2B система",
  "Marketplace",
  "SaaS система",
  "API сервис",
  "Другое",
];

const AUDIT_AREAS = [
  "Безопасность API",
  "Авторизация и роли",
  "SQL-инъекции",
  "XSS уязвимости",
  "Конфигурацию серверов",
  "Инфраструктуру Kubernetes",
  "Интеграции с 1С",
  "WAF и firewall",
  "Безопасность базы данных",
  "Логи и мониторинг",
];

const CURRENT_ISSUES = [
  "Подозрительная активность",
  "Падения платформы",
  "Медленная работа",
  "Ошибки авторизации",
  "Проблемы API",
  "Утечки данных",
  "Проблемы доступа",
  "Неизвестно",
];

export default function SecurityAssessmentPopup({ isOpen, onClose }: SecurityAssessmentPopupProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [platformType, setPlatformType] = useState("");
  const [selectedAuditAreas, setSelectedAuditAreas] = useState<string[]>([]);
  const [techStack, setTechStack] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [touched, setTouched] = useState({
    name: false, company: false, contact: false, description: false,
  });

  // — Validation —
  const cleanName = name.trim().replace(/<[^>]*>/g, "");
  const isNameValid = cleanName.length >= 2 && cleanName.length <= 50 && /^[A-Za-zА-Яа-яЁё\s]+$/.test(cleanName);

  const cleanCompany = company.trim().replace(/<[^>]*>/g, "");
  const isCompanyValid = cleanCompany.length >= 2 && cleanCompany.length <= 100;

  const cleanContact = contact.trim();
  const isContactValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact) ||
    /^@?[a-zA-Z0-9_]{5,32}$/.test(cleanContact) ||
    /^\+?[0-9\s\-()]{10,20}$/.test(cleanContact);

  const isPlatformValid = platformType !== "";

  const cleanDescription = description.trim().replace(/<[^>]*>/g, "");
  const isDescriptionValid = cleanDescription.length >= 1 && cleanDescription.length <= 1000;

  const isFormValid =
    isNameValid && isCompanyValid && isContactValid &&
    isPlatformValid && isDescriptionValid && isPrivacyAccepted;

  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Reset all fields
    setName(""); setCompany(""); setContact(""); setPlatformType("");
    setSelectedAuditAreas([]); setTechStack(""); setSelectedIssues([]);
    setDescription(""); setWebsite(""); setIsPrivacyAccepted(false);
    setTurnstileToken(""); setIsSubmitted(false); setIsSubmitting(false);
    setErrorMsg("");
    setTouched({ name: false, company: false, contact: false, description: false });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.getElementById("sec-name-input")?.focus();
    }, 150);

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);

    // Turnstile
    let widgetId: string | null = null;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
    const load = () => {
      if (window.turnstile && turnstileRef.current) {
        try {
          widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: siteKey,
            size: "invisible",
            callback: (token: string) => setTurnstileToken(token),
          });
        } catch {}
      }
    };
    if (!window.turnstile) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallbackSEC";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      (window as any).onloadTurnstileCallbackSEC = load;
    } else {
      load();
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
      if (window.turnstile && widgetId !== null) {
        try { window.turnstile.remove(widgetId); } catch {}
      }
    };
  }, [isOpen, onClose]);

  const toggleChip = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName, company: cleanCompany, contact: cleanContact,
          platformType,
          auditAreas: selectedAuditAreas,
          techStack,
          currentIssues: selectedIssues,
          description: cleanDescription,
          website, turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка отправки запроса.");
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Ошибка отправки. Попробуйте позже.");
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
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <button className={s.closeButton} onClick={onClose} aria-label="Закрыть">
            <X size={18} />
          </button>

          {!isSubmitted ? (
            <div className={s.content}>
              {/* ─── HEADER ─────────────────────────────── */}
              <div className={s.header}>
                <h2 className={s.title}>Получить конфиденциальную оценку безопасности</h2>
                <p className={s.subtitle}>
                  Мы проведём архитектурный аудит платформы, выявим критические риски безопасности и подготовим рекомендации по защите инфраструктуры, API и пользовательских данных.
                </p>
              </div>

              {/* ─── FORM ───────────────────────────────── */}
              <form className={s.form} onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off"
                  value={website} onChange={e => setWebsite(e.target.value)}
                  style={{ display: "none" }} aria-hidden="true" />
                <div ref={turnstileRef} style={{ display: "none" }} />

                {/* Row 1: Name + Company */}
                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="sec-name-input">Имя *</label>
                    <input id="sec-name-input" type="text"
                      className={`${s.input} ${touched.name && !isNameValid ? s.inputInvalid : ""}`}
                      placeholder="Иван" value={name} maxLength={50}
                      onChange={e => setName(e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, name: true }))} required />
                    {touched.name && !isNameValid && (
                      <span className={s.errorText}>2–50 символов, только буквы</span>
                    )}
                  </div>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="sec-company-input">Компания *</label>
                    <input id="sec-company-input" type="text"
                      className={`${s.input} ${touched.company && !isCompanyValid ? s.inputInvalid : ""}`}
                      placeholder="Название компании" value={company} maxLength={100}
                      onChange={e => setCompany(e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, company: true }))} required />
                    {touched.company && !isCompanyValid && (
                      <span className={s.errorText}>2–100 символов</span>
                    )}
                  </div>
                </div>

                {/* Row 2: Contact + Platform Type */}
                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="sec-contact-input">Контакт для связи *</label>
                    <input id="sec-contact-input" type="text"
                      className={`${s.input} ${touched.contact && !isContactValid ? s.inputInvalid : ""}`}
                      placeholder="Telegram / Email / Телефон" value={contact}
                      onChange={e => setContact(e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, contact: true }))} required />
                    {touched.contact && !isContactValid && (
                      <span className={s.errorText}>Укажите Telegram, Email или телефон</span>
                    )}
                  </div>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="sec-platform-select">Тип платформы *</label>
                    <select id="sec-platform-select" className={s.select}
                      value={platformType}
                      onChange={e => setPlatformType(e.target.value)} required>
                      <option value="" disabled hidden>Выберите тип платформы</option>
                      {PLATFORM_TYPES.map(pt => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contextual risk cards */}
                <AnimatePresence mode="wait">
                  {platformType === "Интернет-магазин" && (
                    <motion.div key="shop" className={s.infoCard}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }}>
                      <span className={s.infoCardTitle}>Типичные риски:</span>
                      <ul className={s.infoCardList}>
                        <li>• XSS-уязвимости через сторонние плагины</li>
                        <li>• уязвимости checkout и платёжного flow</li>
                        <li>• утечки персональных и платёжных данных</li>
                      </ul>
                    </motion.div>
                  )}
                  {platformType === "ERP система" && (
                    <motion.div key="erp" className={s.infoCard}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }}>
                      <span className={s.infoCardTitle}>Типичные риски:</span>
                      <ul className={s.infoCardList}>
                        <li>• нарушение изоляции ролей и прав доступа</li>
                        <li>• уязвимости в шинах интеграций</li>
                        <li>• утечка корпоративных и финансовых данных</li>
                      </ul>
                    </motion.div>
                  )}
                  {platformType === "API сервис" && (
                    <motion.div key="api" className={s.infoCard}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }}>
                      <span className={s.infoCardTitle}>Типичные риски:</span>
                      <ul className={s.infoCardList}>
                        <li>• незащищённые endpoints без авторизации</li>
                        <li>• отсутствие rate limiting и throttling</li>
                        <li>• ошибки JWT и механизмов авторизации</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Audit areas chips */}
                <div className={s.field}>
                  <label className={s.label}>Что необходимо проверить?</label>
                  <div className={s.multiSelect}>
                    {AUDIT_AREAS.map(area => (
                      <div key={area}
                        className={`${s.chip} ${selectedAuditAreas.includes(area) ? s.chipActive : ""}`}
                        onClick={() => toggleChip(selectedAuditAreas, setSelectedAuditAreas, area)}>
                        {area}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="sec-tech-input">Используемые технологии</label>
                  <input id="sec-tech-input" type="text" className={s.input}
                    placeholder="Node.js, PHP, PostgreSQL, Kubernetes, Bitrix..."
                    value={techStack} onChange={e => setTechStack(e.target.value)} />
                </div>

                {/* Current issues chips */}
                <div className={s.field}>
                  <label className={s.label}>Есть ли текущие проблемы?</label>
                  <div className={s.multiSelect}>
                    {CURRENT_ISSUES.map(issue => (
                      <div key={issue}
                        className={`${s.chip} ${selectedIssues.includes(issue) ? s.chipActive : ""}`}
                        onClick={() => toggleChip(selectedIssues, setSelectedIssues, issue)}>
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="sec-desc-textarea">Описание инфраструктуры или задачи *</label>
                  <textarea id="sec-desc-textarea"
                    className={`${s.textarea} ${touched.description && !isDescriptionValid ? s.inputInvalid : ""}`}
                    rows={3}
                    placeholder="Опишите платформу, текущие риски безопасности или цели аудита."
                    value={description} maxLength={1000}
                    onChange={e => setDescription(e.target.value)}
                    onBlur={() => setTouched(p => ({ ...p, description: true }))} required />
                  {touched.description && !isDescriptionValid && (
                    <span className={s.errorText}>Опишите задачу (до 1000 символов)</span>
                  )}
                </div>

                {/* Confidentiality notice */}
                <div className={s.secureNotice}>
                  <ShieldCheck size={16} className={s.secureNoticeIcon} strokeWidth={1.5} />
                  <p className={s.secureNoticeText}>
                    <strong>Конфиденциальность гарантирована</strong>
                    Все данные обрабатываются конфиденциально. Мы не передаём информацию третьим лицам и не используем результаты аудита вне проекта.
                  </p>
                </div>

                {/* Privacy checkbox */}
                <div className={s.privacyField}>
                  <label className={s.privacyLabel}>
                    <input type="checkbox" className={s.checkbox}
                      checked={isPrivacyAccepted}
                      onChange={e => setIsPrivacyAccepted(e.target.checked)} required />
                    <span className={s.privacyText}>
                      Я соглашаюсь с обработкой персональных данных и{" "}
                      <a href="/privacy" className={s.privacyLink} target="_blank" rel="noopener noreferrer">
                        политикой конфиденциальности
                      </a>.
                    </span>
                  </label>
                </div>

                {errorMsg && <div className={s.errorBanner}>{errorMsg}</div>}

                {/* Submit */}
                <button
                  className={`${s.submitBtn} ${isFormValid ? s.submitBtnEnabled : s.submitBtnDisabled}`}
                  type="submit" disabled={!isFormValid || isSubmitting}>
                  {isSubmitting ? (
                    <span className={s.spinnerLayout}>
                      <svg className={s.spinner} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="#fff" />
                      </svg>
                      Обработка...
                    </span>
                  ) : "Получить оценку безопасности"}
                </button>

                <div className={s.trustBadges}>
                  <span>✓ Конфиденциально</span>
                  <span>✓ Без обязательств</span>
                  <span>✓ Ответ в течение 24 часов</span>
                </div>
              </form>
            </div>
          ) : (
            /* ─── SUCCESS ──────────────────────────────── */
            <div className={s.success}>
              <div className={s.successShieldWrap}>
                <motion.div className={s.successShieldPulse}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} />
                <div className={s.successShieldInner}>
                  <Check size={28} color="#818cf8" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className={s.successTitle}>Запрос успешно отправлен</h2>
              <p className={s.successText}>
                Команда Kibex изучит инфраструктуру и подготовит предварительную оценку рисков безопасности.
              </p>
              <p className={s.successSubtext}>Специалист по безопасности свяжется с вами в течение 24 часов.</p>
              <div className={s.successActions}>
                <button className={s.successBtnPrimary} onClick={onClose}>Закрыть</button>
                <button className={s.successBtnSecondary} onClick={onClose}>Вернуться на сайт</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
