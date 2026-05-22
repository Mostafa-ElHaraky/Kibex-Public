import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Исследования ERP, highload и e-commerce архитектуры | Kibex Research",
  description: "Практические исследования Kibex о проектировании ERP систем, highload платформ, e-commerce архитектуры, интеграций, безопасности и масштабируемой цифровой инфраструктуры бизнеса.",
  keywords: [
    "enterprise архитектура",
    "разработка ERP систем",
    "проектирование highload платформ",
    "цифровая инфраструктура бизнеса",
    "масштабируемые e-commerce платформы",
    "корпоративные системы",
    "API-first архитектура",
    "интеграция ERP и CRM",
    "отказоустойчивая архитектура",
    "enterprise e-commerce",
    "исследования высоконагруженных систем"
  ],
  openGraph: {
    title: "Исследования ERP, highload и e-commerce архитектуры | Kibex Research",
    description: "Практические исследования Kibex о проектировании ERP систем, highload платформ и масштабируемой инфраструктуры.",
    url: "https://kibex.ru/research",
    siteName: "Kibex",
    locale: "ru_RU",
    type: "website",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
