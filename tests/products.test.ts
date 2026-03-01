import { describe, it, expect } from 'vitest'
import { PRODUCTS, getProductById, formatPrice } from '../app/lib/products'

describe('products', () => {
  it('exports exactly 4 products', () => {
    expect(PRODUCTS).toHaveLength(4)
  })

  it('all products have integer prices (no float issues)', () => {
    for (const p of PRODUCTS) {
      expect(Number.isInteger(p.priceInCents)).toBe(true)
    }
  })

  it('product ids match expected SKUs', () => {
    const ids = PRODUCTS.map(p => p.id)
    expect(ids).toContain('nuts-6oz')
    expect(ids).toContain('nuts-8oz')
    expect(ids).toContain('nuts-15oz')
    expect(ids).toContain('gift-basket')
  })

  it('getProductById returns correct product', () => {
    const p = getProductById('nuts-8oz')
    expect(p?.priceInCents).toBe(1500)
    expect(p?.name).toBe('8 oz Cinnamon Roasted Nuts')
  })

  it('getProductById returns undefined for unknown id', () => {
    expect(getProductById('nonexistent')).toBeUndefined()
  })

  it('formatPrice converts cents to dollar string', () => {
    expect(formatPrice(1000)).toBe('$10.00')
    expect(formatPrice(1500)).toBe('$15.00')
    expect(formatPrice(2300)).toBe('$23.00')
    expect(formatPrice(4000)).toBe('$40.00')
  })

  it('all products have vegan and gluten-free tags', () => {
    for (const p of PRODUCTS) {
      expect(p.dietaryTags).toContain('vegan')
      expect(p.dietaryTags).toContain('gluten-free')
    }
  })
})
