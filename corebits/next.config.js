// JavaScript wrapper of next.config.ts to ensure CI/Vercel that expect a
// JS config file can load the configuration. Keep this in sync with
// next.config.ts. This mirrors the same settings but written in plain JS.
const withBundleAnalyzer = (c) => c;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _analyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' || process.env.ANALYZE === '1' });
  if (_analyzer) {
    // _analyzer is a function that returns a wrapper
    module.exports = _analyzer({
      output: 'standalone',
      images: { remotePatterns: [] },
      async headers() {
        return [
          {
            source: '/_next/static/:path*',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
            ]
          },
          {
            source: '/images/:path*',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
              { key: 'X-Content-Type-Options', value: 'nosniff' }
            ]
          },
          {
            source: '/(.*)\\.(png|jpg|jpeg|svg|webp|avif)',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
            ]
          }
        ];
      }
    });
  }
} catch (err) {
  // bundle analyzer not installed; fall back to the base config below
}

module.exports = {
  output: 'standalone',
  images: { remotePatterns: [] },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' }
        ]
      },
      {
        source: '/(.*)\\.(png|jpg|jpeg|svg|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  }
};
