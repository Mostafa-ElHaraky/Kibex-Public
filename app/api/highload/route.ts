import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory rate limiting map
// 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const PLATFORM_TYPES = [
  "Интернет-магазин",
  "ERP система",
  "Marketplace",
  "B2B платформа",
  "SaaS система",
  "Медиа / контент",
  "Мобильный backend",
  "Другое"
];

const TRAFFIC_OPTIONS = [
  "до 10 000 пользователей",
  "10k – 100k",
  "100k – 1 млн",
  "1 млн+"
];

const PROBLEM_OPTIONS = [
  "Падения под нагрузкой",
  "Медленная работа",
  "Проблемы с базой данных",
  "Долгие API-ответы",
  "Нестабильный кеш",
  "Проблемы масштабирования",
  "Ошибки при пиковом трафике",
  "Нестабильные очереди",
  "Высокая стоимость серверов"
];

const CRITICAL_OPTIONS = [
  "Высокий uptime",
  "Скорость API",
  "Стабильность checkout",
  "Масштабирование",
  "Real-time синхронизация",
  "Безопасность данных",
  "Снижение стоимости инфраструктуры"
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
      platformType,
      traffic,
      problems = [],
      techStack,
      peakLoad,
      criticalItems = [],
      description,
      website, // Honeypot field
      turnstileToken
    } = body;

    // 2. Honeypot check
    if (website) {
      console.log(`[Highload API Security] Honeypot triggered by IP: ${ip}`);
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
        console.log(`[Highload API Security] Turnstile validation failed for IP: ${ip}`);
        return NextResponse.json({ error: "Invalid captcha response." }, { status: 400 });
      }
    }

    // 4. Strict Server-side Validation
    const cleanName = sanitizeInput(name);
    const cleanCompany = sanitizeInput(company);
    const cleanContact = sanitizeInput(contact);
    const cleanTechStack = sanitizeInput(techStack);
    const cleanPeakLoad = sanitizeInput(peakLoad);
    const cleanDescription = sanitizeInput(description);

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
      cleanTechStack,
      cleanPeakLoad,
      cleanDescription
    ].some((val) => blockList.some((regex) => regex.test(val)));

    if (isMalicious) {
      console.warn(`[Highload API Security] Malicious input block triggered by IP: ${ip}`);
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

    // Platform Type validation
    if (!PLATFORM_TYPES.includes(platformType)) {
      return NextResponse.json({ error: "Invalid platform type choice." }, { status: 400 });
    }
    const escPlatformType = escapeHtml(platformType);

    // Optional field checks
    let escTraffic = "";
    if (traffic) {
      if (!TRAFFIC_OPTIONS.includes(traffic)) {
        return NextResponse.json({ error: "Invalid traffic value." }, { status: 400 });
      }
      escTraffic = escapeHtml(traffic);
    }

    const escTechStack = techStack ? escapeHtml(cleanTechStack.slice(0, 300)) : "";
    const escPeakLoad = peakLoad ? escapeHtml(cleanPeakLoad.slice(0, 300)) : "";

    const escProblems = problems
      .filter((p: string) => PROBLEM_OPTIONS.includes(p))
      .map((p: string) => escapeHtml(p));

    const escCriticalItems = criticalItems
      .filter((p: string) => CRITICAL_OPTIONS.includes(p))
      .map((p: string) => escapeHtml(p));

    // 5. Generate IP Hash & Timestamp
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const timestamp = new Date().toISOString();

    // 6. CRM Lead Creation Simulation log
    console.log(`
====== [HIGHLOAD ARCHITECTURE LEAD SUBMISSION] ======
Timestamp: ${timestamp}
Client IP Hash: ${ipHash}

Lead Details:
- Name: ${escName}
- Company: ${escCompany}
- Contact Info: ${escContact}
- Platform Type: ${escPlatformType}
- Traffic volume: ${escTraffic || "Not specified"}
- Tech Stack: ${escTechStack || "Not specified"}
- Peak Load: ${escPeakLoad || "Not specified"}
- Problems Encountered: [${escProblems.join(", ") || "None specified"}]
- Critical for Business: [${escCriticalItems.join(", ") || "None specified"}]
- Description of Constraints:
  ${escDescription}

Pipeline Updates:
- Sent alert to DevOps engineering group.
- CRM Lead Record created in highload consultation queue.
======================================================
    `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Highload API Error] ", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
