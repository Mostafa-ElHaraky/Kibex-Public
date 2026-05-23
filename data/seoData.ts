export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kibex",
  "alternateName": "КиБекс",
  "url": "https://kibex.ru/",
  "logo": "https://kibex.ru/logo.png",
  "description": "Инженерная компания, специализирующаяся на проектировании цифровой инфраструктуры, Unified ERP-систем и высоконагруженных e-commerce платформ для enterprise-сегмента.",
  "email": "info@kibex.ru",
  "telephone": "+7-XXX-XXX-XX-XX",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-XXX-XXX-XX-XX",
    "contactType": "sales",
    "areaServed": "RU",
    "availableLanguage": "Russian"
  },
  "sameAs": [
    "https://t.me/kibex"
  ]
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kibex Engineering",
  "url": "https://kibex.ru/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://kibex.ru/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const PROFESSIONAL_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Kibex Engineering",
  "image": "https://kibex.ru/og-cover.jpg",
  "url": "https://kibex.ru/",
  "telephone": "+7-XXX-XXX-XX-XX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Moscow",
    "addressCountry": "RU"
  },
  "serviceType": [
    "Enterprise Resource Planning (ERP) Development",
    "Highload Systems Architecture",
    "API-first E-commerce Platforms",
    "Digital Infrastructure Engineering",
    "Cybersecurity Audit"
  ],
  "description": "Проектирование и разработка масштабируемых ERP систем, e-commerce платформ и отказоустойчивой цифровой инфраструктуры для крупного бизнеса."
};

export const SERVICES_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Разработка ERP систем",
    "provider": { "@type": "Organization", "name": "Kibex" },
    "description": "Проектирование и внедрение кастомных ERP-систем для автоматизации бизнес-процессов, управления складом и финансами."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Highload разработка",
    "provider": { "@type": "Organization", "name": "Kibex" },
    "description": "Создание отказоустойчивых распределенных систем, способных выдерживать экстремальные нагрузки."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Разработка e-commerce платформ",
    "provider": { "@type": "Organization", "name": "Kibex" },
    "description": "Проектирование масштабируемых интернет-магазинов на базе API-first архитектуры."
  }
];

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Что такое ERP система?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ERP (Enterprise Resource Planning) — это единая цифровая инфраструктура для управления всеми ресурсами и процессами компании. Мы разрабатываем кастомные ERP, которые объединяют склад, логистику, финансы и продажи в реальном времени, обеспечивая полный контроль над бизнесом без ограничений коробочных решений."
      }
    },
    {
      "@type": "Question",
      "name": "Когда WordPress перестает справляться?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WordPress и WooCommerce достигают предела при росте каталога свыше 30 000 SKU или при нагрузке более 1500 одновременных сессий. Монолитная архитектура и синхронные процессы начинают замедлять сайт. В таких случаях мы переводим проект на масштабируемый стек с API-first архитектурой."
      }
    },
    {
      "@type": "Question",
      "name": "Что такое highload архитектура?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Highload — это проектирование систем, способных стабильно работать под экстремальными нагрузками. Мы строим архитектуры на Go и Python с использованием микросервисов, распределенных БД и очередей сообщений, что гарантирует отклик менее 50мс и доступность 99.99% даже в пиковые распродажи."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли интегрировать 1С?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, бесшовная интеграция с 1С (УТ, ERP, УНФ) — наш стандарт. Мы настраиваем двусторонний обмен данными о товарах, ценах, остатках и заказах через RabbitMQ или напрямую через API, обеспечивая актуальность информации в режиме реального времени."
      }
    },
    {
      "@type": "Question",
      "name": "Кто владеет кодом?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Полный доступ к исходному коду и исключительные права интеллектуальной собственности передаются заказчику. Мы обеспечиваем технологический суверенитет вашего бизнеса: система работает автономно на ваших серверах, без привязки к подпискам или сторонним сервисам."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли модернизировать Bitrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да. Если Bitrix стал «узким местом» и перестал выдерживать нагрузку, мы проводим декомпозицию системы. Мы можем вынести тяжелые процессы (поиск, каталог, корзину) в отдельные высокопроизводительные сервисы, сохранив привычный бэк-офис."
      }
    },
    {
      "@type": "Question",
      "name": "Что такое API-first архитектура?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Это современный стандарт разработки, где бизнес-логика полностью отделена от интерфейса. Это позволяет подключать к единому ядру системы любые фронтенды: сайт, мобильное приложение, POS-терминалы или партнерские маркетплейсы через стабильный API."
      }
    },
    {
      "@type": "Question",
      "name": "Как обеспечивается безопасность платформы?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы реализуем безопасность на уровне архитектуры. Безопасность закладывается на этапе проектирования: изоляция сервисов, аудит кода на уязвимости OWASP Top 10, шифрование данных и защита от DDoS-атак на сетевом уровне. Платформа проходит стресс-тестирование перед запуском."
      }
    }
  ]
};

export const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://kibex.ru/"
    }
  ]
};
