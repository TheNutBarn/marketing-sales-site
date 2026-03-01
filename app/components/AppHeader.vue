<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const mobileNavOpen = ref(false)

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value
  if (import.meta.client) {
    document.body.style.overflow = mobileNavOpen.value ? 'hidden' : ''
  }
}

function closeMobileNav() {
  mobileNavOpen.value = false
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[500] focus:px-4 focus:py-2 focus:rounded-md focus:font-bold"
    style="background-color:var(--color-brown);color:white;"
  >
    Skip to content
  </a>

  <header
    class="sticky top-0 bg-white border-b"
    style="z-index:var(--z-sticky);height:var(--header-height);border-color:var(--color-border);"
  >
    <div class="mx-auto px-4 h-full flex items-center justify-between gap-4" style="max-width:var(--container-xl)">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="shrink-0 no-underline"
        style="color:var(--color-brown);"
        @click="closeMobileNav"
      >
        <span style="font-family:var(--font-display);font-size:1.25rem;line-height:1;">The Nut Barn</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6" aria-label="Primary navigation">
        <NuxtLink
          to="/shop"
          class="font-bold transition-colors"
          style="color:var(--color-text);font-family:var(--font-body);"
          active-class="!text-[--color-orange]"
        >Shop</NuxtLink>
        <NuxtLink
          to="/find-us"
          class="font-bold transition-colors"
          style="color:var(--color-text);font-family:var(--font-body);"
          active-class="!text-[--color-orange]"
        >Find Us</NuxtLink>
        <NuxtLink
          to="/our-story"
          class="font-bold transition-colors"
          style="color:var(--color-text);font-family:var(--font-body);"
          active-class="!text-[--color-orange]"
        >Our Story</NuxtLink>
      </nav>

      <!-- Right side: cart + hamburger -->
      <div class="flex items-center gap-1">
        <!-- Cart button -->
        <button
          type="button"
          class="relative flex items-center justify-center transition-colors"
          style="width:var(--touch-target);height:var(--touch-target);color:var(--color-text);"
          aria-label="Open shopping cart"
          @click="cart.openDrawer()"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <!-- Cart count badge — wrapped in ClientOnly to prevent SSR hydration mismatch -->
          <ClientOnly>
            <span
              v-if="cart.itemCount > 0"
              class="absolute -top-0.5 -right-0.5 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none"
              style="background-color:var(--color-orange);"
              aria-label="Items in cart"
            >{{ cart.itemCount > 9 ? '9+' : cart.itemCount }}</span>
          </ClientOnly>
        </button>

        <!-- Hamburger (mobile only) -->
        <button
          type="button"
          class="md:hidden flex items-center justify-center transition-colors"
          style="width:var(--touch-target);height:var(--touch-target);color:var(--color-text);"
          :aria-expanded="mobileNavOpen"
          aria-label="Toggle navigation menu"
          @click="toggleMobileNav"
        >
          <svg v-if="!mobileNavOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile nav overlay -->
  <Teleport to="body">
    <div
      v-if="mobileNavOpen"
      class="md:hidden fixed inset-0 flex justify-end"
      style="z-index:var(--z-drawer);"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        aria-hidden="true"
        @click="closeMobileNav"
      />

      <!-- Drawer panel -->
      <nav
        class="relative bg-white w-72 max-w-full h-full flex flex-col p-6 overflow-y-auto"
        style="box-shadow:var(--shadow-xl);"
        aria-label="Mobile navigation"
      >
        <button
          type="button"
          class="self-end mb-6 flex items-center justify-center"
          style="width:var(--touch-target);height:var(--touch-target);color:var(--color-text-muted);"
          aria-label="Close navigation menu"
          @click="closeMobileNav"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="flex flex-col gap-1">
          <NuxtLink to="/shop" class="text-lg font-bold py-3 border-b" style="color:var(--color-text);border-color:var(--color-border);" @click="closeMobileNav">Shop</NuxtLink>
          <NuxtLink to="/find-us" class="text-lg font-bold py-3 border-b" style="color:var(--color-text);border-color:var(--color-border);" @click="closeMobileNav">Find Us</NuxtLink>
          <NuxtLink to="/our-story" class="text-lg font-bold py-3 border-b" style="color:var(--color-text);border-color:var(--color-border);" @click="closeMobileNav">Our Story</NuxtLink>
          <NuxtLink to="/blog" class="py-3 border-b" style="color:var(--color-text-muted);border-color:var(--color-border);" @click="closeMobileNav">Blog</NuxtLink>
          <NuxtLink to="/faq" class="py-3 border-b" style="color:var(--color-text-muted);border-color:var(--color-border);" @click="closeMobileNav">FAQ</NuxtLink>
          <NuxtLink to="/wholesale" class="py-3 border-b" style="color:var(--color-text-muted);border-color:var(--color-border);" @click="closeMobileNav">Wholesale</NuxtLink>
          <NuxtLink to="/contact" class="py-3" style="color:var(--color-text-muted);" @click="closeMobileNav">Contact</NuxtLink>
        </div>

        <div class="mt-auto pt-6">
          <p class="text-sm mb-1" style="color:var(--color-text-muted);">Dimondale, Michigan</p>
          <a href="tel:5174109029" class="text-sm font-bold" style="color:var(--color-brown);">(517) 410-9029</a>
        </div>
      </nav>
    </div>
  </Teleport>
</template>
