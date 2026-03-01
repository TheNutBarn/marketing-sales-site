<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import type { Product } from '../../shared/types/product'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const quantity = ref(1)
const toastVisible = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null

function addToCart() {
  cart.addItem(props.product.id, quantity.value)
  showToast()
}

function showToast() {
  if (toastTimer) clearTimeout(toastTimer)
  toastVisible.value = true
  toastTimer = setTimeout(() => { toastVisible.value = false }, 3000)
}
</script>

<template>
  <div class="space-y-3">
    <!-- Quantity selector -->
    <div class="flex items-center gap-2">
      <label :for="`qty-${product.id}`" class="text-sm font-bold" style="color:var(--color-text);">Qty:</label>
      <div class="flex items-center border rounded-lg overflow-hidden" style="border-color:var(--color-border);">
        <button
          type="button"
          class="flex items-center justify-center font-bold text-lg transition-colors"
          style="width:var(--touch-target);height:var(--touch-target);color:var(--color-brown);"
          aria-label="Decrease quantity"
          @click="quantity = Math.max(1, quantity - 1)"
        >−</button>
        <input
          :id="`qty-${product.id}`"
          v-model.number="quantity"
          type="number"
          min="1"
          max="99"
          class="w-12 text-center text-sm font-bold border-0 bg-white"
          style="outline:none;"
          :aria-label="`Quantity for ${product.name}`"
        />
        <button
          type="button"
          class="flex items-center justify-center font-bold text-lg transition-colors"
          style="width:var(--touch-target);height:var(--touch-target);color:var(--color-brown);"
          aria-label="Increase quantity"
          @click="quantity = Math.min(99, quantity + 1)"
        >+</button>
      </div>
    </div>

    <!-- Add to cart button -->
    <button
      type="button"
      class="w-full font-bold py-3 px-6 rounded-full transition-all"
      style="background-color:var(--color-orange);color:white;transition-duration:var(--duration-base);"
      @click="addToCart"
    >
      Add to Cart
    </button>

    <!-- Toast — CSS-only, no alert() -->
    <div
      role="status"
      aria-live="polite"
      class="toast"
      :class="{ 'is-visible': toastVisible }"
    >
      <div class="text-sm font-bold px-4 py-2.5 rounded-full" style="background-color:var(--color-brown-dark);color:white;box-shadow:var(--shadow-lg);">
        ✓ Added to cart
      </div>
    </div>
  </div>
</template>
