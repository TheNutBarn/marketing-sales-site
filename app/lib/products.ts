import type { Product } from '../../shared/types/product'

export const PRODUCTS: Product[] = [
  {
    id: 'nuts-6oz',
    name: '6 oz Cinnamon Roasted Nuts',
    priceInCents: 1000,
    weightOz: 6,
    shortDescription: 'The perfect snack size — warm cinnamon glaze with FIVE simple ingredients.',
    longDescription: 'Our signature cinnamon roasted nuts use just five simple ingredients. No artificial flavors, no preservatives — just the way grandma made them.',
    dietaryTags: ['vegan', 'gluten-free'],
  },
  {
    id: 'nuts-8oz',
    name: '8 oz Cinnamon Roasted Nuts',
    priceInCents: 1500,
    weightOz: 8,
    shortDescription: 'Most popular size — perfect for sharing at home or taking on the road.',
    longDescription: "Our most popular bag. The same five-ingredient cinnamon glaze you'll follow from a hundred yards away at the market.",
    dietaryTags: ['vegan', 'gluten-free'],
  },
  {
    id: 'nuts-15oz',
    name: '15 oz Cinnamon Roasted Nuts',
    priceInCents: 2300,
    weightOz: 15,
    shortDescription: 'Family size — stock up and savor every last nut.',
    longDescription: "When you can't get enough. Our family-size bag keeps the cinnamon aroma alive all week — if they last that long.",
    dietaryTags: ['vegan', 'gluten-free'],
  },
  {
    id: 'gift-basket',
    name: 'Holiday Gift Basket',
    priceInCents: 4000,
    weightOz: 0,
    shortDescription: 'The perfect gift — curated basket with all three sizes and a personal note.',
    longDescription: 'Give the gift of warm, fresh-roasted cinnamon nuts. Our Holiday Gift Basket includes all three bag sizes, presented in a rustic wooden basket perfect for any occasion.',
    dietaryTags: ['vegan', 'gluten-free'],
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

/** Format cents as dollar string, e.g. 1000 → "$10.00" */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}
