// Shared client helpers for form submissions
export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function postToProxy(payload: any, timeoutMs = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(id);
    const text = await res.text();
    let json: any = null;
    try { json = text ? JSON.parse(text) : null; } catch (_) { json = null; }
    if (!res.ok) {
      const message = (json && json.error) ? json.error : `HTTP ${res.status}`;
      return { ok: false, error: message };
    }
    if (json && json.ok === false) return { ok: false, error: json.error || 'Upstream error' };
    return { ok: true, result: json };
  } catch (err: any) {
    if (err.name === 'AbortError') return { ok: false, error: 'Request timed out' };
    return { ok: false, error: err.message || String(err) };
  }
}
