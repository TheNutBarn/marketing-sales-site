<script setup lang="ts">
import { computed } from 'vue'
import { getEvents } from '~/lib/wordpress'
import type { WPEvent } from '../../shared/types/event'

useHead({
  title: "Find Us — Holt Farmer's Market | The Nut Barn",
  meta: [
    { name: 'description', content: "Find The Nut Barn at the Holt Farmer's Market every Saturday, 9am–2pm. Fresh cinnamon roasted nuts and our famous Hot Chocolate Bar." },
  ],
})

const { data: events } = await useAsyncData('events', () => getEvents())

const upcomingEvents = computed<WPEvent[]>(() =>
  events.value?.filter(e => e.status !== 'past') ?? [],
)

function formatEventDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

function formatEventTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="px-4 py-14 text-center" style="background:var(--gradient-hero);color:var(--color-text-inverse);">
      <div class="mx-auto" style="max-width:var(--container-md);">
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);">Find Us</h1>
        <p class="mt-3 text-lg" style="color:rgba(255,255,255,0.85);">
          Fresh from the Holt Farmer's Market · Every Saturday · 9am–2pm
        </p>
      </div>
    </section>

    <div class="mx-auto px-4 py-12" style="max-width:var(--container-lg);">
      <!-- Event schedule — chalkboard UI pattern -->
      <h2 class="mb-6 text-center" style="color:var(--color-brown);">Upcoming Markets</h2>

      <!-- Empty state -->
      <div v-if="upcomingEvents.length === 0" class="chalkboard p-8 text-center rounded-2xl" style="font-family:var(--font-chalk);font-size:1.25rem;">
        <p class="mb-3">No upcoming events scheduled.</p>
        <p style="font-size:1rem;opacity:0.8;">Follow us on Instagram @thenutbarn for updates!</p>
      </div>

      <!-- Events list (chalkboard style) -->
      <ul v-else class="chalkboard divide-y divide-pine-wood/30 rounded-2xl overflow-hidden" style="border:3px solid var(--color-pine-wood);">
        <li
          v-for="event in upcomingEvents"
          :key="event.id"
          class="p-6"
          style="font-family:var(--font-chalk);"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <!-- Status badge -->
              <span
                v-if="event.status === 'today'"
                class="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 uppercase"
                style="background-color:var(--color-orange);color:white;"
              >Today!</span>

              <p class="font-bold text-lg" style="color:var(--color-chalk-white);">{{ event.title }}</p>
              <p style="color:var(--color-straw);">{{ formatEventDate(event.date) }}</p>

              <div v-if="event.endDate" style="color:rgba(242,240,235,0.8);font-size:0.95rem;">
                {{ formatEventTime(event.date) }} – {{ formatEventTime(event.endDate) }}
              </div>

              <p v-if="event.address" class="mt-1" style="color:rgba(242,240,235,0.7);font-size:0.9rem;">
                📍 {{ event.address }}
              </p>
              <p v-if="event.description" class="mt-2" style="color:rgba(242,240,235,0.8);font-size:0.9rem;">
                {{ event.description }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <!-- Hot Chocolate callout -->
      <div class="mt-10 rounded-2xl p-6 border" style="background-color:var(--color-cream-warm);border-color:var(--color-border);">
        <div class="flex items-start gap-4">
          <div class="text-3xl" aria-hidden="true">☕</div>
          <div>
            <h3 class="mb-1" style="color:var(--color-brown);">Hot Chocolate Bar</h3>
            <p style="color:var(--color-text-muted);">
              Find us at the market and warm up with our Hot Chocolate Bar ($2). Made fresh alongside our signature cinnamon roasted nuts — the perfect cold-weather pairing.
            </p>
          </div>
        </div>
      </div>

      <!-- Contact info -->
      <div class="mt-8 text-center text-sm" style="color:var(--color-text-muted);">
        <p>Questions? Call us at <a href="tel:5174109029" class="font-bold" style="color:var(--color-brown);">(517) 410-9029</a></p>
        <p class="mt-1">Dimondale, Michigan</p>
      </div>
    </div>

    <!-- Bottom CTA — can't make it to market? -->
    <section class="px-4 py-12 text-center" style="background-color:var(--color-cream-dark);">
      <div class="mx-auto" style="max-width:var(--container-sm);">
        <h2 class="mb-3" style="color:var(--color-brown);">Can't Make It to the Market?</h2>
        <p class="mb-6" style="color:var(--color-text-muted);">Order online and arrange pickup or local delivery.</p>
        <NuxtLink to="/shop" class="font-bold px-8 py-3.5 rounded-full transition-colors" style="background-color:var(--color-orange);color:white;">
          Order Online →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
