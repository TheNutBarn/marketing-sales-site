<script setup lang="ts">
import { ref } from 'vue'

const faqs = [
  {
    q: 'Are your nuts vegan?',
    a: 'Yes! Our cinnamon roasted nuts use just FIVE simple plant-based ingredients. No dairy, no eggs, no animal products of any kind.',
  },
  {
    q: 'Are they gluten-free?',
    a: 'Yes, our cinnamon roasted nuts are gluten-free. Our five ingredients are all naturally gluten-free.',
  },
  {
    q: 'Where can I find you?',
    a: "We're at the Holt Farmer's Market every Saturday from 9am to 2pm, located at 2136 Cedar St, Holt, MI 48842. Look for the yellow canopy!",
  },
  {
    q: 'Do you ship?',
    a: "Currently we offer local pickup at the Holt Farmer's Market and local delivery in the Dimondale/Holt area. We hope to offer shipping to more areas soon!",
  },
  {
    q: 'What are the FIVE ingredients?',
    a: "Nuts, cinnamon, sugar, butter, and vanilla — that's it. No artificial flavors, no preservatives, nothing you can't pronounce.",
  },
  {
    q: 'Can I order in bulk for an event or business?',
    a: "Absolutely! We love working with businesses, event planners, and gift programs. Visit our Wholesale page or contact us directly to discuss your needs.",
  },
  {
    q: 'Does the Gift Basket come gift-wrapped?',
    a: "Yes! Our Holiday Gift Basket is presented in a rustic wooden basket, ready to give. Just add a personal note at checkout.",
  },
  {
    q: 'How long do the nuts stay fresh?',
    a: 'Best within 2 weeks of purchase. Store in an airtight container at room temperature. They rarely last that long!',
  },
]

const allOpen = ref(false)

function toggleAll() {
  allOpen.value = !allOpen.value
  if (import.meta.client) {
    document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach(el => {
      el.open = allOpen.value
    })
  }
}

useHead({
  title: 'FAQ — The Nut Barn',
  meta: [
    { name: 'description', content: 'Frequently asked questions about The Nut Barn cinnamon roasted nuts — ingredients, where to find us, ordering, and more.' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-4 py-12 text-center" style="background-color:var(--color-cream-dark);">
      <div class="mx-auto" style="max-width:var(--container-md);">
        <h1 style="font-size:clamp(2rem,5vw,3rem);color:var(--color-brown);">Frequently Asked Questions</h1>
      </div>
    </section>

    <div class="mx-auto px-4 py-12" style="max-width:var(--container-md);">
      <!-- Expand/Collapse all for keyboard users -->
      <div class="flex justify-end mb-6">
        <button
          type="button"
          class="text-sm font-bold transition-colors"
          style="color:var(--color-brown);"
          @click="toggleAll"
        >
          {{ allOpen ? 'Collapse All' : 'Expand All' }}
        </button>
      </div>

      <!-- FAQ items -->
      <div class="space-y-3">
        <details
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq-item bg-white rounded-xl border overflow-hidden"
          style="border-color:var(--color-border);"
        >
          <summary
            class="flex items-center justify-between px-5 py-4 cursor-pointer font-bold list-none"
            style="color:var(--color-brown);font-family:var(--font-heading);"
          >
            {{ faq.q }}
            <svg class="shrink-0 ml-2 transition-transform" style="width:20px;height:20px;details[open] & { transform:rotate(180deg); }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </summary>

          <div class="accordion-body">
            <div class="px-5 pb-4 pt-1">
              <p class="text-sm" style="color:var(--color-text-muted);line-height:var(--line-height-relaxed);">{{ faq.a }}</p>
            </div>
          </div>
        </details>
      </div>

      <!-- CTA -->
      <div class="mt-10 text-center">
        <p class="mb-4" style="color:var(--color-text-muted);">Have a question we didn't answer?</p>
        <NuxtLink to="/contact" class="font-bold px-6 py-3 rounded-full transition-colors" style="background-color:var(--color-orange);color:white;">
          Contact Us
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
