<script setup lang="ts">
import { PRODUCTS, formatPrice } from '~/lib/products'

useHead({
  title: 'Shop Cinnamon Roasted Nuts — The Nut Barn',
  meta: [
    { name: 'description', content: 'Shop The Nut Barn — 6 oz, 8 oz, and 15 oz cinnamon roasted nuts plus our Holiday Gift Basket. Vegan, gluten-free, FIVE simple ingredients.' },
  ],
})

const { data: products } = await useAsyncData('products', () => Promise.resolve(PRODUCTS))

const regularProducts = computed(() => products.value?.filter(p => p.id !== 'gift-basket') ?? [])
const giftBasket = computed(() => products.value?.find(p => p.id === 'gift-basket'))
</script>

<template>
  <div>
    <!-- Page header -->
    <section class="px-4 py-12 text-center border-b" style="background-color:var(--color-cream-dark);border-color:var(--color-border);">
      <div class="mx-auto" style="max-width:var(--container-md);">
        <h1 style="font-size:clamp(2rem,5vw,3rem);color:var(--color-brown);">Shop Our Nuts</h1>
        <p class="mt-2 text-lg" style="color:var(--color-text-muted);">
          FIVE simple ingredients. Zero artificial anything.
        </p>
      </div>
    </section>

    <div class="mx-auto px-4 py-12" style="max-width:var(--container-xl);">
      <!-- Gift Basket — featured -->
      <section v-if="giftBasket" class="mb-12 rounded-2xl p-8 border" style="background-color:var(--color-cream-warm);border-color:var(--color-border);">
        <p class="text-sm font-bold uppercase mb-2" style="color:var(--color-orange);letter-spacing:var(--letter-spacing-wider);">Perfect for Gifting</p>
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="aspect-[4/3] w-full md:w-72 shrink-0 rounded-xl overflow-hidden" style="background:var(--gradient-barn);" aria-hidden="true" />
          <div class="flex-1">
            <h2 class="mb-2" style="color:var(--color-brown);">{{ giftBasket.name }}</h2>
            <div class="flex gap-2 mb-3">
              <span v-for="tag in giftBasket.dietaryTags" :key="tag" class="text-xs font-bold px-2 py-0.5 rounded-full uppercase" style="background-color:var(--color-success-light);color:var(--color-success);letter-spacing:var(--letter-spacing-wide);">{{ tag }}</span>
            </div>
            <p class="mb-4" style="color:var(--color-text-muted);">{{ giftBasket.longDescription }}</p>
            <p class="font-bold mb-4" style="font-size:1.5rem;color:var(--color-brown);">{{ formatPrice(giftBasket.priceInCents) }}</p>
            <AddToCartButton :product="giftBasket" />
          </div>
        </div>
      </section>

      <!-- Divider -->
      <div class="flex items-center gap-4 mb-10">
        <div class="flex-1 h-px" style="background-color:var(--color-border);" />
        <p class="font-bold text-sm uppercase" style="color:var(--color-text-muted);letter-spacing:var(--letter-spacing-wider);">Individual Bags</p>
        <div class="flex-1 h-px" style="background-color:var(--color-border);" />
      </div>

      <!-- Product grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <article
          v-for="product in regularProducts"
          :key="product.id"
          class="bg-white rounded-2xl overflow-hidden border transition-all duration-200"
          style="border-color:var(--color-border);box-shadow:var(--shadow-sm);"
        >
          <div class="aspect-[4/3] overflow-hidden" style="background:var(--gradient-product);" aria-hidden="true" />
          <div class="p-5">
            <div class="flex gap-2 mb-3">
              <span v-for="tag in product.dietaryTags" :key="tag" class="text-xs font-bold px-2 py-0.5 rounded-full uppercase" style="background-color:var(--color-success-light);color:var(--color-success);letter-spacing:var(--letter-spacing-wide);">{{ tag }}</span>
            </div>
            <h3 class="mb-1" style="color:var(--color-brown);">{{ product.name }}</h3>
            <p class="text-sm mb-1" style="color:var(--color-text-muted);">{{ product.weightOz }} oz</p>
            <p class="text-sm mb-3" style="color:var(--color-text-muted);">{{ product.shortDescription }}</p>
            <p class="font-bold mb-4" style="font-size:1.25rem;color:var(--color-brown);">{{ formatPrice(product.priceInCents) }}</p>
            <AddToCartButton :product="product" />
          </div>
        </article>
      </div>

      <!-- Footer teasers -->
      <div class="flex flex-col sm:flex-row gap-4 text-center">
        <NuxtLink to="/faq" class="flex-1 rounded-xl p-5 border font-bold transition-colors" style="border-color:var(--color-border);color:var(--color-brown);">
          Questions? Visit our FAQ →
        </NuxtLink>
        <NuxtLink to="/wholesale" class="flex-1 rounded-xl p-5 border font-bold transition-colors" style="border-color:var(--color-border);color:var(--color-brown);">
          Wholesale inquiries →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
