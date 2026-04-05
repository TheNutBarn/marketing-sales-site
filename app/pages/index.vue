<script setup lang="ts">
import { PRODUCTS, formatPrice } from "~/lib/products";

useHead({
  title: "The Nut Barn — Cinnamon Roasted Nuts | Holt Farmer's Market",
  meta: [
    {
      name: "description",
      content:
        "Handcrafted cinnamon roasted nuts from Dimondale, Michigan. Fresh every Saturday at the Holt Farmer's Market. Vegan, gluten-free, FIVE simple ingredients.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "The Nut Barn LLC",
        description: "Handcrafted cinnamon roasted nuts, Dimondale Michigan",
        telephone: "+15174109029",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dimondale",
          addressRegion: "MI",
          addressCountry: "US",
        },
        servesCuisine: "Snacks",
        priceRange: "$10–$40",
      }),
    },
  ],
});

const regularProducts = PRODUCTS.filter((p) => p.id !== "gift-basket");
const giftBasket = PRODUCTS.find((p) => p.id === "gift-basket");
</script>

<template>
  <!-- ─── Hero ─────────────────────────────────────── -->
  <section
    class="relative px-4 py-16 md:py-24"
    style="background: var(--gradient-hero); color: var(--color-text-inverse)"
    aria-labelledby="hero-heading"
  >
    <div
      class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      style="max-width: var(--container-xl)"
    >
      <!-- Text content -->
      <div>
        <p class="eyebrow mb-3" style="color: var(--color-mustard)">
          Fresh from the Holt Farmer's Market · Every Saturday
        </p>
        <h1
          id="hero-heading"
          class="mb-4"
          style="
            font-size: clamp(2.5rem, 6vw, 4rem);
            color: var(--color-cream-light);
            line-height: 1.15;
          "
        >
          Follow That Smell.
        </h1>
        <p
          class="text-lg mb-2"
          style="
            color: rgba(253, 246, 232, 0.85);
            line-height: var(--line-height-relaxed);
          "
        >
          Handcrafted cinnamon roasted nuts — FIVE simple ingredients, zero
          artificial anything.
        </p>
        <p
          class="font-bold mb-8"
          style="
            color: var(--color-mustard);
            font-family: var(--font-chalk);
            font-size: 1.2rem;
          "
        >
          WARNING: PRODUCT MAY BE HABIT FORMING
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/shop"
            class="font-bold px-8 py-3.5 rounded btn-vintage"
            style="background-color: var(--color-orange); color: white"
            >Shop Now</NuxtLink
          >
          <NuxtLink
            to="/find-us"
            class="font-bold px-8 py-3.5 rounded border-2 transition-all"
            style="
              border-color: var(--color-mustard);
              color: var(--color-mustard);
            "
            >Find Us This Saturday →</NuxtLink
          >
        </div>

        <!-- Trust badges -->
        <div
          class="flex flex-wrap gap-4 mt-8 text-sm"
          style="color: rgba(253, 246, 232, 0.7)"
        >
          <span>✓ Vegan</span>
          <span aria-hidden="true">·</span>
          <span>✓ Gluten-Free</span>
          <span aria-hidden="true">·</span>
          <span>✓ FIVE Simple Ingredients</span>
          <span aria-hidden="true">·</span>
          <span>☕ Hot Chocolate Bar</span>
        </div>
      </div>

      <!-- Mascot image -->
      <div class="flex justify-center md:justify-end">
        <div class="relative inline-block">
          <!-- Dashed vintage badge ring -->
          <div
            class="absolute inset-0 rounded-full"
            style="
              border: 3px dashed var(--color-mustard);
              transform: scale(1.06);
              opacity: 0.6;
            "
            aria-hidden="true"
          />
          <img
            :src="'/images/logo.png'"
            alt="The Nut Barn mascot"
            class="relative rounded-full"
            style="
              width: 280px;
              height: 280px;
              object-fit: cover;
              object-position: center;
            "
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Marquee strip ─────────────────────────────── -->
  <MarqueeStrip />

  <!-- ─── Products ──────────────────────────────────── -->
  <section
    class="px-4 py-16"
    style="background-color: var(--color-cream-light)"
    aria-labelledby="products-heading"
  >
    <div class="mx-auto" style="max-width: var(--container-xl)">
      <div class="text-center mb-10">
        <p class="eyebrow">Fresh Roasted</p>
        <h2
          id="products-heading"
          style="
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            color: var(--color-denim);
          "
        >
          Our Nuts
        </h2>
        <p class="ornament">— ✦ —</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="product in regularProducts"
          :key="product.id"
          class="bg-white rounded-lg overflow-hidden card-vintage relative"
        >
          <!-- Popular badge -->
          <div
            v-if="product.id === 'nuts-8oz'"
            class="absolute top-3 right-3 z-10 text-xs font-bold px-3 py-1 rounded uppercase"
            style="
              background-color: var(--color-mustard);
              color: var(--color-midnight);
              letter-spacing: var(--letter-spacing-wide);
            "
          >
            Most Popular
          </div>

          <!-- Image placeholder with gradient -->
          <div
            class="aspect-[4/3] overflow-hidden"
            style="background: var(--gradient-product)"
            aria-hidden="true"
          />

          <div class="p-5">
            <!-- Dietary badges -->
            <div class="flex gap-2 mb-3">
              <span
                v-for="tag in product.dietaryTags"
                :key="tag"
                class="text-xs font-bold px-2 py-0.5 rounded uppercase border"
                style="
                  border-color: var(--color-denim);
                  color: var(--color-denim);
                  letter-spacing: var(--letter-spacing-wide);
                "
                >{{ tag }}</span
              >
            </div>

            <h3 class="mb-1" style="color: var(--color-midnight)">
              {{ product.name }}
            </h3>
            <p class="text-sm mb-3" style="color: var(--color-text-muted)">
              {{ product.shortDescription }}
            </p>
            <p
              class="mb-4"
              style="
                font-family: var(--font-display);
                font-size: 1.35rem;
                color: var(--color-denim);
              "
            >
              {{ formatPrice(product.priceInCents) }}
            </p>

            <AddToCartButton :product="product" />
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ─── Gift Basket callout ───────────────────────── -->
  <section
    class="px-4 py-16"
    style="background-color: var(--color-cream-dark)"
    aria-labelledby="gift-heading"
  >
    <div class="mx-auto" style="max-width: var(--container-lg)">
      <div class="text-center mb-8">
        <p class="eyebrow">Perfect for Gifting</p>
        <h2
          id="gift-heading"
          style="
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            color: var(--color-denim);
          "
        >
          Give the Gift of Warm Cinnamon Nuts
        </h2>
        <p class="ornament">— ✦ —</p>
      </div>

      <div
        v-if="giftBasket"
        class="bg-white rounded-lg overflow-hidden max-w-md mx-auto card-vintage"
      >
        <div
          class="aspect-[4/3] overflow-hidden"
          style="background: var(--gradient-product)"
          aria-hidden="true"
        />
        <div class="p-6">
          <h3 class="mb-2" style="color: var(--color-midnight)">
            {{ giftBasket.name }}
          </h3>
          <p class="text-sm mb-4" style="color: var(--color-text-muted)">
            {{ giftBasket.longDescription }}
          </p>
          <p
            class="mb-4"
            style="
              font-family: var(--font-display);
              font-size: 1.5rem;
              color: var(--color-denim);
            "
          >
            {{ formatPrice(giftBasket.priceInCents) }}
          </p>
          <AddToCartButton :product="giftBasket" />
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Payment strip ─────────────────────────────── -->
  <PaymentStrip />

  <!-- ─── Our Story teaser ──────────────────────────── -->
  <section
    class="px-4 py-16 text-center"
    aria-labelledby="story-teaser-heading"
  >
    <div class="mx-auto" style="max-width: var(--container-md)">
      <p class="eyebrow">Est. 2023</p>
      <h2
        id="story-teaser-heading"
        class="mb-4"
        style="
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          color: var(--color-denim);
        "
      >
        Our Story
      </h2>
      <p class="ornament mb-6">— ✦ —</p>
      <p
        class="text-lg mb-8"
        style="
          color: var(--color-text-muted);
          line-height: var(--line-height-relaxed);
        "
      >
        Our story began in August 2023 when my husband and I decided to embark
        on a new adventure — one that started with a little nut stand and a
        whole lot of love.
      </p>
      <NuxtLink
        to="/our-story"
        class="font-bold border-2 px-6 py-3 rounded btn-vintage"
        style="border-color: var(--color-denim); color: var(--color-denim)"
        >Read Our Story →</NuxtLink
      >
    </div>
  </section>
</template>
