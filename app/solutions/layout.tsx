import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Разработка e-commerce платформ, ERP систем и цифровой инфраструктуры | Kibex",
  description: "Kibex проектирует и разрабатывает e-commerce платформы, ERP системы и корпоративную цифровую инфраструктуру для бизнеса: модернизация CMS, высоконагруженные архитектуры, интеграции и кибербезопасность.",
  keywords: [
    "разработка корпоративных систем",
    "ERP системы",
    "разработка ERP",
    "цифровая инфраструктура бизнеса",
    "корпоративные платформы",
    "высоконагруженные платформы",
    "модернизация CMS",
    "разработка B2B платформ",
    "архитектура e-commerce",
    "разработка платформ для бизнеса",
    "API интеграции",
    "автоматизация бизнес-процессов"
  ],
  alternates: {
    canonical: "https://kibex.io/solutions",
  },
  openGraph: {
    title: "Разработка e-commerce платформ, ERP систем и цифровой инфраструктуры | Kibex",
    description: "Kibex проектирует и разрабатывает корпоративные платформы, ERP системы и цифровую инфраструктуру: модернизация CMS, высоконагруженные архитектуры и кибербезопасность.",
    url: "https://kibex.io/solutions",
    siteName: "Kibex",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-solutions.png",
        width: 1200,
        height: 630,
        alt: "Kibex — Разработка цифровых платформ и корпоративных систем",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Разработка e-commerce платформ, ERP систем и цифровой инфраструктуры | Kibex",
    description: "Проектируем цифровые платформы и ERP системы, которые выдерживают рост бизнеса и сложные интеграции.",
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
