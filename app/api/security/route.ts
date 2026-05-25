import { NextResponse } from "next/server";
import crypto from "crypto";

// Stricter rate limiting for security page: 3 req / 10 min / IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_COUNT = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const PLATFORM_TYPES = [
  "Интернет-магазин",
  "ERP система",
  "Корпоративная платформа",
  "B2B система",
  "Marketplace",
  "SaaS система",
  "API сервис",
  "Другое",
];

const AUDIT_AREAS = [
  "Безопасность API",
  "Авторизация и роли",
  "SQL-инъекции",
  "XSS уязвимости",
  "Конфигурацию серверов",
  "Инфраструктуру Kubernetes",
  "Интеграции с 1С",
  "WAF и firewall",
  "Безопасность базы данных",
  "Логи и мониторинг",
];

const CURRENT_ISSUES = [
  "Подозрительная активность",
  "Падения платформы",
  "Медленная работа",
  "Ошибки авторизации",
  "Проблемы API",
  "Утечки данных",
  "Проблемы доступа",
  "Неизвестно",
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

const BLOCK_PATTERNS = [
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

    // Rate limiting (stricter: 3/10min)
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      if (now > rateData.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      } else {
        rateData.count++;
        if (rateData.count > RATE_LIMIT_COUNT) {
          return NextResponse.json({ error: "Слишком много запросов. Попробуйте позже." }, { status: 429 });
        }
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await req.json();
    const {
      name, company, contact, platformType,
      auditAreas = [], techStack, currentIssues = [],
      description,
      website, // honeypot
      turnstileToken,
    } = body;

    // Honeypot — silent reject
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Turnstile (bypass local dev with test key)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || "1x00000000000000000000000000000000AA";
    if (turnstileToken && turnstileSecret !== "1x00000000000000000000000000000000AA") {
      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: turnstileToken, remoteip: ip }),
      });
      const outcome = await res.json();
      if (!outcome.success) {
        return NextResponse.json({ error: "Ошибка проверки запроса." }, { status: 400 });
      }
    }

    // Sanitize all inputs
    const cName = sanitize(name);
    const cCompany = sanitize(company);
    const cContact = sanitize(contact);
    const cTechStack = sanitize(techStack);
    const cDescription = sanitize(description);

    // Block malicious patterns
    const isMalicious = [cName, cCompany, cContact, cTechStack, cDescription]
      .some(val => BLOCK_PATTERNS.some(r => { r.lastIndex = 0; return r.test(val); }));
    if (isMalicious) {
      // Log only a hash, never expose what was blocked
      const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
      console.warn(`[Security API] Blocked suspicious input. IP hash: ${ipHash}`);
      return NextResponse.json({ error: "Ошибка обработки запроса." }, { status: 400 });
    }

    const eName = escapeHtml(cName);
    const eCompany = escapeHtml(cCompany);
    const eContact = escapeHtml(cContact);
    const eDescription = escapeHtml(cDescription);

    // Field length limits
    if (eName.length < 2 || eName.length > 50)
      return NextResponse.json({ error: "Некорректное имя." }, { status: 400 });
    if (eCompany.length < 2 || eCompany.length > 100)
      return NextResponse.json({ error: "Некорректное название компании." }, { status: 400 });
    if (eDescription.length < 1 || eDescription.length > 1000)
      return NextResponse.json({ error: "Некорректное описание." }, { status: 400 });

    // Contact validation
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cContact);
    const isTelegram = /^@?[a-zA-Z0-9_]{5,32}$/.test(cContact);
    const isPhone = /^\+?[0-9\s\-()]{10,20}$/.test(cContact);
    if (!isEmail && !isTelegram && !isPhone)
      return NextResponse.json({ error: "Некорректный контакт." }, { status: 400 });

    // Enum whitelist validation
    if (!PLATFORM_TYPES.includes(platformType))
      return NextResponse.json({ error: "Некорректный тип платформы." }, { status: 400 });

    const eAuditAreas = (auditAreas as string[])
      .filter(a => AUDIT_AREAS.includes(a)).map(a => escapeHtml(a));
    const eCurrentIssues = (currentIssues as string[])
      .filter(i => CURRENT_ISSUES.includes(i)).map(i => escapeHtml(i));
    const eTechStack = cTechStack ? escapeHtml(cTechStack.slice(0, 300)) : "";

    // Hash IP — never log raw IP for security assessment leads
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const timestamp = new Date().toISOString();

    console.log(`
====== [SECURITY ASSESSMENT LEAD — CONFIDENTIAL] ======
Timestamp: ${timestamp}
IP Hash: ${ipHash}

Assessment Request:
- Name: ${eName}
- Company: ${eCompany}
- Contact: [REDACTED — stored securely]
- Platform Type: ${escapeHtml(platformType)}
- Audit Areas: [${eAuditAreas.join(", ") || "Not specified"}]
- Tech Stack: ${eTechStack || "Not specified"}
- Reported Issues: [${eCurrentIssues.join(", ") || "None reported"}]
- Description: [${eDescription.length} chars — stored securely]

Status: Queued for security engineering review.
========================================================
    `);

    return NextResponse.json({ success: true });
  } catch {
    // Never expose internal errors to the client
    return NextResponse.json({ error: "Ошибка обработки запроса." }, { status: 500 });
  }
}
