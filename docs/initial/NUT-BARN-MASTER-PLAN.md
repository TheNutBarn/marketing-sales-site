# The Nut Barn — Master Strategy Plan

**Business:** The Nut Barn LLC
**Location:** Dimondale, Michigan
**Contact:** thenutbarnllc@gmail.com | (517) 410-9029
**Document version:** 1.2 — March 2026 (rendering strategy, order flow, Resend/Supabase/Stripe documented)

---

## Section 1 — Current Site Diagnosis

### What Exists
The current site is a single-page vanilla HTML/CSS/JS application deployed on Netlify. It was purpose-built as a rapid prototype and has served as a proof of concept, but it is not a production-grade site.

**Technical stack:**
- `src/index.html` — single HTML file, all content inline
- `src/css/styles.css` — hand-written vanilla CSS
- `src/js/main.js` — cart logic, smooth scrolling, mailto checkout
- `netlify/functions/` — serverless functions (email, Stripe stubs)
- `netlify.toml` — build config and security headers

### Identified Issues

| Issue | Severity | Notes |
|---|---|---|
| No CMS | Critical | Content changes require developer deployment |
| Mailto checkout only | High | No real transaction capability |
| No schema markup | High | Zero structured data; invisible to Google rich results |
| Broken social links | High | Facebook and Instagram links are `href="#"` placeholders |
| Single page, no real URLs | Medium | `/products`, `/contact`, etc. don't exist as indexable URLs |
| No Google Business Profile optimization | Medium | No verified GBP with hours/photos |
| No FAQ page | Medium | Lost opportunity for voice search and FAQPage schema |
| No blog / content marketing | Medium | No organic traffic entry points beyond homepage |
| Email hardcoded in source | Low | `thenutbarnllc@gmail.com` appears verbatim in `main.js` |
| Alert-based cart feedback | Low | `alert()` calls for add-to-cart confirmations |

### What Is Good
- Authentic brand voice and story copy — keep every word
- Real product data with correct names and prices
- Working cart data model (`{id, name, price, quantity}` array)
- Color palette is on-brand and distinctive
- Favicon and basic meta tags present

---

## Section 2 — Competitive Landscape

### Market Positioning
The Nut Barn competes in the artisan/specialty food segment at farmer's markets and community events in Mid-Michigan. Key competitors operate at three levels:

**Local / Direct:**
- Other farmer's market food vendors (baked goods, kettle corn, jam)
- Specialty snack vendors at Michigan festivals and Renaissance Fairs
- Local gift basket shops (holiday season competition)

**Regional / Online:**
- Michigan-based artisan food brands with e-commerce (Zingerman's, Sanders)
- Etsy food sellers shipping specialty roasted nuts

**National:**
- Nuts.com — large-scale e-commerce, SEO-dominant for generic nut queries
- Planters, Fisher — mass market, not a direct competitor for artisan positioning
- Local specialty food subscription boxes (Mouth.com, Goldbelly)

### Patterns Observed in Winning Competitors

1. **Story-driven "About" pages** — artisan brands win on authenticity; the founder's voice is a differentiator
2. **Seasonal content cadence** — gift guides for holidays, new flavors for seasons drives repeat visits
3. **Recipe content as SEO entry points** — "cinnamon nuts on ice cream recipe" beats "buy cinnamon nuts" for volume and conversion intent
4. **Visual trust signals** — real product photography, customer photos, review counts above the fold
5. **Local SEO dominance** — GBP, local citations, map embeds for "near me" searches
6. **Vegan/GF badging** — prominent dietary callouts convert health-conscious shoppers quickly

### Differentiation Opportunities
- **First-mover on local schema** — no Mid-Michigan competitor has FAQPage or LocalBusiness schema
- **Nostalgia angle** — the 1980s mall nut stand story is unique and shareable
- **Community event presence** — the event schedule is a recurring content asset
- **Grandchildren/family business angle** — emotionally resonant for gift buyers

---

## Section 3 — SEO Strategy (3 Horizons)

### Target Keywords

| Intent | Keyword | Monthly Volume (est.) | Difficulty |
|---|---|---|---|
| Local transactional | cinnamon roasted nuts Lansing MI | 50–200 | Low |
| Local navigational | farmer's market Dimondale | 100–500 | Low |
| Gift transactional | roasted nuts gift Michigan | 50–200 | Low–Medium |
| Health/diet | vegan gluten free snacks Michigan | 100–300 | Low |
| Recipe/informational | cinnamon roasted nuts recipe | 500–2K | Medium |
| Seasonal | holiday nut gift basket Michigan | 50–200 | Low |
| Nostalgic | mall cinnamon roasted nuts | 200–500 | Low |

### Horizon 1 — Technical Foundation (Months 1–2)

**Schema Markup:**
- `LocalBusiness` on every page (name, address, phone, hours, geo coordinates)
- `Product` schema on `/shop` for each SKU (name, price, availability, description)
- `FAQPage` schema on `/faq` (10–15 questions about ingredients, ordering, gifting, shipping)
- `BreadcrumbList` on all inner pages

**Technical fixes:**
- Fix Facebook and Instagram social links (real URLs)
- Add `robots.txt` and `sitemap.xml` (auto-generated by Nuxt via `nuxt-simple-sitemap` module)
- Submit to Google Search Console, request indexing on all new URLs
- Add `canonical` tags to all pages
- Optimize `<title>` and `<meta description>` per page (currently all identical)

**Google Business Profile:**
- Verify and claim GBP for "The Nut Barn"
- Add all photos (product, stand, events)
- Set accurate hours (Saturday Holt Farmer's Market + event hours)
- Add product catalog to GBP
- Enable messaging and Q&A

### Horizon 2 — Page Expansion (Months 2–4)

**Homepage (`/`):**
- H1: "Fresh Cinnamon Roasted Nuts — Lansing, Michigan"
- Add trust signal strip: "Vegan • Gluten-Free • 5 Ingredients • Est. 2023"
- Add customer review quotes (can be manually curated initially)
- Add "Find Us" schedule strip above fold for local intent

**Products (`/shop`):**
- Expand each product description (ingredients, best uses, serving suggestions)
- Add dietary badge icons (vegan leaf, GF symbol)
- Add "Great for:" callouts (salads, ice cream, gifts)

**Story (`/our-story`):**
- Use full 5-paragraph story verbatim — it's already excellent
- Add brand values section: Family Business, Community Focus, Simple Ingredients
- Add vegan/GF certification callout

**FAQ (`/faq`):**
- 15 questions covering: ingredients, allergens, ordering, shipping, gifting, events, payment
- Full FAQPage JSON-LD
- Target voice search ("Hey Google, is The Nut Barn vegan?")

**Find Us (`/find-us`):**
- Holt Farmer's Market permanent slot with Google Map embed
- Dynamic event list from WordPress CMS
- "Suggest an Event" CTA for organizers

### Horizon 3 — Content Marketing (Months 4–12)

**Blog content plan (`/blog`):**

| Post title | Category | Schema |
|---|---|---|
| 5 Ways to Use Cinnamon Roasted Nuts (Beyond Snacking) | Recipe | Recipe |
| The Perfect Holiday Gift for People Who Have Everything | Gift Guide | Article |
| How We Got Started: The Nut Barn Story | Brand | Article |
| Cinnamon Roasted Nuts on Ice Cream — Our Favorite Topping | Recipe | Recipe |
| Top 5 Reasons to Visit Holt Farmer's Market | Local | Article |
| The History of Cinnamon Roasted Nuts (and Why We Brought Them Back) | Nostalgia | Article |
| Vegan Snacks at Michigan Farmer's Markets — A Guide | Dietary | Article |
| DIY Gift Basket Ideas Using Roasted Nuts | Gift Guide | Article |
| Our Booth at [Event Name] — What to Expect | Event Recap | Event |

**Off-page tactics:**
- Submit to Michigan artisan food directories
- Request features on local food blogs (MLive, Lansing State Journal food section)
- Lansing/Dimondale local Facebook group participation
- Generate Google reviews (QR code at booth, follow-up email to customers)
- Instagram Reels: roasting process, market setup, customer reactions

---

## Section 4 — UI/UX Assessment

### Carry Forward

| Element | Rationale |
|---|---|
| Brand colors (brown/orange/cream) | Distinctive, warm, food-appropriate |
| Story-first narrative | Authentic voice is a competitive differentiator |
| Product card layout | Familiar e-commerce pattern, good conversion structure |
| Cart model `{id, name, price, quantity}` | Sound data model, migrated to Pinia store |

**Color palette (exact hex values to preserve):**
```
--brown: #8B4513
--orange: #ff6b35
--cream: #f8f6f0
--brown-dark: #5c2d0e
--text-dark: #333333
```

### Improve

**Navigation:**
- Add sticky header on scroll (disappears on scroll down, reappears on scroll up)
- Mobile hamburger menu (currently no mobile nav)
- Sticky "Order Now" CTA button in header on mobile

**Trust Signals (add above fold):**
- "Vegan" and "Gluten-Free" icon badges on hero
- "Est. 2023 • Family Business" callout
- Star rating placeholder (manually set to 5★ initially)
- Payment method icons (Square, PayPal, Venmo)

**Mobile UX:**
- Minimum 48px touch targets on all buttons
- Cart drawer (slide-in from right) instead of modal overlay
- Quantity controls: larger +/- buttons for thumb use
- Sticky "Add to Cart" bar on product pages on mobile

**Photography Plan:**
- Phase 1: Use warm CSS gradient placeholders with product emoji (current approach)
- Phase 2: Add real product photography — recommend renting a lightbox kit for $50 and shooting on a phone
- Key shots needed: hero (nuts in a bowl, cinnamon sticks), product packaging, booth at market, couple (founders)

**Conversion Improvements:**
- Remove `alert()` for cart additions — use inline toast notification (Popover API)
- Add "Continue Shopping" after add-to-cart instead of forcing cart open
- "Place Order" opens a `<dialog>` form — never a mailto link

---

## Section 5 — Development Philosophy

These rules govern every technical decision in this project. They are also captured in `~/.claude/CLAUDE.md` and carry forward to future tinkrLAB projects.

### Principles

**Low dependencies.**
Every package added is future maintenance. Before reaching for a library, ask: can this be built with what the browser or runtime already provides? If yes, build it. If not, name the dependency, explain why it's needed, and get approval before adding it.

**Native platform first.**

| Need | Native solution | Ask before using |
|---|---|---|
| Slide-in drawer | CSS `translate` + `transition` + `popover` | JS animation library |
| Modal / dialog | `<dialog>` + `showModal()` | Vue modal component |
| Toast notification | Popover API | Toast plugin |
| Accordion (FAQ) | `<details>` / `<summary>` | Collapse component |
| Toggle / tab | CSS `:has()` or minimal JS | Framework state |

**Framework features only when required.**
Use Vue reactivity, composables, and components only where native JS or CSS genuinely cannot do the job. When in doubt, present options and ask.

**Ask before deciding.**
Never make a structural decision unilaterally. Present options with trade-offs. If the right answer is unclear, say so and offer a way to explore it.

**Simple mental model.**
This project is the template for future tinkrLAB projects. Patterns set here carry forward. Prefer explicit over magic, readable over clever.

---

## Section 6 — Architecture

### Technology Stack

| Layer | Choice | Version | Rationale |
|---|---|---|---|
| Frontend framework | Nuxt | 4.3.1 | Vue-native SSG + ISR, file-based routing, excellent Vercel integration |
| UI layer | Vue | 3.5 | Composition API, `<script setup>`, SFCs — reactive and ergonomic |
| Styling | Tailwind CSS | v4.2 | CSS-native config (`@theme`), no config file, 5× faster builds |
| State management | Pinia | latest | Official Vue store for shared reactive state; devtools built-in |
| CMS | WordPress headless (WPGraphQL) | — | Client self-service, familiar admin, free plugin ecosystem |
| Hosting (frontend) | Vercel | — | Free tier, automatic preview deploys, edge network |
| Hosting (WordPress) | Cloudways or Kinsta (~$10/month) | — | Managed WP, one-click staging |
| Transactional email | Resend API | — | Reliable delivery, clean API — replaces mailto for order confirmations |
| Order DB (future) | Supabase | — | Postgres + REST/realtime; enables order history, reports, reminders |
| Payments (future) | Stripe | — | Phase 3; server route stubbed until ready |
| Type safety | TypeScript | 5.x | Prevents runtime errors, better DX |
| Linting | ESLint + Prettier | — | Code quality, auto-format |
| Package manager | pnpm | — | Fast, disk-efficient |

### Key Nuxt 4 File Conventions

```
nuxt.config.ts          — framework config (SSR mode, routeRules, runtimeConfig)
app.vue                 — root app shell
layouts/
  default.vue           — header + footer wrapper for all pages
pages/
  index.vue             — homepage (/)
  shop.vue              — product catalog (/shop)
  our-story.vue         — brand story (/our-story)
  find-us.vue           — event schedule (/find-us)
  contact.vue           — contact form (/contact)
  faq.vue               — FAQ + schema (/faq)
  wholesale.vue         — B2B inquiry (/wholesale)
  blog/
    index.vue           — blog index (/blog)
    [slug].vue          — individual post (/blog/[slug])
components/
  AppHeader.vue         — sticky nav with cart icon
  AppFooter.vue         — footer with social links
  CartDrawer.vue        — slide-in cart drawer
  AddToCartButton.vue   — quantity selector + add-to-cart
composables/
  useCart.ts            — Pinia cart store (useCartStore)
  useWordPress.ts       — WPGraphQL fetch composable
lib/
  products.ts           — dev fallback only; real products served from WordPress CPT
  wordpress.ts          — WPGraphQL fetch helpers with mock data fallback
server/api/
  contact.post.ts       — contact/wholesale form handler → Resend API
  orders.post.ts        — order submission handler → Resend + (future) Supabase write
  checkout.post.ts      — Stripe stub (returns 501 until Phase 3)
assets/css/
  main.css              — Tailwind v4 entry (@import "tailwindcss"; @theme {...})
public/                 — static assets (favicon, robots.txt)
```

### Tailwind v4 Theme Setup

Tailwind v4 uses CSS-native configuration — no `tailwind.config.js`. Brand theme lives in `assets/css/main.css`:

```css
@import "tailwindcss";

@theme {
  --color-brown:      #8B4513;
  --color-brown-dark: #5c2d0e;
  --color-orange:     #ff6b35;
  --color-cream:      #f8f6f0;
  --color-cream-dark: #ede9df;
}
```

### Rendering Strategy

**Chosen approach: SSR + Vercel Edge Caching (Option B)**

Nuxt runs in SSR mode. Pages are server-rendered on first request, then cached at the CDN edge per `routeRules`. Cart state is always client-side (Pinia). API routes always run server-side.

```ts
// nuxt.config.ts
routeRules: {
  '/':          { cache: { maxAge: 300 } },   // homepage — product teasers from WP
  '/shop':      { cache: { maxAge: 60 } },    // products from WP — refresh every 60s
  '/find-us':   { cache: { maxAge: 3600 } },  // events from WP — refresh hourly
  '/blog':      { cache: { maxAge: 3600 } },
  '/blog/**':   { cache: { maxAge: 3600 } },
  '/contact':   { prerender: true },          // no dynamic data
  '/faq':       { prerender: true },
  '/our-story': { prerender: true },
  '/wholesale': { prerender: true },
}
```

**Future path:** When WordPress webhook → Vercel deploy hook is set up, dynamic routes can switch to `prerender: true` for fully static delivery. One config change, no code changes.

### Data Flow

```
WordPress Admin (content editor)
    ↓ (save/publish)
WPGraphQL API endpoint
    ↓ (Nuxt useAsyncData / $fetch — SSR, edge-cached)
Nuxt page (server-rendered, served from Vercel edge)
    ↓
User's browser (Pinia cart state hydrates client-side)
    ↓ (order form submission)
server/api/orders.post.ts
    ↓                          ↓ (Phase 3+)
Resend API               Supabase orders table
(email to owner          (queryable order history,
 + confirmation          reports, reminders)
 to customer)
    ↓ (Phase 3+)
Stripe payment flow
```

### Order Submission Flow

**Order form fields** (presented in a `<dialog>` triggered from the cart drawer):

| Field | Required | Notes |
|---|---|---|
| Full name | Yes | |
| Email address | Yes | Validated; receives order confirmation via Resend |
| Phone number | Yes | Required for coordination regardless of fulfillment method |
| Fulfillment | Yes | Radio: "Pick up" or "Deliver to me" |
| Delivery address | Conditional | Shown and required only when "Deliver to me" is selected |
| Payment | Yes | Radio: "Call me to arrange payment" or "Pay on pickup/delivery" |
| Order summary | Auto | Populated from Pinia cart state, read-only |
| Notes | No | Allergies, gift message, special requests |

**Phase 1 — Now (Resend, no database)**
Cart → "Place Order" → `<dialog>` order form → `POST /api/orders` →
- Resend: order details + fulfillment + payment preference to `CONTACT_EMAIL`
- Resend: confirmation email to customer ("We'll be in touch to confirm your order")

**Phase 2 — Future (Supabase + Resend)**
Same form, `POST /api/orders` also writes to Supabase `orders` table:
- Enables order history, status tracking, reporting, automated follow-up
- Site owner can query/export from Supabase dashboard without developer involvement

**Phase 3 — Future (Stripe + Supabase + Resend)**
Payment collected at order submission via Stripe. Order written to Supabase only after successful payment. Stripe webhook updates order status.

### WordPress Custom Post Types

**Products** (`product`)
- Fields: name, slug, price, weight_oz, short_description, long_description, dietary_tags[], featured_image

**Events** (`event`)
- Fields: title, date, location_name, location_address, description, external_link, is_recurring, recurring_day, recurring_time

**Blog Posts** (built-in WordPress `post` type)
- Standard WP fields + custom: recipe_ingredients[], recipe_steps[], post_category (recipe/gift-guide/story/event-recap)

### Environments

| Variable | Local (`.env`) | Dev (Vercel Preview) | Prod (Vercel) |
|---|---|---|---|
| `CONTACT_EMAIL` | `kevin@yourdevmail.com` | `test@nutbarn.dev` | `thenutbarnllc@gmail.com` |
| `WORDPRESS_API_URL` | `http://nutbarn-local.local/graphql` | `https://staging-cms.nutbarn.com/graphql` | `https://cms.nutbarn.com/graphql` |
| `STRIPE_SECRET_KEY` | `sk_test_...` | `sk_test_...` | `sk_live_...` |
| `NUXT_PUBLIC_STRIPE_KEY` | `pk_test_...` | `pk_test_...` | `pk_live_...` |

**Key principle:** No email address, API URL, or secret key is hardcoded anywhere in source. All are environment-driven. Public runtime config goes through `nuxt.config.ts` `runtimeConfig.public`.

---

## Section 6 — Page-by-Page Blueprint

### Home (`/`)

**Purpose:** Convert visitors from search and word-of-mouth into buyers or followers.

**Must-have content:**
- Hero: H1 with primary keyword, "Shop Now" CTA, trust badge strip (Vegan • GF • 5 Ingredients)
- Product preview: 4 product cards with add-to-cart (same as current)
- Story teaser: 2-sentence excerpt from Our Story with "Read More →" link
- "Find Us" strip: Next Saturday's market info + CTA to full schedule
- Trust signals: payment methods, years in business, review count
- Instagram CTA: "Follow @thenutbarn for weekly market updates"

**Schema:** `LocalBusiness` JSON-LD in `<head>`

---

### Shop (`/shop`) — `pages/shop.vue`

**Purpose:** Full product catalog with cart — primary conversion page.

**Must-have content:**
- All 4 products with full descriptions, sizes, prices
- Dietary badges (Vegan, Gluten-Free) per product
- Quantity controls (larger touch targets than current)
- "Add to Cart" with toast notification (no `alert()`)
- Cart sidebar/drawer (slide-in) — `<CartDrawer />`
- "Place Order" button → opens `<dialog>` order form (name, email, phone, fulfillment, payment preference)
- Stripe placeholder: "Pay by card — coming soon"

**Schema:** `Product` JSON-LD via `useHead()` for each product

---

### Our Story (`/our-story`)

**Purpose:** Build emotional connection, increase trust, improve branded search.

**Must-have content:**
- Full 5-paragraph story (preserved verbatim from current site)
- Brand values section: Family Business, Community First, Simple Ingredients, Vegan & Gluten-Free
- Founder photo placeholder (warm gradient card)
- "Shop Our Products" CTA at bottom

**Schema:** `LocalBusiness` + `Organization` JSON-LD

---

### Find Us (`/find-us`)

**Purpose:** Drive in-person visits, showcase community presence.

**Must-have content:**
- Holt Farmer's Market: Saturday 9am–2pm, Holt MI, Google Map embed
- Dynamic events list (from WordPress `event` CPT)
- "Suggest an Event" CTA (links to contact form with pre-filled subject)
- Note: "Follow us on Facebook/Instagram for last-minute updates"

**Schema:** `Event` JSON-LD for each listed event

---

### Contact (`/contact`)

**Purpose:** Inquiries, wholesale leads, event booking requests.

**Must-have content:**
- Contact form: name, email, message, submit
- Form submits to `/api/contact` → sends email to `CONTACT_EMAIL`
- Phone number and email displayed
- Social links (fixed, real URLs)

---

### FAQ (`/faq`) — NEW

**Purpose:** Capture voice search, reduce support emails, rank for long-tail queries.

**Question categories:**
- Ingredients & Dietary (vegan, GF, allergens, what are the 5 ingredients)
- Ordering & Shipping (can I order online, do you ship nationwide, how long)
- Events & Schedule (where is the farmer's market, do you take requests)
- Products & Pricing (sizes available, what's the difference, gift options)
- Gifting (custom orders, bulk/wholesale, gift wrapping)

**Schema:** `FAQPage` JSON-LD with all Q&A pairs

---

### Blog (`/blog`) — NEW

**Purpose:** SEO entry points, recipe sharing, seasonal gift guide content.

**Structure:**
- Blog index: card grid of posts (from WordPress `post` type)
- Individual post: `/blog/[slug]` with full content, recipe schema where applicable
- Categories: Recipes, Gift Guides, Behind the Scenes, Community Events

**Schema:** `Article` JSON-LD per post; `Recipe` JSON-LD for recipe posts

---

### Wholesale (`/wholesale`) — NEW

**Purpose:** Capture B2B leads (restaurants, gift shops, event planners).

**Must-have content:**
- Brief intro: "We offer bulk pricing for businesses and large orders"
- Simple inquiry form: name, business name, email, estimated quantity, message
- Form submits to `/api/contact` with wholesale tag in subject

---

## Section 7 — Implementation Phases

### Phase 0 — Quick Wins on Current Site (Week 1)
*Goal: Improve SEO baseline without waiting for full rebuild*

- [ ] Add `LocalBusiness` JSON-LD to current `index.html` `<head>`
- [ ] Fix Facebook link (real URL or remove)
- [ ] Fix Instagram link (real URL or remove)
- [ ] Set up Google Search Console, submit current URL
- [ ] Create / optimize Google Business Profile
- [ ] Add `<meta description>` to `index.html` (currently missing)

---

### Phase 1 — Environment Setup (Weeks 1–2)
*Goal: Working Nuxt 4 project on Vercel, WordPress CMS live locally*

- [ ] Initialize Nuxt 4 + Vue 3 + TypeScript project: `pnpm dlx nuxi@latest init`
- [ ] Install Tailwind CSS v4 via `@tailwindcss/vite` plugin (no config file needed)
- [ ] Install Pinia via `@pinia/nuxt` module
- [ ] Set up brand theme in `assets/css/main.css` using `@theme` block
- [ ] Install WordPress locally via LocalWP (`nutbarn-local`)
- [ ] Install WPGraphQL plugin in LocalWP
- [ ] Install Custom Post Type UI plugin, register `product` and `event` CPTs
- [ ] Install Advanced Custom Fields, configure fields for CPTs
- [ ] Create `.env` with `WORDPRESS_API_URL=http://nutbarn-local.local/graphql`
- [ ] Create `.env.example` with all required keys (empty values)
- [ ] Configure `nuxt.config.ts`: `runtimeConfig`, modules, SSG (`nitro.prerender`)
- [ ] Connect Vercel to GitHub repo, configure env vars for Preview + Production
- [ ] Confirm `pnpm dev` starts Nuxt successfully

---

### Phase 2 — Content Migration & Build (Weeks 2–5)
*Goal: All pages built with real content, cart works, site is deployable*

**Week 2:**
- [ ] Build `layouts/default.vue` — header + footer shell with `<NuxtPage />`
- [ ] Build `app.vue` — root app with global styles and `<NuxtLayout />`
- [ ] Build `pages/index.vue` — homepage with hero, products, story teaser, schedule strip
- [ ] Build `components/AppHeader.vue` and `components/AppFooter.vue`
- [ ] Build `components/CartDrawer.vue` + `composables/useCart.ts` (Pinia store)

**Week 3:**
- [ ] Build `pages/shop.vue` — full product catalog, cart integration
- [ ] Build `pages/our-story.vue` — full story, brand values
- [ ] Build `pages/find-us.vue` — static schedule + WordPress events
- [ ] Build `lib/wordpress.ts` — mock data fallback + WPGraphQL fetch via `$fetch`

**Week 4:**
- [ ] Build `pages/contact.vue` — contact form
- [ ] Build `server/api/contact.post.ts` — email dispatch via Nodemailer
- [ ] Build `pages/faq.vue` — FAQ with FAQPage schema via `useHead()`
- [ ] Build `pages/blog/index.vue` — blog index (WP-powered)
- [ ] Build `pages/blog/[slug].vue` — individual post page

**Week 5:**
- [ ] Build `pages/wholesale.vue`
- [ ] Build `server/api/checkout.post.ts` — Stripe stub (returns 501)
- [ ] Add all JSON-LD schema via `useHead()` / `useSchemaOrg()` on appropriate pages
- [ ] QA: mobile + desktop, all pages, cart flow, mailto checkout
- [ ] Add security headers in `nuxt.config.ts` (`routeRules`)
- [ ] Add redirects in `nuxt.config.ts` for any legacy Netlify routes

---

### Phase 3 — Launch (Week 6)
*Goal: Production site live on Vercel, old Netlify site retired*

- [ ] Final QA pass: all pages, forms, cart, schema validation
- [ ] Run `pnpm build` — zero errors
- [ ] Deploy to Vercel production
- [ ] DNS cutover: point domain from Netlify → Vercel
- [ ] Re-verify in Google Search Console
- [ ] Submit new sitemap (`/sitemap.xml`)
- [ ] Confirm GBP website link updated

---

### Phase 4 — Growth Mode (Months 2–6)
*Goal: Content marketing, review generation, Stripe activation*

- [ ] Publish 2 blog posts per month (recipes, gift guides)
- [ ] Set up review generation: QR code at market booth → Google review link
- [ ] Build email list via contact form opt-in
- [ ] Activate Stripe checkout (replace 501 stub with live implementation)
- [ ] Add product photography (lightbox shoot)
- [ ] Submit to Michigan artisan food directories
- [ ] Monitor Google Search Console for keyword ranking improvements

---

### Phase 5 — Review & Hardening (Post-launch)
*Goal: Close gaps in design, security, and developer workflow*

**UI/UX Design Review**
- [ ] Commission or conduct an expert design review of all pages
- [ ] Audit mobile experience end-to-end (real device, not just DevTools)
- [ ] Review conversion flow: hero → product → cart → checkout
- [ ] Validate accessibility: keyboard nav, focus management, color contrast, ARIA where needed

**Security Review**
- [ ] Audit all `server/api/` routes: input validation, rate limiting, CSRF posture
- [ ] Review HTTP security headers in `nuxt.config.ts` (`routeRules`)
- [ ] Confirm no secrets are exposed in client bundle (`runtimeConfig` audit)
- [ ] Review contact form for spam/abuse vectors (honeypot field or turnstile)
- [ ] Confirm WordPress GraphQL endpoint is read-only and not publicly introspectable in production

**AI Developer Workflow**
- [ ] Design an AI-assisted content workflow using the chosen stack (Vercel, headless WordPress, GitHub)
- [ ] Explore: GitHub Actions + AI for draft blog post generation from event recaps
- [ ] Explore: AI-assisted product description updates via WP Admin or API
- [ ] Document the workflow so it can be templated for TinkrLab and future projects

---

## Section 8 — Post-Launch Maintenance

### Self-Service (Client can do without developer)

| Task | How |
|---|---|
| Add / edit / remove products | WordPress Admin → Products CPT |
| Add / edit / remove events | WordPress Admin → Events CPT |
| Publish blog posts | WordPress Admin → Posts |
| Update market hours | WordPress Admin → Site Settings (ACF options page) |
| Update prices | WordPress Admin → Products CPT |
| Add FAQ questions | WordPress Admin → FAQ CPT (or manual in `/faq` page initially) |

### Developer Required

| Task | Why |
|---|---|
| Add a new page type | Requires new `.vue` file in `pages/` and any supporting components |
| Activate Stripe checkout | API integration + webhook setup |
| Change schema markup structure | Code change in layout/page files |
| Major design changes | Tailwind component updates |
| Add new CMS field types | ACF config + GraphQL query updates |
| Performance optimization | Code-level changes |

---

## Section 9 — Success Metrics

### Technical

| Metric | Target | Timeline |
|---|---|---|
| PageSpeed mobile score | 85+ | Launch day |
| PageSpeed desktop score | 95+ | Launch day |
| Core Web Vitals | All green | Launch day |
| Schema on all pages | 100% | Launch day |
| Rich Results Test pass | All structured data valid | Launch day |
| Build time | Under 60 seconds | Ongoing |
| Zero TypeScript errors | 0 | Ongoing |

### SEO

| Metric | Target | Timeline |
|---|---|---|
| Google Search Console coverage | All pages indexed | Week 1 post-launch |
| GBP optimized | Photos, hours, products, messaging live | Week 1 |
| Local pack appearance for "cinnamon nuts Lansing" | Top 3 | Month 3 |
| Organic sessions | Baseline established | Month 1 |
| Featured snippet for FAQ questions | 2+ questions | Month 6 |

### Business

| Metric | Target | Timeline |
|---|---|---|
| Email list size | 200+ subscribers | Month 6 |
| Online orders via mailto | 10+ per month | Month 2 |
| Google reviews | 25+ reviews at 4.8+ stars | Month 6 |
| Blog posts published | 12 posts (2/month) | Month 6 |
| Wholesale inquiries | 5+ leads | Month 6 |

---

## Appendix — WordPress Setup Walk-Through

### Local Development (No Hosting Required)

1. Download and install [LocalWP](https://localwp.com/) (free)
2. Click "Create a new site" → Name: `nutbarn-local`
3. Choose PHP 8.1+, MySQL, Nginx
4. Access WP Admin at `http://nutbarn-local.local/wp-admin`
5. Plugins → Add New → Search and install:
   - **WPGraphQL** (by WPGraphQL)
   - **Custom Post Type UI** (by WebDevStudios)
   - **Advanced Custom Fields** (by Delicious Brains / ACF)
6. Custom Post Type UI → Add/Edit Post Types:
   - Add `product`: Label "Products", supports: title, thumbnail, custom fields
   - Add `event`: Label "Events", supports: title, custom fields
7. ACF → Field Groups:
   - "Product Fields": price (number), weight_oz (number), short_description (text), dietary_tags (checkbox: vegan, gluten-free)
   - "Event Fields": event_date (date), location_name (text), location_address (text), is_recurring (true/false), recurring_day (text), recurring_time (text)
8. WPGraphQL → Settings → Enable public introspection
9. Set in `.env`: `WORDPRESS_API_URL=http://nutbarn-local.local/graphql`

### Staging / Production

1. Provision [Cloudways](https://cloudways.com) WordPress application (~$10/month)
2. Install same plugins (WPGraphQL, CPT UI, ACF)
3. Export LocalWP database → import to Cloudways
4. Set `WORDPRESS_API_URL` in Vercel's "Preview" and "Production" env scope

---

*Document prepared by tinkrLAB for The Nut Barn LLC, February 2026.*
