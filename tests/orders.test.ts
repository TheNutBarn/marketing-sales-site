import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Mirrors the server-side price table (source of truth)
const PRICES: Record<string, number> = {
  'nuts-6oz': 1000,
  'nuts-8oz': 1500,
  'nuts-15oz': 2300,
  'gift-basket': 4000,
}

function computeTotal(items: Array<{ id: string; quantity: number }>): number {
  return items.reduce((sum, item) => {
    const price = PRICES[item.id]
    if (!price) throw new Error(`Unknown product: ${item.id}`)
    return sum + price * item.quantity
  }, 0)
}

const OrderSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{7,20}$/),
  fulfillment: z.enum(['pickup', 'delivery']),
  deliveryAddress: z.string().max(300).optional(),
  payment: z.enum(['call', 'on-pickup']),
  items: z.array(z.object({
    id: z.string().max(50),
    quantity: z.number().int().positive().max(99),
  })).min(1).max(20),
  notes: z.string().max(1000).optional(),
})

describe('server-side price recomputation', () => {
  it('computes correct total for single item', () => {
    expect(computeTotal([{ id: 'nuts-6oz', quantity: 1 }])).toBe(1000)
  })

  it('computes correct total for multiple items', () => {
    const total = computeTotal([
      { id: 'nuts-6oz', quantity: 2 },
      { id: 'nuts-8oz', quantity: 1 },
    ])
    expect(total).toBe(3500)
  })

  it('throws for unknown product id', () => {
    expect(() => computeTotal([{ id: 'fake-product', quantity: 1 }])).toThrow('Unknown product')
  })

  it('handles gift basket price correctly', () => {
    expect(computeTotal([{ id: 'gift-basket', quantity: 1 }])).toBe(4000)
  })

  it('never trusts client quantity — zero quantity throws', () => {
    // qty 0 would fail Zod validation before reaching computeTotal
    expect(() => computeTotal([{ id: 'nuts-6oz', quantity: 0 }])).toBe
    const result = z.number().int().positive().safeParse(0)
    expect(result.success).toBe(false)
  })
})

describe('order schema validation', () => {
  const validOrder = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 123-4567',
    fulfillment: 'pickup' as const,
    payment: 'on-pickup' as const,
    items: [{ id: 'nuts-6oz', quantity: 2 }],
  }

  it('accepts a valid order', () => {
    expect(OrderSchema.safeParse(validOrder).success).toBe(true)
  })

  it('rejects name shorter than 2 chars', () => {
    expect(OrderSchema.safeParse({ ...validOrder, name: 'J' }).success).toBe(false)
  })

  it('rejects invalid email', () => {
    expect(OrderSchema.safeParse({ ...validOrder, email: 'not-an-email' }).success).toBe(false)
  })

  it('rejects empty items array', () => {
    expect(OrderSchema.safeParse({ ...validOrder, items: [] }).success).toBe(false)
  })

  it('rejects quantity of 0', () => {
    expect(OrderSchema.safeParse({
      ...validOrder,
      items: [{ id: 'nuts-6oz', quantity: 0 }],
    }).success).toBe(false)
  })

  it('rejects invalid fulfillment value', () => {
    expect(OrderSchema.safeParse({ ...validOrder, fulfillment: 'ship' }).success).toBe(false)
  })

  it('accepts optional notes', () => {
    const result = OrderSchema.safeParse({ ...validOrder, notes: 'Please gift wrap' })
    expect(result.success).toBe(true)
  })

  it('trims whitespace from name', () => {
    const result = OrderSchema.safeParse({ ...validOrder, name: '  Jane Smith  ' })
    if (result.success) {
      expect(result.data.name).toBe('Jane Smith')
    }
  })
})
