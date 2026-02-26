'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

interface Props {
  id: string
  name: string
  price: number
}

export default function AddToCartButton({ id, name, price }: Props) {
  const { addItem, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(id, name, price, quantity)
    setQuantity(1)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="w-10 h-10 rounded-full border-2 font-bold text-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
          style={{ borderColor: '#8B4513', color: '#8B4513' }}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="w-10 h-10 rounded-full border-2 font-bold text-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
          style={{ borderColor: '#8B4513', color: '#8B4513' }}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-3 rounded-full font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{ backgroundColor: added ? '#5c2d0e' : '#ff6b35' }}
      >
        {added ? '✓ Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  )
}
