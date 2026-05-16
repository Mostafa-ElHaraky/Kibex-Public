"use client";

import Script from "next/script";

interface SchemaProps {
  data: any;
}

export default function Schema({ data }: SchemaProps) {
  return (
    <Script
      id={`schema-${Math.random().toString(36).substr(2, 9)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kibex",
  "url": "https://kibex.io",
  "logo": "https://kibex.io/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@kibex.io",
    "contactType": "customer service"
  },
  "description": "Инженерная компания, специализирующаяся на разработке ERP систем, высоконагруженных платформ и цифровой инфраструктуры.",
  "knowsAbout": [
    "ERP systems",
    "Highload architecture",
    "E-commerce platforms",
    "API integrations",
    "Enterprise software",
    "Infrastructure engineering",
    "Cybersecurity",
    "Digital infrastructure",
    "Scalable systems",
    "System Architecture",
    "Kubernetes",
    "Microservices"
  ]
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kibex",
  "url": "https://kibex.io",
  "publisher": {
    "@type": "Organization",
    "name": "Kibex"
  },
  "inLanguage": "ru-RU"
};
