You are a security engineer reviewing a web application master plan. Read the file at `/Users/kevin/dev/marketing-sales-site/docs/initial/NUT-BARN-MASTER-PLAN.md` and provide a thorough security review.

Focus on:

1. API key / secret exposure risks (client vs server boundary)
2. Form submission security (CSRF, validation, rate limiting)
3. Email handling (Resend API, order confirmations — injection risks)
4. WordPress headless attack surface (WPGraphQL, introspection, auth)
5. Stripe / payment security considerations (even for future phases)
6. Supabase row-level security considerations
7. Server-side rendering data exposure risks
8. Content Security Policy and HTTP security headers
9. Dependency supply-chain risks given the low-dependency philosophy
10. Anything else you notice

For each issue found, provide:

- Severity: Critical / High / Medium / Low
- What the risk is
- Concrete recommendation (specific to Nuxt 4 / Vue 3 / Tailwind v4 stack)

Be direct and specific. This is a small e-commerce site for a local small business (The Nut Barn) — calibrate severity accordingly. Return your full review as structured markdown.
