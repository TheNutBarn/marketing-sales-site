import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: {
    default: 'The Nut Barn — Fresh Cinnamon Roasted Nuts | Lansing, Michigan',
    template: '%s | The Nut Barn',
  },
  description:
    'Fresh cinnamon roasted nuts — vegan, gluten-free, made with 5 simple ingredients. Visit us at the Holt Farmer\'s Market every Saturday, or order online. Dimondale, Michigan.',
  keywords: [
    'cinnamon roasted nuts',
    'Lansing Michigan',
    'farmer\'s market Dimondale',
    'vegan gluten free snacks Michigan',
    'roasted nuts gift',
    'Holt Farmer\'s Market',
  ],
  openGraph: {
    siteName: 'The Nut Barn',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'The Nut Barn',
  description:
    'Fresh cinnamon roasted nuts — vegan, gluten-free, made with only 5 simple ingredients. Family business serving Mid-Michigan since 2023.',
  url: 'https://thenutbarn.com',
  telephone: '+15174109029',
  email: 'thenutbarnllc@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dimondale',
    addressRegion: 'MI',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '42.6459',
    longitude: '-84.6474',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  servesCuisine: 'Snacks',
  priceRange: '$',
  sameAs: [
    'https://www.facebook.com/thenutbarn',
    'https://www.instagram.com/thenutbarn',
  ],
  foundingDate: '2023',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
