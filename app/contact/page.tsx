'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
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
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-orange-200 text-lg">
            Questions, orders, events, or just want to say hi — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#8B4513' }}>Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#8B4513' }}>Email</p>
                    <a
                      href="mailto:thenutbarnllc@gmail.com"
                      className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
                    >
                      thenutbarnllc@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#8B4513' }}>Phone</p>
                    <a
                      href="tel:+15174109029"
                      className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
                    >
                      (517) 410-9029
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#8B4513' }}>Location</p>
                    <p className="text-gray-600 text-sm">Dimondale, Michigan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold mb-3" style={{ color: '#8B4513' }}>Find Us</h3>
              <p className="text-sm text-gray-600 mb-1">
                🏪 Holt Farmer&apos;s Market — Every Saturday 9am–2pm
              </p>
              <p className="text-sm text-gray-500">Plus community events around Mid-Michigan.</p>
            </div>

            <div>
              <h3 className="font-bold mb-3" style={{ color: '#8B4513' }}>Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/thenutbarn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#1877F2' }}
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/thenutbarn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:opacity-80 transition-opacity"
                  style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 card">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#8B4513' }}>
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thanks for reaching out! We&apos;ll get back to you within 1–2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold mb-6" style={{ color: '#8B4513' }}>
                  Send a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-1 text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ede9df', '--tw-ring-color': '#ff6b35' } as React.CSSProperties}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ede9df', '--tw-ring-color': '#ff6b35' } as React.CSSProperties}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-1 text-gray-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white"
                    style={{ borderColor: '#ede9df', '--tw-ring-color': '#ff6b35' } as React.CSSProperties}
                  >
                    <option value="">Select a topic...</option>
                    <option value="General Question">General Question</option>
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Event Inquiry">Book Us for an Event</option>
                    <option value="Wholesale Inquiry">Wholesale / Bulk Order</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-1 text-gray-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 resize-y"
                    style={{ borderColor: '#ede9df', '--tw-ring-color': '#ff6b35' } as React.CSSProperties}
                    placeholder="How can we help you?"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-sm">
                    Something went wrong. Please try again or email us directly at thenutbarnllc@gmail.com.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
