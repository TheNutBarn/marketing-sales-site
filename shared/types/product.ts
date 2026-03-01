export interface Product {
  id: string
  name: string
  priceInCents: number   // stored as integers to avoid float arithmetic errors
  weightOz: number
  shortDescription: string
  longDescription?: string
  dietaryTags: ('vegan' | 'gluten-free')[]
  image?: string         // path relative to /public, e.g. '/images/nuts-6oz.jpg'
}
