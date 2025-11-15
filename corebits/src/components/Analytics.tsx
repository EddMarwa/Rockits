import Script from 'next/script';

export default function Analytics() {
  // Loads Plausible if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, otherwise
  // no-op. You can expand this to support GA or other providers via env vars.
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!plausibleDomain) return null;

  return (
    <>
      <Script
        src={`https://plausible.io/js/plausible.js`}
        strategy="afterInteractive"
        data-domain={plausibleDomain}
      />
    </>
  );
}
