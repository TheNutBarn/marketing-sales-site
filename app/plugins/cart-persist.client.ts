const STORAGE_KEY = 'nutbarn-cart'

export default defineNuxtPlugin(() => {
  const cart = useCartStore()

  // Hydrate from localStorage after SSR state is applied
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      cart.$patch({ items: JSON.parse(stored) })
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Persist state changes to localStorage
  cart.$subscribe((_mutation, state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  })
})
