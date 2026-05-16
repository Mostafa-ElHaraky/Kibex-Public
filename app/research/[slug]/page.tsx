"use client";

import { use } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  Calendar,
  CheckCircle2,
  LayoutList,
  User,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { RESEARCH_ARTICLES } from "../../../data/research";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Schema from "../../../components/Schema";
import s from "./article.module.css";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ResearchArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const article = RESEARCH_ARTICLES.find(a => a.slug === slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!article) return <div>Research not found</div>;

  const breadcrumbItems = [
    { name: "Исследования", item: "/research" },
    { name: article.title, item: `/research/${article.slug}` }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://kibex.ru" },
      { "@type": "ListItem", "position": 2, "name": "Исследования", "item": "https://kibex.ru/research" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://kibex.ru/research/${article.slug}` }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.preview,
    "image": `https://kibex.ru/og-${article.slug}.jpg`,
    "author": { "@type": "Person", "name": article.author },
    "publisher": { "@type": "Organization", "name": "Kibex" },
    "datePublished": article.isoDate,
    "dateModified": article.isoDate
  };

  return (
    <div className={s.page}>
      <Schema data={breadcrumbSchema} />
      <Schema data={articleSchema} />
      <motion.div className={s.progressBar} style={{ scaleX }} />
      <Header />

      <article className={s.container}>
        <Breadcrumbs items={breadcrumbItems} />

        <header className={s.articleHero}>
          <div className={s.articleMeta}>
            <span className={s.category}>{article.category}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> {article.updatedDate}</span>
          </div>
          <h1 className={s.title}>{article.title}</h1>
        </header>

        <section className={s.summary}>
          <h2 className="text-[#4633FF] font-bold">Executive Summary</h2>
          <p>{article.preview}</p>
        </section>

        <div className={s.content}>
          <section className={s.section}>
            <h2>Инженерный контекст</h2>
            <p>
              В современных цифровых системах архитектурные решения на ранних этапах определяют операционную эффективность бизнеса на годы вперед. 
              Данное исследование рассматривает {article.title.toLowerCase()} через призму системной инженерии и управления рисками.
            </p>
            
            <div className={s.engNote}>
              <span className={s.noteLabel}>Инженерное замечание Kibex</span>
              <p className={s.noteText}>
                Асинхронные очереди и API-first подход позволяют защитить ядро системы от деградации при пиковых нагрузках, 
                изолируя тяжелые процессы от пользовательских интерфейсов.
              </p>
            </div>
          </section>

          <section className={s.section}>
            <h2>Архитектурная схема</h2>
            <div className={s.diagram}>
              <svg width="300" height="200" viewBox="0 0 300 200">
                <rect x="50" y="20" width="200" height="60" rx="8" fill="rgba(70, 51, 255, 0.1)" stroke="#4633ff" />
                <text x="150" y="55" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">CORE SYSTEM</text>
                <line x1="150" y1="80" x2="150" y2="120" stroke="rgba(70, 51, 255, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="50" y="120" width="80" height="50" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
                <text x="90" y="150" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">API</text>
                <rect x="170" y="120" width="80" height="50" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
                <text x="210" y="150" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">DB</text>
              </svg>
              <span className={s.diagramLabel}>Рис 1.1: Типовая инфраструктурная модель масштабируемой системы</span>
            </div>
          </section>

          <section className={s.section}>
            <h2>Влияние на бизнес (Business Impact)</h2>
            <p>
              Технические ограничения напрямую транслируются в операционные убытки. Переход на {article.category}-ориентированную архитектуру 
              позволяет сократить TCO (Total Cost of Ownership) и ускорить Time-to-Market для новых фич.
            </p>
            <ul style={{ marginTop: 24, listStyle: "none", padding: 0 }}>
              <li style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <CheckCircle2 size={20} color="#4ade80" />
                <span>Снижение операционных рисков на 40-60%</span>
              </li>
              <li style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <CheckCircle2 size={20} color="#4ade80" />
                <span>Прогнозируемое масштабирование без переписывания ядра</span>
              </li>
              <li style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <CheckCircle2 size={20} color="#4ade80" />
                <span>Полный контроль над данными и безопасностью</span>
              </li>
            </ul>
          </section>
        </div>

        <section className={s.cta}>
          <h3>Требуется архитектурный разбор?</h3>
          <p>Мы проведем аудит текущей системы и подготовим стратегию цифровой трансформации вашего бизнеса.</p>
          <button className={s.ctaBtn}>Запросить аудит</button>
        </section>

        <section className={s.relatedResearch}>
          <h3>Связанные исследования</h3>
          <div className={s.relatedGrid}>
            {RESEARCH_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 2).map(a => (
              <Link key={a.slug} href={`/research/${a.slug}`} className={s.relatedCard}>
                <span>{a.category}</span>
                <h4>{a.title}</h4>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
}
