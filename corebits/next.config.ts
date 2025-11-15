import type { NextConfig } from "next";

// Optional bundle analyzer - enabled with `ANALYZE=true` env var.
// If the package isn't installed (e.g., on CI or users who haven't added it),
// fall back to an identity passthrough so the build still works.
let withBundleAnalyzer: any = (c: any) => c;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _analyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' || process.env.ANALYZE === '1' });
  withBundleAnalyzer = _analyzer;
} catch (err) {
  // bundle analyzer not installed; continue without it
}

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // allow local images from /public and any future remote hosts can be
    // added here via remotePatterns for next/image optimization.
    remotePatterns: []
  },
  // Add caching & basic security headers for static assets and images to
  // improve repeat load performance and mitigate common risks.
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
        source: '/(.*)\.(png|jpg|jpeg|svg|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  }
};

module.exports = withBundleAnalyzer(nextConfig);
