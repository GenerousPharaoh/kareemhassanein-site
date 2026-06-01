import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Field length caps. Bound the email payload and reject abusive blobs early.
const MAX = { name: 100, email: 200, message: 5000 } as const;

// Best-effort, in-memory per-IP throttle. This resets on cold start and is
// per-serverless-instance, so it is a speed bump against naive flooding rather
// than an airtight limiter. If abuse becomes a real problem, swap this for a
// durable store (Upstash/Vercel KV) keyed the same way.
const RATE_LIMIT = 5; // sends allowed per IP...
const RATE_WINDOW_MS = 10 * 60 * 1000; // ...per 10 minutes
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string, now: number): boolean {
  // Prune stale windows so the map cannot grow unbounded.
  hits.forEach((entry, key) => {
    if (now - entry.windowStart > RATE_WINDOW_MS) hits.delete(key);
  });
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function getClientIp(request: Request): string {
  // On Vercel, x-real-ip is the client IP; x-forwarded-for is a fallback.
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, company } = body ?? {};

    // Honeypot: real users never fill this hidden field. Accept and silently
    // drop so bots get a success signal without an email being sent.
    if (typeof company === 'string' && company.trim() !== '') {
      return NextResponse.json({ success: true });
    }

    // Validate types and presence.
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Cap lengths.
    if (
      name.length > MAX.name ||
      email.length > MAX.email ||
      message.length > MAX.message
    ) {
      return NextResponse.json(
        { error: 'One or more fields are too long.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Throttle the costly action (sending) per IP.
    if (rateLimited(getClientIp(request), Date.now())) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again in a little while.' },
        { status: 429 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      // Missing server config: fail closed with the generic message.
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    // Strip CR/LF from the name before it lands in the subject header
    // (defense-in-depth against header injection).
    const safeName = name.replace(/[\r\n]+/g, ' ').trim().slice(0, MAX.name);

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'kareem.hassanein@gmail.com',
      replyTo: email,
      subject: `New message from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
