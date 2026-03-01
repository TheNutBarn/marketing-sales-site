You are a senior software architect reviewing a web application master plan. Read the file at `/Users/kevin/dev/marketing-sales-site/docs/initial/NUT-BARN-MASTER-PLAN.md` and provide a thorough architectural review.

Focus on:

1. Nuxt 4 project structure — does the planned layout follow Nuxt 4 conventions? (`app/`, `server/`, `shared/`, composables, etc.)
2. Rendering strategy — SSR + Vercel Edge Caching with routeRules — correctness, gaps, edge cases
3. WordPress headless integration — WPGraphQL fetch pattern, mock fallback, error handling
4. Pinia store design for cart — persistence, SSR hydration, edge cases
5. Order submission flow — dialog → Resend → future Supabase/Stripe — correctness and upgrade path
6. Composables vs components — where to draw the line given the low-dependency philosophy
7. File organization and naming conventions
8. Potential scaling issues (even for a small site)
9. Missing architectural pieces not addressed in the plan
10. Tailwind v4 CSS-native config — any gotchas or migration concerns

Also read the existing static site source for context:

- `/Users/kevin/dev/marketing-sales-site/src/index.html`
- `/Users/kevin/dev/marketing-sales-site/src/css/styles.css` (if it exists)

For each finding:

- Priority: Must-fix / Should-fix / Nice-to-have
- Description of the architectural concern
- Concrete recommendation

Return your full review as structured markdown.
