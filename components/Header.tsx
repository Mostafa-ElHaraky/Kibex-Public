"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, Mail } from "lucide-react";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export const navItems = [
  { label: "Решения", href: "/solutions" },
  { label: "Проекты", href: "/portfolio" },
  { label: "Подход", href: "/approach" },
  { label: "Исследования", href: "/research" },
  { label: "Контакты", href: "/kontakty" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Menu Toggle - Mobile Only */}
        <button
          className={styles.mobileMenuToggle}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>

        {/* Logo - Visible on both, but position/size might change via CSS */}
        <Link href="/" className={styles.logoButton}>
          <span className={styles.logoImage} />
        </Link>

        {/* Desktop Navigation & Contacts */}
        <div className={styles.menuBar}>
          <nav className={styles.nav}>
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navItem} ${index === 0 ? styles.active : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.contacts} aria-label="Контактная информация">
            <div className={styles.contactTextLinks}>
              <a className={styles.contactLink} href="tel:+70000000000">
                +7(000)-000-00-00
              </a>
              <a className={styles.contactLink} href="mailto:info@kibex.ru">
                info@kibex.ru
              </a>
            </div>
            <div className={styles.socialLinks}>
              <a href="https://t.me/kibex" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <img src="/250px-Telegram_logo.svg.png" alt="Telegram" className={styles.socialIcon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <img src="/250px-Logo_MAX.png" alt="MAX" className={styles.socialIcon} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Right Section: Contacts */}
        <div className={styles.mobileContacts}>
          <div className={styles.mobileMainContacts}>
            <a href="tel:+70000000000" className={styles.mobileContactIcon}>
              <Phone size={20} />
              <span className={styles.mobileContactText}>+7(000)-000-00-00</span>
            </a>
            <a href="mailto:info@kibex.ru" className={styles.mobileContactIcon}>
              <Mail size={20} />
              <span className={styles.mobileContactText}>info@kibex.ru</span>
            </a>
          </div>
          <div className={styles.mobileSocialLinks}>
            <a href="https://t.me/kibex" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <img src="/250px-Telegram_logo.svg.png" alt="Telegram" className={styles.socialIcon} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <img src="/250px-Logo_MAX.png" alt="MAX" className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
