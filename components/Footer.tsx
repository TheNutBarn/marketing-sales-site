import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-white mt-16" style={{ backgroundColor: '#5c2d0e' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#ff6b35' }}>Contact Us</h3>
            <ul className="space-y-2 text-orange-100 text-sm">
              <li>
                <a href="mailto:thenutbarnllc@gmail.com" className="hover:text-white transition-colors">
                  📧 thenutbarnllc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+15174109029" className="hover:text-white transition-colors">
                  📞 (517) 410-9029
                </a>
              </li>
              <li>📍 Dimondale, Michigan</li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#ff6b35' }}>Payment Methods</h3>
            <ul className="space-y-2 text-orange-100 text-sm">
              <li>💳 Square</li>
              <li>💰 PayPal</li>
              <li>📱 Venmo @nutbarn</li>
            </ul>
          </div>

          {/* Follow + Links */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#ff6b35' }}>Follow Us</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/thenutbarn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-80"
                style={{ backgroundColor: '#1877F2' }}
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/thenutbarn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-80"
                style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
              >
                Instagram
              </a>
            </div>
            <nav className="flex flex-col gap-1">
              {[
                { href: '/shop', label: 'Shop' },
                { href: '/our-story', label: 'Our Story' },
                { href: '/find-us', label: 'Find Us' },
                { href: '/faq', label: 'FAQ' },
                { href: '/wholesale', label: 'Wholesale' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-orange-200 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-orange-200"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <p>© {new Date().getFullYear()} The Nut Barn LLC. All rights reserved.</p>
          <p>🌱 Vegan · 🌾 Gluten-Free · 🤚 5 Simple Ingredients · 💛 Family Business Est. 2023</p>
        </div>
      </div>
    </footer>
  )
}
