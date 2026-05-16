"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ChevronRight,
  AlertTriangle,
  TrendingDown,
  XCircle,
  Clock,
  Calendar,
  User,
  LayoutList
} from "lucide-react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MigrationPopup from "../MigrationPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import s from "../[slug]/article.module.css";
import Schema from "../../../components/Schema";

export default function WordPressResearchPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const breadcrumbItems = [
    { name: "Исследования", item: "/research" },
    { name: "WordPress и рост каталога", item: "/research/pochemu-wordpress-tormozit-pri-roste-kataloga" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://kibex.ru" },
      { "@type": "ListItem", "position": 2, "name": "Исследования", "item": "https://kibex.ru/research" },
      { "@type": "ListItem", "position": 3, "name": "WordPress и WooCommerce: проблемы роста", "item": "https://kibex.ru/research/pochemu-wordpress-tormozit-pri-roste-kataloga" }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Почему WordPress и WooCommerce тормозят при росте каталога интернет-магазина",
    "description": "Разбор архитектурных ограничений WordPress и WooCommerce для интернет-магазинов: производительность, плагины, интеграции, SEO, highload и масштабирование.",
    "image": "https://kibex.ru/og-wordpress-research.png",
    "author": { "@type": "Organization", "name": "Kibex Research" },
    "publisher": { "@type": "Organization", "name": "Kibex", "logo": { "@type": "ImageObject", "url": "https://kibex.ru/logo.png" } },
    "datePublished": "2026-05-16",
    "dateModified": "2026-05-16",
    "articleSection": "E-commerce Architecture",
    "proficiencyLevel": "Expert",
    "keywords": "wordpress, woocommerce, ecommerce, architecture, highload, scalability, seo performance",
    "about": [
      { "@type": "Thing", "name": "WordPress" },
      { "@type": "Thing", "name": "WooCommerce" },
      { "@type": "Thing", "name": "E-commerce architecture" },
      { "@type": "Thing", "name": "Highload systems" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Когда WordPress перестаёт справляться с нагрузкой?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Обычно проблемы начинаются при каталоге от 30k SKU, наличии сложных фильтров и интеграций с ERP. Архитектура WordPress не рассчитана на такие объемы данных."
        }
      },
      {
        "@type": "Question",
        "name": "Почему WooCommerce тормозит при большом каталоге?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Причина в структуре базы данных (EAV в wp_postmeta), синхронных процессах плагинов и отсутствии асинхронных очередей задач."
        }
      }
    ]
  };

  return (
    <div className={s.page}>
      <Schema data={breadcrumbSchema} />
      <Schema data={articleSchema} />
      <Schema data={faqSchema} />
      <motion.div className={s.progressBar} style={{ scaleX }} />
      <Header />

      <article className={s.container}>
        <Breadcrumbs items={breadcrumbItems} />

        {/* ── HERO ── */}
        <header className={s.articleHero}>
          <div className={s.articleMeta}>
            <span className={s.category}>E-commerce Architecture</span>
            <span className="flex items-center gap-1"><Clock size={12} /> 14 min read</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> Обновлено: 16 мая 2026</span>
          </div>
          <h1 className={s.title}>Почему WordPress и WooCommerce тормозят при росте каталога интернет-магазина</h1>
          <p className={s.subtitle}>
            Разбор системных ограничений WordPress для магазинов с большим количеством товаров, интеграций и высокой нагрузкой.
          </p>
        </header>

        {/* ── TOC & AUDIENCE ── */}
        <div className={s.introGrid}>
          <div className={s.toc}>
            <h3 className="flex items-center gap-2"><LayoutList size={18} /> Содержание</h3>
            <ul>
              <li><a href="#why-slow">1. Почему WordPress тормозит</a></li>
              <li><a href="#sku-impact">2. Что происходит при росте SKU</a></li>
              <li><a href="#seo-impact">3. Как это влияет на SEO</a></li>
              <li><a href="#modern-arch">4. Современная архитектура</a></li>
              <li><a href="#migration-signs">5. Когда нужна миграция</a></li>
              <li><a href="#faq">6. FAQ</a></li>
            </ul>
          </div>
          <div className={s.audience}>
            <h3 className="flex items-center gap-2"><User size={18} /> Кому будет полезно</h3>
            <ul>
              <li>— CTO и техническим директорам</li>
              <li>— Владельцам интернет-магазинов</li>
              <li>— E-commerce компаниям с ростом каталога</li>
              <li>— Бизнесу с интеграциями 1С и ERP</li>
            </ul>
          </div>
        </div>

        {/* ── SUMMARY ── */}
        <section className={s.summary}>
          <h2 className="text-[#4633FF]">Главные выводы</h2>
          <p>
            WordPress и WooCommerce отлично подходят для быстрого старта. Однако при масштабировании каталога до 50k+ SKU и росте сложности интеграций, архитектурные ограничения CMS начинают напрямую блокировать развитие бизнеса и сжигать SEO-трафик.
          </p>
          <ul className="mt-4 space-y-2 text-[#FFFFFF]/70 text-sm">
            <li className="flex items-start gap-2"><span className="text-[#4633FF]">•</span> WordPress имеет жесткий архитектурный предел базы данных (EAV).</li>
            <li className="flex items-start gap-2"><span className="text-[#4633FF]">•</span> WooCommerce не предназначен для сложных enterprise-интеграций в реальном времени.</li>
            <li className="flex items-start gap-2"><span className="text-[#4633FF]">•</span> Производительность — это фундаментальный фактор SEO и конверсии в 2026 году.</li>
          </ul>
        </section>

        <div className={s.content}>
          {/* ── GROWTH IMPACT ── */}
          <section id="sku-impact" className={s.section}>
            <h2>Что происходит при росте интернет-магазина на WordPress?</h2>
            <p className="mb-6 text-[#FFFFFF]/60">При увеличении количества товаров в WooCommerce нагрузка на базу данных растет нелинейно. Ниже приведены критические пороги, при которых архитектура начинает деградировать:</p>
            <div className={s.metricsThresholds}>
              <div className={s.thresholdItem}>
                <strong>30k SKU</strong>
                <span>увеличение времени фильтрации и поиска</span>
              </div>
              <div className={s.thresholdItem}>
                <strong>70k SKU</strong>
                <span>заметное замедление импорта остатков из ERP</span>
              </div>
              <div className={s.thresholdItem}>
                <strong>150k SKU</strong>
                <span>критические ошибки синхронизации и кэша</span>
              </div>
              <div className={s.thresholdItem}>
                <strong>300k+ SKU</strong>
                <span>нестабильность индексации и падение SEO</span>
              </div>
            </div>
          </section>

          {/* ── MAIN PROBLEM ── */}
          <section id="why-slow" className={s.section}>
            <h2>Почему WordPress начинает тормозить?</h2>
            <p>Основная причина — <strong>монолитная архитектура</strong>, изначально спроектированная для блогов, а не для управления распределенными e-commerce данными.</p>
            
            <div className={s.engNote}>
              <span className={s.noteLabel}>Инженерный разбор Kibex</span>
              <p className={s.noteText}>
                WordPress использует структуру <strong>EAV (Entity-Attribute-Value)</strong> в таблице <code>wp_postmeta</code>. При росте каталога количество строк растет экспоненциально, превращая простые SQL-запросы в тяжелые операции, блокирующие базу данных.
              </p>
            </div>
          </section>

          {/* ── SEO IMPACT ── */}
          <section id="seo-impact" className={s.section}>
            <h2>Как производительность WordPress влияет на SEO?</h2>
            <p>Медленный сайт — это не только плохой UX, но и критические проблемы для поисковых систем:</p>
            <ul className={s.plainList}>
              <li><strong>Crawl Budget:</strong> Роботы Google успевают проиндексировать меньше страниц из-за долгого ответа.</li>
              <li><strong>Core Web Vitals:</strong> Низкие показатели LCP и TTFB понижают позиции в выдаче.</li>
              <li><strong>Mobile First:</strong> На мобильных устройствах задержки WordPress ощущаются еще острее.</li>
            </ul>
          </section>

          {/* ── RISKS ── */}
          <section className={s.section}>
            <h2>Что происходит, если ничего не менять?</h2>
            <div className={s.risksGrid}>
              <div className={s.riskBox}>
                <AlertTriangle size={20} color="#ef4444" />
                <span>Рост стоимости поддержки и инфраструктуры</span>
              </div>
              <div className={s.riskBox}>
                <TrendingDown size={20} color="#ef4444" />
                <span>Падение конверсии из-за медленных фильтров</span>
              </div>
              <div className={s.riskBox}>
                <XCircle size={20} color="#ef4444" />
                <span>Ошибки при синхронизации остатков с 1С/ERP</span>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className={s.section}>
            <h2>Частые вопросы о WordPress и масштабировании</h2>
            <div className={s.faqGrid}>
              <div className={s.faqItem}>
                <h4>Когда WordPress перестаёт справляться?</h4>
                <p>Обычно после 30k–50k SKU, если требуются сложные фильтры, многоуровневые цены и интеграция с ERP в реальном времени.</p>
              </div>
              <div className={s.faqItem}>
                <h4>Влияет ли WooCommerce на скорость админки?</h4>
                <p>Да, при больших каталогах админ-панель становится крайне медленной из-за синхронного пересчета мета-данных при каждом обновлении товара.</p>
              </div>
              <div className={s.faqItem}>
                <h4>Можно ли решить проблему кэшированием?</h4>
                <p>Кэширование помогает только для статичных страниц. Динамические данные (корзина, личный кабинет, актуальные цены) всё равно будут тормозить.</p>
              </div>
            </div>
          </section>

          {/* ── AUTHOR ── */}
          <section className={s.authorBlock}>
            <div className={s.authorInfo}>
              <span className={s.authorLabel}>Автор исследования</span>
              <h3>Архитектурная команда Kibex Research</h3>
              <p>Материал подготовлен на основе практических сценариев модернизации e-commerce платформ и highload систем.</p>
              <div className={s.specialization}>
                <span>Highload</span> <span>ERP</span> <span>Architecture</span> <span>API-first</span>
              </div>
            </div>
          </section>
        </div>

        {/* ── CTA ── */}
        <section className={s.cta}>
          <h3>Получите архитектурную оценку платформы</h3>
          <p>Мы проведем аудит вашего магазина и подготовим стратегию миграции на масштабируемую инфраструктуру.</p>
          <button className={s.ctaBtn} onClick={() => setIsPopupOpen(true)}>Обсудить модернизацию</button>
        </section>

        {/* ── RELATED ── */}
        <section className={s.relatedResearch}>
          <h3>Связанные исследования</h3>
          <div className={s.relatedGrid}>
            <Link href="/research/pochemu-excel-razrushaet-biznes" className={s.relatedCard}>
              <span>ERP Infrastructure</span>
              <h4>Почему Excel разрушает ваш бизнес</h4>
            </Link>
            <Link href="/solutions/modernizaciya" className={s.relatedCard}>
              <span>Solutions</span>
              <h4>Модернизация e-commerce платформ</h4>
            </Link>
          </div>
        </section>
      </article>

      <Footer />
      <MigrationPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        defaultCms="WordPress / WooCommerce"
      />
    </div>
  );
}
