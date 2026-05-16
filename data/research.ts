export const RESEARCH_CATEGORIES = [
  { id: "all", label: "Все исследования" },
  { id: "erp", label: "ERP Infrastructure" },
  { id: "highload", label: "Highload Systems" },
  { id: "architecture", label: "Software Architecture" },
  { id: "modernization", label: "Modernization" }
];

export const RESEARCH_TOPICS = [
  { id: "01", category: "erp", title: "Infrastructure Engineering", desc: "Проектирование отказоустойчивых систем управления предприятием." },
  { id: "02", category: "highload", title: "Scalability Research", desc: "Методы обработки миллионов запросов и террабайт данных." },
  { id: "03", category: "architecture", title: "System Integration", desc: "API-first подход и бесшовное связывание бизнес-контуров." },
  { id: "04", category: "modernization", title: "Digital Transformation", desc: "Стратегии миграции с legacy-систем на современный стек." }
];

export const RESEARCH_ARTICLES = [
  {
    slug: "pochemu-wordpress-tormozit-pri-roste-kataloga",
    category: "Modernization / E-commerce",
    title: "Почему WordPress и WooCommerce тормозят при росте каталога",
    preview: "Разбор архитектурных ограничений WordPress и WooCommerce для интернет-магазинов: производительность, плагины, интеграции и масштабирование.",
    readTime: "14 min read",
    updatedDate: "16 мая 2026",
    isoDate: "2026-05-16",
    difficulty: "Expert",
    tags: ["Highload", "Architecture", "WP/WC"],
    author: "Kibex Architectural Team"
  },
  {
    slug: "pochemu-excel-razrushaet-biznes",
    category: "ERP Infrastructure",
    title: "Почему Excel и ручные процессы разрушают бизнес при росте",
    preview: "Анализ операционного хаоса, возникающего при росте компании без централизованной ERP системы. Ограничения Excel и ручного ввода.",
    readTime: "16 min read",
    updatedDate: "16 мая 2026",
    isoDate: "2026-05-16",
    difficulty: "Advanced",
    tags: ["ERP", "Operations", "Systems"],
    author: "Kibex Research Lab"
  },
  {
    slug: "api-first-architecture-standard",
    category: "Architecture",
    title: "API-first архитектура как стандарт корпоративных систем",
    preview: "Почему проектирование API перед интерфейсами является критическим фактором для долгосрочной стабильности и гибкости enterprise-платформ.",
    readTime: "12 min read",
    updatedDate: "10 мая 2026",
    isoDate: "2026-05-10",
    difficulty: "Expert",
    tags: ["API", "Backend", "Scale"],
    author: "Kibex Systems Group"
  }
];
