"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { RESEARCH_ARTICLES, RESEARCH_CATEGORIES, RESEARCH_TOPICS } from "../../data/research";
import Schema from "../../components/Schema";
import s from "./research.module.css";

// ── COMPONENTS ──

function HeroVisual() {
  return (
    <div className={s.heroVisual}>
      <div className={s.visualGrid} />
      <motion.div 
        className={s.scanLine}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <div style={{ position: "absolute", bottom: 20, right: 20, fontFamily: "monospace", fontSize: 10, color: "rgba(70, 51, 255, 0.5)" }}>
        KIBEX_LAB_INFRA_SCAN: ACTIVE<br />
        NODE_COUNT: 412<br />
        LATENCY: 14ms
      </div>
    </div>
  );
}

function ReportCard({ article, index }: { article: typeof RESEARCH_ARTICLES[0], index: number }) {
  return (
    <motion.div 
      className={s.reportCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className={s.diffPill}>{article.difficulty}</div>
      <div className={s.reportMeta}>
        <span className={s.reportType}>RESEARCH REPORT</span>
        <span>{article.readTime}</span>
        <span>{article.updatedDate}</span>
      </div>
      <h3 className={s.reportTitle}>{article.title}</h3>
      <p className={s.reportPreview}>{article.preview}</p>
      <div className={s.reportFooter}>
        <div className={s.tags}>
          {article.tags.map(t => <span key={t} className={s.tag}>{t}</span>)}
        </div>
        <Link href={`/research/${article.slug}`} className={s.readMore}>
          Изучить исследование <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredArticles = activeFilter === "all" 
    ? RESEARCH_ARTICLES 
    : RESEARCH_ARTICLES.filter(a => a.category.toLowerCase().split("/").map(s => s.trim()).includes(activeFilter));

  const breadcrumbItems = [
    { name: "Исследования", item: "/research" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://kibex.ru" },
      { "@type": "ListItem", "position": 2, "name": "Исследования", "item": "https://kibex.ru/research" }
    ]
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Kibex Research: Исследования архитектуры и ERP систем",
    "description": "Практические исследования Kibex о высоконагруженных системах, ERP архитектуре и e-commerce инфраструктуре.",
    "url": "https://kibex.ru/research"
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Research Reports",
    "itemListElement": RESEARCH_ARTICLES.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://kibex.ru/research/${article.slug}`,
      "name": article.title
    }))
  };

  return (
    <div className={s.page}>
      <Schema data={breadcrumbSchema} />
      <Schema data={collectionPageSchema} />
      <Schema data={itemListSchema} />
      <Header />
      
      {/* ── 1. HERO ── */}
      <section className={s.hero}>
        <div className={s.container}>
          <Breadcrumbs items={breadcrumbItems} />
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={s.heroLabel}
              >
                KIBEX RESEARCH LAB
              </motion.span>
              <h1 className={s.heroH1}>
                {["Исследования архитектуры,", "ERP систем и", "highload платформ"].map((line, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    style={{ display: "block" }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={s.heroSubtitle}
              >
                Практические исследования Kibex о высоконагруженных системах, ERP архитектуре, безопасности и масштабировании цифровых платформ.
              </motion.p>
            </div>
            <div className={s.heroRight}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORIES ── */}
      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Направления исследований</h2>
          <div className={s.categoriesGrid}>
            {RESEARCH_TOPICS.map((topic, i) => (
              <motion.div 
                key={i} 
                className={s.categoryCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveFilter(topic.category)}
              >
                <span className={s.categoryNum}>{topic.id}</span>
                <h3 className={s.categoryTitle}>{topic.title}</h3>
                <p className={s.categoryDesc}>{topic.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MAIN GRID ── */}
      <section className={s.section} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className={s.container}>
          <div className={s.filterBar}>
            {RESEARCH_CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`${s.filterBtn} ${activeFilter === cat.id ? s.filterBtnActive : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className={s.researchGrid}>
            {filteredArticles.map((article, i) => (
              <ReportCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
