"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Phone, Mail } from "lucide-react";
import { navItems } from "./Header";
import styles from "./Header.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
            }}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "320px",

              background: "#000000",
              zIndex: 101,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              boxShadow: "10px 0 30px rgba(0, 0, 0, 0.5)",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className={styles.logoImage} style={{ position: "static", display: "block" }} />
              <button 
                onClick={onClose} 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  color: "white", 
                  cursor: "pointer",
                  padding: "8px"
                }}
              >
                <X size={24} />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={styles.menuItem}
              >
                {item.label}
              </Link>
              ))}
            </nav>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a 
                  href="tel:+70000000000" 
                  style={{ 
                    color: "white", 
                    textDecoration: "none", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px",
                    fontSize: "16px"
                  }}
                >
                  <Phone size={18} />
                  <span>+7(000)-000-00-00</span>
                </a>
                <a 
                  href="mailto:info@kibex.ru" 
                  style={{ 
                    color: "white", 
                    textDecoration: "none", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px",
                    fontSize: "16px"
                  }}
                >
                  <Mail size={18} />
                  <span>info@kibex.ru</span>
                </a>
              </div>
              
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="https://t.me/kibex" target="_blank" rel="noopener noreferrer">
                  <img src="/250px-Telegram_logo.svg.png" alt="Telegram" style={{ width: "32px", height: "32px" }} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/250px-Logo_MAX.png" alt="MAX" style={{ width: "32px", height: "32px" }} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
