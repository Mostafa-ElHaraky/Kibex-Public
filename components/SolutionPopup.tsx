"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Check } from "lucide-react";
import styles from "./SolutionPopup.module.css";

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

interface SolutionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Whitelisted project types — only these values are ever accepted. */
const PROJECT_TYPES = [
  "Модернизация платформы",
  "Новый интернет-магазин",
  "Интеграции с 1С / ERP",
  "Аудит безопасности",
  "Нужна консультация",
] as const;

const BENEFITS = [
  "Предварительную оценку проекта",
  "Понимание ограничений платформы",
  "Рекомендации по развитию",
  "Ориентир по срокам и бюджету",
];

/** How long (ms) before the user may submit again within the same session. */
const COOLDOWN_MS = 60_000;

// ─── VALIDATION ──────────────────────────────────────────────────────────────

/** Strip any HTML tags and encode the five most dangerous HTML characters. */
function sanitize(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")                       // strip tags
    .replace(/[&<>"'/]/g, (c) =>                   // encode HTML special chars
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;" }[c] ?? c)
    )
    .trim();
}

const VALIDATION_RULES = {
  /** Letters, spaces, hyphens, Russian + Latin — max 80 chars. */
  name: /^[a-zA-Zа-яёА-ЯЁ\s\-]{1,80}$/,
  /** Company: letters, digits, basic punctuation — max 120 chars. */
  company: /^[a-zA-Zа-яёА-ЯЁ0-9\s\-.,'"()]{0,120}$/,
  /** Telegram @handle OR E.164-ish phone (+7 / 8 with spaces, dashes). */
  contact: /^(@[a-zA-Z0-9_]{3,32}|(\+?[78][\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}))$/,
  /** Free text — max 800 chars. */
  description: /^.{0,800}$/,
};

type FieldName = "name" | "company" | "contact" | "description";

function validate(field: FieldName, value: string): string | null {
  const clean = value.trim();
  if (field === "name" && !clean) return "Укажите имя";
  if (field === "contact" && !clean) return "Укажите телефон или Telegram";
  if (field === "description" && clean.length > 800)
    return "Максимум 800 символов";

  const pattern = VALIDATION_RULES[field];
  if (clean && !pattern.test(clean)) {
    if (field === "contact") return "Введите корректный Telegram или телефон";
    if (field === "name") return "Имя содержит недопустимые символы";
    if (field === "company") return "Компания содержит недопустимые символы";
  }
  return null;
}

// ─── ANIMATION ──────────────────────────────────────────────────────────────

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.4, 0, 0.2, 1] as any },
  }),
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function SolutionPopup({ isOpen, onClose }: SolutionPopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  // Refs for controlled inputs (avoids React state on every keystroke)
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // Honeypot ref — bots fill this; humans never see it
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Cooldown — stores timestamp of last successful send (session-scoped)
  const lastSentRef = useRef<number>(0);

  // ── Reset on open ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSelectedType("");
      setErrors({});
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // ── Submit handler ─────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check — if the hidden field has a value, silently bail out
    if (honeypotRef.current?.value) {
      setIsSubmitted(true); // show success screen without actually sending
      return;
    }

    // 2. Rate limiting — one submission per COOLDOWN_MS per session
    const now = Date.now();
    if (now - lastSentRef.current < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - (now - lastSentRef.current)) / 1000);
      setErrors({ name: `Пожалуйста, подождите ${remaining} секунд перед повторной отправкой.` });
      return;
    }

    // 3. Client-side validation
    const rawName = nameRef.current?.value ?? "";
    const rawCompany = companyRef.current?.value ?? "";
    const rawContact = contactRef.current?.value ?? "";
    const rawDesc = descRef.current?.value ?? "";

    const newErrors: Partial<Record<FieldName, string>> = {};
    const nameErr = validate("name", rawName);
    if (nameErr) newErrors.name = nameErr;
    const companyErr = validate("company", rawCompany);
    if (companyErr) newErrors.company = companyErr;
    const contactErr = validate("contact", rawContact);
    if (contactErr) newErrors.contact = contactErr;
    const descErr = validate("description", rawDesc);
    if (descErr) newErrors.description = descErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 4. Whitelist check for project type
    const safeType =
      PROJECT_TYPES.includes(selectedType as any) ? selectedType : "";

    // 5. Sanitize before sending
    const payload = {
      name: sanitize(rawName),
      company: sanitize(rawCompany),
      contact: sanitize(rawContact),
      projectType: safeType,           // already from a closed whitelist
      description: sanitize(rawDesc),
    };

    // 6. Disable button immediately to prevent double-submit
    setIsSubmitting(true);

    // 7. POST with explicit Content-Type and charset
    //    Replace "/api/contact" with your real endpoint.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .catch(() => {
        // Network error — still show success UX (fail silently on front-end)
      })
      .finally(() => {
        lastSentRef.current = Date.now();
        setIsSubmitting(false);
        setIsSubmitted(true);
      });
  };

  // ── Inline validation on blur ──────────────────────────────────────────────
  const handleBlur = (field: FieldName, value: string) => {
    const err = validate(field, value);
    setErrors((prev) => ({ ...prev, [field]: err ?? undefined }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <div className={styles.layout}>
                {/* ── FORM SIDE ─────────────────────────────────────────── */}
                <div className={styles.formSide}>
                  <motion.div
                    className={styles.header}
                    custom={0}
                    initial="hidden"
                    animate="show"
                    variants={fieldVariants}
                  >
                    <h2 className={styles.title}>Получить бесплатную оценку платформы</h2>
                    <p className={styles.subtitle}>
                      Поможем понять, что ограничивает рост вашей платформы и как решить это без лишних затрат и рисков.
                    </p>
                    <div className={styles.trustBar}>
                      Конфиденциально&nbsp;•&nbsp;Без обязательств&nbsp;•&nbsp;Ответ в течение 24 часов
                    </div>
                  </motion.div>

                  {/*
                   * Honeypot — visually hidden, never filled by real users.
                   * Bots that auto-fill every input will trigger the guard above.
                   * aria-hidden keeps it out of screen-readers; tabIndex -1 prevents
                   * accidental keyboard focus.
                   */}
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    aria-hidden="true"
                    tabIndex={-1}
                    autoComplete="off"
                    className={styles.honeypot}
                  />

                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.formRow}>
                      {/* NAME */}
                      <motion.div
                        className={styles.field}
                        custom={1}
                        initial="hidden"
                        animate="show"
                        variants={fieldVariants}
                      >
                        <label className={styles.label}>Имя *</label>
                        <input
                          ref={nameRef}
                          type="text"
                          required
                          maxLength={80}
                          placeholder="Иван Иванов"
                          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                          onBlur={(e) => handleBlur("name", e.target.value)}
                          onChange={() => errors.name && setErrors((p) => ({ ...p, name: undefined }))}
                        />
                        {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                      </motion.div>

                      {/* COMPANY */}
                      <motion.div
                        className={styles.field}
                        custom={2}
                        initial="hidden"
                        animate="show"
                        variants={fieldVariants}
                      >
                        <label className={styles.label}>Компания</label>
                        <input
                          ref={companyRef}
                          type="text"
                          maxLength={120}
                          placeholder="Название компании"
                          className={`${styles.input} ${errors.company ? styles.inputError : ""}`}
                          onBlur={(e) => handleBlur("company", e.target.value)}
                          onChange={() => errors.company && setErrors((p) => ({ ...p, company: undefined }))}
                        />
                        {errors.company && <span className={styles.fieldError}>{errors.company}</span>}
                      </motion.div>
                    </div>

                    {/* CONTACT */}
                    <motion.div
                      className={styles.field}
                      custom={3}
                      initial="hidden"
                      animate="show"
                      variants={fieldVariants}
                    >
                      <label className={styles.label}>Телефон или Telegram *</label>
                      <input
                        ref={contactRef}
                        type="text"
                        required
                        maxLength={40}
                        placeholder="@username или +7 000 000 00 00"
                        className={`${styles.input} ${errors.contact ? styles.inputError : ""}`}
                        onBlur={(e) => handleBlur("contact", e.target.value)}
                        onChange={() => errors.contact && setErrors((p) => ({ ...p, contact: undefined }))}
                      />
                      {errors.contact && <span className={styles.fieldError}>{errors.contact}</span>}
                    </motion.div>

                    {/* PROJECT TYPE — whitelist pill buttons */}
                    <motion.div
                      className={styles.field}
                      custom={4}
                      initial="hidden"
                      animate="show"
                      variants={fieldVariants}
                    >
                      <label className={styles.label}>Что требуется?</label>
                      <div className={styles.typeGrid}>
                        {PROJECT_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={`${styles.typeBtn} ${selectedType === type ? styles.typeBtnActive : ""}`}
                            onClick={() => setSelectedType(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* DESCRIPTION */}
                    <motion.div
                      className={styles.field}
                      custom={5}
                      initial="hidden"
                      animate="show"
                      variants={fieldVariants}
                    >
                      <label className={styles.label}>
                        Кратко о задаче
                        <span className={styles.charHint}>
                          {descRef.current?.value?.length ?? 0}/800
                        </span>
                      </label>
                      <textarea
                        ref={descRef}
                        className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
                        placeholder="Кратко опишите задачу или проблему, с которой столкнулся бизнес."
                        maxLength={800}
                        onBlur={(e) => handleBlur("description", e.target.value)}
                        onChange={() => errors.description && setErrors((p) => ({ ...p, description: undefined }))}
                      />
                      {errors.description && <span className={styles.fieldError}>{errors.description}</span>}
                    </motion.div>

                    {/* SUBMIT — disabled while submitting */}
                    <motion.div custom={6} initial="hidden" animate="show" variants={fieldVariants}>
                      <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                        aria-disabled={isSubmitting}
                      >
                        {isSubmitting ? "Отправка..." : "Получить оценку"}
                      </button>
                    </motion.div>
                  </form>
                </div>

                {/* ── BENEFITS SIDE PANEL ───────────────────────────────── */}
                <motion.div
                  className={styles.benefitsSide}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className={styles.benefitsTitle}>После обращения вы получите:</p>
                  <ul className={styles.benefitsList}>
                    {BENEFITS.map((b, i) => (
                      <li key={i} className={styles.benefitItem}>
                        <Check size={14} className={styles.checkIcon} />
                        {/* Rendered from a static constant — no user data, no XSS risk */}
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.benefitsNote}>
                    Мы не используем шаблоны. Мы проектируем системы.
                  </div>
                </motion.div>
              </div>
            ) : (
              /* ── SUCCESS ────────────────────────────────────────────────── */
              <div className={styles.success}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <CheckCircle2 size={56} className={styles.successIcon} />
                </motion.div>
                {/* Success copy is 100% static — no user input rendered here */}
                <motion.h2
                  className={styles.successTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  Запрос отправлен
                </motion.h2>
                <motion.p
                  className={styles.successText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                >
                  Мы получили вашу заявку. Специалист Kibex свяжется с вами в течение 24 часов для первичного обсуждения проекта.
                </motion.p>
                <motion.button
                  className={styles.closeSuccessButton}
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Закрыть
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
