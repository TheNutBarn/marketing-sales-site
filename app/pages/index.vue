<script setup lang="ts">
import { PRODUCTS, formatPrice } from '~/lib/products'

useHead({
  title: "The Nut Barn — Cinnamon Roasted Nuts | Holt Farmer's Market",
  meta: [
    {
      name: 'description',
      content: "Handcrafted cinnamon roasted nuts from Dimondale, Michigan. Fresh every Saturday at the Holt Farmer's Market. Vegan, gluten-free, FIVE simple ingredients.",
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'The Nut Barn LLC',
        description: 'Handcrafted cinnamon roasted nuts, Dimondale Michigan',
        telephone: '+15174109029',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dimondale',
          addressRegion: 'MI',
          addressCountry: 'US',
        },
        servesCuisine: 'Snacks',
        priceRange: '$10–$40',
      }),
    },
  ],
})

const regularProducts = PRODUCTS.filter(p => p.id !== 'gift-basket')
const giftBasket = PRODUCTS.find(p => p.id === 'gift-basket')
</script>

<template>
  <!-- ─── Hero ─────────────────────────────────────── -->
  <section
    class="relative px-4 py-20 text-center"
    style="background:var(--gradient-hero);color:var(--color-text-inverse);"
  >
    <div class="mx-auto" style="max-width:var(--container-md);">
      <p class="text-sm font-bold uppercase mb-4" style="letter-spacing:var(--letter-spacing-wider);color:var(--color-straw);">
        Fresh from the Holt Farmer's Market · Every Saturday
      </p>
      <h1 class="mb-4" style="font-size:clamp(2.5rem,6vw,4.5rem);">
        People would follow the smell from a hundred yards away.
      </h1>
      <p class="text-lg mb-2" style="color:rgba(255,255,255,0.85);">
        Handcrafted cinnamon roasted nuts — FIVE simple ingredients, zero artificial anything.
      </p>
      <p class="font-bold mb-8" style="color:var(--color-straw);font-family:var(--font-chalk);font-size:1.25rem;">
        WARNING: PRODUCT MAY BE HABIT FORMING
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          to="/shop"
          class="font-bold px-8 py-3.5 rounded-full transition-all"
          style="background-color:var(--color-orange);color:white;"
        >Shop Now</NuxtLink>
        <NuxtLink
          to="/find-us"
          class="font-bold px-8 py-3.5 rounded-full border-2 transition-all"
          style="border-color:white;color:white;"
        >Find Us This Saturday →</NuxtLink>
      </div>
    </div>
  </section>

  <!-- ─── Trust strip ───────────────────────────────── -->
  <section class="border-b" style="background-color:var(--color-cream-warm);border-color:var(--color-border);">
    <div class="mx-auto px-4 py-6" style="max-width:var(--container-xl);">
      <div class="flex flex-wrap justify-center items-center gap-6 text-sm font-bold" style="color:var(--color-brown);">
        <span>✓ Vegan</span>
        <span class="hidden sm:inline" aria-hidden="true">·</span>
        <span>✓ Gluten-Free</span>
        <span class="hidden sm:inline" aria-hidden="true">·</span>
        <span>✓ FIVE Simple Ingredients</span>
        <span class="hidden sm:inline" aria-hidden="true">·</span>
        <span>☕ Hot Chocolate Bar at every market</span>
        <span class="hidden sm:inline" aria-hidden="true">·</span>
        <span>Venmo · Square · PayPal</span>
      </div>
    </div>
  </section>

  <!-- ─── Products ──────────────────────────────────── -->
  <section class="px-4 py-16">
    <div class="mx-auto" style="max-width:var(--container-xl);">
      <h2 class="text-center mb-10" style="font-size:clamp(1.75rem,4vw,2.5rem);color:var(--color-brown);">
        Our Nuts
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="product in regularProducts"
          :key="product.id"
          class="bg-white rounded-2xl overflow-hidden border transition-all duration-200"
          style="border-color:var(--color-border);box-shadow:var(--shadow-sm);"
        >
          <!-- Image placeholder with gradient -->
          <div
            class="aspect-[4/3] overflow-hidden"
            style="background:var(--gradient-product);"
            aria-hidden="true"
          />

          <div class="p-5">
            <!-- Dietary badges -->
            <div class="flex gap-2 mb-3">
              <span
                v-for="tag in product.dietaryTags"
                :key="tag"
                class="text-xs font-bold px-2 py-0.5 rounded-full uppercase"
                style="background-color:var(--color-success-light);color:var(--color-success);letter-spacing:var(--letter-spacing-wide);"
              >{{ tag }}</span>
            </div>

            <h3 class="mb-1" style="color:var(--color-brown);">{{ product.name }}</h3>
            <p class="text-sm mb-3" style="color:var(--color-text-muted);">{{ product.shortDescription }}</p>
            <p class="font-bold mb-4" style="font-size:1.25rem;color:var(--color-brown);">
              {{ formatPrice(product.priceInCents) }}
            </p>

            <AddToCartButton :product="product" />
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ─── Gift Basket callout ───────────────────────── -->
  <section class="px-4 py-16" style="background-color:var(--color-cream-dark);">
    <div class="mx-auto" style="max-width:var(--container-lg);">
      <div class="text-center mb-8">
        <p class="text-sm font-bold uppercase mb-2" style="color:var(--color-orange);letter-spacing:var(--letter-spacing-wider);">Perfect for Gifting</p>
        <h2 style="font-size:clamp(1.75rem,4vw,2.5rem);color:var(--color-brown);">Give the Gift of Warm Cinnamon Nuts</h2>
      </div>

      <div v-if="giftBasket" class="bg-white rounded-2xl overflow-hidden border max-w-md mx-auto" style="border-color:var(--color-border);box-shadow:var(--shadow-md);">
        <div class="aspect-[4/3] overflow-hidden" style="background:var(--gradient-barn);" aria-hidden="true" />
        <div class="p-6">
          <h3 class="mb-2" style="color:var(--color-brown);">{{ giftBasket.name }}</h3>
          <p class="text-sm mb-4" style="color:var(--color-text-muted);">{{ giftBasket.longDescription }}</p>
          <p class="font-bold mb-4" style="font-size:1.5rem;color:var(--color-brown);">{{ formatPrice(giftBasket.priceInCents) }}</p>
          <AddToCartButton :product="giftBasket" />
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Our Story teaser ──────────────────────────── -->
  <section class="px-4 py-16 text-center">
    <div class="mx-auto" style="max-width:var(--container-md);">
      <h2 class="mb-4" style="font-size:clamp(1.75rem,4vw,2.5rem);color:var(--color-brown);">Our Story</h2>
      <p class="text-lg mb-6" style="color:var(--color-text-muted);line-height:var(--line-height-relaxed);">
        Our story began in August 2023 when my husband and I decided to embark on a new adventure — one that started with a little nut stand and a whole lot of love.
      </p>
      <NuxtLink
        to="/our-story"
        class="font-bold border-2 px-6 py-3 rounded-full transition-colors"
        style="border-color:var(--color-brown);color:var(--color-brown);"
      >Read Our Story →</NuxtLink>
    </div>
  </section>
</template>
