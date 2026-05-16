"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import s from "./ERPDiagnosticPopup.module.css";

interface ERPDiagnosticPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROCESSES = [
  "продажи", "склад", "логистика", "финансы", "CRM", "HR", "закупки", "аналитика", "производство"
];

const SIZES = [
  "до 10 сотрудников", "10–50", "50–200", "200+"
];

export default function ERPDiagnosticPopup({ isOpen, onClose }: ERPDiagnosticPopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  
  const toggleProcess = (p: string) => {
    setSelectedProcesses(prev => 
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={s.overlay} onClick={onClose}>
        <motion.div 
          className={s.modal}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <button className={s.closeButton} onClick={onClose}>
            <X size={24} />
          </button>

          {!isSubmitted ? (
            <div className={s.content}>
              <div className={s.header}>
                <h2 className={s.title}>Получить архитектурную оценку ERP системы</h2>
                <p className={s.subtitle}>
                  Мы изучим процессы компании, определим операционные ограничения и предложим архитектуру ERP платформы под структуру вашего бизнеса.
                </p>
              </div>

              <form className={s.form} onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label}>Имя *</label>
                    <input className={s.input} placeholder="Иван" required />
                  </div>
                  <div className={s.field}>
                    <label className={s.label}>Компания *</label>
                    <input className={s.input} placeholder="Название компании" required />
                  </div>
                </div>

                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label}>Контакт *</label>
                    <input className={s.input} placeholder="Telegram / Email / Телефон" required />
                  </div>
                  <div className={s.field}>
                    <label className={s.label}>Размер компании</label>
                    <select className={s.select}>
                      {SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                    </select>
                  </div>
                </div>

                <div className={s.field}>
                  <label className={s.label}>Какие процессы хотите автоматизировать?</label>
                  <div className={s.multiSelect}>
                    {PROCESSES.map(p => (
                      <div 
                        key={p} 
                        className={`${s.pill} ${selectedProcesses.includes(p) ? s.pillActive : ""}`}
                        onClick={() => toggleProcess(p)}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={s.field}>
                  <label className={s.label}>Какие системы уже используются?</label>
                  <input className={s.input} placeholder="1С, Excel, Bitrix, AmoCRM, МойСклад и т.д." />
                </div>

                <div className={s.field}>
                  <label className={s.label}>Главная проблема сейчас</label>
                  <textarea 
                    className={s.textarea} 
                    rows={3} 
                    placeholder="Опишите процессы, которые занимают больше всего времени или создают ошибки."
                  />
                </div>

                <button className={s.submitBtn} type="submit">
                  Получить архитектурную оценку
                </button>

                <div className={s.footerNote}>
                  <span>✓ Конфиденциально</span>
                  <span>✓ Без обязательств</span>
                  <span>✓ Ответ в течение 24 часов</span>
                </div>
              </form>
            </div>
          ) : (
            <div className={s.success}>
              <CheckCircle2 size={64} className={s.successIcon} />
              <h2 className={s.successTitle}>Запрос принят в архитектурный отдел</h2>
              <p className={s.successText}>
                Мы изучим процессы вашей компании и подготовим первичную архитектурную оценку ERP системы.<br />
                Архитектор Kibex свяжется с вами в течение 24 часов.
              </p>
              <button 
                className={s.submitBtn} 
                style={{ marginTop: 40, padding: "16px 40px" }}
                onClick={onClose}
              >
                Понятно
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
