"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const navigationLinks = [
  { label: "Интернет-платформы", href: "/solutions/razrabotka-platformy" },
  { label: "Кибербезопасность", href: "/solutions/security" },
  { label: "Высоконагруженные системы", href: "/solutions/highload" },
  { label: "Модернизация", href: "/solutions/modernizaciya" },
  { label: "Все решения", href: "/solutions" },
  { label: "Проекты", href: "/portfolio" },
  { label: "Исследования Kibex", href: "/research" },
  { label: "О компании", href: "/o-nas" },
  { label: "Контакты", href: "/kontakty" },
] as const;

const socialLinks = [
  {
    name: "VK",
    href: "https://vk.com/kibex",
    icon: "/250px-VK.com-logo.svg.png",
  },
  {
    name: "Telegram",
    href: "https://t.me/kibex",
    icon: "/250px-Telegram_logo.svg.png",
  },
  {
    name: "MAX",
    href: "https://t.me/kibex",
    icon: "/250px-Logo_MAX.png",
  },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image
        src="/images/5d0e3df35a296693fb86f7bff108e850f621019c.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.background}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.contentRow}>
          <div className={styles.companyCol}>

            <Link href="/" className={styles.logoButton}>
              <span className={styles.logoImage} />
            </Link>
            {/*<h2 className={styles.companyTitle}>Kibex</h2>*/}

            <div className={styles.companyDescription}>
              <p className="font-geist text-[#FFFFFF]/70 text-sm sm:text-base leading-relaxed mb-6">
                Цифровые платформы для бизнеса, которому важны стабильность, безопасность и масштабируемость.
              </p>
              <div className="font-geist text-xs sm:text-sm font-bold tracking-widest text-[#4633FF] uppercase flex flex-col gap-1.5 opacity-90">
                <span>Мы не используем шаблоны.</span>
                <span>Мы проектируем системы.</span>
              </div>
            </div>
          </div>

          <nav aria-label="Навигация сайта" className={styles.navCol}>
            <h3 className={styles.columnTitle}>Навигация</h3>
            <ul className={styles.navList}>
              {navigationLinks.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contactsCol}>
            <h3 className={styles.columnTitle}>Контакты</h3>
            <address className={styles.address}>
              <a href="tel:+70000000000" className={styles.contactLink}>
                +7 (000) 000-00-00
              </a>
              <a href="mailto:info@kibex.ru" className={styles.contactEmail}>
                info@kibex.ru
              </a>
            </address>

            <nav aria-label="Социальные сети">
              <ul className={styles.socialList}>
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={styles.socialLink}
                    >
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={24}
                        height={24}
                        className={styles.socialIcon}
                        style={{ filter: "none", objectFit: "contain" }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.bottomDivider} />
        <div className={styles.bottomRow}>
          <p className="font-geist text-sm font-medium text-[#FFFFFF]/50 tracking-wider">
            © Kibex — Разработка и модернизация цифровых платформ
          </p>
          <Link href="/privacy-policy" className={styles.privacyLink}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
