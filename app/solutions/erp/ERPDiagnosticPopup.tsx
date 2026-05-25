"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import s from "./ERPDiagnosticPopup.module.css";

interface ERPDiagnosticPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROCESSES = [
  "Продажи",
  "CRM",
  "Склад",
  "Логистика",
  "Финансы",
  "HR",
  "Производство",
  "Закупки",
  "Документы",
  "Аналитика"
];

const SIZES = [
  "до 10 сотрудников",
  "10–50 сотрудников",
  "50–200 сотрудников",
  "200–1000 сотрудников",
  "1000+ сотрудников"
];

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          size?: "normal" | "compact" | "invisible";
          callback?: (token: string) => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export default function ERPDiagnosticPopup({ isOpen, onClose }: ERPDiagnosticPopupProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [currentSystems, setCurrentSystems] = useState("");
  const [problem, setProblem] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot field
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Input touched states for validation display
  const [touched, setTouched] = useState({
    name: false,
    company: false,
    contact: false,
    problem: false
  });

  // Validation rules
  const cleanName = name.trim().replace(/<[^>]*>/g, "");
  const isNameValid = cleanName.length >= 2 && cleanName.length <= 50 && /^[A-Za-zА-Яа-яЁё\s]+$/.test(cleanName);

  const cleanCompany = company.trim().replace(/<[^>]*>/g, "");
  const isCompanyValid = cleanCompany.length >= 2 && cleanCompany.length <= 100;

  const cleanContact = contact.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
  const isTelegram = /^@?[a-zA-Z0-9_]{5,32}$/.test(cleanContact);
  const isPhone = /^\+?[0-9\s\-()]{10,20}$/.test(cleanContact);
  const isContactValid = isEmail || isTelegram || isPhone;

  const cleanProblem = problem.trim().replace(/<[^>]*>/g, "");
  const isProblemValid = cleanProblem.length >= 1 && cleanProblem.length <= 1000;

  const isFormValid = isNameValid && isCompanyValid && isContactValid && isProblemValid && isPrivacyAccepted;

  // Turnstile container reset ref
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Reset state on open
    setName("");
    setCompany("");
    setContact("");
    setCompanySize("");
    setSelectedProcesses([]);
    setCurrentSystems("");
    setProblem("");
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
      problem: false
    });

    // 1. Lock body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Autofocus first input field
    const focusTimeout = setTimeout(() => {
      const firstInput = document.getElementById("erp-name-input");
      if (firstInput) {
        firstInput.focus();
      }
    }, 150);

    // 3. ESC close listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // 4. Dynamic Cloudflare Turnstile loader
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
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      window.onloadTurnstileCallback = () => {
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

  const toggleProcess = (p: string) => {
    setSelectedProcesses(prev => {
      if (prev.includes(p)) {
        return prev.filter(x => x !== p);
      }
      if (prev.length >= 5) return prev; // Limit to 5 selections
      return [...prev, p];
    });
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
      const res = await fetch("/api/erp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          company: cleanCompany,
          contact: cleanContact,
          companySize,
          processes: selectedProcesses,
          currentSystems,
          problem: cleanProblem,
          website, // Honeypot field
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
              {/* Header section with text */}
              <div className={s.header}>
                <div className={s.headerLeft}>
                  <h2 className={s.title}>Получить архитектурную оценку ERP системы</h2>
                  <p className={s.subtitle}>
                    Мы изучим процессы компании, определим ограничения текущей инфраструктуры и предложим архитектуру ERP платформы под ваш бизнес.
                  </p>
                </div>
              </div>

              {/* Form structure */}
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

                {/* Cloudflare Turnstile invisible target */}
                <div ref={turnstileContainerRef} id="turnstile-container" style={{ display: "none" }} />

                <div className={s.formRow}>
                  {/* Name field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="erp-name-input">Имя *</label>
                    <input
                      id="erp-name-input"
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
                    <label className={s.label} htmlFor="erp-company-input">Компания *</label>
                    <input
                      id="erp-company-input"
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
                    <label className={s.label} htmlFor="erp-contact-input">Контакт для связи *</label>
                    <input
                      id="erp-contact-input"
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

                  {/* Company Size field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="erp-size-select">Размер компании</label>
                    <select
                      id="erp-size-select"
                      className={s.select}
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                    >
                      <option value="" disabled hidden>Выберите размер</option>
                      {SIZES.map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Automation processes multiselect chips */}
                <div className={s.field}>
                  <label className={s.label}>Какие процессы хотите автоматизировать?</label>
                  <div className={s.multiSelect}>
                    {PROCESSES.map(p => {
                      const isActive = selectedProcesses.includes(p);
                      return (
                        <div
                          key={p}
                          className={`${s.chip} ${isActive ? s.chipActive : ""}`}
                          onClick={() => toggleProcess(p)}
                        >
                          {p}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Systems field */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="erp-systems-input">Какие системы уже используются?</label>
                  <input
                    id="erp-systems-input"
                    type="text"
                    className={s.input}
                    placeholder="1С, Excel, Bitrix, AmoCRM, МойСклад..."
                    value={currentSystems}
                    onChange={(e) => setCurrentSystems(e.target.value)}
                  />
                </div>

                {/* Problem field */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="erp-problem-textarea">Главная проблема сейчас *</label>
                  <textarea
                    id="erp-problem-textarea"
                    className={`${s.textarea} ${touched.problem && !isProblemValid ? s.inputInvalid : ""}`}
                    rows={3}
                    placeholder="Опишите процессы, которые занимают больше всего времени или создают ошибки."
                    value={problem}
                    maxLength={1000}
                    onChange={(e) => setProblem(e.target.value)}
                    onBlur={() => handleBlur("problem")}
                    required
                  />
                  {touched.problem && !isProblemValid && (
                    <span className={s.errorText}>Опишите проблему (до 1000 символов)</span>
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

                {/* Error status notice */}
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
                      Отправка...
                    </span>
                  ) : (
                    "Получить архитектурную оценку"
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success State screen */
            <div className={s.success}>
              <div className={s.successCheckWrapper}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={s.successCheckCircle}
                >
                  <Check size={36} color="#818cf8" strokeWidth={3} />
                </motion.div>
              </div>

              <h2 className={s.successTitle}>Запрос успешно отправлен</h2>
              <p className={s.successText}>
                Команда Kibex изучит ваш запрос и свяжется с вами в течение 24 часов.
              </p>

              <div className={s.successActions}>
                <button className={s.successBtnClose} onClick={onClose}>
                  Закрыть
                </button>
                <button className={s.successBtnBack} onClick={onClose}>
                  Вернуться на сайт
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
