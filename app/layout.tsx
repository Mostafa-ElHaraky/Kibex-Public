import type { Metadata } from "next";
import type { ReactNode } from "react";
import { geistSans } from "../styles/fonts";
import "./globals.css";
import Schema from "../components/Schema";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  PROFESSIONAL_SERVICE_SCHEMA,
  SERVICES_SCHEMA,
  FAQ_SCHEMA,
  BREADCRUMB_SCHEMA
} from "../data/seoData";

export const metadata: Metadata = {
  metadataBase: new URL("https://kibex.ru"),

  title: {
    default: "Разработка ERP систем и highload платформ — Kibex",
    template: "%s | Kibex Engineering",
  },

  description: "Kibex разрабатывает ERP системы, e-commerce платформы и highload инфраструктуру для бизнеса. API-first архитектура, интеграции с 1С, высокая производительность и масштабирование без ограничений CMS.",

  keywords: [
    "разработка ERP систем",
    "highload разработка",
    "разработка e-commerce платформ",
    "интеграция 1С",
    "API-first архитектура",
    "цифровая инфраструктура",
    "модернизация WordPress",
    "модернизация Bitrix",
    "разработка корпоративных систем"
  ],

  alternates: {
    canonical: "https://kibex.ru/",
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://kibex.ru/",
    siteName: "Kibex Engineering",
    title: "Разработка ERP систем и highload платформ — Kibex",
    description: "ERP системы, e-commerce платформы и highload инфраструктура для бизнеса.",
    images: [
      {
        url: "/Brand Assets.pdf-image-003.png",
        width: 1200,
        height: 630,
        alt: "Kibex — Цифровая инфраструктура бизнеса",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Разработка ERP систем и highload платформ — Kibex",
    description: "ERP системы, e-commerce платформы и highload инфраструктура для бизнеса.",
    images: ["/Brand Assets.pdf-image-003.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/Brand Assets.pdf-image-003.png",
    shortcut: "/Brand Assets.pdf-image-003.png",
    apple: "/Brand Assets.pdf-image-003.png",
  },

  manifest: "/site.webmanifest",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={`${geistSans.variable}`}>
      <head>
      </head>
      <body className="font-sans antialiased text-[#FFFFFF] bg-[#0A0A0B] selection:bg-[#4633FF]/30">
        <Schema data={ORGANIZATION_SCHEMA} />
        <Schema data={WEBSITE_SCHEMA} />
        <Schema data={PROFESSIONAL_SERVICE_SCHEMA} />
        {SERVICES_SCHEMA.map((s, i) => <Schema key={i} data={s} />)}
        <Schema data={FAQ_SCHEMA} />
        <Schema data={BREADCRUMB_SCHEMA} />
        {children}
      </body>
    </html>
  );
}