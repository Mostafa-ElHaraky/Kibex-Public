"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import s from "./MigrationPopup.module.css";

interface MigrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCms?: string;
}

export default function MigrationPopup({ isOpen, onClose, defaultCms = "" }: MigrationPopupProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    cms: defaultCms,
    catalogSize: "",
    integrations: "",
    problems: "",
    traffic: "",
    contact: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={s.overlay} onClick={onClose}>
          <motion.div 
            className={s.modal} 
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <button className={s.closeBtn} onClick={onClose}><X size={24} /></button>

            {isSuccess ? (
              <div className={s.success}>
                <CheckCircle2 size={64} color="#4ade80" />
                <h3>Запрос принят</h3>
                <p>Архитектор Kibex свяжется с вами в течение 24 часов для обсуждения стратегии модернизации.</p>
                <button className={s.finishBtn} onClick={onClose}>Понятно</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={s.form}>
                <div className={s.header}>
                  <span className={s.label}>ОЦЕНКА МОДЕРНИЗАЦИИ</span>
                  <h2>Анализ текущей платформы</h2>
                  <p>Заполните данные для предварительного архитектурного аудита.</p>
                </div>

                <div className={s.formGrid}>
                  <div className={s.inputGroup}>
                    <label>Текущая CMS / Платформа</label>
                    <input 
                      type="text" 
                      placeholder="Например: WordPress, Bitrix, Custom..."
                      value={formData.cms}
                      onChange={e => setFormData({...formData, cms: e.target.value})}
                      required
                    />
                  </div>
                  <div className={s.inputGroup}>
                    <label>Размер каталога (SKU)</label>
                    <input 
                      type="text" 
                      placeholder="Например: 50,000"
                      value={formData.catalogSize}
                      onChange={e => setFormData({...formData, catalogSize: e.target.value})}
                      required
                    />
                  </div>
                  <div className={s.inputGroup}>
                    <label>Интеграции (1C, ERP, CRM...)</label>
                    <input 
                      type="text" 
                      placeholder="Перечислите основные системы"
                      value={formData.integrations}
                      onChange={e => setFormData({...formData, integrations: e.target.value})}
                    />
                  </div>
                  <div className={s.inputGroup}>
                    <label>Месячный трафик</label>
                    <input 
                      type="text" 
                      placeholder="Визитов в месяц"
                      value={formData.traffic}
                      onChange={e => setFormData({...formData, traffic: e.target.value})}
                    />
                  </div>
                  <div className={s.inputGroupFull}>
                    <label>Основные проблемы</label>
                    <textarea 
                      placeholder="Опишите, что именно тормозит или ограничивает рост бизнеса..."
                      value={formData.problems}
                      onChange={e => setFormData({...formData, problems: e.target.value})}
                    />
                  </div>
                  <div className={s.inputGroupFull}>
                    <label>Контакт (Email / Телефон / TG)</label>
                    <input 
                      type="text" 
                      placeholder="@username или +7..."
                      value={formData.contact}
                      onChange={e => setFormData({...formData, contact: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={s.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Обработка <Loader2 className={s.spin} size={20} /></>
                  ) : (
                    <>Отправить на архитектурный разбор <ChevronRight size={20} /></>
                  )}
                </button>
                <div className={s.footer}>
                  <span>Конфиденциально • Ответ в течение 24 часов</span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
