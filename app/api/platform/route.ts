import { NextResponse } from "next/server";
import crypto from "crypto";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const PROJECT_TYPES = [
  "Интернет-магазин",
  "B2B платформа",
  "Marketplace",
  "Оптовый портал",
  "D2C бренд",
  "Корпоративная торговая система",
  "Другое",
];

const CATALOG_SIZES = [
  "до 1 000 SKU",
  "1 000 – 10 000 SKU",
  "10 000 – 100 000 SKU",
  "100 000+ SKU",
];

const CRITICAL_PROCESSES = [
  "Checkout",
  "Склад и остатки",
  "Интеграция с 1С",
  "B2B кабинеты",
  "Логистика",
  "OMS/WMS",
  "SEO",
  "Мобильная версия",
  "Производительность",
  "Маркетплейсы",
];

const GROWTH_LIMITS = [
  "Медленная работа",
  "Проблемы SEO",
  "Нестабильные интеграции",
  "Высокая стоимость поддержки",
  "Проблемы масштабирования",
  "Пиковые падения",
  "Сложность доработок",
  "Ограничения CMS",
];

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

function sanitize(text: string): string {
  if (!text) return "";
  return text
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const SQL_XSS_BLOCK = [
  /union\s+select/gi,
  /select\s+.*\s+from/gi,
  /insert\s+into/gi,
  /delete\s+from/gi,
  /drop\s+table/gi,
  /document\./gi,
  /window\./gi,
  /eval\(/gi,
  /<\/script>/gi,
];

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();

    // Rate limiting
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      if (now > rateData.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      } else {
        rateData.count++;
        if (rateData.count > RATE_LIMIT_COUNT) {
          return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await req.json();
    const {
      name, company, contact,
      projectType, catalogSize,
      criticalProcesses = [], currentSystems,
      growthLimits = [], description,
      website, // honeypot
      turnstileToken,
    } = body;

    // Honeypot
    if (website) {
      console.log(`[Platform API Security] Honeypot triggered: ${ip}`);
      return NextResponse.json({ success: true });
    }

    // Turnstile (bypass in local dev)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || "1x00000000000000000000000000000000AA";
    if (turnstileToken && turnstileSecret !== "1x00000000000000000000000000000000AA") {
      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: turnstileToken, remoteip: ip }),
      });
      const outcome = await res.json();
      if (!outcome.success) {
        return NextResponse.json({ error: "Invalid captcha response." }, { status: 400 });
      }
    }

    // Sanitize
    const cName = sanitize(name);
    const cCompany = sanitize(company);
    const cContact = sanitize(contact);
    const cSystems = sanitize(currentSystems);
    const cDesc = sanitize(description);

    const isMalicious = [cName, cCompany, cContact, cSystems, cDesc]
      .some(val => SQL_XSS_BLOCK.some(r => r.test(val)));
    if (isMalicious) {
      console.warn(`[Platform API Security] Malicious input from IP: ${ip}`);
      return NextResponse.json({ error: "Invalid parameters." }, { status: 400 });
    }

    const eName = escapeHtml(cName);
    const eCompany = escapeHtml(cCompany);
    const eContact = escapeHtml(cContact);
    const eDesc = escapeHtml(cDesc);

    if (eName.length < 2 || eName.length > 50) return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    if (eCompany.length < 2 || eCompany.length > 100) return NextResponse.json({ error: "Invalid company." }, { status: 400 });
    if (eDesc.length < 1 || eDesc.length > 1000) return NextResponse.json({ error: "Invalid description." }, { status: 400 });

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cContact);
    const isTelegram = /^@?[a-zA-Z0-9_]{5,32}$/.test(cContact);
    const isPhone = /^\+?[0-9\s\-()]{10,20}$/.test(cContact);
    if (!isEmail && !isTelegram && !isPhone) {
      return NextResponse.json({ error: "Invalid contact info." }, { status: 400 });
    }

    if (!PROJECT_TYPES.includes(projectType)) {
      return NextResponse.json({ error: "Invalid project type." }, { status: 400 });
    }

    let eCatalogSize = "";
    if (catalogSize && CATALOG_SIZES.includes(catalogSize)) eCatalogSize = escapeHtml(catalogSize);

    const eProcesses = (criticalProcesses as string[])
      .filter(p => CRITICAL_PROCESSES.includes(p))
      .map(p => escapeHtml(p));

    const eLimits = (growthLimits as string[])
      .filter(p => GROWTH_LIMITS.includes(p))
      .map(p => escapeHtml(p));

    const eSystems = currentSystems ? escapeHtml(cSystems.slice(0, 300)) : "";

    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const timestamp = new Date().toISOString();

    console.log(`
====== [E-COMMERCE PLATFORM DEVELOPMENT LEAD] ======
Timestamp: ${timestamp}
IP Hash: ${ipHash}

Lead:
- Name: ${eName}
- Company: ${eCompany}
- Contact: ${eContact}
- Project Type: ${escapeHtml(projectType)}
- Catalog Size: ${eCatalogSize || "Not specified"}
- Critical Processes: [${eProcesses.join(", ") || "None"}]
- Current Systems: ${eSystems || "Not specified"}
- Growth Limiters: [${eLimits.join(", ") || "None"}]
- Description:
  ${eDesc}
=====================================================
    `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Platform API Error]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
