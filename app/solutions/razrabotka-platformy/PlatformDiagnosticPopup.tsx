"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import s from "./PlatformDiagnosticPopup.module.css";

interface PlatformDiagnosticPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  "Интернет-магазин",
  "B2B платформа",
  "Marketplace",
  "Оптовый портал",
  "D2C бренд",
  "Корпоративная торговая система",
  "Другое",
];

const CATALOG_SIZES = [
  "до 1 000 SKU",
  "1 000 – 10 000 SKU",
  "10 000 – 100 000 SKU",
  "100 000+ SKU",
];

const CRITICAL_PROCESSES = [
  "Checkout",
  "Склад и остатки",
  "Интеграция с 1С",
  "B2B кабинеты",
  "Логистика",
  "OMS/WMS",
  "SEO",
  "Мобильная версия",
  "Производительность",
  "Маркетплейсы",
];

const GROWTH_LIMITS = [
  "Медленная работа",
  "Проблемы SEO",
  "Нестабильные интеграции",
  "Высокая стоимость поддержки",
  "Проблемы масштабирования",
  "Пиковые падения",
  "Сложность доработок",
  "Ограничения CMS",
];

export default function PlatformDiagnosticPopup({ isOpen, onClose }: PlatformDiagnosticPopupProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [projectType, setProjectType] = useState("");
  const [catalogSize, setCatalogSize] = useState("");
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [currentSystems, setCurrentSystems] = useState("");
  const [selectedLimits, setSelectedLimits] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
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

  const isPlatformValid = projectType !== "";

  const cleanDescription = description.trim().replace(/<[^>]*>/g, "");
  const isDescriptionValid = cleanDescription.length >= 1 && cleanDescription.length <= 1000;

  const isFormValid =
    isNameValid && isCompanyValid && isContactValid &&
    isPlatformValid && isDescriptionValid && isPrivacyAccepted;

  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setName(""); setCompany(""); setContact(""); setProjectType("");
    setCatalogSize(""); setSelectedProcesses([]); setCurrentSystems("");
    setSelectedLimits([]); setDescription(""); setWebsite("");
    setIsPrivacyAccepted(false); setTurnstileToken("");
    setIsSubmitted(false); setIsSubmitting(false); setErrorMsg("");
    setTouched({ name: false, company: false, contact: false, description: false });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.getElementById("plt-name-input")?.focus();
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
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallbackPLT";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      (window as any).onloadTurnstileCallbackPLT = load;
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

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName, company: cleanCompany, contact: cleanContact,
          projectType, catalogSize,
          criticalProcesses: selectedProcesses,
          currentSystems, growthLimits: selectedLimits,
          description: cleanDescription,
          website, turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Не удалось отправить запрос.");
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Не удалось отправить запрос. Попробуйте позже.");
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
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <button className={s.closeButton} onClick={onClose} aria-label="Закрыть">
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <div className={s.content}>
              {/* ─── HEADER ─────────────────────────────── */}
              <div className={s.header}>
                <h2 className={s.title}>Получить архитектурную оценку e-commerce платформы</h2>
                <p className={s.subtitle}>
                  Мы изучим текущие ограничения платформы, бизнес-процессы и интеграции, чтобы предложить масштабируемую e-commerce архитектуру под рост каталога, заказов и нагрузки.
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
                    <label className={s.label} htmlFor="plt-name-input">Имя *</label>
                    <input id="plt-name-input" type="text"
                      className={`${s.input} ${touched.name && !isNameValid ? s.inputInvalid : ""}`}
                      placeholder="Иван" value={name} maxLength={50}
                      onChange={e => setName(e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, name: true }))} required />
                    {touched.name && !isNameValid && (
                      <span className={s.errorText}>2–50 символов, только буквы</span>
                    )}
                  </div>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="plt-company-input">Компания *</label>
                    <input id="plt-company-input" type="text"
                      className={`${s.input} ${touched.company && !isCompanyValid ? s.inputInvalid : ""}`}
                      placeholder="Название компании" value={company} maxLength={100}
                      onChange={e => setCompany(e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, company: true }))} required />
                    {touched.company && !isCompanyValid && (
                      <span className={s.errorText}>2–100 символов</span>
                    )}
                  </div>
                </div>

                {/* Row 2: Contact + Project Type */}
                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="plt-contact-input">Контакт для связи *</label>
                    <input id="plt-contact-input" type="text"
                      className={`${s.input} ${touched.contact && !isContactValid ? s.inputInvalid : ""}`}
                      placeholder="Telegram / Email / Телефон" value={contact}
                      onChange={e => setContact(e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, contact: true }))} required />
                    {touched.contact && !isContactValid && (
                      <span className={s.errorText}>Укажите Telegram, Email или телефон</span>
                    )}
                  </div>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="plt-type-select">Тип проекта *</label>
                    <select id="plt-type-select" className={s.select}
                      value={projectType}
                      onChange={e => setProjectType(e.target.value)} required>
                      <option value="" disabled hidden>Выберите тип</option>
                      {PROJECT_TYPES.map(pt => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Smart contextual cards */}
                <AnimatePresence mode="wait">
                  {projectType === "Интернет-магазин" && (
                    <motion.div key="im" className={s.infoCard}
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}>
                      <span className={s.infoCardTitle}>Типичные ограничения:</span>
                      <ul className={s.infoCardList}>
                        <li>• деградация скорости каталога при росте SKU</li>
                        <li>• медленный checkout и потери конверсии</li>
                        <li>• проблемы SEO при росте страниц</li>
                      </ul>
                    </motion.div>
                  )}
                  {projectType === "Marketplace" && (
                    <motion.div key="mp" className={s.infoCard}
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}>
                      <span className={s.infoCardTitle}>Типичные ограничения:</span>
                      <ul className={s.infoCardList}>
                        <li>• критические пиковые нагрузки при акциях</li>
                        <li>• сложности синхронизации заказов между продавцами</li>
                        <li>• масштабирование OMS/WMS интеграций</li>
                      </ul>
                    </motion.div>
                  )}
                  {projectType === "B2B платформа" && (
                    <motion.div key="b2b" className={s.infoCard}
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}>
                      <span className={s.infoCardTitle}>Типичные ограничения:</span>
                      <ul className={s.infoCardList}>
                        <li>• сложная ролевая логика и права доступа</li>
                        <li>• индивидуальные прайсы и условия для клиентов</li>
                        <li>• нестабильная интеграция с ERP и складами</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Row 3: Catalog Size + Current Systems */}
                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="plt-catalog-select">Размер каталога</label>
                    <select id="plt-catalog-select" className={s.select}
                      value={catalogSize} onChange={e => setCatalogSize(e.target.value)}>
                      <option value="" disabled hidden>Выберите объём каталога</option>
                      {CATALOG_SIZES.map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="plt-systems-input">Какие системы уже используются?</label>
                    <input id="plt-systems-input" type="text"
                      className={s.input}
                      placeholder="Bitrix, WordPress, 1С, ERP, CRM, МойСклад..."
                      value={currentSystems}
                      onChange={e => setCurrentSystems(e.target.value)} />
                  </div>
                </div>

                {/* Critical processes chips */}
                <div className={s.field}>
                  <label className={s.label}>Какие процессы критичны?</label>
                  <div className={s.multiSelect}>
                    {CRITICAL_PROCESSES.map(p => (
                      <div key={p}
                        className={`${s.chip} ${selectedProcesses.includes(p) ? s.chipActive : ""}`}
                        onClick={() => toggle(selectedProcesses, setSelectedProcesses, p)}>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth limits chips */}
                <div className={s.field}>
                  <label className={s.label}>Что ограничивает рост сейчас?</label>
                  <div className={s.multiSelect}>
                    {GROWTH_LIMITS.map(l => (
                      <div key={l}
                        className={`${s.chip} ${selectedLimits.includes(l) ? s.chipActive : ""}`}
                        onClick={() => toggle(selectedLimits, setSelectedLimits, l)}>
                        {l}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="plt-desc-textarea">Описание проекта *</label>
                  <textarea id="plt-desc-textarea"
                    className={`${s.textarea} ${touched.description && !isDescriptionValid ? s.inputInvalid : ""}`}
                    rows={3}
                    placeholder="Опишите текущую платформу, задачи бизнеса или ограничения, мешающие росту."
                    value={description} maxLength={1000}
                    onChange={e => setDescription(e.target.value)}
                    onBlur={() => setTouched(p => ({ ...p, description: true }))} required />
                  {touched.description && !isDescriptionValid && (
                    <span className={s.errorText}>Опишите проект (до 1000 символов)</span>
                  )}
                </div>

                {/* Privacy */}
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
                  ) : "Получить архитектурную оценку"}
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
              <div className={s.successNodeWrap}>
                <motion.div className={s.successPulse}
                  animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
                <div className={s.successInner}>
                  <Check size={30} color="#818cf8" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className={s.successTitle}>Запрос успешно отправлен</h2>
              <p className={s.successText}>
                Команда Kibex изучит архитектуру платформы и подготовит рекомендации по масштабированию и развитию e-commerce инфраструктуры.
              </p>
              <p className={s.successSubtext}>Специалист свяжется с вами в течение 24 часов.</p>
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
