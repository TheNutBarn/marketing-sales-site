<script setup lang="ts">
const MOCK_POSTS = [
  {
    id: '1',
    slug: 'why-cinnamon-roasted-nuts',
    title: 'Why We Chose Cinnamon Roasted Nuts',
    date: '2026-01-15',
    excerpt: 'The story behind our signature recipe — and why FIVE simple ingredients is all you need.',
    body: `When we started The Nut Barn in 2023, we knew we wanted something simple. Something you could make with ingredients you actually recognize.

That's how we landed on our FIVE-ingredient cinnamon roasted nuts: nuts, cinnamon, sugar, butter, and vanilla. That's it.

No artificial flavors. No preservatives. Nothing you need a chemistry degree to pronounce.

The recipe came together after months of testing in our kitchen — tweaking the cinnamon ratio, finding the right roasting time, getting that perfect glaze that cracks just so when you bite in.

We brought our first batch to the Holt Farmer's Market on a cold October morning in 2023. We sold out in two hours.

That was the moment we knew we were onto something.`,
  },
  {
    id: '2',
    slug: 'holt-farmers-market-guide',
    title: "A Guide to the Holt Farmer's Market",
    date: '2026-02-01',
    excerpt: 'What to expect, where to park, and where to find us every Saturday morning.',
    body: `The Holt Farmer's Market is one of the best in the Greater Lansing area — and we're not just saying that because we're vendors there.

Every Saturday from spring through fall, you'll find local farmers, artisan food makers, bakers, and craftspeople gathered at 2136 Cedar St in Holt.

**Parking:** There's free parking in the lot adjacent to the market. Arrive early on busy Saturdays — spots fill up by 10am.

**Hours:** 9am–2pm. We're always set up by 8:45am.

**Where to find us:** Look for the yellow canopy. Follow your nose — the cinnamon smell tends to draw a crowd.

**What to bring:** Cash is king at farmers markets, but we accept Venmo, Square, and PayPal.

**Pro tip:** Come early for the freshest batch. We roast to order and the first hour is always the busiest.`,
  },
]

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

const { data: post } = await useAsyncData(`post-${slug}`, async () => {
  return MOCK_POSTS.find(p => p.slug === slug) ?? null
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead({
  title: `${post.value.title} — The Nut Barn Blog`,
  meta: [
    { name: 'description', content: post.value.excerpt },
  ],
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div v-if="post">
    <!-- Article header -->
    <section class="px-4 py-14 text-center" style="background-color:var(--color-cream-dark);">
      <div class="mx-auto" style="max-width:var(--container-md);">
        <p class="text-sm font-bold uppercase mb-3" style="color:var(--color-text-muted);letter-spacing:var(--letter-spacing-wider);">{{ formatDate(post.date) }}</p>
        <h1 style="font-size:clamp(1.75rem,4vw,2.75rem);color:var(--color-brown);">{{ post.title }}</h1>
      </div>
    </section>

    <!-- Article + sidebar layout -->
    <div class="mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12" style="max-width:var(--container-xl);">
      <!-- Article body -->
      <article class="lg:col-span-3 prose" style="max-width:none;">
        <div class="aspect-[16/9] rounded-2xl overflow-hidden mb-8" style="background:var(--gradient-product);" aria-hidden="true" />

        <div class="space-y-4" style="color:var(--color-text);line-height:var(--line-height-relaxed);">
          <p v-for="(paragraph, i) in post.body.split('\n\n')" :key="i">
            {{ paragraph }}
          </p>
        </div>

        <!-- Back link -->
        <div class="mt-10">
          <NuxtLink to="/blog" class="font-bold" style="color:var(--color-orange);">← Back to Blog</NuxtLink>
        </div>
      </article>

      <!-- Sticky CTA sidebar -->
      <aside class="lg:col-span-1">
        <div class="sticky top-24 rounded-2xl p-5 border text-center" style="background-color:var(--color-cream-warm);border-color:var(--color-border);">
          <p class="font-bold mb-2" style="font-family:var(--font-heading);color:var(--color-brown);">Try Our Nuts</p>
          <p class="text-sm mb-4" style="color:var(--color-text-muted);">FIVE simple ingredients. Vegan. Gluten-free. WARNING: habit forming.</p>
          <NuxtLink to="/shop" class="block w-full font-bold py-2.5 rounded-full text-sm text-center transition-colors" style="background-color:var(--color-orange);color:white;">
            Shop Our Nuts →
          </NuxtLink>
        </div>
      </aside>
    </div>
  </div>
</template>
