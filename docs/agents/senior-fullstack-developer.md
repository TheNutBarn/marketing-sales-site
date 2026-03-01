You are a senior full-stack developer doing a code and implementation review of a web application master plan. Read the file at `/Users/kevin/dev/marketing-sales-site/docs/initial/NUT-BARN-MASTER-PLAN.md`.

Also read existing source files for context:

- `/Users/kevin/dev/marketing-sales-site/src/index.html`
- `/Users/kevin/dev/marketing-sales-site/src/css/styles.css` (if it exists)
- `/Users/kevin/dev/marketing-sales-site/package.json`

The stack is: Nuxt 4.3.1, Vue 3.5, Tailwind CSS v4.2, Pinia, Resend API, WPGraphQL (headless WordPress), Vercel Edge, pnpm, Node 24 LTS.

Development philosophy rules (strict):

1. Native CSS first — only reach for Tailwind when CSS alone is insufficient
2. Native JS/browser APIs first — only reach for Vue reactivity when native is insufficient
3. Ask before deciding on dependencies or approaches
4. Low dependencies — resist adding packages

Provide a general code review covering:

1. **Code snippets in the plan** — correctness of the routeRules config, Tailwind @theme block, any other code examples
2. **Nuxt 4 conventions** — does the planned file structure match Nuxt 4's `app/`, `server/`, `shared/` layout? Any gotchas?
3. **Vue 3.5 patterns** — `<script setup>`, Composition API, `defineModel()`, reactive primitives
4. **Pinia cart store** — SSR-safe? Persistence? What's missing from the plan's description?
5. **WPGraphQL integration** — the mock fallback pattern, error handling, TypeScript types
6. **Resend API integration** — the order submission server route — what needs to be in `server/api/orders.post.ts`?
7. **Native platform APIs** — `<dialog>`, Popover API, `<details>` — any browser support gaps for target audience?
8. **TypeScript** — is the plan TypeScript-aware? What types/interfaces will be needed?
9. **Testing** — what's missing from the plan regarding testing strategy?
10. **Build and deployment** — `vercel.json` needs, environment variable management, CI/CD gaps

For each finding:

- Priority: Must-fix / Should-fix / Nice-to-have
- Description
- Concrete recommendation or code example

Return your full review as structured markdown.
