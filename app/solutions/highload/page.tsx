"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Globe, Cpu, Database, Zap, Share2, Network,
  Check, ArrowRight
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SolutionPopup from "../../../components/SolutionPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Schema from "../../../components/Schema";
import s from "./highload.module.css";

// ─── CONSTANTS ─────────────────────────────────────────────────────────

const NODE_DEFS = [
  { id:"api",   label:"CORE API",      icon:Cpu,     cx:300,cy:240,size:72,primary:true,
    tooltip:{title:"CORE API",   rows:[["Отклик","42ms"],["Запросов/с","18 420"],["Статус","Работает"]]} },
  { id:"cdn",   label:"EDGE CDN",      icon:Globe,   cx:300,cy:60, size:56,
    tooltip:{title:"EDGE CDN",   rows:[["Задержка","8ms"],["Кэш","94%"],["Статус","Online"]]} },
  { id:"lb",    label:"LOAD BALANCER", icon:Network, cx:110,cy:140,size:54,
    tooltip:{title:"LOAD BALANCER",rows:[["Бэкенды","6"],["Здоровых","6"],["Алгоритм","RR"]]} },
  { id:"cache", label:"REDIS CACHE",   icon:Zap,     cx:490,cy:140,size:54,
    tooltip:{title:"REDIS CACHE", rows:[["Hit rate","97%"],["Память","2.1GB"],["Статус","Active"]]} },
  { id:"queue", label:"MSG QUEUE",     icon:Share2,  cx:110,cy:340,size:54,
    tooltip:{title:"MSG QUEUE",   rows:[["Сообщений","1 240"],["Задержка","3ms"],["Статус","Норма"]]} },
  { id:"db",    label:"DB CLUSTER",    icon:Database,cx:490,cy:340,size:56,
    tooltip:{title:"DATABASE",    rows:[["Кластер","Active"],["Репликация","Вкл"],["Задержка","9ms"]]} },
];

const EDGES = [["cdn","api"],["lb","api"],["cache","api"],["api","queue"],["api","db"],["lb","cdn"]] as const;
const ROUTES = [["cdn","api","db"],["lb","api","queue"],["cdn","api","cache"]];
const TELEMETRY = [
  {x:312,y:155,text:"42ms",   d:2.4},{x:175,y:195,text:"active",  d:3.8},
  {x:418,y:192,text:"cached", d:5.1},{x:185,y:295,text:"1.2M req",d:7.0},{x:402,y:298,text:"9ms",d:9.2},
];

type BootPhase = 0|1|2|3|4|5;

// ─── INFRASTRUCTURE MAP ────────────────────────────────────────────────────────────

function InfrastructureMap() {
  const W=600, H=480;
  const [phase,setPhase] = useState<BootPhase>(0);
  const [bootMsg,setBootMsg] = useState("Initializing infrastructure...");
  const [hoveredId,setHoveredId] = useState<string|null>(null);
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const px = useSpring(rawX,{stiffness:80,damping:20});
  const py = useSpring(rawY,{stiffness:80,damping:20});
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e:MouseEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if(!r) return;
      rawX.set((e.clientX - (r.left+r.width/2))*0.012);
      rawY.set((e.clientY - (r.top+r.height/2))*0.012);
    };
    window.addEventListener("mousemove",onMove);
    return () => window.removeEventListener("mousemove",onMove);
  },[rawX,rawY]);

  useEffect(() => {
    const ts = [
      setTimeout(()=>setPhase(1),300),
      setTimeout(()=>setPhase(2),1000),
      setTimeout(()=>setPhase(3),1600),
      setTimeout(()=>{setPhase(4);setBootMsg("Infrastructure online");},2200),
      setTimeout(()=>setPhase(5),3400),
    ];
    return () => ts.forEach(clearTimeout);
  },[]);

  const nodeMap = useMemo(()=>{
    const m:Record<string,{cx:number;cy:number}>={};
    NODE_DEFS.forEach(n=>{m[n.id]={cx:n.cx,cy:n.cy};});
    return m;
  },[]);

  return (
    <div className={s.sceneWrap} ref={wrapRef}>
      <AnimatePresence>
        {phase<5 && (
          <motion.div className={s.bootOverlay}
            initial={{opacity:0}} animate={{opacity:phase===4?1:0.65}} exit={{opacity:0}}
            transition={{duration:0.6}}
          >
            <span className={s.bootMsg}>{bootMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <svg className={s.sceneSvg} viewBox={`0 0 ${W} ${H}`} fill="none" style={{overflow:"visible"}}>
        <defs>
          <filter id="pglow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <motion.g animate={{x:[0,18,0],y:[0,12,0]}} transition={{duration:38,repeat:Infinity,ease:"easeInOut"}}>
          <pattern id="ig" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.022)" strokeWidth="0.5"/>
          </pattern>
          <rect x="-40" y="-40" width={W+80} height={H+80} fill="url(#ig)"/>
        </motion.g>

        {EDGES.map(([a,b],i)=>{
          const na=nodeMap[a],nb=nodeMap[b];
          return <motion.line key={i} x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
            stroke="rgba(70,51,255,0.18)" strokeWidth="1" strokeLinecap="round"
            initial={{pathLength:0,opacity:0}}
            animate={phase>=1?{pathLength:1,opacity:1}:{}}
            transition={{delay:i*0.11,duration:0.9,ease:"easeOut"}}/>;
        })}

        {phase>=3 && TELEMETRY.map((t,i)=>(
          <motion.text key={i} x={t.x} y={t.y}
            textAnchor="middle" fontSize="8" fontWeight="700"
            fill="rgba(70,51,255,0.55)" letterSpacing="0.05em"
            initial={{opacity:0}} animate={{opacity:[0,0.8,0]}}
            transition={{delay:t.d,duration:4,repeat:Infinity,repeatDelay:6+i*1.5}}
          >{t.text}</motion.text>
        ))}

        {phase>=3 && ROUTES.map((route,ri)=>route.slice(0,-1).map((fromId,si)=>{
          const from=nodeMap[fromId], to=nodeMap[route[si+1]];
          const first=ri===0&&si===0;
          return <motion.circle key={`${ri}-${si}`} r={2.5} fill="#4633ff" filter="url(#pglow)"
            initial={{cx:from.cx,cy:from.cy,opacity:0}}
            animate={{cx:[from.cx,first?from.cx+4:from.cx,to.cx],cy:[from.cy,first?from.cy-3:from.cy,to.cy],opacity:[0,1,1,0]}}
            transition={{duration:1.6,delay:ri*2.2+si*0.5,repeat:Infinity,repeatDelay:ROUTES.length*2.2-1.6,ease:"easeInOut"}}/>;
        }))}

        {NODE_DEFS.map((node,i)=>{
          const hov=hoveredId===node.id;
          return (
            <motion.g key={node.id}
              initial={{scale:0.6,opacity:0}} animate={phase>=2?{scale:1,opacity:1}:{}}
              transition={{delay:node.primary?0:i*0.13,duration:0.55,ease:[0.34,1.56,0.64,1]}}
              style={{originX:node.cx,originY:node.cy,cursor:"pointer"}}
              onHoverStart={()=>setHoveredId(node.id)} onHoverEnd={()=>setHoveredId(null)}
            >
              <motion.circle cx={node.cx} cy={node.cy} r={node.size/2+8}
                stroke={node.primary?"rgba(70,51,255,0.25)":"rgba(255,255,255,0.06)"}
                strokeWidth="1" fill="none"
                animate={{r:[node.size/2+7,node.size/2+13,node.size/2+7]}}
                transition={{duration:3+i*0.4,repeat:Infinity,ease:"easeInOut",delay:i*0.3}}/>
              <motion.circle cx={node.cx} cy={node.cy} r={node.size/2}
                fill={node.primary?"rgba(70,51,255,0.14)":"rgba(15,14,26,0.95)"}
                stroke={hov?"#4633ff":node.primary?"rgba(70,51,255,0.5)":"rgba(255,255,255,0.1)"}
                strokeWidth={node.primary?1.5:1} style={{x:px,y:py}}/>
              <text x={node.cx} y={node.cy+node.size/2+17}
                textAnchor="middle" fontSize="8" fontWeight="800"
                fill={hov?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.3)"}
                letterSpacing="0.08em" style={{textTransform:"uppercase" as const}}
              >{node.label}</text>
            </motion.g>
          );
        })}
      </svg>

      <AnimatePresence>
        {hoveredId && (()=>{
          const node=NODE_DEFS.find(n=>n.id===hoveredId)!;
          const leftPct=(node.cx/600)*100;
          const alignRight=node.cx>300;
          return (
            <motion.div key={hoveredId} className={s.nodeTooltip}
              style={{
                top:`${(node.cy/480)*100}%`,
                left:alignRight?"auto":`${leftPct+10}%`,
                right:alignRight?`${100-leftPct+10}%`:"auto",
                transform:"translateY(-50%)",
              }}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}
              transition={{duration:0.22}}
            >
              <div className={s.tooltipTitle}>{node.tooltip.title}</div>
              {node.tooltip.rows.map(([k,v],ri)=>(
                <div key={ri} className={s.tooltipRow}>
                  <span className={s.tooltipKey}>{k}</span>
                  <span className={s.tooltipVal}>{v}</span>
                </div>
              ))}
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <motion.p className={s.bridgeLine}
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:0.8}}
      >
        Для компаний, где простой платформы означает потерю клиентов и продаж.
      </motion.p>

      <LiveOpsPanel phase={phase}/>
    </div>
  );
}

// ─── LIVE OPS PANEL ────────────────────────────────────────────────────────────

function LiveOpsPanel({phase}:{phase:BootPhase}) {
  const [rps,setRps]=useState(18240), [load,setLoad]=useState(72);
  const [cpu,setCpu]=useState(68), [mem,setMem]=useState(42), [resp,setResp]=useState(41);

  useEffect(()=>{
    const ts=[
      setInterval(()=>setRps(v=>Math.max(17000,v+Math.floor((Math.random()-0.4)*28))),1800),
      setInterval(()=>setLoad(v=>Math.min(88,Math.max(55,v+Math.floor((Math.random()-0.5)*4)))),2300),
      setInterval(()=>setCpu(v=>Math.min(85,Math.max(50,v+Math.floor((Math.random()-0.5)*3)))),2900),
      setInterval(()=>setMem(v=>Math.min(65,Math.max(35,v+Math.floor((Math.random()-0.5)*2)))),4100),
      setInterval(()=>setResp(v=>Math.min(60,Math.max(30,v+Math.floor((Math.random()-0.5)*3)))),2100),
    ];
    return ()=>ts.forEach(clearInterval);
  },[]);

  const rows=[
    {key:"Запросов/сек",val:rps.toLocaleString()},
    {key:"CPU",          val:`${cpu}%`},
    {key:"Память",       val:`${mem}%`},
    {key:"Отклик",       val:`${resp}ms`},
    {key:"Очередь",      val:"Норма",   green:true},
    {key:"Статус",       val:"Работает",green:true},
  ];

  return (
    <motion.div className={s.opsPanel}
      initial={{opacity:0,y:16}} animate={phase>=3?{opacity:1,y:0}:{}} transition={{duration:0.8}}
    >
      <div className={s.opsPanelHeader}>SYSTEM STATUS</div>
      <div className={s.opsGrid}>
        {rows.map((r,i)=>(
          <div key={i} className={s.opsItem}>
            <span className={s.opsKey}>{r.key}</span>
            <motion.span className={s.opsVal} key={r.val}
              initial={{opacity:0.35}} animate={{opacity:1}} transition={{duration:0.5}}
              style={r.green?{color:"#4ade80"}:{}}
            >{r.val}</motion.span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function useCountUp(target: number, decimals = 0, duration = 2) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = target / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(parseFloat(start.toFixed(decimals)));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, decimals, duration]);

  return { val, ref };
}



// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${s.faqItem} ${open ? s.faqOpen : ""}`}>
      <button className={s.faqButton} onClick={() => setOpen(!open)}>
        <span className={s.faqQuestion}>{q}</span>
        <motion.span className={s.faqIcon} animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={s.faqAnswer}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const risks = [
  {
    title: "Потеря заказов",
    desc: "Во время акций и пикового трафика система начинает замедляться или перестаёт отвечать.",
  },
  {
    title: "Замедление каталога",
    desc: "Поиск и фильтрация становятся медленнее по мере роста количества товаров.",
  },
  {
    title: "Ошибки интеграций",
    desc: "1С и ERP начинают синхронизироваться с задержками и ошибками при пиковой нагрузке.",
  },
];

const growthStages = [
  { users: "100 пользователей",   note: "Любая CMS справляется" },
  { users: "1 000 пользователей", note: "Первые тормоза поиска" },
  { users: "10 000 пользователей",note: "Сбои в пиках, очереди" },
  { users: "100 000 пользователей",note: "Требуется другая архитектура" },
];

const archLayers = [
  { tag: "Слой доставки",   name: "CDN + Edge",        desc: "Распределённая доставка контента. Пользователь получает данные с ближайшего узла без нагрузки на сервер." },
  { tag: "Слой логики",     name: "Распределённое ядро", desc: "Микросервисная архитектура на Go. Каждый сервис масштабируется независимо, не затрагивая остальные." },
  { tag: "Слой очередей",   name: "Async Engine",       desc: "Асинхронная обработка через RabbitMQ/Redis. Пиковые нагрузки сглаживаются без потери заказов." },
  { tag: "Слой данных",     name: "Кластер БД",         desc: "PostgreSQL + Elasticsearch с шардированием. Поиск по 500k+ SKU работает за 1.2с независимо от объёма." },
];

const validationSteps = [
  { label: "Load Testing",       rus: "Нагрузочное тестирование" },
  { label: "Failover",           rus: "Тест отказоустойчивости" },
  { label: "Rollback",           rus: "Стратегия отката" },
  { label: "Monitoring",         rus: "Мониторинг системы" },
  { label: "Release",            rus: "Выпуск в прод" },
];

const faqs = [
  { q: "Что считается высоконагруженной системой?", a: "Highload — состояние, когда стандартные методы оптимизации перестают работать из-за объёма данных или трафика. Требуется изменение самой архитектуры системы." },
  { q: "Как обеспечивается стабильность?", a: "Через изоляцию сервисов и асинхронность. Если один модуль перегружен, система продолжает работу, используя очереди и кэширование." },
  { q: "Можно ли масштабировать постепенно?", a: "Да. Архитектура Kibex позволяет добавлять вычислительные узлы по мере роста нагрузки без остановки проекта." },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HighloadPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const validationRef = useRef<HTMLDivElement>(null);
  const validationInView = useInView(validationRef, { once: true });

  const uptime = useCountUp(99.99, 2, 2.5);
  const speed  = useCountUp(1.2,  1, 2);
  const sku    = useCountUp(500,  0, 2);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  
  // Hero text parallax
  const heroTextY   = useTransform(heroScroll, [0, 1], [0, -80]);
  const heroTextOp  = useTransform(heroScroll, [0, 0.6], [1, 0.25]);
  
  // Hero visual transition into next section (scale down and fade out)
  const heroVisualS = useTransform(heroScroll, [0, 0.8, 1], [1, 1.18, 0.8]);
  const heroVisualOp = useTransform(heroScroll, [0.7, 1], [1, 0]);

  const trustItems = [
    "до 500 000+ SKU",
    "99.99% стабильности",
    "<1.2с отклик",
  ];

  const breadcrumbItems = [
    { name: "Решения", item: "/solutions" },
    { name: "Highload системы", item: "/solutions/highload" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://kibex.ru" },
      { "@type": "ListItem", "position": 2, "name": "Решения", "item": "https://kibex.ru/solutions" },
      { "@type": "ListItem", "position": 3, "name": "Highload системы", "item": "https://kibex.ru/solutions/highload" }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Разработка высоконагруженных (Highload) систем",
    "serviceType": "Highload Development",
    "provider": { "@type": "Organization", "name": "Kibex" },
    "description": "Проектирование и разработка масштабируемых платформ для обработки миллионов запросов и террабайт данных без потери производительности.",
    "areaServed": "RU"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <div className={s.page}>
      <Schema data={breadcrumbSchema} />
      <Schema data={serviceSchema} />
      <Schema data={faqSchema} />
      <Header />

      {/* ── 1. HERO ───────────────────────────────────────────────────────────── */}
      <section className={s.hero} ref={heroRef}>
        <div className={s.heroGrid} />
        <div className={s.heroInner}>
          <div className="w-full mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* LEFT — text + cta */}
          <motion.div
            className={s.heroContent}
            style={{ y: heroTextY, opacity: heroTextOp }}
          >
            {/* Label */}
            <motion.span
              className={s.heroLabel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Инфраструктура высокой нагрузки
            </motion.span>

            {/* H1 — two lines staggered */}
            <h1 className={s.heroTitle}>
              <motion.span
                className={s.heroTitleLine}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                Системы без права
              </motion.span>
              <motion.span
                className={s.heroTitleLine}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                на простой
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className={s.heroSubtitle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Проектируем платформы для компаний,{" "}
              где большие каталоги, тысячи пользователей{" "}
              и пиковые нагрузки являются нормой.
            </motion.p>

            {/* Two CTA buttons */}
            <motion.div
              className={s.heroActions}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>
                Обсудить архитектуру
              </button>
              <button className={s.ctaSecondary} onClick={() => {
                document.getElementById("approach")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Изучить подход
              </button>
            </motion.div>

            {/* Trust indicators — staggered */}
            <div className={s.heroChecks}>
              {trustItems.map((item, i) => (
                <motion.span
                  key={i}
                  className={s.heroCheck}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                >
                  <Check size={13} />{item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — radial infrastructure map */}
          <motion.div
            className={s.heroVisual}
            style={{ scale: heroVisualS, opacity: heroVisualOp }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <InfrastructureMap />
          </motion.div>

        </div>
      </section>

      {/* ── 2. RISKS ──────────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Диагностика</span>
            <h2 className={s.sectionTitle}>Что происходит при росте нагрузки</h2>
          </div>
          <div className={s.painGrid}>
            {risks.map((r, i) => (
              <motion.div
                key={i}
                className={s.painCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={s.painNum}>0{i + 1}</div>
                <h3 className={s.painTitle}>{r.title}</h3>
                <p className={s.painDesc}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. GROWTH TIMELINE ────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: "#08080c" }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Масштаб</span>
            <h2 className={s.sectionTitle}>Как растёт нагрузка</h2>
            <p className={s.sectionSubtitle}>
              Обычная платформа останавливается. Kibex продолжает расти.
            </p>
          </div>
          <div className={s.growthWrap}>
            {/* Stage steps */}
            <div className={s.growthStages}>
              {growthStages.map((g, i) => (
                <motion.div
                  key={i}
                  className={s.growthStage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className={s.growthDot} />
                  <div className={s.growthUsers}>{g.users}</div>
                  <div className={s.growthNote}>{g.note}</div>
                </motion.div>
              ))}
            </div>
            {/* Two lines: CMS vs Kibex */}
            <div className={s.growthChart}>
              <div className={s.growthLineLabel} style={{ color: "#ef4444" }}>Обычная CMS</div>
              <div className={s.growthLineLabel} style={{ color: "#4633ff" }}>Kibex</div>
              <svg className={s.growthSvg} viewBox="0 0 900 160" fill="none" preserveAspectRatio="none">
                {/* CMS — hits ceiling and drops */}
                <motion.path
                  d="M0,140 C150,130 350,100 500,30 C580,0 600,0 620,10 C700,50 800,120 900,150"
                  stroke="#ef4444" strokeWidth="2" strokeDasharray="8 4" opacity="0.5"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2 }} viewport={{ once: true }}
                />
                {/* Kibex — linear scale */}
                <motion.path
                  d="M0,140 C200,130 500,110 900,70"
                  stroke="#4633ff" strokeWidth="3"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3 }} viewport={{ once: true }}
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VERTICAL ARCH STACK ────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Архитектура</span>
            <h2 className={s.sectionTitle}>Как устроена платформа</h2>
          </div>
          <div className={s.archStack}>
            {archLayers.map((layer, i) => (
              <div key={i} className={s.archLayerWrap}>
                <motion.div
                  className={s.archLayer}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 12, borderColor: "#4633ff" }}
                >
                  <div className={s.layerHeader}>
                    <span className={s.layerTag}>{layer.tag}</span>
                    <h3 className={s.layerName}>{layer.name}</h3>
                  </div>
                  <p className={s.layerDesc}>{layer.desc}</p>
                </motion.div>
                {i < archLayers.length - 1 && (
                  <motion.div
                    className={s.archConnector}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                    viewport={{ once: true }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. METRICS ────────────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: "#08080c" }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Результаты</span>
            <h2 className={s.sectionTitle}>Измеримые показатели</h2>
          </div>
          <div className={s.metricsGrid}>
            <motion.div className={s.metricCard} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className={s.metricVal} ref={uptime.ref}>{uptime.val}%</span>
              <h3 className={s.metricTitle}>Стабильность системы</h3>
              <p className={s.metricDesc}>Uptime инфраструктуры корпоративного класса без деградации под нагрузкой.</p>
            </motion.div>
            <motion.div className={s.metricCard} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}>
              <span className={s.metricVal} ref={speed.ref}>&lt;{speed.val}с</span>
              <h3 className={s.metricTitle}>Среднее время загрузки</h3>
              <p className={s.metricDesc}>Скорость каталога при любом объёме данных — от 10 до 500k+ SKU.</p>
            </motion.div>
            <motion.div className={s.metricCard} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
              <span className={s.metricVal} ref={sku.ref}>{sku.val}k+</span>
              <h3 className={s.metricTitle}>Готовность к росту каталога</h3>
              <p className={s.metricDesc}>SKU без потери скорости поиска и фильтрации на масштабируемом стеке.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. BEFORE / AFTER ─────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Практика</span>
            <h2 className={s.sectionTitle}>До и после модернизации</h2>
          </div>
          <motion.div
            className={s.caseCard}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Before */}
            <div className={s.caseSide}>
              <span className={s.caseLabel}>До Kibex</span>
              <div className={s.caseMetrics}>
                <div className={s.caseMet}><span className={s.caseMetVal} style={{ color: "#ef4444" }}>8с</span><span className={s.caseMetKey}>загрузка</span></div>
                <div className={s.caseMet}><span className={s.caseMetVal} style={{ color: "#ef4444" }}>300k</span><span className={s.caseMetKey}>SKU предел</span></div>
                <div className={s.caseMet}><span className={s.caseMetVal} style={{ color: "#ef4444" }}>↓</span><span className={s.caseMetKey}>сбои в пиках</span></div>
              </div>
            </div>
            {/* Arrow */}
            <div className={s.caseArrow}>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={48} opacity={0.3} />
              </motion.div>
              <span className={s.caseArrowLabel}>После модернизации</span>
            </div>
            {/* After */}
            <div className={s.caseSide}>
              <span className={s.caseLabel}>Kibex Platform</span>
              <div className={s.caseMetrics}>
                <div className={s.caseMet}><span className={s.caseMetVal} style={{ color: "#4633ff" }}>1.2с</span><span className={s.caseMetKey}>загрузка</span></div>
                <div className={s.caseMet}><span className={s.caseMetVal} style={{ color: "#4633ff" }}>x12</span><span className={s.caseMetKey}>рост трафика</span></div>
                <div className={s.caseMet}><span className={s.caseMetVal} style={{ color: "#4633ff" }}>99.99%</span><span className={s.caseMetKey}>uptime</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. VALIDATION ─────────────────────────────────────────────────────── */}
      <section className={s.section} style={{ background: "#08080c" }}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Проверка</span>
            <h2 className={s.sectionTitle}>Проверка системы перед запуском</h2>
          </div>
          <div className={s.validationTrack} ref={validationRef}>
            <motion.div
              className={s.validationLine}
              initial={{ scaleX: 0 }}
              animate={validationInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {validationSteps.map((step, i) => (
              <motion.div
                key={i}
                className={s.validationStep}
                initial={{ opacity: 0, y: 20 }}
                animate={validationInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 + 0.3 }}
              >
                <div className={s.stepDot}><Check size={14} /></div>
                <h3 className={s.stepTitle}>{step.rus}</h3>
                <span className={s.stepCheck}>✓ Проверено</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ────────────────────────────────────────────────────────────── */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionTag}>Вопросы</span>
            <h2 className={s.sectionTitle}>Частые вопросы</h2>
          </div>
          <div className={s.faqList}>
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className={s.finalCta}>
        <div className={s.sectionInner}>
          <motion.div className={s.ctaPanel} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className={s.panelTitle}>Архитектурная оценка включает:</h3>
            <div className={s.panelGrid}>
              <div className={s.panelItem}><Check size={16} /> Анализ узких мест</div>
              <div className={s.panelItem}><Check size={16} /> Оценка нагрузки</div>
              <div className={s.panelItem}><Check size={16} /> Интеграционные риски</div>
              <div className={s.panelItem}><Check size={16} /> План масштабирования</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className={s.ctaTitle}>Высокая нагрузка не должна ограничивать рост бизнеса</h2>
            <p className={s.ctaSubtitle}>Получите архитектурную оценку и план построения платформы, рассчитанной на масштабирование.</p>
            <button className={s.ctaButton} onClick={() => setPopupOpen(true)}>Обсудить систему</button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <SolutionPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
