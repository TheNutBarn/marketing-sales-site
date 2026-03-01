<script setup lang="ts">
useHead({
  title: 'Blog — The Nut Barn',
  meta: [
    { name: 'description', content: "Stories, recipes, and market updates from The Nut Barn. Handcrafted cinnamon roasted nuts from Dimondale, Michigan." },
  ],
})

const MOCK_POSTS = [
  {
    id: '1',
    slug: 'why-cinnamon-roasted-nuts',
    title: 'Why We Chose Cinnamon Roasted Nuts',
    date: '2026-01-15',
    excerpt: 'The story behind our signature recipe — and why FIVE simple ingredients is all you need.',
  },
  {
    id: '2',
    slug: 'holt-farmers-market-guide',
    title: "A Guide to the Holt Farmer's Market",
    date: '2026-02-01',
    excerpt: 'What to expect, where to park, and where to find us every Saturday morning.',
  },
]

const { data: posts } = await useAsyncData('blog-posts', () => Promise.resolve(MOCK_POSTS))

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-4 py-12 text-center" style="background-color:var(--color-cream-dark);">
      <div class="mx-auto" style="max-width:var(--container-md);">
        <h1 style="font-size:clamp(2rem,5vw,3rem);color:var(--color-brown);">From the Barn</h1>
        <p class="mt-2" style="color:var(--color-text-muted);">Stories, tips, and market updates from The Nut Barn.</p>
      </div>
    </section>

    <div class="mx-auto px-4 py-12" style="max-width:var(--container-lg);">
      <!-- Empty state -->
      <div v-if="!posts?.length" class="text-center py-16">
        <p class="text-lg mb-2" style="color:var(--color-text-muted);">No posts yet.</p>
        <p style="color:var(--color-text-muted);">Follow us on Instagram <strong style="color:var(--color-brown);">@thenutbarn</strong> for updates!</p>
      </div>

      <!-- Post grid -->
      <ul v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <li
          v-for="post in posts"
          :key="post.id"
          class="bg-white rounded-2xl border overflow-hidden"
          style="border-color:var(--color-border);box-shadow:var(--shadow-sm);"
        >
          <!-- Image placeholder -->
          <div class="aspect-[16/9]" style="background:var(--gradient-product);" aria-hidden="true" />
          <div class="p-5">
            <p class="text-xs mb-2 uppercase font-bold" style="color:var(--color-text-muted);letter-spacing:var(--letter-spacing-wide);">{{ formatDate(post.date) }}</p>
            <h2 class="mb-2" style="font-size:1.125rem;color:var(--color-brown);">{{ post.title }}</h2>
            <p class="text-sm mb-4" style="color:var(--color-text-muted);">{{ post.excerpt }}</p>
            <NuxtLink :to="`/blog/${post.slug}`" class="text-sm font-bold" style="color:var(--color-orange);">Read More →</NuxtLink>
          </div>
        </li>
      </ul>

      <!-- Shop CTA -->
      <div class="mt-12 text-center">
        <NuxtLink to="/shop" class="font-bold px-8 py-3.5 rounded-full transition-colors" style="background-color:var(--color-orange);color:white;">
          Shop Our Nuts →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
