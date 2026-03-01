# The Nut Barn — Master Plan Review Results

**Document reviewed:** `docs/initial/NUT-BARN-MASTER-PLAN.md` (v1.2)
**Date:** March 2026
**Stack:** Nuxt 4.3.1 / Vue 3.5 / Tailwind CSS v4.2 / Pinia / Resend / WPGraphQL / Vercel Edge / pnpm / Node 24 LTS

Five parallel agents reviewed the master plan across Security, Architecture, UI/UX, Design, and General Code domains.

---

## Consolidated Findings

### Themes That Appeared in 3+ Reviews (Highest Signal)

| Issue | Reviews |
|---|---|
| Server-side input validation (Zod) on all API routes | Security, Architectural, Code |
| Rate limiting on `/api/orders` and `/api/contact` — move from Phase 5 to Phase 1 | Security, Architectural, Code |
| `routeRules` cache syntax wrong — needs `swr:` or explicit `Cache-Control` headers for Vercel | Architectural, Code |
| Pinia cart SSR hydration mismatch — `import.meta.client` guard required | Architectural, Code |
| `composables/useCart.ts` → should be `stores/cart.ts` (Pinia convention) | Architectural, Code |
| WPGraphQL introspection must be disabled in production — don't defer to Phase 5 | Security, Code |
| Server must recompute order total — never trust client-submitted prices | Security, Code |
| Orange `#ff6b35` on white/cream fails WCAG AA for text | UX, Design |

---

## 1. Security Review

### 1a. API Key / Secret Exposure

**Severity: Medium**

`runtimeConfig` structure must enforce server-only secrets:

```ts
runtimeConfig: {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  public: {
    stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_KEY,
  }
}
```

Resend API key must be a **send-only** scoped key restricted to the verified sending domain — not a full-permission key.

---

### 1b. Rate Limiting on API Routes

**Severity: High**

No rate limiting is documented on any API route. Without it:
- A bot can flood `thenutbarnllc@gmail.com` (500 emails/day personal Gmail limit)
- The order route can be used as an open email relay to bomb arbitrary addresses
- Resend free tier (3,000 emails/month) can be exhausted in hours

Add to every server route using Nitro's built-in `getRequestIP`:

```ts
const rateLimitStore = new Map<string, { count: number; reset: number }>()

const ip = getRequestHeader(event, 'x-forwarded-for') ?? 'unknown'
const now = Date.now()
const entry = rateLimitStore.get(ip) ?? { count: 0, reset: now + 60_000 }
if (now > entry.reset) { entry.count = 0; entry.reset = now + 60_000 }
entry.count++
rateLimitStore.set(ip, entry)
if (entry.count > 3) throw createError({ statusCode: 429, message: 'Too many requests' })
```

Move rate limiting to **Phase 1**, not Phase 5.

---

### 1c. Input Validation

**Severity: High**

No server-side validation is documented. Without it, user-submitted fields can inject HTML into emails, cause Resend rejections, or accept arbitrarily long strings.

Use Zod on every server route:

```ts
import { z } from 'zod'

const OrderSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{7,20}$/),
  fulfillment: z.enum(['pickup', 'delivery']),
  address: z.string().max(300).optional(),
  notes: z.string().max(1000).optional(),
  items: z.array(z.object({
    id: z.string().max(50),
    quantity: z.number().int().positive().max(99),
  })).min(1).max(20),
})
```

---

### 1d. Email HTML Injection

**Severity: High**

User-supplied fields (name, notes, address) interpolated into HTML email templates create injection vectors. HTML-escape all user input before placing in email bodies:

```ts
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
```

---

### 1e. Order Total — Never Trust Client Prices

**Severity: Medium** (escalates to Critical in Phase 3 with Stripe)

The server must recompute the order total from its own price table:

```ts
const PRICES: Record<string, number> = {
  'nuts-6oz': 1000, 'nuts-8oz': 1500,
  'nuts-15oz': 2300, 'gift-basket': 4000,
}
const total = items.reduce((sum, item) => {
  const price = PRICES[item.id]
  if (!price) throw createError({ statusCode: 400, message: `Unknown product: ${item.id}` })
  return sum + price * item.quantity
}, 0)
```

---

### 1f. WordPress / WPGraphQL

**Severity: High**

- **Disable introspection in production** (WPGraphQL Settings → uncheck "Enable Public Introspection") — do this at launch, not in Phase 5
- **WordPress admin brute-force**: install Limit Login Attempts Reloaded, use non-obvious admin username
- **`v-html` with WordPress content**: sanitize with `isomorphic-dompurify` before rendering

---

### 1g. Supabase (Phase 2)

**Severity: Critical** — must be done before any data is written

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_only" ON orders
  FOR ALL TO service_role USING (true);
```

The anon key must have zero access to the `orders` table. Never initialize Supabase client in Vue components.

---

### 1h. Stripe (Phase 3)

**Severity: Critical** — design decisions before any Stripe code

- Use **Stripe Checkout** or **Payment Element** (not custom card fields) — keeps PCI scope at SAQ A
- Webhook handler must verify `Stripe-Signature` header using the **raw** body (not parsed JSON):

```ts
const rawBody = await readRawBody(event)
stripe.webhooks.constructEvent(rawBody!, sig!, webhookSecret)
```

---

### 1i. HTTP Security Headers

Add globally in `nuxt.config.ts` `routeRules`:

```ts
'/**': {
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
}
```

CSP requires testing — implement `Content-Security-Policy-Report-Only` first.

---

### 1j. Resend Sender Domain

`thenutbarnllc@gmail.com` cannot be used as a Resend `from` address. A verified sending domain (e.g., `orders@nutbarn.com`) is required. This requires DNS TXT records and is a **Phase 1 infrastructure prerequisite**.

---

## 2. Architectural Review

### 2a. `routeRules` Cache Syntax — Wrong for Vercel

**Priority: Must-fix**

`cache: { maxAge: N }` does not produce Vercel CDN edge caching. Use:

```ts
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
}
```

For explicit Vercel CDN headers add:
```ts
headers: { 'cache-control': 'public, s-maxage=300, stale-while-revalidate=60' }
```

Also stub a `server/api/revalidate.post.ts` route for future WordPress webhook → on-demand revalidation.

---

### 2b. Pinia Store Location

**Priority: Must-fix**

`composables/useCart.ts` should be `stores/cart.ts`. Nuxt 4 with `@pinia/nuxt` auto-imports from `stores/`. A Pinia `defineStore()` call in `composables/` misleads future developers.

---

### 2c. `shared/` Directory Missing

**Priority: Should-fix**

Add for cross-boundary TypeScript types:

```
shared/
  types/
    product.ts     — Product, CartItem interfaces
    event.ts       — WPEvent interface
    order.ts       — OrderPayload interface
```

Server routes and Vue pages can both import from `shared/` without boundary issues.

---

### 2d. WordPress Mock Fallback — Silent Production Risk

**Priority: Must-fix**

The mock fallback must throw in production when `WORDPRESS_API_URL` is missing:

```ts
if (!config.wordpressApiUrl) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('WORDPRESS_API_URL is required in production')
  }
  return MOCK_PRODUCTS
}
```

---

### 2e. WPGraphQL — GraphQL Error Envelope

**Priority: Should-fix**

WPGraphQL returns HTTP 200 even on errors. Inspect `response.errors`:

```ts
async function gqlFetch<T>(query: string): Promise<T> {
  const res = await $fetch<{ data: T; errors?: { message: string }[] }>(url, {
    method: 'POST', body: { query },
  })
  if (res.errors?.length) throw new Error(`WPGraphQL: ${res.errors.map(e => e.message).join(', ')}`)
  return res.data
}
```

---

### 2f. Pinia Cart — SSR Hydration

**Priority: Must-fix**

```ts
// stores/cart.ts
if (import.meta.client) {
  const stored = localStorage.getItem('nutbarn-cart')
  if (stored) items.value = JSON.parse(stored)
  watch(items, (val) => localStorage.setItem('nutbarn-cart', JSON.stringify(val)), { deep: true })
}
```

Wrap any header cart count in `<ClientOnly>` to avoid hydration mismatch.

---

### 2g. Order Dialog — Implementation Gaps

**Priority: Should-fix**

- Use `showModal()` (not reactive `open` attribute) — focus trap only works with `showModal()`
- On success: clear cart, show confirmation inside dialog for 3s, then close
- On failure: show error, keep dialog open
- Disable submit button on first click (idempotency)
- Return `{ success: true, orderRef: string }` from server

---

### 2h. Tailwind v4 Gotchas

**Priority: Must-fix (all three)**

1. `@tailwindcss/vite` is a **Vite plugin**, not a Nuxt module:
   ```ts
   // nuxt.config.ts
   import tailwindcss from '@tailwindcss/vite'
   export default defineNuxtConfig({
     vite: { plugins: [tailwindcss()] },
   })
   ```
2. Theme variable prefix matters: `--color-brown` generates `bg-brown`; `--brown` does not
3. Use `@source` directives instead of the old `content` array for purge scanning

---

### 2i. Input Validation on Server Routes

**Priority: Must-fix** — (see 1c above — Zod)

---

### 2j. Sitemap + robots.txt

**Priority: Should-fix**

- Install `nuxt-simple-sitemap` in Phase 1 setup
- Add `public/robots.txt` with `Disallow: /api/`

---

## 3. UI/UX Review

### 3a. Navigation Hierarchy

**Impact: High**

Primary nav (always visible): Shop, Find Us, Our Story.
Secondary / footer-only: FAQ, Blog, Wholesale, Contact.

Wholesale serves B2B — it should not compete with Shop in visual weight. Move Blog to primary nav only after 3+ posts are published.

---

### 3b. User Journeys

**Impact: High**

- **Trust strip** between hero and product grid: dietary badges + one pull quote + payment icons
- **Gift Basket** needs its own section on /shop with "Perfect for Gifting" heading — currently buried as the 4th card
- **Find Us page**: add a CTA block at bottom: "Can't make it to the market? Order online."
- **Wholesale**: add callout in every page footer and a mention in /contact

---

### 3c. Order Dialog Field Order

**Impact: High**

Dialog order should be: **(1) Order Summary + Total → (2) Contact fields → (3) Fulfillment → (4) Payment → (5) Notes → (6) Submit**

Placing the summary at the top mirrors known checkout patterns and removes scroll-to-see-what-I-ordered confusion.

---

### 3d. Dialog on Mobile — Nested Overlay Risk

**Impact: High**

Opening a `<dialog>` from inside a cart drawer creates two dismiss layers on mobile. Fix: close the drawer first (instant, no animation), then open the dialog.

---

### 3e. Submission Success State

**Impact: High**

After `POST /api/orders` returns 200: replace dialog content with success state showing order reference, what happens next, and a "Close" button that clears the cart. Never auto-close without confirmation.

---

### 3f. Dialog Escape Handling

**Impact: Medium**

Intercept the `cancel` event on `<dialog>`. If any field has been touched, prompt: "Cancel your order? Your items will remain in your cart."

---

### 3g. Cart UX

**Impact: High**

- **Replace `alert()` with non-blocking toast** — this is the worst pattern in the current codebase
- **Never auto-open cart drawer on add-to-cart** — use toast only, drawer opens on explicit tap
- **Add quantity controls in cart drawer** (min 44px touch targets)
- **Empty cart state**: message + "Browse Products" CTA — never a dead end
- **Persist cart to `localStorage`** — refresh clears cart silently today

---

### 3h. Mobile Header

**Impact: High**

Mobile header must contain exactly: logo (left) + cart icon with count (right) + hamburger (far right). Remove phone/email/address from mobile header — move to footer only.

Sticky "Order Now" CTA: bottom-fixed bar that appears after hero scroll, not a header element.

---

### 3i. Farmer's Market Context

**Impact: High**

- Hero should lead with market context: "Fresh from the Holt Farmer's Market, every Saturday"
- "Find Us This Saturday →" CTA should be equal or greater weight than "Shop Now" for local search visitors
- Add a dismissable banner on the homepage: "Find us today, Saturday 9am–2pm at Holt Farmer's Market"
- Reference hot chocolate on the /find-us page — it's a real differentiator that is entirely absent

---

### 3j. Trust Signals

**Impact: High**

- **No social proof**: replace fake star rating with 2–3 attributed real quotes (first name + city)
- **"Est. 2023" is weak**: replace with "Family Business, Dimondale MI"
- **Payment methods**: move icons to product section and order dialog — not just the footer
- **Remove "Shipped nationwide"**: false claim, creates failed expectations

---

### 3k. Accessibility

**Impact: High** — WCAG 2.1 AA required

- `#ff6b35` on white: ~3.0:1 contrast — **fails AA for normal text**. Use `#e05a26` for text uses
- Add global `:focus-visible`: `outline: 3px solid #ff6b35; outline-offset: 2px`
- Quantity buttons: 30px → minimum 44px touch targets
- Every form input: explicit `<label for="">`, no placeholder-as-label
- Dialog: `aria-labelledby`, `autofocus` on first field, focus returns to trigger on close
- Toast: use `role="status"` live region alongside Popover API visual

---

### 3l. Missing UX Patterns

- **Order confirmation page** with order reference visible in browser, not just email
- **Custom 404** with redirects from old anchor URLs (`/#products → /shop`, etc.)
- **Empty events state** on /find-us: "No events scheduled — follow us on Instagram"
- **Blog post sticky CTA**: "Shop Our Nuts →" sidebar or bottom bar while reading
- **`<details>` FAQ**: add "Expand All / Collapse All" for keyboard users

---

## 4. Design Review

> **Updated March 2026** — This section incorporates analysis of the actual logo (mascot character on white and blue backgrounds) and booth photography (exterior, wide, chalkboard detail). Earlier generic recommendations have been revised where the actual brand assets contradict them.

---

### 4a-0. Logo & Booth Analysis — What the Assets Tell Us

**The mascot is the brand.** The Nut Barn logo is a fully illustrated character — an anthropomorphized walnut in blue denim overalls, a yellow straw cowboy hat, and black gloves, holding a pitchfork in front of a classic red barn. The logotype is hand-lettered in a rough marker/brush style.

This is a **character-forward, playful, whimsical brand** — not a refined artisan brand. Any design recommendation that trends toward "premium," "editorial," or "sophisticated" is directionally wrong for this logo. The correct frame is: warm, neighborly, family-owned, and fun.

**Booth visual inventory:**

| Element | Color / Detail | Design Implication |
|---|---|---|
| Canopy | Bright yellow | High-energy accent — the booth is visible from across the market |
| Banner | Deep maroon/crimson red + white serif text | `barn-red` should be in the CSS palette |
| Booth construction | Natural pine/cedar honey wood | `pine-wood` token — warm amber, not generic tan |
| Chalkboard signs | Black board + green chalk art, hand-drawn flower | Chalkboard UI pattern is a real brand asset |
| String lights | Warm incandescent amber | Warm glow, market-fair atmosphere — inform image overlays and hero mood |
| "Hot Chocolate Bar" cabinet | Left station, labeled | Hot Chocolate is a named product/station |
| Display case sticker | "WARNING: PRODUCT MAY BE HABIT FORMING" | Killer brand copy — use on the website |
| "PICK UP HERE" sign | Handmade paper sign | The brand has a DIY, handmade quality throughout |

**Critical correction from the booth:**
The booth banner reads "CINNAMON GLAZED NUTS • HOT COFFEE • WATER" but the chalkboard says "HOT Chocolate $2.00" and a cabinet is labeled "Hot Chocolate Bar." Hot Chocolate is the signature warm drink — all website copy should reference Hot Chocolate, not "Hot Coffee."

---

### 4a. Color Palette — Complete Token Set

The existing 5 tokens are insufficient for a full component system. Complete palette:

```
Core brand:
  brown:          #8B4513   — primary, headings, borders
  brown-dark:     #5c2d0e   — hover states, footer bg
  brown-mid:      #654321   — nav bar, secondary surfaces (ADD THIS)
  orange:         #ff6b35   — CTAs, price display, icon accents
  orange-hover:   #e85d29   — hover on orange
  chocolate:      #D2691E   — warm accent, gradient endpoint

Surfaces:
  cream:          #f8f6f0   — page background
  cream-dark:     #ede9df   — alternate section background
  cream-warm:     #f4e4bc   — story/testimonial backgrounds (formalize)

Text:
  text:           #2d1a0e   — body text (warmer than #333)
  text-muted:     #6b5a4e   — captions, labels
  text-inverse:   #ffffff   — text on dark surfaces

Semantic:
  success:        #2d7d46   — vegan/GF badges, success states
  success-light:  #e8f5ed
  error:          #c0392b   — error states, required indicators
  error-light:    #fdf0ee

UI:
  border:         #d9cfc4   — default borders, dividers
  border-strong:  #b5a89a
  focus:          #8B4513   — focus ring color
```

---

### 4b. Typography

**Recommendation: 2 Google Fonts**

```
Display / Headings: Playfair Display (700, 900)
  — thick-thin stroke contrast, artisan/premium food brands
  — Usage: H1, H2, logo wordmark, pull quotes

Body: Lato (400, 700)
  — humanist, warm, excellent legibility at 16px
  — Pairs naturally with Playfair Display
```

Google Fonts import (~55KB woff2 total):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@400;700&display=swap" rel="stylesheet">
```

**Fluid type scale (clamp-based):**
```
Display:    clamp(2.5rem, 6vw, 4.5rem)   — Playfair 900
H1:         clamp(2rem, 5vw, 3rem)        — Playfair 700
H2:         clamp(1.6rem, 4vw, 2.25rem)  — Playfair 700
H3:         1.375rem / 1.5rem             — Playfair 700
H4:         1.125rem, uppercase, tracked  — Lato 700
Body large: 1.125rem, line-height 1.7    — Lato 400
Body:       1rem, line-height 1.7        — Lato 400
Price:      1.5rem, tabular-nums         — Lato 700
Badge/UI:   0.75rem, uppercase, tracked  — Lato 700
```

---

### 4c. Complete `@theme` Block

```css
@import "tailwindcss";

@theme {
  /* FONTS */
  --font-display: 'Playfair Display', 'Georgia', serif;
  --font-body:    'Lato', system-ui, -apple-system, sans-serif;
  --font-mono:    ui-monospace, 'Courier New', monospace;

  /* COLORS — Brand Core */
  --color-brown:          #8B4513;
  --color-brown-dark:     #5c2d0e;
  --color-brown-mid:      #654321;
  --color-orange:         #ff6b35;
  --color-orange-hover:   #e85d29;
  --color-chocolate:      #D2691E;

  /* COLORS — Surfaces */
  --color-cream:          #f8f6f0;
  --color-cream-dark:     #ede9df;
  --color-cream-warm:     #f4e4bc;

  /* COLORS — Text */
  --color-text:           #2d1a0e;
  --color-text-muted:     #6b5a4e;
  --color-text-inverse:   #ffffff;

  /* COLORS — Semantic */
  --color-success:        #2d7d46;
  --color-success-light:  #e8f5ed;
  --color-error:          #c0392b;
  --color-error-light:    #fdf0ee;
  --color-warning:        #b7791f;
  --color-warning-light:  #fef3c7;

  /* COLORS — UI */
  --color-border:         #d9cfc4;
  --color-border-strong:  #b5a89a;
  --color-focus:          #8B4513;

  /* FONT SIZES */
  --font-size-xs:      0.75rem;
  --font-size-sm:      0.875rem;
  --font-size-base:    1rem;
  --font-size-lg:      1.125rem;
  --font-size-xl:      1.375rem;
  --font-size-2xl:     1.75rem;
  --font-size-3xl:     2.25rem;
  --font-size-4xl:     2.75rem;
  --font-size-5xl:     3.5rem;
  --font-size-display: 4.5rem;

  /* LINE HEIGHTS */
  --line-height-tight:   1.25;
  --line-height-snug:    1.4;
  --line-height-base:    1.7;
  --line-height-relaxed: 1.8;

  /* LETTER SPACING */
  --letter-spacing-tight:  -0.02em;
  --letter-spacing-normal:  0em;
  --letter-spacing-wide:    0.04em;
  --letter-spacing-wider:   0.08em;

  /* SPACING (4px grid) */
  --spacing-0:   0;
  --spacing-1:   0.25rem;
  --spacing-2:   0.5rem;
  --spacing-3:   0.75rem;
  --spacing-4:   1rem;
  --spacing-5:   1.25rem;
  --spacing-6:   1.5rem;
  --spacing-8:   2rem;
  --spacing-10:  2.5rem;
  --spacing-12:  3rem;
  --spacing-16:  4rem;
  --spacing-20:  5rem;
  --spacing-24:  6rem;
  --spacing-32:  8rem;

  /* BORDER RADIUS */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  /* SHADOWS — warm-tinted (not gray) */
  --shadow-sm:   0 1px 3px rgba(45, 26, 14, 0.08);
  --shadow-md:   0 4px 12px rgba(45, 26, 14, 0.10);
  --shadow-lg:   0 8px 24px rgba(45, 26, 14, 0.12);
  --shadow-xl:   0 16px 48px rgba(45, 26, 14, 0.15);

  /* TRANSITIONS */
  --duration-quick:    150ms;
  --duration-base:     250ms;
  --duration-moderate: 350ms;
  --duration-slow:     500ms;
  --ease-out:   cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in:    cubic-bezier(0.4, 0.0, 1.0, 1);
  --ease-inout: cubic-bezier(0.4, 0.0, 0.2, 1);

  /* LAYOUT */
  --container-sm:  42rem;
  --container-md:  48rem;
  --container-lg:  72rem;
  --container-xl:  80rem;

  /* Z-INDEX */
  --z-base:    0;
  --z-raised:  10;
  --z-sticky:  100;
  --z-drawer:  200;
  --z-dialog:  300;
  --z-toast:   400;

  /* GRADIENTS */
  --gradient-product: linear-gradient(135deg, #f4e4bc 0%, #d4a574 60%, #D2691E 100%);
  --gradient-hero:    linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
}

/* Component-level custom properties */
:root {
  --header-height: 64px;
  --drawer-width:  400px;
  --touch-target:  48px;
}

/* Motion accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 4d. Component Design Language

**Buttons:**
```
Primary (CTA):     bg orange, text white, pill, 14px/28px padding, Lato 700
                   hover: bg orange-hover, translateY(-1px), shadow-md
Secondary:         border 2px brown, text brown, pill
                   hover: bg brown, text white
Ghost:             no border, text-muted, underline on hover
Destructive:       text error, icon-only preferred, hover bg error-light
```

**Product Cards:**
- Top border 3px orange on hover
- Warm shadow: `0 4px 20px rgba(139, 69, 19, 0.12)` (not gray)
- Dietary badges: top-left overlay on image, pill shape, green/warm scheme

**Form Inputs:**
- `border-radius: 8px` (not pill — pill on inputs looks like search bars)
- Focus: `border-color brown, outline 3px rgba(139,69,19,0.2)`
- Error: `border-color error, bg error-light`

---

### 4e. Iconography

Inline SVG only — no icon library. ~15 icons needed. Each SVG uses `currentColor` for color inheritance. Create `components/icons/` with named SVG components.

Avoid Heroicons/Lucide/FontAwesome even with tree-shaking — 40KB+ for 15 simple icons is unjustified.

---

### 4f. Animation Guidance

Sweet spot: **200–350ms**, `ease-out`. Artisan brands feel deliberate, not tech-snappy.

```
Cart drawer slide-in:   translateX(100%)→0, 350ms ease-out
Button hover lift:      translateY(-1px) + shadow, 250ms ease-out
Product card lift:      translateY(-4px) + shadow, 200ms ease-out
Toast appear:           translateY(1rem)→0 + opacity, 300ms ease-out
FAQ accordion:          grid-template-rows 0fr→1fr, 300ms ease-out
```

`<details>` animated height — use the grid trick:
```css
details > div {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease-out;
}
details[open] > div { grid-template-rows: 1fr; }
details > div > * { overflow: hidden; }
```

---

### 4g. Product Photography

**Priority shot list:**
1. Nuts in rustic wooden bowl, overhead, warm window light, slight steam
2. All three bag sizes together (size comparison)
3. Booth at Holt Farmer's Market (candid setup)
4. Extreme close-up of cinnamon glaze texture

**Technical:** iPhone 14+ Portrait mode, 1x lens, north-facing window or overcast. No lightbox for lifestyle shots. Add warmth (+10–15) in post.

**CSS integration — build cards with `aspect-ratio` containers from day one:**
```html
<div class="aspect-[4/3] overflow-hidden rounded-t-xl bg-cream-warm">
  <!-- gradient placeholder OR <img> — no layout shift when photos arrive -->
</div>
```

---

### 4h. Brand Positioning

**Core design principle: Warmth + Competence.**

- vs. Nuts.com: impersonal catalog machine. Nut Barn = story-first, founder-visible, slower to browse.
- vs. Planters/Fisher: loud, synthetic. Nut Barn's earth tones read as artisan at a glance.
- vs. Zingerman's: dense, overwhelming. Nut Barn = simpler, 4 SKUs, "we do one thing well."
- vs. Etsy: maximum-effort-rustic. Nut Barn = confident brand that's comfortable at farmer's markets.

Three visual rules:
1. Every element earns its place — if it doesn't help someone buy or trust, cut it
2. The food is the hero — give it prominence above decoration
3. Mobile is the primary canvas — design mobile-first, always

---

## 5. General Code Review

### 5a. `routeRules` — Use `swr:` not `cache:`

**Priority: Must-fix**

```ts
routeRules: {
  '/':        { swr: 300 },
  '/shop':    { swr: 60 },
  '/find-us': { swr: 3600 },
  '/blog/**': { swr: 3600 },
  '/contact':   { prerender: true },
  '/faq':       { prerender: true },
  '/our-story': { prerender: true },
  '/wholesale': { prerender: true },
}
```

---

### 5b. Nuxt 4 `app/` Directory Layer

**Priority: Must-fix**

Initialize with:
```ts
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
})
```

Pages, components, composables, layouts move under `app/`. Stores go in `app/stores/`.

---

### 5c. `@tailwindcss/vite` — Vite Plugin, Not Nuxt Module

**Priority: Must-fix**

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  vite: { plugins: [tailwindcss()] },
  css: ['~/assets/css/main.css'],
})
```

Do NOT add it to `modules:` — silent startup failure.

---

### 5d. Remove Nodemailer Reference

**Priority: Must-fix**

Phase 2 Week 4 says "email dispatch via Nodemailer." Replace with Resend throughout. Nodemailer requires SMTP and doesn't work in Vercel Edge functions.

---

### 5e. `useAsyncData` in Pages, not bare `$fetch`

**Priority: Must-fix**

```ts
// pages/shop.vue
const { data: products } = await useAsyncData('products', () => getProducts())
```

Bare `$fetch` in `<script setup>` runs on both server and client, doubling requests.

---

### 5f. TypeScript Interfaces

**Priority: Should-fix** — define before writing any component

```ts
// shared/types/cart.ts
export interface CartItem {
  id: string
  name: string
  priceInCents: number   // avoid float arithmetic errors
  quantity: number
}

// shared/types/product.ts
export interface Product {
  id: string
  name: string
  priceInCents: number
  weightOz: number
  shortDescription: string
  dietaryTags: ('vegan' | 'gluten-free')[]
  image?: string
}

// shared/types/order.ts
export interface OrderPayload {
  name: string
  email: string
  phone: string
  fulfillment: 'pickup' | 'delivery'
  deliveryAddress?: string
  payment: 'call' | 'on-pickup'
  items: CartItem[]
  notes?: string
}
```

Note: store prices as integers (cents) to avoid `$10.00 + $15.00 = $25.000000000001`.

---

### 5g. `runtimeConfig` — Add Missing Keys

**Priority: Must-fix**

`RESEND_API_KEY` is missing from the environment variable table entirely. Add:

```ts
runtimeConfig: {
  resendApiKey: '',        // RESEND_API_KEY
  contactEmail: '',        // CONTACT_EMAIL
  supabaseServiceKey: '',  // Phase 2
  public: {
    wordpressApiUrl: '',
    stripePublishableKey: '',
  },
}
```

Nuxt auto-generates types from this config — provides full type safety on `useRuntimeConfig()`.

---

### 5h. TypeScript Strict Mode

**Priority: Should-fix**

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

Without `strict: true`, TypeScript is largely decorative.

---

### 5i. Pinia Cart — SSR + Persistence

**Priority: Must-fix**

```ts
// stores/cart.ts
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  if (import.meta.client) {
    const stored = localStorage.getItem('nutbarn-cart')
    if (stored) items.value = JSON.parse(stored)
    watch(items, (val) => {
      localStorage.setItem('nutbarn-cart', JSON.stringify(val))
    }, { deep: true })
  }

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.priceInCents * item.quantity, 0)
  )

  return { items, total }
})
```

Cart should only be cleared after confirmed `200 OK` from `POST /api/orders` — not optimistically.

---

### 5j. Popover API — Browser Support Caveat

**Priority: Should-fix**

Popover API has ~90% support as of early 2026. Safari 16 and older iOS are the main gap. For a simple toast, CSS-only is safer and has 100% support:

```css
.toast {
  position: fixed; bottom: 1rem; right: 1rem;
  opacity: 0; transform: translateY(1rem);
  transition: opacity 0.3s, transform 0.3s;
}
.toast.is-visible { opacity: 1; transform: translateY(0); }
```

If Popover API is used, pair with a `role="status"` live region for screen reader announcements.

---

### 5k. Testing

**Priority: Should-fix**

No testing strategy exists in the plan. Add:

```ts
// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'
export default defineVitestConfig({ test: { environment: 'nuxt' } })
```

Critical unit tests: cart store operations, WordPress mock fallback, order validation, price recomputation.

---

### 5l. CI Pipeline

**Priority: Should-fix**

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: 24 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

---

## Priority Action List

### Before `pnpm dlx nuxi@latest init`

1. Fix `routeRules` syntax in plan (`swr:` not `cache:`)
2. Decide Nuxt 4 `app/` directory structure and update plan file tree
3. Note `@tailwindcss/vite` goes in `vite.plugins`, not `modules`
4. Purchase/configure sending domain for Resend (`orders@nutbarn.com`)
5. Define all TypeScript interfaces in `shared/types/`

### Phase 1 — Add to Week 1 Checklist

- [ ] Zod validation on all server routes
- [ ] Rate limiting (3 req/min/IP) on contact + orders routes
- [ ] Server-side price recomputation in `orders.post.ts`
- [ ] `import.meta.client` guard in cart store
- [ ] HTTP security headers in `nuxt.config.ts`
- [ ] Disable WPGraphQL introspection on production CMS
- [ ] HTML-escape all user input before Resend email templates
- [ ] `RESEND_API_KEY` added to env var table + Vercel secrets
- [ ] `nuxt-simple-sitemap` installed
- [ ] `robots.txt` with `Disallow: /api/`
- [ ] Remove "Shipped nationwide" from all copy
- [ ] Global `:focus-visible` styles
- [ ] Quantity touch targets → 44px minimum
- [ ] CI pipeline (`.github/workflows/ci.yml`)

### Before Phase 2 (Supabase)

- [ ] RLS enabled on `orders` table immediately upon creation
- [ ] Service role key server-only (never in `runtimeConfig.public`)
- [ ] Document: no Supabase client in `components/`, `composables/`, or `pages/`

### Before Phase 3 (Stripe)

- [ ] Decide: Stripe Checkout vs. Payment Element (no custom card fields)
- [ ] Stripe webhook handler with raw body + signature verification
- [ ] PCI scope documented as SAQ A

---

*All five reviews conducted March 2026. Agents reviewed `docs/initial/NUT-BARN-MASTER-PLAN.md` v1.2, `src/index.html`, `src/css/styles.css`, and `src/js/main.js`.*
