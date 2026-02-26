import type { Metadata } from 'next'
import Link from 'next/link'
import { getEvents } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: "Find Us — Holt Farmer's Market & Community Events",
  description:
    "Find The Nut Barn at the Holt Farmer's Market every Saturday 9am–2pm, plus community events around Mid-Michigan. Dimondale, Michigan.",
}

export default async function FindUsPage() {
  const events = await getEvents()
  const recurring = events.filter(e => e.isRecurring)
  const upcoming = events.filter(e => !e.isRecurring)

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #8B4513, #5c2d0e)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Us</h1>
          <p className="text-orange-200 text-lg">
            We&apos;re out in the community every week. Come say hello — and follow the smell!
          </p>
        </div>
      </section>

      {/* Regular Schedule */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Regular Schedule</h2>
          <div className="section-divider" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {recurring.map(event => (
              <div key={event.id} className="card border-l-4" style={{ borderLeftColor: '#ff6b35' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#8B4513' }}>
                  🏪 {event.title}
                </h3>
                {event.recurringDay && (
                  <p className="font-semibold mb-1">
                    📅 Every {event.recurringDay}
                    {event.recurringTime && ` · ${event.recurringTime}`}
                  </p>
                )}
                <p className="text-gray-600 mb-1">📍 {event.locationName}</p>
                {event.locationAddress && event.locationAddress !== event.locationName && (
                  <p className="text-gray-500 text-sm mb-3">{event.locationAddress}</p>
                )}
                <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
              </div>
            ))}

            {/* Online Orders card */}
            <div className="card border-l-4" style={{ borderLeftColor: '#8B4513' }}>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#8B4513' }}>
                📦 Online Orders
              </h3>
              <p className="font-semibold mb-1">📅 Anytime</p>
              <p className="text-gray-600 mb-3">📍 Shipped Nationwide</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Can&apos;t make it to an event? Order online and we&apos;ll ship fresh nuts right to your door!
              </p>
              <Link href="/shop" className="btn-primary text-sm">
                Shop Online →
              </Link>
            </div>
          </div>

          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <div
              className="w-full h-64 md:h-96 flex items-center justify-center text-gray-500 text-center"
              style={{ backgroundColor: '#ede9df' }}
            >
              <div>
                <div className="text-5xl mb-3">🗺️</div>
                <p className="font-semibold" style={{ color: '#8B4513' }}>Holt Farmer&apos;s Market</p>
                <p className="text-sm">Holt, Michigan</p>
                <p className="text-xs mt-2 text-gray-400">Map embed — configure Google Maps API key</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: '#ede9df' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">Upcoming Events</h2>
            <div className="section-divider" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map(event => (
                <div key={event.id} className="card">
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#8B4513' }}>
                    🎪 {event.title}
                  </h3>
                  {event.date && (
                    <p className="text-sm font-semibold mb-1">
                      📅 {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm mb-2">📍 {event.locationName}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  {event.externalLink && (
                    <a
                      href={event.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm font-semibold"
                      style={{ color: '#ff6b35' }}
                    >
                      Event Details →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — Follow for Updates */}
      <section
        className="py-12 px-4 text-center text-white"
        style={{ backgroundColor: '#8B4513' }}
      >
        <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
        <p className="text-orange-200 mb-4">
          Follow us for last-minute event additions and market updates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <a
            href="https://www.facebook.com/thenutbarn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: '#1877F2' }}
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/thenutbarn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
          >
            Instagram
          </a>
        </div>
        <p className="text-orange-200 text-sm">
          Event organizer?{' '}
          <Link href="/contact?subject=Event+Inquiry" className="underline hover:no-underline text-white">
            Get in touch to book The Nut Barn for your event →
          </Link>
        </p>
      </section>
    </>
  )
}
