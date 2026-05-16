import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Архитектура цифровых платформ и ERP систем | Подход Kibex",
  description: "Kibex проектирует e-commerce платформы, ERP системы и highload инфраструктуру через инженерный подход: архитектура, безопасность, масштабируемость и контроль над развитием бизнеса.",
  keywords: [
    "корпоративные платформы",
    "enterprise архитектура",
    "цифровая инфраструктура",
    "разработка ERP платформ",
    "высоконагруженные системы",
    "кастомные бизнес-системы",
    "enterprise e-commerce",
    "интеграция корпоративных систем",
    "масштабируемая архитектура",
    "инженерный подход к разработке"
  ],
  openGraph: {
    title: "Архитектура цифровых платформ и ERP систем | Подход Kibex",
    description: "Kibex проектирует e-commerce платформы, ERP системы и highload инфраструктуру через инженерный подход.",
    url: "https://kibex.io/approach",
    siteName: "Kibex",
    locale: "ru_RU",
    type: "website",
  },
};

export default function ApproachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
