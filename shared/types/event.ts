export interface WPEvent {
  id: string
  title: string
  date: string           // ISO 8601
  endDate?: string
  location: string
  address?: string
  description?: string
  status: 'upcoming' | 'today' | 'past'
}
