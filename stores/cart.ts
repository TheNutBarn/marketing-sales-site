import { defineStore } from 'pinia'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    itemCount: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    total: (state): number =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addItem(id: string, name: string, price: number, quantity = 1) {
      const existing = this.items.find(item => item.id === id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ id, name, price, quantity })
      }
    },

    removeItem(id: string) {
      this.items = this.items.filter(item => item.id !== id)
    },

    updateQuantity(id: string, quantity: number) {
      if (quantity < 1) {
        this.removeItem(id)
        return
      }
      const item = this.items.find(item => item.id === id)
      if (item) item.quantity = quantity
    },

    clearCart() {
      this.items = []
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },
  },

  // Persist cart items across page refreshes — isOpen always resets to false
  persist: {
    pick: ['items'],
  },
})
