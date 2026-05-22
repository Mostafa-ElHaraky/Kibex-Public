import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Почему Excel и ручные процессы разрушают бизнес | Kibex Research",
  description: "Почему Excel, таблицы и несвязанные системы становятся причиной операционного хаоса при росте бизнеса. Исследование Kibex об ERP архитектуре и автоматизации.",
  keywords: [
    "ERP система",
    "автоматизация бизнеса",
    "Excel хаос",
    "корпоративные ERP системы",
    "автоматизация процессов",
    "цифровая инфраструктура",
    "управление бизнес процессами",
    "ERP для компании",
    "замена Excel ERP",
    "масштабирование бизнеса"
  ],
  alternates: {
    canonical: "https://kibex.ru/research/pochemu-excel-razrushaet-biznes",
  },
  openGraph: {
    title: "Почему Excel и ручные процессы разрушают бизнес | Kibex Research",
    description: "Исследование операционного хаоса при росте бизнеса без централизованной ERP системы.",
    url: "https://kibex.ru/research/pochemu-excel-razrushaet-biznes",
    siteName: "Kibex",
    locale: "ru_RU",
    type: "article",
    publishedTime: "2026-01-15T00:00:00Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "Почему Excel и ручные процессы разрушают бизнес | Kibex Research",
    description: "Разбор операционного хаоса без централизованной ERP.",
  },
};

export default function ExcelResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
