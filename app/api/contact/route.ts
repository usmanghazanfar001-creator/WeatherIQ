import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form handler. Validates and spam-checks submissions, then emails
 * them via Resend. Requires:
 *   RESEND_API_KEY   — from https://resend.com/api-keys (server-side only)
 *   CONTACT_TO_EMAIL — where submissions should land
 *
 * Until a custom domain is verified in Resend, the "from" address must stay
 * as Resend's shared testing domain (onboarding@resend.dev), and delivery
 * only works to the email address associated with the Resend account.
 * Once a domain is verified, set CONTACT_FROM_EMAIL to an address on that
 * domain (e.g. contact@weatheriq.com) to send to any recipient.
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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "WeatherIQ <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    // Config error — never leak details to the client.
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `New WeatherIQ contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { error: "We couldn't send your message right now. Please try again shortly." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
