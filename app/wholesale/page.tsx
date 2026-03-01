'use client'

import { useState } from 'react'

export default function WholesalePage() {
  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    quantity: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Wholesale Inquiry — ${form.business}`,
          message: `Business: ${form.business}\nEstimated quantity: ${form.quantity}\n\n${form.message}`,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #8B4513, #5c2d0e)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wholesale & Bulk Orders</h1>
          <p className="text-orange-200 text-lg">
            Bring The Nut Barn to your business, event, or gift program.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: '#8B4513' }}>Great For</h2>
            <div className="space-y-4">
              {[
                { icon: '🏪', title: 'Retail / Gift Shops', body: 'Stock our nuts in your store. Customers love finding local, artisan snacks.' },
                { icon: '🍽️', title: 'Restaurants & Cafes', body: 'Add cinnamon roasted nuts to your menu as a topping, snack, or dessert component.' },
                { icon: '🎁', title: 'Corporate Gifting', body: 'Branded or unbranded gift sets for employee appreciation, client gifts, or events.' },
                { icon: '🎉', title: 'Events & Weddings', body: 'Personalized nut bags as party favors or dessert table features.' },
              ].map(item => (
                <div key={item.title} className="card">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#8B4513' }}>{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 card">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#8B4513' }}>Inquiry Sent!</h3>
                <p className="text-gray-600">
                  Thanks for your interest! We&apos;ll be in touch within 1–2 business days with wholesale pricing and details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold mb-6" style={{ color: '#8B4513' }}>Wholesale Inquiry</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-1 text-gray-700">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                      style={{ borderColor: '#ede9df' }}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold mb-1 text-gray-700">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="business" name="business" type="text" required
                      value={form.business} onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                      style={{ borderColor: '#ede9df' }}
                      placeholder="Acme Gift Shop"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                    style={{ borderColor: '#ede9df' }}
                    placeholder="jane@yourbusiness.com"
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold mb-1 text-gray-700">
                    Estimated Monthly Quantity
                  </label>
                  <select
                    id="quantity" name="quantity"
                    value={form.quantity} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-white"
                    style={{ borderColor: '#ede9df' }}
                  >
                    <option value="">Select a range...</option>
                    <option value="10–25 bags">10–25 bags</option>
                    <option value="25–50 bags">25–50 bags</option>
                    <option value="50–100 bags">50–100 bags</option>
                    <option value="100+ bags">100+ bags</option>
                    <option value="One-time event order">One-time event order</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-1 text-gray-700">
                    Tell us more
                  </label>
                  <textarea
                    id="message" name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-y"
                    style={{ borderColor: '#ede9df' }}
                    placeholder="What products are you interested in? Any special packaging or branding needs?"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-sm">
                    Something went wrong. Email us directly at thenutbarnllc@gmail.com.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full py-3 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Wholesale Inquiry →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
