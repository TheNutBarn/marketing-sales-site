export interface Product {
  id: string
  name: string
  price: number
  priceDisplay: string
  weightOz: number | null
  shortDescription: string
  longDescription: string
  dietaryTags: string[]
  bestFor: string[]
  emoji: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'nuts-6oz',
    name: '6 oz Cinnamon Roasted Nuts',
    price: 10.0,
    priceDisplay: '$10.00',
    weightOz: 6,
    shortDescription: 'Perfect for snacking and gifting.',
    longDescription:
      'Our signature cinnamon roasted nuts in a 6 oz bag — the perfect personal size. Made with only 5 simple ingredients, these warm, crunchy nuts are great on the go or as a thoughtful small gift.',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    bestFor: ['Snacking', 'Small gifts', 'Salad toppings'],
    emoji: '🥜',
  },
  {
    id: 'nuts-8oz',
    name: '8 oz Cinnamon Roasted Nuts',
    price: 15.0,
    priceDisplay: '$15.00',
    weightOz: 8,
    shortDescription: 'Our most popular size.',
    longDescription:
      'The sweet spot — our 8 oz bag is our most popular size. Enough to share (or not!). Try them on ice cream, oatmeal, or just by the handful.',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    bestFor: ['Gifting', 'Ice cream topping', 'Oatmeal', 'Sharing'],
    emoji: '🥜',
  },
  {
    id: 'nuts-15oz',
    name: '15 oz Cinnamon Roasted Nuts',
    price: 23.0,
    priceDisplay: '$23.00',
    weightOz: 15,
    shortDescription: 'Family size — stock up and save.',
    longDescription:
      'The family size — great value for those who can\'t get enough. Stock your pantry or grab one as a generous gift. Pairs beautifully with hot chocolate.',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    bestFor: ['Family snacking', 'Larger gifts', 'Events', 'Hot chocolate pairing'],
    emoji: '🥜',
  },
  {
    id: 'gift-basket',
    name: 'Holiday Gift Basket',
    price: 40.0,
    priceDisplay: 'Starting at $40.00',
    weightOz: null,
    shortDescription: 'Custom gift baskets for any occasion.',
    longDescription:
      'A curated gift basket featuring our cinnamon roasted nuts — perfect for holidays, corporate gifting, or any special occasion. Custom configurations available. Contact us to discuss your vision.',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    bestFor: ['Holidays', 'Corporate gifting', 'Birthdays', 'Thank you gifts'],
    emoji: '🎁',
  },
]
