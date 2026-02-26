import type { Metadata } from 'next'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'

export const metadata: Metadata = {
  title: 'The Nut Barn — Fresh Cinnamon Roasted Nuts | Lansing, Michigan',
  description:
    'Fresh cinnamon roasted nuts — vegan, gluten-free, 5 simple ingredients. Family business at Holt Farmer\'s Market every Saturday. Dimondale, Michigan.',
}

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-32 text-center text-white"
        style={{
          background: 'linear-gradient(135deg, #8B4513 0%, #5c2d0e 60%, #3d1c08 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-orange-200 text-sm uppercase tracking-widest mb-3 font-semibold">
            Family Business · Est. 2023 · Dimondale, Michigan
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Fresh Cinnamon Roasted Nuts
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8">
            Vegan &amp; Gluten-Free · Made with Only 5 Simple Ingredients
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['🌱 Vegan', '🌾 Gluten-Free', '🤚 5 Ingredients', '💛 Family Made'].map(badge => (
              <span
                key={badge}
                className="px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'rgba(255,107,53,0.25)', border: '1px solid rgba(255,107,53,0.5)' }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn-primary text-lg px-8 py-4">
              Shop Now →
            </Link>
            <Link
              href="/our-story"
              className="inline-block px-8 py-4 rounded-full font-semibold border-2 border-white text-white hover:bg-white hover:text-brown transition-all duration-200 text-lg"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Wave */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 md:h-12"
          style={{
            background: '#f8f6f0',
            clipPath: 'ellipse(55% 100% at 50% 100%)',
          }}
        />
      </section>

      {/* Find Us Strip */}
      <section
        className="py-4 text-center text-white text-sm font-semibold"
        style={{ backgroundColor: '#ff6b35' }}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
          <span>📍 Every Saturday · Holt Farmer&apos;s Market · 9am–2pm</span>
          <Link href="/find-us" className="underline hover:no-underline">
            See full schedule →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Our Products</h2>
          <div className="section-divider" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="card text-center">
                <div className="text-6xl mb-4">{product.emoji}</div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#8B4513' }}>
                  {product.name}
                </h3>
                <p className="text-2xl font-bold mb-2" style={{ color: '#ff6b35' }}>
                  {product.priceDisplay}
                </p>
                <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>
                <div className="flex gap-1.5 justify-center mb-4">
                  {product.dietaryTags.map(tag => (
                    <span key={tag} className="trust-badge text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <AddToCartButton id={product.id} name={product.name} price={product.price} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop" className="btn-primary">
              View All Products (including Gift Baskets) →
            </Link>
          </div>
        </div>
      </section>

      {/* Story Teaser */}
      <section className="py-16 px-4 text-white" style={{ backgroundColor: '#8B4513' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">A Smell You Can Follow for 100 Yards</h2>
          <p className="text-orange-100 text-lg leading-relaxed mb-4">
            Our story began in August 2023 when my husband and I decided to embark on a new adventure.
            I remember these little nut stands being at the mall growing up in the 80s — you could just
            follow that smell from a hundred yards away.
          </p>
          <p className="text-orange-100 text-lg leading-relaxed mb-8">
            We jumped in with both feet, found a permanent home at the Holt Farmer&apos;s Market, and before
            long, we had regulars who came just to see us for hot chocolate and roasted nuts.
          </p>
          <Link
            href="/our-story"
            className="inline-block px-8 py-3 rounded-full font-bold border-2 border-white text-white hover:bg-white transition-all duration-200"
            style={{ '--tw-text-opacity': 1 } as React.CSSProperties}
          >
            Read Our Full Story →
          </Link>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4" style={{ backgroundColor: '#ede9df' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Why Customers Love Us</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🌱',
                title: '100% Vegan',
                body: 'Every product we make is vegan and gluten-free — great for nearly any diet or lifestyle.',
              },
              {
                icon: '🤚',
                title: '5 Simple Ingredients',
                body: 'No mystery ingredients. Just simple, wholesome, recognizable things. You know exactly what you\'re eating.',
              },
              {
                icon: '💛',
                title: 'Family Business',
                body: 'We are a family business sharing a passion for community and great food. Every bag is made with love.',
              },
            ].map(item => (
              <div key={item.title} className="card text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#8B4513' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section
        className="py-12 px-4 text-center text-white"
        style={{ backgroundColor: '#5c2d0e' }}
      >
        <h2 className="text-2xl font-bold mb-2">Follow Our Journey</h2>
        <p className="text-orange-200 mb-6">Weekly market updates, new events, and behind-the-scenes from The Nut Barn</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.instagram.com/thenutbarn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
          >
            Follow on Instagram
          </a>
          <a
            href="https://www.facebook.com/thenutbarn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: '#1877F2' }}
          >
            Follow on Facebook
          </a>
        </div>
      </section>
    </>
  )
}
