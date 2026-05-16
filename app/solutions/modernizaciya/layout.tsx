import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Модернизация интернет-магазинов в России — перенос с WordPress, Bitrix и CMS | Kibex",
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
    canonical: "https://kibex.io/solutions/modernizaciya",
  },
  openGraph: {
    title: "Модернизация интернет-магазинов — Kibex",
    description: "Архитектурная реконструкция e-commerce платформ без потери SEO, данных и бизнес-процессов.",
    url: "https://kibex.io/solutions/modernizaciya",
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
