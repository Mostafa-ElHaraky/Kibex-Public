"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import s from "./ModernizationDiagnosticPopup.module.css";

interface ModernizationDiagnosticPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLATFORMS = [
  "Bitrix",
  "WordPress / WooCommerce",
  "OpenCart",
  "Magento",
  "Самописная CMS",
  "Другая система"
];

const CATALOG_SIZES = [
  "до 1 000 товаров",
  "1 000 – 10 000",
  "10 000 – 100 000",
  "100 000+"
];

const PROBLEMS = [
  "Медленная работа",
  "Проблемы SEO",
  "Ошибки интеграций",
  "Высокая стоимость поддержки",
  "Проблемы безопасности",
  "Нестабильная работа",
  "Сложность масштабирования",
  "Проблемы с 1С"
];

const PRESERVATION_PRIORITIES = [
  "SEO-позиции",
  "Историю заказов",
  "Клиентскую базу",
  "Интеграции",
  "Дизайн сайта",
  "Каталог товаров"
];

const LEGACY_PLATFORMS = ["Bitrix", "WordPress", "OpenCart", "Legacy"];

export default function ModernizationDiagnosticPopup({ isOpen, onClose }: ModernizationDiagnosticPopupProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [currentPlatform, setCurrentPlatform] = useState("");
  const [otherPlatform, setOtherPlatform] = useState("");
  const [catalogSize, setCatalogSize] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [integrations, setIntegrations] = useState("");
  const [selectedPreserved, setSelectedPreserved] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [legacyPlatformIndex, setLegacyPlatformIndex] = useState(0);

  // Input touched states for validation display
  const [touched, setTouched] = useState({
    name: false,
    company: false,
    contact: false,
    description: false,
    otherPlatform: false
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

  const isPlatformValid = currentPlatform !== "";
  const isOtherPlatformValid = currentPlatform !== "Другая система" || (otherPlatform.trim().length >= 2 && otherPlatform.trim().length <= 100);

  const cleanDescription = description.trim().replace(/<[^>]*>/g, "");
  const isDescriptionValid = cleanDescription.length >= 1 && cleanDescription.length <= 1000;

  const isFormValid =
    isNameValid &&
    isCompanyValid &&
    isContactValid &&
    isPlatformValid &&
    isOtherPlatformValid &&
    isDescriptionValid &&
    isPrivacyAccepted;

  // Turnstile container reset ref
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Cycle legacy names in diagram
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLegacyPlatformIndex(prev => (prev + 1) % LEGACY_PLATFORMS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Reset state on open
    setName("");
    setCompany("");
    setContact("");
    setCurrentPlatform("");
    setOtherPlatform("");
    setCatalogSize("");
    setSelectedProblems([]);
    setIntegrations("");
    setSelectedPreserved([]);
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
      description: false,
      otherPlatform: false
    });

    // 1. Lock body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Autofocus first input field
    const focusTimeout = setTimeout(() => {
      const firstInput = document.getElementById("mod-name-input");
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

  const toggleProblem = (prob: string) => {
    setSelectedProblems(prev =>
      prev.includes(prob) ? prev.filter(p => p !== prob) : [...prev, prob]
    );
  };

  const togglePreserved = (item: string) => {
    setSelectedPreserved(prev =>
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
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
      const res = await fetch("/api/modernization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          company: cleanCompany,
          contact: cleanContact,
          currentPlatform,
          otherPlatform: currentPlatform === "Другая система" ? otherPlatform.trim() : "",
          catalogSize,
          problems: selectedProblems,
          integrations,
          preserved: selectedPreserved,
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
              {/* Header section with text and animated migration diagram */}
              <div className={s.header}>
                <div className={s.headerLeft}>
                  <h2 className={s.title}>Получить план безопасной модернизации</h2>
                  <p className={s.subtitle}>
                    Мы проведём технический аудит текущей платформы, оценим ограничения CMS и предложим безопасный сценарий перехода без потери SEO, данных и продаж.
                  </p>
                </div>
                <div className={s.headerRight}>
                  {/* Evolution flow graphic */}
                  <svg className={s.networkSvg} width="150" height="70" viewBox="0 0 150 70">
                    <line x1="30" y1="35" x2="120" y2="35" stroke="rgba(129, 140, 248, 0.12)" strokeWidth="1.5" strokeDasharray="3 3" />
                    
                    {/* Animated transferring particles */}
                    {[0, 1, 2].map((idx) => (
                      <motion.circle
                        key={idx}
                        cx="30"
                        cy="35"
                        r="2"
                        fill="#818cf8"
                        initial={{ opacity: 0, x: 0 }}
                        animate={{
                          opacity: [0, 0.5, 0.5, 0],
                          x: [0, 45, 75, 90],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: idx * 1.0,
                          ease: "linear",
                        }}
                      />
                    ))}

                    {/* Old CMS Node */}
                    <circle cx="30" cy="35" r="13" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
                    <foreignObject x="10" y="25" width="40" height="20">
                      <div className={s.legacyLabelContainer}>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={legacyPlatformIndex}
                            className={s.legacyLabel}
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            exit={{ opacity: 0, y: -3 }}
                            transition={{ duration: 0.25 }}
                          >
                            {LEGACY_PLATFORMS[legacyPlatformIndex]}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </foreignObject>

                    {/* New Kibex Core Node */}
                    <circle cx="120" cy="35" r="16" fill="rgba(129, 140, 248, 0.04)" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
                    <foreignObject x="98" y="24" width="44" height="22">
                      <div className={s.kibexLabel}>Kibex</div>
                    </foreignObject>

                    <motion.circle
                      cx="120"
                      cy="35"
                      r="16"
                      stroke="rgba(129, 140, 248, 0.35)"
                      strokeWidth="1"
                      fill="none"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
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

                {/* Cloudflare Turnstile invisible container */}
                <div ref={turnstileContainerRef} id="mod-turnstile-container" style={{ display: "none" }} />

                <div className={s.formRow}>
                  {/* Name field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="mod-name-input">Имя *</label>
                    <input
                      id="mod-name-input"
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
                    <label className={s.label} htmlFor="mod-company-input">Компания *</label>
                    <input
                      id="mod-company-input"
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
                    <label className={s.label} htmlFor="mod-contact-input">Контакт для связи *</label>
                    <input
                      id="mod-contact-input"
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

                  {/* Current Platform select dropdown */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="mod-platform-select">Текущая платформа *</label>
                    <select
                      id="mod-platform-select"
                      className={s.select}
                      value={currentPlatform}
                      onChange={(e) => {
                        setCurrentPlatform(e.target.value);
                        setOtherPlatform("");
                      }}
                      required
                    >
                      <option value="" disabled hidden>Выберите платформу</option>
                      {PLATFORMS.map(pl => (
                        <option key={pl} value={pl}>{pl}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Extra conditional field inputs for 'Другая система' */}
                {currentPlatform === "Другая система" && (
                  <div className={s.field}>
                    <label className={s.label} htmlFor="mod-other-platform-input">Укажите платформу *</label>
                    <input
                      id="mod-other-platform-input"
                      type="text"
                      className={`${s.input} ${touched.otherPlatform && !isOtherPlatformValid ? s.inputInvalid : ""}`}
                      placeholder="Например, PrestaShop, CS-Cart"
                      value={otherPlatform}
                      maxLength={100}
                      onChange={(e) => setOtherPlatform(e.target.value)}
                      onBlur={() => handleBlur("otherPlatform")}
                      required
                    />
                    {touched.otherPlatform && !isOtherPlatformValid && (
                      <span className={s.errorText}>Введите название системы (2-100 символов)</span>
                    )}
                  </div>
                )}

                {/* Contextual intelligent feedback cards for WordPress/Bitrix */}
                {currentPlatform === "WordPress / WooCommerce" && (
                  <div className={s.infoCard}>
                    <span className={s.infoCardTitle}>Типичные проблемы WordPress / WooCommerce:</span>
                    <ul className={s.infoCardList}>
                      <li>• деградация скорости при росте каталога</li>
                      <li>• перегрузка плагинами и уязвимости</li>
                      <li>• проблемы с масштабированием базы данных</li>
                    </ul>
                  </div>
                )}

                {currentPlatform === "Bitrix" && (
                  <div className={s.infoCard}>
                    <span className={s.infoCardTitle}>Типичные проблемы 1С-Битрикс:</span>
                    <ul className={s.infoCardList}>
                      <li>• тяжелая монолитная архитектура</li>
                      <li>• сложность и высокая стоимость доработок</li>
                      <li>• высокая стоимость поддержки и лицензий</li>
                    </ul>
                  </div>
                )}

                <div className={s.formRow}>
                  {/* Catalog size select */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="mod-catalog-select">Размер каталога</label>
                    <select
                      id="mod-catalog-select"
                      className={s.select}
                      value={catalogSize}
                      onChange={(e) => setCatalogSize(e.target.value)}
                    >
                      <option value="" disabled hidden>Выберите количество товаров</option>
                      {CATALOG_SIZES.map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>

                  {/* Integrations field */}
                  <div className={s.field}>
                    <label className={s.label} htmlFor="mod-integrations-input">Используемые интеграции</label>
                    <input
                      id="mod-integrations-input"
                      type="text"
                      className={s.input}
                      placeholder="1С, CRM, ERP, маркетплейсы, платежные системы..."
                      value={integrations}
                      onChange={(e) => setIntegrations(e.target.value)}
                    />
                  </div>
                </div>

                {/* Problems multiselect chips */}
                <div className={s.field}>
                  <label className={s.label}>Основные проблемы платформы</label>
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

                {/* Preservation checkboxes */}
                <div className={s.field}>
                  <label className={s.label}>Что важно сохранить при переходе?</label>
                  <div className={s.multiSelect}>
                    {PRESERVATION_PRIORITIES.map(item => {
                      const isActive = selectedPreserved.includes(item);
                      return (
                        <div
                          key={item}
                          className={`${s.preservedChip} ${isActive ? s.preservedChipActive : ""}`}
                          onClick={() => togglePreserved(item)}
                        >
                          <input
                            type="checkbox"
                            className={s.preservedCheckbox}
                            checked={isActive}
                            readOnly
                          />
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Problem description textarea */}
                <div className={s.field}>
                  <label className={s.label} htmlFor="mod-desc-textarea">Описание текущей ситуации *</label>
                  <textarea
                    id="mod-desc-textarea"
                    className={`${s.textarea} ${touched.description && !isDescriptionValid ? s.inputInvalid : ""}`}
                    rows={3}
                    placeholder="Опишите ограничения текущей платформы, проблемы или цели модернизации."
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
                    "Получить план модернизации"
                  )}
                </button>

                {/* Secondary trust badges under button */}
                <div className={s.trustBadges}>
                  <span>✓ Конфиденциально</span>
                  <span>✓ Без обязательств</span>
                  <span>✓ Ответ в течение 24 часов</span>
                </div>
              </form>
            </div>
          ) : (
            /* Success State screen */
            <div className={s.success}>
              <div className={s.successCheckCircle}>
                <Check size={36} color="#818cf8" strokeWidth={3} />
              </div>

              <h2 className={s.successTitle}>Запрос успешно отправлен</h2>
              <p className={s.successText}>
                Мы изучим текущую платформу и подготовим предварительный сценарий безопасной модернизации.
              </p>
              <p className={s.successSubtext}>
                Специалист Kibex свяжется с вами в течение 24 часов.
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
