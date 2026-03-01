import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../app/stores/cart'

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts empty', () => {
    const cart = useCartStore()
    expect(cart.items).toHaveLength(0)
    expect(cart.itemCount).toBe(0)
    expect(cart.subtotalCents).toBe(0)
  })

  it('adds a product by id', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz')
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]?.id).toBe('nuts-6oz')
    expect(cart.items[0]?.priceInCents).toBe(1000)
    expect(cart.items[0]?.quantity).toBe(1)
  })

  it('increments quantity when same product added again', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz')
    cart.addItem('nuts-6oz')
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]?.quantity).toBe(2)
  })

  it('adds with specified quantity', () => {
    const cart = useCartStore()
    cart.addItem('nuts-8oz', 3)
    expect(cart.items[0]?.quantity).toBe(3)
  })

  it('computes itemCount across multiple products', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz', 2)
    cart.addItem('nuts-8oz', 1)
    expect(cart.itemCount).toBe(3)
  })

  it('computes subtotalCents correctly', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz', 2)  // 2 × 1000 = 2000
    cart.addItem('nuts-8oz', 1)  // 1 × 1500 = 1500
    expect(cart.subtotalCents).toBe(3500)
  })

  it('removes a product', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz')
    cart.removeItem('nuts-6oz')
    expect(cart.items).toHaveLength(0)
  })

  it('updates quantity', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz', 2)
    cart.updateQuantity('nuts-6oz', 5)
    expect(cart.items[0]?.quantity).toBe(5)
  })

  it('removes item when quantity set to 0', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz')
    cart.updateQuantity('nuts-6oz', 0)
    expect(cart.items).toHaveLength(0)
  })

  it('clears the cart', () => {
    const cart = useCartStore()
    cart.addItem('nuts-6oz', 2)
    cart.addItem('nuts-8oz', 1)
    cart.clearCart()
    expect(cart.items).toHaveLength(0)
    expect(cart.subtotalCents).toBe(0)
  })

  it('ignores unknown product ids', () => {
    const cart = useCartStore()
    cart.addItem('nonexistent-product')
    expect(cart.items).toHaveLength(0)
  })

  it('drawer starts closed', () => {
    const cart = useCartStore()
    expect(cart.isDrawerOpen).toBe(false)
  })

  it('opens and closes drawer', () => {
    const cart = useCartStore()
    cart.openDrawer()
    expect(cart.isDrawerOpen).toBe(true)
    cart.closeDrawer()
    expect(cart.isDrawerOpen).toBe(false)
  })
})
