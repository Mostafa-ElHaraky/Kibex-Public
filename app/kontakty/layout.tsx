import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты Kibex — разработка ERP, highload и e-commerce платформ",
  description: "Свяжитесь с Kibex для обсуждения ERP систем, highload инфраструктуры, e-commerce платформ, интеграций и архитектурной модернизации бизнеса.",
  keywords: [
    "разработка ERP систем контакты",
    "разработка интернет-магазинов",
    "highload разработка",
    "аудит безопасности сайта",
    "интеграция 1С",
    "enterprise разработка",
    "заказать ERP систему",
    "архитектура e-commerce платформ"
  ],
  alternates: {
    canonical: "https://kibex.io/kontakty",
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
