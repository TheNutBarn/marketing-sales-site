'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/lib/cart-context'

type Step = 'cart' | 'checkout' | 'success'
type SendStatus = 'idle' | 'sending' | 'error'

export default function CartDrawer() {
  const { items, isOpen, total, removeItem, updateQuantity, clearCart, closeCart } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState<Step>('cart')
  const [form, setForm] = useState({ name: '', email: '', notes: '' })
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle')

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

  // Reset to cart step when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setStep('cart')
      setSendStatus('idle')
    }
  }, [isOpen])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSendStatus('sending')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          notes: form.notes,
          items,
          total,
        }),
      })
      if (res.ok) {
        clearCart()
        setForm({ name: '', email: '', notes: '' })
        setSendStatus('idle')
        setStep('success')
      } else {
        setSendStatus('error')
      }
    } catch {
      setSendStatus('error')
    }
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
          <div className="flex items-center gap-2">
            {step === 'checkout' && (
              <button
                onClick={() => { setStep('cart'); setSendStatus('idle') }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 text-sm"
                aria-label="Back to cart"
              >
                ←
              </button>
            )}
            <h2 className="text-xl font-bold" style={{ color: '#8B4513' }}>
              {step === 'cart' && 'Your Cart'}
              {step === 'checkout' && 'Your Details'}
              {step === 'success' && 'Order Sent!'}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">

          {/* Success */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-4">
              <div className="text-6xl">🥜</div>
              <h3 className="text-2xl font-bold" style={{ color: '#8B4513' }}>Order Received!</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&apos;ve emailed you a confirmation and will be in touch shortly to arrange payment and pickup.
              </p>
              <button
                onClick={closeCart}
                className="btn-primary mt-2"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {/* Cart items */}
          {step === 'cart' && (
            items.length === 0 ? (
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
            )
          )}

          {/* Checkout form */}
          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
              <p className="text-sm text-gray-500">
                Enter your details and we&apos;ll confirm your order and arrange payment.
              </p>
              <div>
                <label htmlFor="checkout-name" className="block text-sm font-semibold mb-1 text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: '#ede9df', '--tw-ring-color': '#ff6b35' } as React.CSSProperties}
                />
              </div>
              <div>
                <label htmlFor="checkout-email" className="block text-sm font-semibold mb-1 text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: '#ede9df', '--tw-ring-color': '#ff6b35' } as React.CSSProperties}
                />
              </div>
              <div>
                <label htmlFor="checkout-notes" className="block text-sm font-semibold mb-1 text-gray-700">
                  Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="checkout-notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleFormChange}
                  placeholder="Pickup preferences, questions, etc."
                  className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none"
                  style={{ borderColor: '#ede9df', '--tw-ring-color': '#ff6b35' } as React.CSSProperties}
                />
              </div>
              {sendStatus === 'error' && (
                <p className="text-red-600 text-sm">
                  Something went wrong. Please try again or call us at (517) 410-9029.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-4 border-t space-y-3" style={{ borderColor: '#ede9df' }}>
            <div className="flex justify-between items-center text-lg font-bold" style={{ color: '#8B4513' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setStep('checkout')}
              className="w-full py-3 rounded-full font-bold text-white text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: '#ff6b35' }}
            >
              Place Order →
            </button>
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

        {step === 'checkout' && (
          <div className="p-4 border-t space-y-3" style={{ borderColor: '#ede9df' }}>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{items.reduce((n, i) => n + i.quantity, 0)} item{items.reduce((n, i) => n + i.quantity, 0) !== 1 ? 's' : ''}</span>
              <span className="font-bold" style={{ color: '#8B4513' }}>${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              disabled={sendStatus === 'sending'}
              className="w-full py-3 rounded-full font-bold text-white text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: '#ff6b35' }}
            >
              {sendStatus === 'sending' ? 'Sending Order...' : 'Send Order →'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
