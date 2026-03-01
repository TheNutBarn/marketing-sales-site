/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers (migrated from netlify.toml)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https://js.stripe.com",
              "frame-src https://js.stripe.com https://www.google.com",
            ].join('; '),
          },
        ],
      },
    ]
  },

  // Redirects for legacy Netlify SPA hash routes
  async redirects() {
    return [
      { source: '/#products', destination: '/shop', permanent: true },
      { source: '/#story', destination: '/our-story', permanent: true },
      { source: '/#schedule', destination: '/find-us', permanent: true },
      { source: '/#contact', destination: '/contact', permanent: true },
    ]
  },

  // Allow WordPress media domain (update once hosting is live)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.nutbarn.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
