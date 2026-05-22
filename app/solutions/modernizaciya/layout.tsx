import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Модернизация e-commerce платформ и перенос с Bitrix | Kibex",
  description: "Модернизация интернет-магазинов без потери SEO, данных и продаж. Архитектурная реконструкция сайтов на WordPress, Bitrix и других CMS. Инженерный аудит Kibex.",
  keywords: [
    "модернизация интернет-магазина",
    "перенос с WordPress",
    "перенос с Bitrix",
    "замена CMS",
    "архитектурная реконструкция сайта",
    "миграция интернет-магазина",
    "модернизация e-commerce",
    "редизайн интернет-магазина без потери SEO",
  ],
  alternates: {
    canonical: "https://kibex.ru/solutions/modernizaciya",
  },
  openGraph: {
    title: "Модернизация интернет-магазинов — Kibex",
    description: "Архитектурная реконструкция e-commerce платформ без потери SEO, данных и бизнес-процессов.",
    url: "https://kibex.ru/solutions/modernizaciya",
    siteName: "Kibex",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Модернизация интернет-магазинов — Kibex",
    description: "Архитектурная реконструкция e-commerce платформ без потери SEO, данных и бизнес-процессов.",
  },
};

export default function ModernizaciyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
