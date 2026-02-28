<template>
  <header class="sticky top-0 z-50 shadow-md" style="background-color: #8B4513">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Top bar -->
      <div class="flex items-center justify-between py-3">
        <NuxtLink
          href="/"
          class="text-2xl font-bold text-white hover:text-orange-200 transition-colors"
        >
          🥜 The Nut Barn
        </NuxtLink>

        <div class="hidden md:flex flex-col text-right text-xs text-orange-100 leading-5">
          <span>📧 thenutbarnllc@gmail.com</span>
          <span>📞 (517) 410-9029 · 📍 Dimondale, Michigan</span>
        </div>

        <button
          @click="cart.toggleCart"
          class="relative flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold transition-all duration-200 hover:-translate-y-0.5"
          style="background-color: #ff6b35"
          :aria-label="`Open cart, ${cart.itemCount} items`"
        >
          <span>🛒</span>
          <span>Cart</span>
          <span
            v-if="cart.itemCount > 0"
            class="absolute -top-1.5 -right-1.5 bg-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            style="color: #8B4513"
          >
            {{ cart.itemCount }}
          </span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="border-t border-orange-700">
        <ul class="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
          <li v-for="link in NAV_LINKS" :key="link.href">
            <NuxtLink
              :href="link.href"
              class="block px-3 py-2 text-sm text-orange-100 hover:text-white hover:bg-orange-800 rounded transition-colors whitespace-nowrap"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
          <li class="ml-auto">
            <NuxtLink
              href="/shop"
              class="block px-4 py-2 text-sm font-bold rounded-full text-white transition-all duration-200 whitespace-nowrap"
              style="background-color: #ff6b35"
            >
              Order Now →
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const cart = useCartStore()

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/find-us', label: 'Find Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]
</script>
