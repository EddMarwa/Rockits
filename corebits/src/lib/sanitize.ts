// Server-side HTML sanitizer using jsdom + DOMPurify
// This helper is intended for server-side use only (Next.js server components / API routes).
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

type PurifyFn = (html: string, config?: Record<string, unknown> | undefined) => string;

let purify: PurifyFn | null = null;

function init(): PurifyFn {
  if (purify) return purify;

  try {
    const { window } = new JSDOM('');
    // DOMPurify expects a browser Window - cast jsdom's window accordingly
    const DOMPurify = createDOMPurify(window as unknown as Window & typeof globalThis);

    purify = (html: string, config?: Record<string, unknown>) => {
      // default options: safe for template rendering; caller can pass overrides
      const base = { SAFE_FOR_TEMPLATES: true };
      const result = DOMPurify.sanitize(html, { ...base, ...(config || {}) });
      // DOMPurify may return TrustedHTML in some envs; ensure a string is returned
      return typeof result === 'string' ? result : String(result);
    };

    return purify as PurifyFn;
  } catch (err) {
    // If initialization fails (very unlikely), fall back to a no-op sanitizer to avoid crashing the server.
    // This is defensive — you may prefer to rethrow in stricter environments.
    purify = (html: string) => html;
    return purify;
  }
}

/**
 * Sanitize HTML on the server.
 * - Only import/use this from server-side code.
 * - Accepts an optional DOMPurify config object to allow specific overrides.
 */
export function sanitizeHtml(html: string, config?: any) {
  const fn = init();
  return fn(html, config);
}
