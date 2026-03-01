import type { WPEvent } from '../../shared/types/event'

const MOCK_EVENTS: WPEvent[] = [
  {
    id: 'mock-1',
    title: "Holt Farmer's Market",
    date: '2026-03-07T09:00:00',
    endDate: '2026-03-07T14:00:00',
    location: "Holt Farmer's Market",
    address: '2136 Cedar St, Holt, MI 48842',
    description: "Find us every Saturday at the Holt Farmer's Market! Fresh cinnamon roasted nuts and our famous Hot Chocolate Bar.",
    status: 'upcoming',
  },
  {
    id: 'mock-2',
    title: "Holt Farmer's Market",
    date: '2026-03-14T09:00:00',
    endDate: '2026-03-14T14:00:00',
    location: "Holt Farmer's Market",
    address: '2136 Cedar St, Holt, MI 48842',
    description: "Find us every Saturday at the Holt Farmer's Market! Fresh cinnamon roasted nuts and our famous Hot Chocolate Bar.",
    status: 'upcoming',
  },
]

const EVENTS_QUERY = `
  query GetEvents {
    events(first: 20, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        title
        eventFields {
          date
          endDate
          location
          address
          description
        }
      }
    }
  }
`

interface GqlResponse<T> {
  data: T
  errors?: Array<{ message: string }>
}

interface EventNode {
  id: string
  title: string
  eventFields: {
    date: string
    endDate?: string
    location: string
    address?: string
    description?: string
  }
}

async function gqlFetch<T>(query: string, url: string): Promise<T> {
  const res = await $fetch<GqlResponse<T>>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (res.errors?.length) {
    throw new Error(`WPGraphQL: ${res.errors.map(e => e.message).join(', ')}`)
  }
  return res.data
}

export async function getEvents(): Promise<WPEvent[]> {
  const config = useRuntimeConfig()
  const apiUrl = config.public.wordpressApiUrl

  if (!apiUrl) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('NUXT_WORDPRESS_API_URL is required in production')
    }
    return MOCK_EVENTS
  }

  try {
    const data = await gqlFetch<{ events: { nodes: EventNode[] } }>(EVENTS_QUERY, apiUrl)
    const now = new Date()

    return data.events.nodes.map((node) => {
      const eventDate = new Date(node.eventFields.date)
      const isToday = eventDate.toDateString() === now.toDateString()
      const isPast = eventDate < now && !isToday

      return {
        id: node.id,
        title: node.title,
        date: node.eventFields.date,
        endDate: node.eventFields.endDate,
        location: node.eventFields.location,
        address: node.eventFields.address,
        description: node.eventFields.description,
        status: isPast ? 'past' : isToday ? 'today' : 'upcoming',
      } satisfies WPEvent
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'production') throw err
    console.warn('[wordpress] Failed to fetch events, using mock data:', err)
    return MOCK_EVENTS
  }
}
