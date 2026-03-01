interface RateLimitEntry {
  count: number
  reset: number
}

const store = new Map<string, RateLimitEntry>()

export function rateLimit(
  event: Parameters<typeof getRequestHeader>[0],
  limit = 3,
  windowMs = 60_000,
): void {
  const ip =
    getRequestHeader(event, 'x-forwarded-for') ??
    getRequestHeader(event, 'x-real-ip') ??
    'unknown'

  const now = Date.now()
  const entry = store.get(ip) ?? { count: 0, reset: now + windowMs }

  if (now > entry.reset) {
    entry.count = 0
    entry.reset = now + windowMs
  }

  entry.count++
  store.set(ip, entry)

  if (entry.count > limit) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      message: 'Too many requests. Please wait a moment and try again.',
    })
  }
}
