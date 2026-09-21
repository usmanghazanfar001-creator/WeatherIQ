import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * This validates and spam-checks submissions but does not yet send email —
 * wire it up to an email provider (Resend, Postmark, SES, etc.) or a form
 * backend before relying on it in production. Keep any provider API key
 * server-side only, the same way WEATHER_API_KEY is handled.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  // Honeypot tripped — silently report success so bots don't learn to avoid it.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message || message.length < 10 || message.length > 2000) {
    return NextResponse.json(
      { error: "Please enter a message between 10 and 2000 characters." },
      { status: 400 }
    );
  }

  // TODO: send the message via your email provider of choice here.
  // console.log/logging is intentionally omitted to avoid storing PII in logs.

  return NextResponse.json({ ok: true });
}
