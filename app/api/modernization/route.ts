import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory rate limiting map
// 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const PLATFORM_WHITELIST = [
  "Bitrix",
  "WordPress / WooCommerce",
  "OpenCart",
  "Magento",
  "Самописная CMS",
  "Другая система"
];

const SIZE_WHITELIST = [
  "до 1 000 товаров",
  "1 000 – 10 000",
  "10 000 – 100 000",
  "100 000+"
];

const PROBLEM_WHITELIST = [
  "Медленная работа",
  "Проблемы SEO",
  "Ошибки интеграций",
  "Высокая стоимость поддержки",
  "Проблемы безопасности",
  "Нестабильная работа",
  "Сложность масштабирования",
  "Проблемы с 1С"
];

const PRESERVED_WHITELIST = [
  "SEO-позиции",
  "Историю заказов",
  "Клиентскую базу",
  "Интеграции",
  "Дизайн сайта",
  "Каталог товаров"
];

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

function sanitizeInput(text: string): string {
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

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();

    // 1. IP Rate Limiting Check
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      if (now > rateData.resetTime) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      } else {
        rateData.count += 1;
        if (rateData.count > RATE_LIMIT_COUNT) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // Parse payload
    const body = await req.json();
    const {
      name,
      company,
      contact,
      currentPlatform,
      otherPlatform,
      catalogSize,
      problems = [],
      integrations,
      preserved = [],
      description,
      website, // Honeypot field
      turnstileToken
    } = body;

    // 2. Honeypot check
    if (website) {
      console.log(`[Modernization API Security] Honeypot triggered by IP: ${ip}`);
      return NextResponse.json({ success: true, message: "Request received" });
    }

    // 3. Turnstile validation
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || "1x00000000000000000000000000000000AA";
    if (turnstileToken && turnstileSecret !== "1x00000000000000000000000000000000AA") {
      const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const res = await fetch(verifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: ip
        })
      });

      const outcome = await res.json();
      if (!outcome.success) {
        console.log(`[Modernization API Security] Turnstile validation failed for IP: ${ip}`);
        return NextResponse.json({ error: "Invalid captcha response." }, { status: 400 });
      }
    }

    // 4. Strict Server-side Validation
    const cleanName = sanitizeInput(name);
    const cleanCompany = sanitizeInput(company);
    const cleanContact = sanitizeInput(contact);
    const cleanDescription = sanitizeInput(description);
    const cleanOtherPlatform = sanitizeInput(otherPlatform);

    // Reject SQL injection and standard script tags
    const blockList = [
      /union\s+select/gi,
      /select\s+.*\s+from/gi,
      /insert\s+into/gi,
      /delete\s+from/gi,
      /drop\s+table/gi,
      /document\./gi,
      /window\./gi,
      /eval\(/gi,
      /<\/script>/gi
    ];

    const isMalicious = [
      cleanName,
      cleanCompany,
      cleanContact,
      cleanDescription,
      cleanOtherPlatform
    ].some((val) => blockList.some((regex) => regex.test(val)));

    if (isMalicious) {
      console.warn(`[Modernization API Security] Malicious input block triggered by IP: ${ip}`);
      return NextResponse.json({ error: "Invalid parameters." }, { status: 400 });
    }

    // Whitelist and type check inputs
    const escName = escapeHtml(cleanName);
    const escCompany = escapeHtml(cleanCompany);
    const escContact = escapeHtml(cleanContact);
    const escDescription = escapeHtml(cleanDescription);

    if (escName.length < 2 || escName.length > 50) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    if (escCompany.length < 2 || escCompany.length > 100) {
      return NextResponse.json({ error: "Invalid company." }, { status: 400 });
    }
    if (escDescription.length < 1 || escDescription.length > 1000) {
      return NextResponse.json({ error: "Invalid description." }, { status: 400 });
    }

    // Validate contact info
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
    const isTelegram = /^@?[a-zA-Z0-9_]{5,32}$/.test(cleanContact);
    const isPhone = /^\+?[0-9\s\-()]{10,20}$/.test(cleanContact);
    if (!isEmail && !isTelegram && !isPhone) {
      return NextResponse.json({ error: "Invalid contact info." }, { status: 400 });
    }

    // Current platform validation
    if (!PLATFORM_WHITELIST.includes(currentPlatform)) {
      return NextResponse.json({ error: "Invalid platform choice." }, { status: 400 });
    }
    const escCurrentPlatform = escapeHtml(currentPlatform);
    let escOtherPlatform = "";
    if (escCurrentPlatform === "Другая система") {
      if (cleanOtherPlatform.length < 2 || cleanOtherPlatform.length > 100) {
        return NextResponse.json({ error: "Invalid custom platform name." }, { status: 400 });
      }
      escOtherPlatform = escapeHtml(cleanOtherPlatform);
    }

    // Optional field checks
    let escCatalogSize = "";
    if (catalogSize) {
      if (!SIZE_WHITELIST.includes(catalogSize)) {
        return NextResponse.json({ error: "Invalid catalog size." }, { status: 400 });
      }
      escCatalogSize = escapeHtml(catalogSize);
    }

    const escIntegrations = integrations ? escapeHtml(sanitizeInput(integrations).slice(0, 300)) : "";

    const escProblems = problems
      .filter((p: string) => PROBLEM_WHITELIST.includes(p))
      .map((p: string) => escapeHtml(p));

    const escPreserved = preserved
      .filter((p: string) => PRESERVED_WHITELIST.includes(p))
      .map((p: string) => escapeHtml(p));

    // 5. Generate IP Hash & Timestamp
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const timestamp = new Date().toISOString();

    // 6. CRM Lead Creation Simulation log
    console.log(`
====== [E-COMMERCE MODERNIZATION LEAD SUBMISSION] ======
Timestamp: ${timestamp}
Client IP Hash: ${ipHash}

Lead Details:
- Name: ${escName}
- Company: ${escCompany}
- Contact Info: ${escContact}
- Current Platform: ${escCurrentPlatform}${escOtherPlatform ? ` (${escOtherPlatform})` : ""}
- Catalog Size: ${escCatalogSize || "Not specified"}
- Problems Encountered: [${escProblems.join(", ") || "None specified"}]
- Target Integrations: ${escIntegrations || "None specified"}
- Critical to Preserve: [${escPreserved.join(", ") || "None specified"}]
- Description / Goals:
  ${escDescription}

Integrations Logged:
- Telegram Notification Payload prepared.
- Email Notification HTML prepared.
- CRM Lead Record created in modernization pipeline.
=========================================================
    `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Modernization API Error] ", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
