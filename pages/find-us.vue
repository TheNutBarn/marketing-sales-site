<template>
  <!-- Hero -->
  <section
    class="py-16 text-center text-white"
    style="background: linear-gradient(135deg, #8B4513, #5c2d0e)"
  >
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Find Us</h1>
      <p class="text-orange-200 text-lg">
        We're out in the community every week. Come say hello — and follow the smell!
      </p>
    </div>
  </section>

  <!-- Regular Schedule -->
  <section class="py-16 px-4" style="background-color: #f8f6f0">
    <div class="max-w-4xl mx-auto">
      <h2 class="section-title">Regular Schedule</h2>
      <div class="section-divider" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div
          v-for="event in recurring"
          :key="event.id"
          class="card border-l-4"
          style="border-left-color: #ff6b35"
        >
          <h3 class="text-xl font-bold mb-2" style="color: #8B4513">🏪 {{ event.title }}</h3>
          <p v-if="event.recurringDay" class="font-semibold mb-1">
            📅 Every {{ event.recurringDay }}{{ event.recurringTime ? ` · ${event.recurringTime}` : '' }}
          </p>
          <p class="text-gray-600 mb-1">📍 {{ event.locationName }}</p>
          <p
            v-if="event.locationAddress && event.locationAddress !== event.locationName"
            class="text-gray-500 text-sm mb-3"
          >
            {{ event.locationAddress }}
          </p>
          <p class="text-gray-600 text-sm leading-relaxed">{{ event.description }}</p>
        </div>

        <!-- Online Orders card -->
        <div class="card border-l-4" style="border-left-color: #8B4513">
          <h3 class="text-xl font-bold mb-2" style="color: #8B4513">📦 Online Orders</h3>
          <p class="font-semibold mb-1">📅 Anytime</p>
          <p class="text-gray-600 mb-3">📍 Shipped Nationwide</p>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">
            Can't make it to an event? Order online and we'll ship fresh nuts right to your door!
          </p>
          <NuxtLink href="/shop" class="btn-primary text-sm">Shop Online →</NuxtLink>
        </div>
      </div>

      <!-- Map placeholder -->
      <div class="rounded-2xl overflow-hidden shadow-md">
        <div
          class="w-full h-64 md:h-96 flex items-center justify-center text-gray-500 text-center"
          style="background-color: #ede9df"
        >
          <div>
            <div class="text-5xl mb-3">🗺️</div>
            <p class="font-semibold" style="color: #8B4513">Holt Farmer's Market</p>
            <p class="text-sm">Holt, Michigan</p>
            <p class="text-xs mt-2 text-gray-400">Map embed — configure Google Maps API key</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Upcoming Events -->
  <section v-if="upcoming.length > 0" class="py-16 px-4" style="background-color: #ede9df">
    <div class="max-w-4xl mx-auto">
      <h2 class="section-title">Upcoming Events</h2>
      <div class="section-divider" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="event in upcoming" :key="event.id" class="card">
          <h3 class="text-lg font-bold mb-1" style="color: #8B4513">🎪 {{ event.title }}</h3>
          <p v-if="event.date" class="text-sm font-semibold mb-1">
            📅 {{ formatDate(event.date) }}
          </p>
          <p class="text-gray-600 text-sm mb-2">📍 {{ event.locationName }}</p>
          <p class="text-gray-600 text-sm leading-relaxed">{{ event.description }}</p>
          <a
            v-if="event.externalLink"
            :href="event.externalLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-3 text-sm font-semibold"
            style="color: #ff6b35"
          >
            Event Details →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-12 px-4 text-center text-white" style="background-color: #8B4513">
    <h2 class="text-2xl font-bold mb-2">Stay in the Loop</h2>
    <p class="text-orange-200 mb-4">Follow us for last-minute event additions and market updates.</p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center mb-6">
      <a
        href="https://www.facebook.com/thenutbarn"
        target="_blank"
        rel="noopener noreferrer"
        class="px-6 py-3 rounded-full font-bold text-white transition-all hover:-translate-y-0.5"
        style="background-color: #1877F2"
      >
        Facebook
      </a>
      <a
        href="https://www.instagram.com/thenutbarn"
        target="_blank"
        rel="noopener noreferrer"
        class="px-6 py-3 rounded-full font-bold text-white transition-all hover:-translate-y-0.5"
        style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
      >
        Instagram
      </a>
    </div>
    <p class="text-orange-200 text-sm">
      Event organizer?
      <NuxtLink href="/contact" class="underline hover:no-underline text-white">
        Get in touch to book The Nut Barn for your event →
      </NuxtLink>
    </p>
  </section>
</template>

<script setup lang="ts">
import { getEvents } from '~/lib/wordpress'

useSeoMeta({
  title: "Find Us — Holt Farmer's Market & Community Events",
  description:
    "Find The Nut Barn at the Holt Farmer's Market every Saturday 9am–2pm, plus community events around Mid-Michigan. Dimondale, Michigan.",
})

const { data: events } = await useAsyncData('events', () => getEvents())

const recurring = computed(() => events.value?.filter(e => e.isRecurring) ?? [])
const upcoming = computed(() => events.value?.filter(e => !e.isRecurring) ?? [])

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
