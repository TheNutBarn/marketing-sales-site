import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CartItem } from '../../shared/types/cart'
import { getProductById } from '../lib/products'

const STORAGE_KEY = 'nutbarn-cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isDrawerOpen = ref(false)

  // SSR guard — only access localStorage on the client to prevent hydration mismatch
  if (import.meta.client) {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        items.value = JSON.parse(stored) as CartItem[]
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    watch(
      items,
      (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
      { deep: true },
    )
  }

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const subtotalCents = computed(() =>
    items.value.reduce((sum, item) => sum + item.priceInCents * item.quantity, 0),
  )

  function addItem(productId: string, quantity = 1): void {
    const product = getProductById(productId)
    if (!product) return

    const existing = items.value.find(i => i.id === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        priceInCents: product.priceInCents,
        quantity,
      })
    }
  }

  function removeItem(productId: string): void {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find(i => i.id === productId)
    if (item) item.quantity = quantity
  }

  function clearCart(): void {
    items.value = []
  }

  function openDrawer(): void {
    isDrawerOpen.value = true
  }

  function closeDrawer(): void {
    isDrawerOpen.value = false
  }

  return {
    items,
    isDrawerOpen,
    itemCount,
    subtotalCents,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openDrawer,
    closeDrawer,
  }
})
