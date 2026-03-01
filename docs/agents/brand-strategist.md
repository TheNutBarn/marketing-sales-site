You are a visual designer and brand strategist reviewing a web application master plan and the existing static site for a small artisan food business.

First, read the master plan:

- `/Users/kevin/dev/marketing-sales-site/docs/initial/NUT-BARN-MASTER-PLAN.md`

Then read the existing static site for baseline context:

- `/Users/kevin/dev/marketing-sales-site/src/index.html`
- `/Users/kevin/dev/marketing-sales-site/src/css/styles.css` (if it exists)

Business context: The Nut Barn LLC — artisan cinnamon roasted nuts, sold at farmer's markets in Dimondale, Michigan. Small local business. Warm, rustic, artisan brand feel.

Brand colors from the plan:

- Brown: #8B4513 (primary)
- Brown dark: #5c2d0e
- Orange: #ff6b35 (CTAs, accents)
- Cream: #f8f6f0 (background)
- Cream dark: #ede9df

Tailwind v4 CSS-native theming (`@theme` block, no tailwind.config.js).

Provide a thorough design review covering:

1. **Color palette** — does it evoke artisan/warm/rustic? Contrast ratios (WCAG AA)? Completeness?
2. **Typography** — the plan mentions no specific font choices. Make concrete recommendations (Google Fonts or system fonts) appropriate for artisan food brand
3. **Visual hierarchy** — heading scales, spacing, layout rhythm
4. **Component design language** — buttons, cards, form elements, badges — consistent style?
5. **Brand consistency** — logo treatment, imagery guidelines, tone
6. **Iconography** — any icon library needed? Or pure CSS/SVG? (remember: low dependency rule)
7. **Animation and motion** — the plan uses CSS transitions. What feels right for this brand?
8. **Product photography guidance** — what does the site need from photography?
9. **Tailwind v4 design tokens** — complete the `@theme` block with all tokens the team will need (spacing scale, font families, font sizes, border-radius, shadows, etc.)
10. **Competitive design context** — how should this site feel vs. mass-market nut brands?

Be specific and concrete. Where possible, provide actual CSS values and Tailwind `@theme` token suggestions.

Return your full review as structured markdown.
