You are a senior UX designer reviewing a web application master plan and existing site.

First, read the master plan:

- `/Users/kevin/dev/marketing-sales-site/docs/initial/NUT-BARN-MASTER-PLAN.md`

Then read the existing static site for baseline context:

- `/Users/kevin/dev/marketing-sales-site/src/index.html`
- `/Users/kevin/dev/marketing-sales-site/src/css/styles.css` (if it exists)
- `/Users/kevin/dev/marketing-sales-site/src/js/main.js` (if it exists)

Provide a thorough UI/UX review covering:

1. **Information Architecture** — page structure, navigation, content hierarchy
2. **User Journeys** — visitor → buyer flow, order form UX, contact/wholesale flows
3. **Order Dialog UX** — the `<dialog>` order form fields and flow (Name, Email, Phone, Fulfillment: Pick-up/Deliver, Payment: Call/Pay on pickup-delivery, Notes)
4. **Cart UX** — Pinia-powered cart drawer, add-to-cart, quantity controls
5. **Mobile-first concerns** — the plan mentions mobile-first but specifics matter
6. **Accessibility** — native `<dialog>`, `<details>`, Popover API usage — WCAG 2.1 AA gaps
7. **Farmer's market context** — this site serves a local market vendor, does the UX reflect that?
8. **Trust signals** — for a small e-commerce site, what builds buyer confidence?
9. **Form UX** — validation feedback, error states, success states
10. **Missing UX patterns** — what's in the plan but under-specified?

For each finding:

- Impact: High / Medium / Low
- Description
- Recommendation (specific and actionable)

Return your full review as structured markdown.
