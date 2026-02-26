'use client'

import { useEffect, useRef } from 'react'
import { useCart } from '@/lib/cart-context'

export default function CartDrawer() {
  const { items, isOpen, total, removeItem, updateQuantity, clearCart, closeCart, buildMailtoLink } =
    useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleCheckout = () => {
    if (items.length === 0) return
    window.location.href = buildMailtoLink()
    clearCart()
    closeCart()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#ede9df' }}>
          <h2 className="text-xl font-bold" style={{ color: '#8B4513' }}>
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-4">
              <span className="text-5xl">🛒</span>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some delicious nuts to get started!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#f8f6f0' }}>
                  <div className="text-3xl">🥜</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 leading-tight">{item.name}</p>
                    <p className="text-sm font-bold mt-1" style={{ color: '#ff6b35' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border font-bold text-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        style={{ borderColor: '#8B4513', color: '#8B4513' }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border font-bold text-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        style={{ borderColor: '#8B4513', color: '#8B4513' }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm p-1"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t space-y-3" style={{ borderColor: '#ede9df' }}>
            <div className="flex justify-between items-center text-lg font-bold" style={{ color: '#8B4513' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-full font-bold text-white text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: '#ff6b35' }}
            >
              Order via Email →
            </button>

            <p className="text-xs text-center text-gray-400">
              Your order summary will open in your email app.
              We&apos;ll confirm payment and shipping details.
            </p>

            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                <span>💳</span>
                <span>Coming soon: Pay by card (Stripe)</span>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-1"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
