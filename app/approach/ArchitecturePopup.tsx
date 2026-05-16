"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import s from "./ArchitecturePopup.module.css";

interface ArchitecturePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitecturePopup({ isOpen, onClose }: ArchitecturePopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

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
                <h2 className={s.title}>Архитектурная консультация Kibex</h2>
                <p className={s.subtitle}>
                  Мы изучим текущую систему и подготовим первичную инженерную оценку платформы.
                </p>
              </div>

              <form className={s.form} onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label}>Имя</label>
                    <input className={s.input} placeholder="Иван" required />
                  </div>
                  <div className={s.field}>
                    <label className={s.label}>Компания</label>
                    <input className={s.input} placeholder="Название компании" required />
                  </div>
                </div>

                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label}>Контакт</label>
                    <input className={s.input} placeholder="Telegram / Email / Телефон" required />
                  </div>
                  <div className={s.field}>
                    <label className={s.label}>Тип платформы</label>
                    <input className={s.input} placeholder="E-commerce / ERP / SaaS" />
                  </div>
                </div>

                <div className={s.formRow}>
                  <div className={s.field}>
                    <label className={s.label}>Текущая система</label>
                    <input className={s.input} placeholder="1С, Bitrix, самописная и т.д." />
                  </div>
                  <div className={s.field}>
                    <label className={s.label}>Планируемая нагрузка</label>
                    <input className={s.input} placeholder="Заказов в день / Посетителей" />
                  </div>
                </div>

                <div className={s.field}>
                  <label className={s.label}>Описание задачи и основные ограничения</label>
                  <textarea 
                    className={s.textarea} 
                    rows={4} 
                    placeholder="Опишите текущие технические проблемы или требования к новой системе."
                  />
                </div>

                <button className={s.submitBtn} type="submit">
                  Запросить архитектурную оценку
                </button>

                <div className={s.footerNote}>
                  <span>✓ Конфиденциально</span>
                  <span>✓ Инженерный разбор</span>
                  <span>✓ Ответ в течение 24 часов</span>
                </div>
              </form>
            </div>
          ) : (
            <div className={s.success}>
              <CheckCircle2 size={64} className={s.successIcon} />
              <h2 className={s.successTitle}>Запрос передан архитектурному отделу</h2>
              <p className={s.successText}>
                Мы изучим текущую систему и подготовим первичную инженерную оценку платформы.<br />
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
