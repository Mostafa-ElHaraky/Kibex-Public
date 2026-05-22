import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Почему WordPress и WooCommerce тормозят при росте каталога интернет-магазина | Kibex Research",
  description: "Разбор архитектурных ограничений WordPress и WooCommerce для интернет-магазинов: производительность, плагины, интеграции, SEO, highload и масштабирование каталогов 100k+ SKU.",
  keywords: [
    "почему тормозит WooCommerce",
    "wordpress медленно работает",
    "интернет-магазин тормозит",
    "WooCommerce не выдерживает каталог",
    "как ускорить WordPress магазин",
    "проблемы WooCommerce при большом каталоге",
    "масштабирование интернет магазина",
    "highload wordpress",
    "модернизация интернет магазина",
    "переезд с wordpress на кастом"
  ],
  openGraph: {
    title: "Почему WordPress и WooCommerce тормозят при росте каталога интернет-магазина | Kibex Research",
    description: "Разбор системных ограничений WordPress и WooCommerce при масштабировании e-commerce платформ.",
    url: "https://kibex.ru/research/pochemu-wordpress-tormozit-pri-roste-kataloga",
    siteName: "Kibex",
    locale: "ru_RU",
    type: "article",
    publishedTime: "2026-05-16T00:00:00Z",
  },
};

export default function WordPressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
