<template>
  <!-- Hero -->
  <section
    class="py-12 text-center text-white"
    style="background: linear-gradient(135deg, #8B4513, #5c2d0e)"
  >
    <div class="max-w-3xl mx-auto px-4">
      <h1 class="text-4xl font-bold mb-3">Shop The Nut Barn</h1>
      <p class="text-orange-100 text-lg">
        Fresh cinnamon roasted nuts, shipped to your door. Vegan · Gluten-Free · 5 Simple Ingredients.
      </p>
    </div>
  </section>

  <!-- Products -->
  <section class="py-16 px-4" style="background-color: #f8f6f0">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title">Our Products</h2>
      <div class="section-divider" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="product in PRODUCTS" :key="product.id" class="card">
          <div class="flex gap-6">
            <!-- Product image placeholder -->
            <div
              class="w-28 h-28 rounded-xl flex items-center justify-center text-5xl flex-shrink-0"
              style="background: linear-gradient(135deg, #ede9df, #f8f6f0)"
              :aria-label="`${product.name} — product image`"
            >
              {{ product.emoji }}
            </div>

            <!-- Product info -->
            <div class="flex-1">
              <h2 class="text-xl font-bold mb-1" style="color: #8B4513">{{ product.name }}</h2>
              <p class="text-2xl font-bold mb-2" style="color: #ff6b35">{{ product.priceDisplay }}</p>
              <div class="flex gap-1.5 flex-wrap mb-3">
                <span v-for="tag in product.dietaryTags" :key="tag" class="trust-badge text-xs">
                  {{ tag }}
                </span>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed mb-2">{{ product.longDescription }}</p>
              <p v-if="product.bestFor.length > 0" class="text-xs text-gray-500 mb-4">
                <strong>Great for:</strong> {{ product.bestFor.join(', ') }}
              </p>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t" style="border-color: #ede9df">
            <AddToCartButton :id="product.id" :name="product.name" :price="product.price" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How ordering works -->
  <section class="py-16 px-4" style="background-color: #ede9df">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="section-title">How Ordering Works</h2>
      <div class="section-divider" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="step in ORDER_STEPS" :key="step.step" class="card text-center">
          <div class="text-3xl mb-2">{{ step.icon }}</div>
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mx-auto mb-2"
            style="background-color: #ff6b35"
          >
            {{ step.step }}
          </div>
          <h3 class="font-bold mb-1" style="color: #8B4513">{{ step.title }}</h3>
          <p class="text-sm text-gray-600">{{ step.body }}</p>
        </div>
      </div>

      <!-- Stripe coming soon -->
      <div class="card inline-flex items-center gap-3 text-sm text-gray-600">
        <span>💳</span>
        <span>
          <strong>Coming soon:</strong> Pay by card directly on this site. For now, we accept Square, PayPal, and Venmo.
        </span>
      </div>
    </div>
  </section>

  <!-- Wholesale CTA -->
  <section class="py-10 px-4 text-center text-white" style="background-color: #8B4513">
    <h2 class="text-2xl font-bold mb-2">Need a Large Order?</h2>
    <p class="text-orange-200 mb-4">We offer bulk pricing for businesses, events, and corporate gifting.</p>
    <NuxtLink href="/wholesale" class="btn-primary">Wholesale Inquiries →</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { PRODUCTS } from '~/lib/products'

useSeoMeta({
  title: 'Shop — Cinnamon Roasted Nuts & Gift Baskets',
  description:
    'Order fresh cinnamon roasted nuts online. 6 oz, 8 oz, and 15 oz bags plus custom holiday gift baskets. Vegan, gluten-free, shipped nationwide.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'The Nut Barn Products',
        itemListElement: PRODUCTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            description: p.longDescription,
            offers: {
              '@type': 'Offer',
              price: p.price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: 'The Nut Barn' },
            },
          },
        })),
      }),
    },
  ],
})

const ORDER_STEPS = [
  { step: '1', icon: '🛒', title: 'Add to Cart', body: 'Select your products and quantities above.' },
  { step: '2', icon: '📝', title: 'Enter Your Details', body: 'Provide your name and email so we can confirm your order.' },
  { step: '3', icon: '📦', title: 'We Confirm & Ship', body: "We'll reply with payment options (Square, PayPal, Venmo) and a shipping confirmation." },
]
</script>
