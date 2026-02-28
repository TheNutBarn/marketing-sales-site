// WordPress headless CMS integration via WPGraphQL
// Falls back to mock data when WORDPRESS_API_URL is not set.

export interface WPEvent {
  id: string
  title: string
  date: string // ISO date string, e.g. "2026-03-15"
  locationName: string
  locationAddress: string
  description: string
  isRecurring: boolean
  recurringDay?: string // e.g. "Saturday"
  recurringTime?: string // e.g. "9am–2pm"
  externalLink?: string
}

export interface WPPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  categories: string[]
  featuredImageUrl?: string
}

// ---------------------------------------------------------------------------
// Mock data — used when WORDPRESS_API_URL is not configured
// ---------------------------------------------------------------------------

const MOCK_EVENTS: WPEvent[] = [
  {
    id: 'holt-farmers-market',
    title: "Holt Farmer's Market",
    date: '',
    locationName: "Holt Farmer's Market",
    locationAddress: 'Holt, Michigan',
    description:
      'Our permanent home! Come visit us every Saturday for fresh roasted nuts and hot chocolate. Rain or shine.',
    isRecurring: true,
    recurringDay: 'Saturday',
    recurringTime: '9am–2pm',
  },
  {
    id: 'community-events',
    title: 'Community Events',
    date: '',
    locationName: 'Various locations around Mid-Michigan',
    locationAddress: 'Mid-Michigan',
    description:
      'We love participating in festivals, fairs, and community events. Follow us on Facebook and Instagram for the latest schedule.',
    isRecurring: false,
  },
]

const MOCK_POSTS: WPPost[] = [
  {
    id: 'post-1',
    slug: 'five-ways-to-use-cinnamon-roasted-nuts',
    title: '5 Ways to Use Cinnamon Roasted Nuts (Beyond Snacking)',
    excerpt:
      'From salad toppers to ice cream finishers, our cinnamon roasted nuts elevate everything they touch. Here are our five favorite uses.',
    date: '2026-02-01',
    categories: ['Recipes'],
  },
  {
    id: 'post-2',
    slug: 'the-perfect-holiday-gift',
    title: 'The Perfect Holiday Gift for People Who Have Everything',
    excerpt:
      'Still searching for that unique, handcrafted gift? Our cinnamon roasted nut gift baskets ship nationwide and arrive fresh.',
    date: '2026-01-15',
    categories: ['Gift Guides'],
  },
  {
    id: 'post-3',
    slug: 'how-we-got-started',
    title: 'How We Got Started: The Nut Barn Story',
    excerpt:
      "It started with a husband who never said no in 26 years of marriage — and a little nut stand that sparked a community.",
    date: '2026-01-01',
    categories: ['Behind the Scenes'],
  },
]

// ---------------------------------------------------------------------------
// GraphQL fetch helpers
// ---------------------------------------------------------------------------

async function wpFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const apiUrl = process.env.WORDPRESS_API_URL
  if (!apiUrl) {
    throw new Error('WORDPRESS_API_URL is not configured')
  }

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status}`)
  }

  const json = await res.json()
  if (json.errors) {
    throw new Error(`WPGraphQL errors: ${JSON.stringify(json.errors)}`)
  }
  return json.data as T
}

// ---------------------------------------------------------------------------
// Public API — used by pages
// ---------------------------------------------------------------------------

export async function getEvents(): Promise<WPEvent[]> {
  if (!process.env.WORDPRESS_API_URL) {
    return MOCK_EVENTS
  }

  try {
    const data = await wpFetch<{ events: { nodes: WPEvent[] } }>(`
      query GetEvents {
        events(first: 20, where: { orderby: { field: DATE, order: ASC } }) {
          nodes {
            id
            title
            date
            locationName
            locationAddress
            description
            isRecurring
            recurringDay
            recurringTime
            externalLink
          }
        }
      }
    `)
    return data.events.nodes
  } catch {
    // Graceful fallback to mock data if WP is unreachable
    return MOCK_EVENTS
  }
}

export async function getPosts(limit = 10): Promise<WPPost[]> {
  if (!process.env.WORDPRESS_API_URL) {
    return MOCK_POSTS
  }

  try {
    const data = await wpFetch<{ posts: { nodes: WPPost[] } }>(`
      query GetPosts($first: Int!) {
        posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            slug
            title
            excerpt
            date
            categories {
              nodes {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `, { first: limit })
    return data.posts.nodes
  } catch {
    return MOCK_POSTS
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!process.env.WORDPRESS_API_URL) {
    return MOCK_POSTS.find(p => p.slug === slug) ?? null
  }

  try {
    const data = await wpFetch<{ post: WPPost | null }>(`
      query GetPost($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          slug
          title
          excerpt
          date
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    `, { slug })
    return data.post
  } catch {
    return null
  }
}
