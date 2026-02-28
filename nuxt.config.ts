import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/global.css'],

  runtimeConfig: {
    // Server-only secrets — set via NUXT_* env vars (e.g. NUXT_CONTACT_EMAIL)
    contactEmail: '',
    resendApiKey: '',
    wordpressApiUrl: '',
    stripeSecretKey: '',
    // Public (client + server) — set via NUXT_PUBLIC_* env vars
    public: {
      stripePublishableKey: '',
    },
  },

  // Security headers and route-level config
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self'",
          "connect-src 'self'",
          "frame-src https://js.stripe.com https://www.google.com",
        ].join('; '),
      },
    },
  },

  typescript: {
    strict: true,
  },
})
