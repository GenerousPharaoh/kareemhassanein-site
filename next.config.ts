import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    // Report-only until booking and analytics providers are chosen.
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      "img-src 'self' data:",
      "media-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Asset generators reuse filenames. Revalidate cached copies after a deployment.
      { source: '/work-media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/services', destination: '/work', permanent: true },
      { source: '/contact', destination: '/book', permanent: true },
      { source: '/work/clinical-documentation', destination: '/work', permanent: true },
      // Older check links used a query; the check now has its own static page.
      { source: '/book', has: [{ type: 'query', key: 'topic', value: 'check' }], destination: '/book/check', permanent: true },
      { source: '/work/destination-wedding', destination: '/work/wedding', permanent: true },
      { source: '/work/wedding-website', destination: '/work/wedding', permanent: true },
    ];
  },
};

export default nextConfig;
