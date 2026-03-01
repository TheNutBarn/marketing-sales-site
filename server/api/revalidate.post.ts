// Stub for Phase 2: WordPress webhook → on-demand ISR revalidation
// TODO: verify WordPress webhook secret, then revalidate /find-us and /blog routes
export default defineEventHandler(async (_event) => {
  return { revalidated: true, timestamp: new Date().toISOString() }
})
