import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Аудит безопасности сайтов и e-commerce платформ | Kibex",
  description:
    "Проводим аудит безопасности сайтов, интернет-магазинов и веб-приложений: поиск уязвимостей, проверка API, анализ инфраструктуры и подробный технический отчёт с рекомендациями.",
  keywords: [
    "аудит безопасности сайта",
    "аудит безопасности веб-приложения",
    "пентест сайта",
    "проверка безопасности интернет-магазина",
    "поиск уязвимостей",
    "OWASP аудит",
    "security audit",
    "пентест e-commerce",
    "аудит API",
    "анализ защищенности сайта",
  ],
  alternates: {
    canonical: "https://kibex.io/solutions/security",
  },
  openGraph: {
    title: "Аудит безопасности сайтов и e-commerce платформ | Kibex",
    description:
      "Проводим аудит безопасности сайтов, интернет-магазинов и веб-приложений: поиск уязвимостей, проверка API, анализ инфраструктуры и подробный технический отчёт с рекомендациями.",
    url: "https://kibex.io/solutions/security",
    siteName: "Kibex",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-security.png",
        width: 1200,
        height: 630,
        alt: "Kibex — Аудит безопасности сайтов и веб-приложений",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Аудит безопасности сайтов и e-commerce платформ | Kibex",
    description:
      "Поиск уязвимостей, проверка API, анализ инфраструктуры — подробный технический отчёт с рекомендациями.",
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
