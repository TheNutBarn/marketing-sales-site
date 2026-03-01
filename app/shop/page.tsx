import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'

export const metadata: Metadata = {
  title: 'Shop — Cinnamon Roasted Nuts & Gift Baskets',
  description:
    'Order fresh cinnamon roasted nuts online. 6 oz, 8 oz, and 15 oz bags plus custom holiday gift baskets. Vegan, gluten-free, shipped nationwide.',
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The Nut Barn Products',
  itemListElement: PRODUCTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: p.name,
      description: p.longDescription,
      offers: {
        '@type': 'Offer',
        price: p.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'The Nut Barn' },
      },
    },
  })),
}

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero */}
      <section
        className="py-12 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #8B4513, #5c2d0e)' }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Shop The Nut Barn</h1>
          <p className="text-orange-100 text-lg">
            Fresh cinnamon roasted nuts, shipped to your door. Vegan · Gluten-Free · 5 Simple Ingredients.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Our Products</h2>
          <div className="section-divider" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map(product => (
              <div key={product.id} className="card">
                <div className="flex gap-6">
                  {/* Product image placeholder */}
                  <div
                    className="w-28 h-28 rounded-xl flex items-center justify-center text-5xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #ede9df, #f8f6f0)' }}
                    aria-label={`${product.name} — product image`}
                  >
                    {product.emoji}
                  </div>

                  {/* Product info */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1" style={{ color: '#8B4513' }}>
                      {product.name}
                    </h2>
                    <p className="text-2xl font-bold mb-2" style={{ color: '#ff6b35' }}>
                      {product.priceDisplay}
                    </p>
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {product.dietaryTags.map(tag => (
                        <span key={tag} className="trust-badge text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      {product.longDescription}
                    </p>
                    {product.bestFor.length > 0 && (
                      <p className="text-xs text-gray-500 mb-4">
                        <strong>Great for:</strong> {product.bestFor.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: '#ede9df' }}>
                  <AddToCartButton id={product.id} name={product.name} price={product.price} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ordering works */}
      <section className="py-16 px-4" style={{ backgroundColor: '#ede9df' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">How Ordering Works</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { step: '1', icon: '🛒', title: 'Add to Cart', body: 'Select your products and quantities above.' },
              { step: '2', icon: '📧', title: 'Send Your Order', body: 'Click "Order via Email" — your cart opens in your email app, pre-filled and ready to send.' },
              { step: '3', icon: '📦', title: 'We Confirm & Ship', body: "We'll reply with payment options (Square, PayPal, Venmo) and a shipping confirmation." },
            ].map(item => (
              <div key={item.step} className="card text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mx-auto mb-2"
                  style={{ backgroundColor: '#ff6b35' }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold mb-1" style={{ color: '#8B4513' }}>{item.title}</h3>
                <p className="text-sm text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Stripe coming soon */}
          <div className="card inline-flex items-center gap-3 text-sm text-gray-600">
            <span>💳</span>
            <span>
              <strong>Coming soon:</strong> Pay by card directly on this site. For now, we accept Square, PayPal, and Venmo.
            </span>
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section
        className="py-10 px-4 text-center text-white"
        style={{ backgroundColor: '#8B4513' }}
      >
        <h2 className="text-2xl font-bold mb-2">Need a Large Order?</h2>
        <p className="text-orange-200 mb-4">We offer bulk pricing for businesses, events, and corporate gifting.</p>
        <a href="/wholesale" className="btn-primary">
          Wholesale Inquiries →
        </a>
      </section>
    </>
  )
}
