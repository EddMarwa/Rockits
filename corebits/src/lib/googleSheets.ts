// Lightweight helper to POST form submissions to a Google Apps Script endpoint
export async function sendToGoogleSheet(scriptUrl: string, sheetName: string, payload: Record<string, any>) {
  if (!scriptUrl) throw new Error('GOOGLE_SCRIPT_URL is not configured');

  const body = {
    sheet: sheetName,
    data: payload
  };

  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Google Script request failed: ${res.status} ${res.statusText} ${text}`);
  }

  return res.json().catch(() => ({}));
}
