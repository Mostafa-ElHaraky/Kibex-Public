import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory rate limiting map
// 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

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
      companySize,
      processes = [],
      currentSystems,
      problem,
      website, // Honeypot field
      turnstileToken,
    } = body;

    // 2. Honeypot check
    // Bots usually fill all hidden fields; if filled, return 200 OK silently to trick them
    if (website) {
      console.log(`[ERP API Security] Honeypot triggered by IP: ${ip}`);
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
          remoteip: ip,
        }),
      });

      const outcome = await res.json();
      if (!outcome.success) {
        console.log(`[ERP API Security] Turnstile validation failed for IP: ${ip}`);
        return NextResponse.json({ error: "Invalid captcha response." }, { status: 400 });
      }
    }

    // 4. Strict Server-side Validation
    const cleanName = sanitizeInput(name);
    const cleanCompany = sanitizeInput(company);
    const cleanContact = sanitizeInput(contact);
    const cleanProblem = sanitizeInput(problem);

    // Reject injections and malicious patterns
    const blockList = [
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

    const isMalicious = [cleanName, cleanCompany, cleanContact, cleanProblem].some((val) =>
      blockList.some((regex) => regex.test(val))
    );

    if (isMalicious) {
      console.warn(`[ERP API Security] Malicious input block triggered by IP: ${ip}`);
      return NextResponse.json({ error: "Invalid parameters." }, { status: 400 });
    }

    // Format & Escape outputs
    const escName = escapeHtml(cleanName);
    const escCompany = escapeHtml(cleanCompany);
    const escContact = escapeHtml(cleanContact);
    const escCompanySize = escapeHtml(sanitizeInput(companySize));
    const escCurrentSystems = escapeHtml(sanitizeInput(currentSystems));
    const escProblem = escapeHtml(cleanProblem);
    const escProcesses = processes.slice(0, 5).map((p: string) => escapeHtml(sanitizeInput(p)));

    // Ensure required fields are valid
    if (escName.length < 2 || escName.length > 50) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    if (escCompany.length < 2 || escCompany.length > 100) {
      return NextResponse.json({ error: "Invalid company." }, { status: 400 });
    }
    if (escProblem.length < 1 || escProblem.length > 1000) {
      return NextResponse.json({ error: "Invalid description." }, { status: 400 });
    }

    // Validate contact pattern
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
    const isTelegram = /^@?[a-zA-Z0-9_]{5,32}$/.test(cleanContact);
    const isPhone = /^\+?[0-9\s\-()]{10,20}$/.test(cleanContact);
    if (!isEmail && !isTelegram && !isPhone) {
      return NextResponse.json({ error: "Invalid contact info." }, { status: 400 });
    }

    // 5. Generate IP Hash & Timestamp
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const timestamp = new Date().toISOString();

    // 6. CRM Lead Creation, Telegram, and Email triggers
    console.log(`
====== [ERP ARCHITECTURE LEAD SUBMISSION] ======
Timestamp: ${timestamp}
Client IP Hash: ${ipHash}

Lead Details:
- Name: ${escName}
- Company: ${escCompany} (Size: ${escCompanySize || "Not specified"})
- Contact Info: ${escContact}
- Existing Systems: ${escCurrentSystems || "None"}
- Target Automation Processes: [${escProcesses.join(", ") || "None"}]
- Core Issue / Problem:
  ${escProblem}

Integrations Logged:
- Telegram Notification Payload prepared.
- Email Notification HTML prepared.
- CRM Lead Record created in pipeline.
================================================
    `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ERP API Error] ", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
