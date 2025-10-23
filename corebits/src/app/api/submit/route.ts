import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (per IP). This is intentionally tiny.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // allow 60 requests per minute per key
const rateMap = new Map<string, { count: number; windowStart: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry) {
    rateMap.set(key, { count: 1, windowStart: now });
    return { ok: true };
  }
  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(key, { count: 1, windowStart: now });
    return { ok: true };
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json({ ok: false, error: 'Rate limit exceeded' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Expected application/json' }, { status: 400 });
    }

    const body = await request.json();
    if (!body || !body.sheet || !body.data) {
      return NextResponse.json({ ok: false, error: 'Invalid payload; expected { sheet, data }' }, { status: 400 });
    }

    // Honeypot check: legitimate clients will not fill this; bots often will
    if (body.meta && body.meta.hp && String(body.meta.hp).trim() !== '') {
      // Respond with 400 but don't forward upstream — treat as spam
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    // Read Apps Script URL from server-side env var (keep it private)
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json({ ok: false, error: 'Server misconfiguration: missing GOOGLE_SCRIPT_URL' }, { status: 500 });
    }

    // Forward to Apps Script
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const text = await res.text();
    // Try parse JSON, otherwise return text
    try {
      const json = text ? JSON.parse(text) : null;
      if (!res.ok) return NextResponse.json({ ok: false, error: json && json.error ? json.error : `Upstream HTTP ${res.status}` }, { status: 502 });
      return NextResponse.json(json || { ok: true });
    } catch (err) {
      if (!res.ok) return NextResponse.json({ ok: false, error: `Upstream HTTP ${res.status}` }, { status: 502 });
      return NextResponse.json({ ok: true, result: text });
    }
  } catch (err: any) {
    console.error('Proxy /api/submit error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
