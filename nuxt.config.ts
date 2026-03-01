import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: process.env.NODE_ENV !== 'production',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    // @ts-expect-error — @tailwindcss/vite types against a different rollup version than Nuxt bundles; runtime is fine
    plugins: [tailwindcss()],
  },

  modules: ['@pinia/nuxt', '@nuxtjs/sitemap'],

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    resendApiKey: '',       // NUXT_RESEND_API_KEY
    contactEmail: '',       // NUXT_CONTACT_EMAIL
    stripeSecretKey: '',    // NUXT_STRIPE_SECRET_KEY (Phase 2)
    public: {
      wordpressApiUrl: '',        // NUXT_WORDPRESS_API_URL
      stripePublishableKey: '',   // NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    },
  },

  routeRules: {
    '/':          { swr: 300 },
    '/shop':      { swr: 60 },
    '/find-us':   { swr: 3600 },
    '/blog':      { swr: 3600 },
    '/blog/**':   { swr: 3600 },
    '/contact':   { prerender: true },
    '/faq':       { prerender: true },
    '/our-story': { prerender: true },
    '/wholesale': { prerender: true },
    // Security headers on all routes
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: "The Nut Barn — Handcrafted cinnamon roasted nuts from Dimondale, Michigan. Fresh from the Holt Farmer's Market every Saturday.",
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Alfa+Slab+One:ital,wght@0,400&family=Josefin+Slab:ital,wght@0,600;0,700&family=Lato:ital,wght@0,400;0,700&family=Caveat:wght@400;700&display=swap',
        },
      ],
    },
  },

  sitemap: {
    siteUrl: 'https://thenutbarn.com',
  },
})
